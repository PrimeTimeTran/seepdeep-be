import mongoose from 'mongoose'

import { User } from '../models/User.model'
type DateEntry = {
  dayTotal: number
  problems: Record<string, any>
}
type Streak = Map<String, DateEntry>

type User = {
  _id: String
  streak: Streak
  solves: mongoose.Types.ObjectId[]
}
export default class SolveService {
  body: Map<String, String>
  problemId: string = ''
  user: User
  language: String

  constructor(e: any, body: any, language: String) {
    this.body = body
    this.user = e.context.user
    this.language = language
  }

  async updateUserStreak() {
    try {
      this.user.streak = updateProblemIdForToday(
        this.user.streak,
        this.problemId,
        this.language,
        this.user
      )
      this.user.markModified('streak')
      this.user.totalLifetime = calculateTotalLifetime(this.user.streak)
      this.user.maxStreak = calculateMaxStreak(this.user.streak)
      this.user.currentStreak = calculateCurrentStreak(this.user.streak)
    } catch (error) {
      console.error('Error saving user data:', error)
    }
  }

  async updateSolved(problemId: string) {
    this.problemId = problemId
    let solveIds = [...new Set(this.user.solves)]
    let solveDocuments = await Solve.find({ _id: { $in: solveIds } })
    let solveMap = new Map()
    solveDocuments.forEach((solve) => {
      solveMap.set(solve.problem!.toString(), solve)
    })
    let solvedItem = solveMap.get(this.problemId)
    if (solvedItem) {
      logger.info('Problem previously solved')
      solvedItem = await Solve.findById(solvedItem)
      this.updateUserStreak()
    } else {
      logger.info('Newly Solved Problem')
      const currentDate = new Date()
      const numberOfDaysToAdd = 1
      const futureDate = new Date(
        currentDate.getTime() + numberOfDaysToAdd * 24 * 60 * 60 * 1000
      )
      let solvedItem = new Solve({
        user: this.user._id,
        countEncountered: 1,
        nextSolve: futureDate,
        problem: this.problemId,
        level: SolveMasteryLevels.encountered,
      })
      await solvedItem.save()
      this.user.solves.push(solvedItem._id)
      this.updateUserStreak()
    }
  }
}

function calculateMaxStreak(streak: Record<string, any>) {
  const dateKeys = [...streak.keys()].filter((key) => !isNaN(Date.parse(key)));
  if (dateKeys.length === 0) {
    return 0;
  }

  let count = 1
  let maxStreak = 1
  let previousDate = null

  const sortedDates = dateKeys.sort()

  for (let i = 0; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i])
    if (previousDate !== null) {
      const diffInTime = currentDate.getTime() - previousDate.getTime()
      const oneDay = 1000 * 60 * 60 * 24
      if (diffInTime === oneDay) {
        count++
      } else {
        maxStreak = Math.max(maxStreak, count)
        count = 1
      }
    }
    previousDate = currentDate
  }
  console.log({ curretMax: Math.max(maxStreak, count) })
  return Math.max(maxStreak, count)
}

function calculateCurrentStreak(streak: Record<string, any>) {
  const today = new Date()
  const formattedToday = today.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  })

  let currentStreak = 0
  let currentDate = formattedToday

  while (streak.get(currentDate)) {
    currentStreak++
    const prevDate = new Date(currentDate)
    prevDate.setDate(prevDate.getDate() - 1)
    currentDate = prevDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    })
  }

  console.log({ currentStreak })

  return currentStreak
}

function updateProblemIdForToday(
  streak: Streak,
  problemId: string,
  language: String,
  user: User
) {
  const today = new Date()
  const formattedToday = today.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  })

  if (!streak.get(formattedToday)) {
    const val = new Map([[problemId, new Map([[language, 1]])]])
    streak = {
      dayTotal: 1,
      problems: val
    }
    // streak.set(formattedToday, {
    //   dayTotal: 1,
    //   problems: val,
    // })
  } else {
    const today = streak.get(formattedToday)
    const problems = today!.problems
    if (!problems[problemId]) {
      problems.set(problemId, new Map([[language, 1]]))
    } else {
      const problemEntry = problems[problemId]
      if (problemEntry != undefined && problemEntry[language]) {
        problemEntry[language] = problemEntry[language] + 1
        const currentDayTotal = problemEntry['dayTotal'] || 0
        problemEntry['dayTotal'] = currentDayTotal + 1
      } else {
        problemEntry[language] = 1
        problemEntry['dayTotal'] = 1
        
      }
    }
    today!.dayTotal++
  }

  return streak
}

function calculateTotalLifetime(streak: Record<string, any>) {
  let totalLifetime = 0
  for (const [date, dayData] of streak.entries()) {
    let dayTotal = 0
    if (dayData.problems) {
      const keys = Object.keys(dayData.problems)
      for (const key of keys) {
        const val = dayData.problems[key];
        dayTotal += val.dayTotal 
      }
    }
    dayData.dayTotal = dayTotal
    totalLifetime += dayTotal
  }
  return totalLifetime
}

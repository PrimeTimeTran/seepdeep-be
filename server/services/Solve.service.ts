import mongoose from 'mongoose'
import type { SolveType } from '../models/Solve.model'
import type { UserType, StreakType } from '~/server/models/User.model'

export default class SolveService {
  user: UserType
  language: string
  problemId: string = ''
  body: Map<string, string>
  solvedItem?: SolveType | null | undefined

  constructor(e: any, body: any, language: string) {
    this.body = body
    this.language = language
    this.user = e.context.user
  }

  async updateUserStreak() {
    try {
      let streak = this.user.get('streak')
      streak = updateStreak(streak, this.problemId, this.language)
      this.user.set('streak', streak)
      this.user.markModified('streak')
      // For some reason, when I test, totalLifeTime doesn't update without saving first here.
      // Although if there is a value, it does. Only the initial
      // Time a user creates a submission for the day I've seemed to produce this problem.
      await this.user.save()
      streak = this.user.get('streak')
      let totalLifetime = calculateTotalLifetime(streak)
      this.user.totalLifetime = totalLifetime
      this.user.maxStreak = calculateMaxStreak(streak)
      this.user.currentStreak = calculateCurrentStreak(streak)
      await this.user.save()
    } catch (error) {
      logger.fatal({ error: error }, 'Updating User Streak')
    }
  }

  async setSolvedItem(problemId: string) {
    const solveIds = [...new Set(this.user.solves)]
    const solveDocuments = await Solve.find({ _id: { $in: solveIds } })
    const solveMap = new Map()
    solveDocuments.forEach((s) => {
      const solve: SolveType = s.toObject()
      solveMap.set(solve.problem?.toString(), solve)
    })

    let solvedId = solveMap.get(problemId)
    this.solvedItem = await Solve.findById(solvedId)
  }

  async createSolvedItem(problemId: string) {
    const currentDate = new Date()
    const numberOfDaysToAdd = 1
    const futureDate = new Date(
      currentDate.getTime() + numberOfDaysToAdd * 24 * 60 * 60 * 1000
    )
    let solvedItem = new Solve({
      user: this.user._id,
      nextSolve: futureDate,
      problem: new mongoose.Types.ObjectId(problemId),
    })
    const savedSolve = await solvedItem.save()
    const savedSolveObject = savedSolve.toObject() as SolveType
    this.solvedItem = savedSolveObject
    this.user.solves.push(this.solvedItem._id)
  }

  async updateSolved(problemId: string) {
    this.problemId = problemId
    await this.setSolvedItem(problemId)
    if (!this.solvedItem) {
      logger.info('Problem New')
      await this.createSolvedItem(problemId)
    } else {
      logger.info('Problem Old')
    }
    // Todo: Update details on this solved item.
    this.updateUserStreak()
  }
}

function calculateMaxStreak(streak: any) {
  const dateKeys = Object.keys(streak).filter((key) => !isNaN(Date.parse(key)))
  if (dateKeys.length === 0) {
    return 0
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
  return Math.max(maxStreak, count)
}

function calculateCurrentStreak(streak: StreakType) {
  const today = new Date()
  const formattedToday = today.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  })

  let currentStreak = 0
  let currentDate = formattedToday
  // Todo: Fix errors by linter/TS when you learn how TS works =)
  // Code works though.
  while (streak[currentDate]) {
    currentStreak++
    const prevDate = new Date(currentDate)
    prevDate.setDate(prevDate.getDate() - 1)
    currentDate = prevDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    })
  }
  return currentStreak
}

function updateStreak(streak: StreakType, problemId: string, language: string) {
  const today = new Date()
  const formattedToday = today.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  })

  // Ditto
  if (!streak[formattedToday]) {
    const problemEntry = {
      [language]: 1,
    }
    const problemsMap = new Map([[problemId, problemEntry]])
    const dayEntry = {
      dayTotal: 1,
      problems: problemsMap,
    }
    // Ditto
    streak[formattedToday] = dayEntry
  } else {
    // Ditto
    const todayEntry = streak[formattedToday]
    const problems = todayEntry!.problems
    if (!problems[problemId]) {
      const problemEntry = new Map([[language, 1], ['dayTotal', 1]])
      problems[problemId] = problemEntry
    } else {
      const problemEntry = problems[problemId]
      const value = problemEntry[language]
      problemEntry[language] = value ? value + 1 : 1
    }
    // Ditto
    streak[formattedToday].dayTotal = streak[formattedToday].dayTotal + 1
  }

  return streak
}

function calculateTotalLifetime(streak: StreakType) {
  let totalLifetime = 0
  const dates = Object.values(streak)
  for (const dateData of dates) {
    let dayTotal = 0
    if (dateData.problems) {
      const problemIds = Object.keys(dateData.problems)
      for (const problemId of problemIds) {
        const langMap = dateData.problems[problemId]
        const langKeys = Object.keys(langMap)
        const problemTotal = langKeys.reduce((sum, key) => sum + langMap[key], 0)
        dayTotal += problemTotal
      }
    }
    dateData.dayTotal = dayTotal
    totalLifetime += dayTotal
  }
  return totalLifetime
}

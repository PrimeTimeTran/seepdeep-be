import mongoose from 'mongoose'
import { User } from '../models/User.model'
import type { UserType, StreakType } from '~/server/models/User.model'

export default class SolveService {
  body: Map<string, string>
  problemId: string = ''
  user: UserType
  language: string

  constructor(e: any, body: any, language: string) {
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
  const dateKeys = [...streak.keys()].filter((key) => !isNaN(Date.parse(key)))
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
  streak: StreakType,
  problemId: string,
  language: string
) {
  const today = new Date()
  const formattedToday = today.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  })

  if (!streak.get(formattedToday)) {
    // Initialize the languages map within the problems map
    const languagesMap = new Map([[language, 1]])

    // Create the object for the specific problemId
    const problemEntry = {
      dayTotal: 1,
      languages: languagesMap,
    }

    // Initialize the problems map with the problem entry
    const problemsMap = new Map([[problemId, problemEntry]])

    // Create the day entry with dayTotal and problems map
    const dayEntry = {
      dayTotal: 1,
      problems: problemsMap,
    }

    // Set the day entry in the streak map
    streak.set(formattedToday, dayEntry)
  } else {
    const todayEntry = streak.get(formattedToday)
    const problems = todayEntry!.problems

    if (!problems.has(problemId)) {
      // Initialize the languages map with the language count
      const languagesMap = new Map([[language, 1]])

      // Create the object for the specific problemId
      const problemEntry = {
        dayTotal: 1,
        languages: languagesMap,
      }

      // Set the new problem entry in the problems map
      problems.set(problemId, problemEntry)
    } else {
      const problemEntry = problems.get(problemId)
      // Retrieve the `languages` map from `problemEntry`
      const languagesMap = problemEntry!.languages

      // Check if the language exists in `languages` map
      if (languagesMap.has(language)) {
        // Increment the language count in the map
        const currentLanguageCount = languagesMap.get(language)
        languagesMap.set(language, currentLanguageCount! + 1)
      } else {
        // Add the language key with an initial count of 1
        languagesMap.set(language, 1)
      }
    }

    // Increment dayTotal in the today entry
    todayEntry!.dayTotal++
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
        const val = dayData.problems[key]
        dayTotal += val.dayTotal
      }
    }
    dayData.dayTotal = dayTotal
    totalLifetime += dayTotal
  }
  return totalLifetime
}

import type { UserType, StreakType } from '~/server/models/User.model'

export default class SolveService {
  user: UserType
  language: string
  problemId: string = ''
  body: Map<string, string>

  constructor(e: any, body: any, language: string) {
    this.body = body
    this.user = e.context.user
    this.language = language
  }

  async updateUserStreak() {
    try {
      let streak = this.user.get('streak')
      streak = updateStreak(streak, this.problemId, this.language)
      this.user.set('streak', streak)
      this.user.markModified('streak')
      await this.user.save()
      streak = this.user.get('streak')
      this.user.totalLifetime = calculateTotalLifetime(streak)
      this.user.maxStreak = calculateMaxStreak(streak)
      this.user.currentStreak = calculateCurrentStreak(streak)
      await this.user.save()
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
      logger.info('Problem Old')
      solvedItem = await Solve.findById(solvedItem)
      this.updateUserStreak()
    } else {
      logger.info('Problem New')
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
      const languagesMap = new Map([[language, 1]])
      const problemEntry = {
        dayTotal: 1,
        languages: languagesMap,
      }
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
        dayTotal += langKeys.reduce((sum, key) => sum + langMap[key], 0)
      }
    }
    dateData.dayTotal = dayTotal
    totalLifetime += dayTotal
  }
  return totalLifetime
}

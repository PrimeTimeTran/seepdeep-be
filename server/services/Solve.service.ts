import mongoose from 'mongoose'
type LanguageCounts = Map<String, number>;
type ProblemsMap = Map<String, LanguageCounts>;
type DateEntry = {
    dayTotal: number;
    problems: ProblemsMap;
};
type Streak = Map<String, DateEntry>;


type User = {
  _id: String
  streak: Streak
  solves: mongoose.Types.ObjectId[]
}

type Solve = {
  _id: String
  problem: Map<String, String>
}

export default class SolveService {
  body: Map<String, String>
  problemId: String = ''
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
        this.language
      )
      // this.user.totalLifetime = calculateTotalLifetime(this.user.streak)
      // this.user.maxStreak = calculateMaxStreak(this.user.streak)
      // this.user.currentStreak = calculateCurrentStreak(this.user.streak)
    } catch (error) {
      console.error('Error saving user data:', error)
    }
  }

  async updateSolved(problemId: String) {
    this.problemId = problemId.toString()
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

function calculateMaxStreak(streak: Map<String, String>) {
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
  console.log({ currentMAx: Math.max(maxStreak, count) })
  return Math.max(maxStreak, count)
}

function calculateCurrentStreak(streak: Map<String, String>) {
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
  problemId: String,
  language: String
) {
  const today = new Date()
  const formattedToday = today.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  })

  if (!streak.has(formattedToday)) {
    const val: ProblemsMap = new Map([
      [problemId, new Map([[language, 1]])],
    ]);
    streak.set(formattedToday, {
      dayTotal: 1,
      problems: val,
    });
  } else {
    // const todayEntry = streak.get(formattedToday)
    // const problems = todayEntry.problems

    // // Check if `problemId` exists in `problems`, if not, initialize it with the language map
    // if (!problems.has(problemId)) {
    //   problems.set(
    //     problemId,
    //     new Map([
    //       [language, 1], // Initialize language key with value 1
    //     ])
    //   )
    // } else {
    //   // Update the existing `problemId` map
    //   const problemEntry = problems.get(problemId)

    //   // Increment the language count
    //   if (problemEntry.has(language)) {
    //     problemEntry.set(language, problemEntry.get(language) + 1)
    //   } else {
    //     problemEntry.set(language, 1)
    //   }
    // }

    // // Increment dayTotal for the date entry
    // todayEntry.dayTotal++
  }

  return streak
}

// function calculateTotalLifetime(streak) {
//   let totalLifetime = 0
//   for (const [date, dayData] of streak.entries()) {
//     let dayTotal = 0
//     if (dayData.problems) {
//       for (const [problemId, languageMap] of dayData.problems.entries()) {
//         for (const [language, count] of languageMap.entries()) {
//           dayTotal += count
//         }
//       }
//     }
//     dayData.dayTotal = dayTotal
//     totalLifetime += dayTotal
//   }
//   return totalLifetime
// }

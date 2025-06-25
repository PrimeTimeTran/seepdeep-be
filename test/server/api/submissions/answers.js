export const answers = {
  twoSum: {
    python: {
      lang: 'python',
      body: 'class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        store = {}\n        for idx, n in enumerate(nums):\n            remainder = target - n\n            if store.get(remainder) != None:\n                return [store.get(remainder), idx]\n            store[n] = idx',
      name: 'Two Sum',
      problem: '66367f5e0d552cf0a90e85e9',
    },
    dart: {
      lang: 'dart',
      body: 'class Solution { List<int> twoSum(List<int> nums, int target) { final Map<int, int> store = {}; for (int i = 0; i < nums.length; i++) { int n = nums[i]; int remainder = target - n; if (store.containsKey(remainder)) { return [store[remainder]!, i]; } else { store[n] = i; } } return []; } }',
      name: 'Two Sum',
      problem: '66367f5e0d552cf0a90e85e9',
    },
    ruby: {
      lang: 'ruby',
      body: 'def two_sum(nums, target)\n  store = {}\n  nums.each_with_index do |n, i|\n    remainder = target - n\n    if store.key?(remainder)\n      return [store[remainder], i]\n    else\n      store[n] = i\n    end\n  end\n  []\nend',
      name: 'Two Sum',
      problem: '66367f5e0d552cf0a90e85e9',
    },
    java: {
      lang: 'java',
      body: 'import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> store = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int remainder = target - nums[i];\n            if (store.containsKey(remainder)) {\n                return new int[] { store.get(remainder), i };\n            } else {\n                store.put(nums[i], i);\n            }\n        }\n        return new int[] {};\n    }\n}',
      name: 'Two Sum',
      problem: '66367f5e0d552cf0a90e85e9',
    },
    go: {
      lang: 'go',
      body: 'func twoSum(nums []int, target int) []int {\n    store := make(map[int]int)\n    for i, n := range nums {\n        remainder := target - n\n        if j, found := store[remainder]; found {\n            return []int{j, i}\n        }\n        store[n] = i\n    }\n    return []int{}\n}',
      name: 'Two Sum',
      problem: '66367f5e0d552cf0a90e85e9',
    },
  },
  longestSubstringWithoutRepeatingCharacters: {
    python: {
      lang: 'python',
      body: 'class Solution:\n    def longestSubstringWithoutRepeatingCharacters(self, s: str) -> int:\n        l, ans, seen = 0, 0, set()\n        for r, c in enumerate(s):\n            while c in seen:\n                seen.remove(s[l])\n                l += 1\n            seen.add(c)\n            ans = max(ans, r - l + 1)\n        return ans',
      name: 'Longest Substring Without Repeating Characters',
      problem: '66367f5e0d552cf0a90e8609',
    },
    dart: {
      lang: 'dart',
      body: 'class Solution {\n  int longestSubstringWithoutRepeatingCharacters(String s) {\n    Set<String> seen = {};\n    int l = 0, ans = 0;\n\n    for (int r = 0; r < s.length; r++) {\n      String c = s[r];\n      while (seen.contains(c)) {\n        seen.remove(s[l]);\n        l++;\n      }\n      seen.add(c);\n      ans = (r - l + 1) > ans ? (r - l + 1) : ans;\n    }\n\n    return ans;\n  }\n}',
      name: 'Longest Substring Without Repeating Characters',
      problem: '66367f5e0d552cf0a90e8609',
    },
    ruby: {
      lang: 'ruby',
      body: 'def longest_substring_without_repeating_characters(s)\n  l = 0\n  res = 0\n  seen = Set.new\n  s.each_char.with_index do |c, r|\n    while seen.include?(s[r])\n      seen.delete(s[l])\n      l += 1\n    end\n    seen.add(s[r])\n    res = [res, r - l + 1].max\n  end\n  return res\nend',
      name: 'Longest Substring Without Repeating Characters',
      problem: '66367f5e0d552cf0a90e8609',
    },
    java: {
      lang: 'java',
      body: 'class Solution {\n  public int longestSubstringWithoutRepeatingCharacters(String s) {\n    Set<Character> set = new HashSet<>(); \n    int l = 0;\n    int res = 0;\n    \n    for (int r = 0; r < s.length(); r++) {\n      Character curChar = s.charAt(r); \n      while (set.contains(curChar)) {\n        Character prevChar = s.charAt(l); \n        set.remove(prevChar);  \n        l += 1;\n      }\n      set.add(curChar);\n      res = Math.max(res, r - l + 1);\n    }\n    \n    return res;\n  }\n}',
      name: 'Longest Substring Without Repeating Characters',
      problem: '66367f5e0d552cf0a90e8609',
    },
    go: {
      lang: 'go',
      body: 'func max(a, b int) int {\n\tif a > b {\n\t\treturn a\n\t}\n\treturn b\n}\n\nfunc longestSubstringWithoutRepeatingCharacters(s string) int {\n\tres := 0\n\tl := 0\n\tset := map[string]bool{}\n\n\tfor r := 0; r < len(s); r++ {\n\t\tchar := string(s[r])\n\t\tok := set[char]\n\t\tfor ok {\n\t\t\tdelete(set, string(s[l]))\n\t\t\tl += 1\n\t\t\tok = set[char]\n\t\t}\n\t\tset[char] = true\n\t\tres = max(res, r - l + 1)\n\t}\n\n\treturn res\n}',
      name: 'Longest Substring Without Repeating Characters',
      problem: '66367f5e0d552cf0a90e8609',
    },
  },
  medianOfTwoSortedArrays: {
    python: {
      lang: 'python',
      body: 'class Solution:\n    def medianOfTwoSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        nums = heapq.merge(nums1, nums2)\n        nums = list(nums)\n        m = len(nums) // 2\n        if len(nums) % 2 == 0:\n            l = nums[m-1]\n            r = nums[m]\n            return (l + r) / 2\n        else:\n            return nums[m]',
      name: 'Median of Two Sorted Arrays',
      problem: '66367f5e0d552cf0a90e8614',
    },
    dart: {
      lang: 'dart',
      body: 'class Solution {\n  double findMedianSortedArrays(List<int> nums1, List<int> nums2) {\n    if (nums1.length > nums2.length) {\n      return findMedianSortedArrays(nums2, nums1);\n    }\n\n    int x = nums1.length, y = nums2.length;\n    int low = 0, high = x;\n\n    while (low <= high) {\n      int partitionX = (low + high) ~/ 2;\n      int partitionY = (x + y + 1) ~/ 2 - partitionX;\n\n      int maxX = partitionX == 0 ? -1 << 31 : nums1[partitionX - 1];\n      int minX = partitionX == x ? 1 << 31 : nums1[partitionX];\n\n      int maxY = partitionY == 0 ? -1 << 31 : nums2[partitionY - 1];\n      int minY = partitionY == y ? 1 << 31 : nums2[partitionY];\n\n      if (maxX <= minY && maxY <= minX) {\n        if ((x + y) % 2 == 0) {\n          return (maxX > maxY ? maxX : maxY + (minX < minY ? minX : minY)) / 2.0;\n        } else {\n          return (maxX > maxY ? maxX : maxY).toDouble();\n        }\n      } else if (maxX > minY) {\n        high = partitionX - 1;\n      } else {\n        low = partitionX + 1;\n      }\n    }\n\n    throw Exception("Input arrays are not sorted");\n  }\n}',
      name: 'Median of Two Sorted Arrays',
      problem: '66367f5e0d552cf0a90e8614',
    },
    ruby: {
      lang: 'ruby',
      body: "def find_median_sorted_arrays(nums1, nums2)\n  nums1, nums2 = nums2, nums1 if nums1.length > nums2.length\n\n  x, y = nums1.length, nums2.length\n  low, high = 0, x\n\n  while low <= high\n    partition_x = (low + high) / 2\n    partition_y = (x + y + 1) / 2 - partition_x\n\n    max_left_x = partition_x == 0 ? -Float::INFINITY : nums1[partition_x - 1]\n    min_right_x = partition_x == x ? Float::INFINITY : nums1[partition_x]\n\n    max_left_y = partition_y == 0 ? -Float::INFINITY : nums2[partition_y - 1]\n    min_right_y = partition_y == y ? Float::INFINITY : nums2[partition_y]\n\n    if max_left_x <= min_right_y && max_left_y <= min_right_x\n      if (x + y).even?\n        return ([max_left_x, max_left_y].max + [min_right_x, min_right_y].min) / 2.0\n      else\n        return [max_left_x, max_left_y].max.to_f\n      end\n    elsif max_left_x > min_right_y\n      high = partition_x - 1\n    else\n      low = partition_x + 1\n    end\n  end\n\n  raise 'Input arrays not sorted'\nend",
      name: 'Median of Two Sorted Arrays',
      problem: '66367f5e0d552cf0a90e8614',
    },
    java: {
      lang: 'java',
      body: 'import java.util.*;\n\nclass Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        if (nums1.length > nums2.length) {\n            return findMedianSortedArrays(nums2, nums1);\n        }\n\n        int x = nums1.length;\n        int y = nums2.length;\n        int low = 0, high = x;\n\n        while (low <= high) {\n            int partitionX = (low + high) / 2;\n            int partitionY = (x + y + 1) / 2 - partitionX;\n\n            int maxX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];\n            int minX = (partitionX == x) ? Integer.MAX_VALUE : nums1[partitionX];\n\n            int maxY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];\n            int minY = (partitionY == y) ? Integer.MAX_VALUE : nums2[partitionY];\n\n            if (maxX <= minY && maxY <= minX) {\n                if ((x + y) % 2 == 0) {\n                    return ((double)Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;\n                } else {\n                    return (double)Math.max(maxX, maxY);\n                }\n            } else if (maxX > minY) {\n                high = partitionX - 1;\n            } else {\n                low = partitionX + 1;\n            }\n        }\n\n        throw new IllegalArgumentException("Input arrays are not sorted");\n    }\n}',
      name: 'Median of Two Sorted Arrays',
      problem: '66367f5e0d552cf0a90e8614',
    },
    go: {
      lang: 'go',
      body: 'import "math"\n\nfunc findMedianSortedArrays(nums1 []int, nums2 []int) float64 {\n    if len(nums1) > len(nums2) {\n        return findMedianSortedArrays(nums2, nums1)\n    }\n\n    x, y := len(nums1), len(nums2)\n    low, high := 0, x\n\n    for low <= high {\n        partitionX := (low + high) / 2\n        partitionY := (x + y + 1) / 2 - partitionX\n\n        maxX := math.Inf(-1)\n        if partitionX != 0 {\n            maxX = float64(nums1[partitionX-1])\n        }\n        minX := math.Inf(1)\n        if partitionX != x {\n            minX = float64(nums1[partitionX])\n        }\n\n        maxY := math.Inf(-1)\n        if partitionY != 0 {\n            maxY = float64(nums2[partitionY-1])\n        }\n        minY := math.Inf(1)\n        if partitionY != y {\n            minY = float64(nums2[partitionY])\n        }\n\n        if maxX <= minY && maxY <= minX {\n            if (x+y)%2 == 0 {\n                return (math.Max(maxX, maxY) + math.Min(minX, minY)) / 2.0\n            } else {\n                return math.Max(maxX, maxY)\n            }\n        } else if maxX > minY {\n            high = partitionX - 1\n        } else {\n            low = partitionX + 1\n        }\n    }\n\n    panic("Input arrays are not sorted")\n}',
      name: 'Median of Two Sorted Arrays',
      problem: '66367f5e0d552cf0a90e8614',
    },
  },
  containerWithMostWater: {
    python: {
      lang: 'python',
      body: 'class Solution:\n    def containerWithMostWater(self, H: List[int]) -> int:\n        ans, l, r = 0, 0, len(H) -1\n        while l < r:\n            ans = max(ans, (r - l) * min(H[r], H[l]))\n            if H[l] < H[r]:\n                l+=1\n            else:\n                r-=1\n        return ans',
      name: 'Container With Most Water',
      problem: '66367f5e0d552cf0a90e865b',
    },
  },
  threeSum: {
    python: {
      lang: 'python',
      body: 'class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        res = []\n        nums.sort()\n        for i, n in enumerate(nums):\n            if i > 0 and nums[i] == nums[i-1]: continue\n            l, r = i+1, len(nums)-1\n            while l < r:\n                total = nums[i] + nums[l] + nums[r]\n                if total < 0:\n                    l+=1\n                elif total > 0:\n                    r-=1\n                else:\n                    res.append([nums[i], nums[l], nums[r]])\n                    l+=1\n                    while l < r and nums[l-1] == nums[l]:\n                        l+=1\n        return res\n        ',
      name: '3Sum',
      problem: '66367f5e0d552cf0a90e8682',
    },
  },
  validParentheses: {
    python: {
      lang: 'python',
      body: 'class Solution:\n    def validParentheses(self, s: str) -> bool:\n        stack, store = [], {\n            "}": "{",\n            "]": "[",\n            ")": "("\n        }\n        for c in s:\n            if store.get(c) != None:\n                if stack and stack[-1] == store.get(c):\n                    stack.pop()\n                else:\n                    return False\n            else:\n                stack.append(c)\n        return len(stack) == 0\n        ',
      name: 'Valid Parentheses',
      problem: '6859b76f8bc8f88941ecf110',
    },
  },
  validSudoku: {
    python: {
      lang: 'python',
      body: "class Solution:\n    def validSudoku(self, board: List[List[str]]) -> bool:\n        rows, cols, blocks = defaultdict(set), defaultdict(set), defaultdict(set)\n        for r in range(9):\n            for c in range(9):\n                num = board[r][c]\n                if num == '.': continue\n                key = (r//3, c//3)\n                seen = num in rows[r] or num in cols[c] or num in blocks[key]\n                if seen: return False\n                rows[r].add(num)\n                cols[c].add(num)\n                blocks[key].add(num)\n        return True\n        \n        ",
      name: 'Valid Sudoku',
      problem: '66367f5e0d552cf0a90e875c',
    },
  },
  groupAnagrams: {
    python: {
      lang: 'python',
      body: "class Solution:\n    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:\n        grouped = defaultdict(list)\n        for s in strs:\n            cur = ''.join(sorted(s))\n            grouped[cur].append(s)\n        return list(grouped.values())\n        ",
      name: 'Group Anagrams',
      problem: '6844bbfa438d7b9a15caa7cf',
    },
  },
  longestConsecutiveSequence: {
    python: {
      lang: 'python',
      body: 'class Solution:\n    def longestConsecutiveSequence(self, nums: List[int]) -> int:\n        res, nums = 0, set(nums)\n        for n in nums:\n            if n-1 not in nums:\n                cur = 1\n                while n + cur in nums:\n                    cur += 1\n                res = max(res, cur) \n        return res\n',
      name: 'Longest Consecutive Sequence',
      problem: '66367f5e0d552cf0a90e86bb',
    },
  },
  containsDuplicate: {
    python: {
      lang: 'python',
      body: 'class Solution:\n    def containsDuplicate(self, nums: List[int]) -> bool:\n        return len(set(nums)) != len(nums)',
      name: 'Contains Duplicate',
      problem: '68449561e05ddd247bea6d2d',
    },
  },
  productOfArrayExceptSelf: {
    python: {
      lang: 'python',
      body: 'class Solution:\n    def productOfArrayExceptSelf(self, nums: List[int]) -> List[int]:\n        res = [0] * len(nums)\n        prefix = postfix = 1\n        for i, n in enumerate(nums):\n            res[i] = prefix\n            prefix *= n \n        for i in range(len(nums) -1, -1, -1):\n            res[i] *= postfix\n            postfix *= nums[i]\n        return res\n\n\n\n\n\n\n\n\n',
      name: 'Product of Array Except Self',
      problem: '66367f5e0d552cf0a90e86aa',
    },
  },
  validAnagram: {
    python: {
      lang: 'python',
      body: 'class Solution:\n    def validAnagram(self, s: str, t: str) -> bool:\n        if len(s) != len(t): return False\n        sStore, tStore = Counter(s), Counter(t)\n        return all(sStore[c] == tStore.get(c) for c in sStore)\n        ',
      name: 'Valid Anagram',
      problem: '6844ba7876977e14d4795339',
    },
  },
  islandPerimeter: {
    python: {
      lang: 'python',
      body: 'class Solution:\n    def islandPerimeter(self, grid: List[List[int]]) -> int:\n        self.res, seen, R, C = 0, set(), len(grid), len(grid[0])\n        def dfs(r,c):\n            if (r,c) in seen: return\n            inbounds = 0 <= r < R and 0 <= c < C\n            if not inbounds or grid[r][c] == 0: self.res+=1\n            if inbounds and grid[r][c] == 1:\n                seen.add((r,c))\n                dfs(r+1,c)\n                dfs(r-1,c)\n                dfs(r,c+1)\n                dfs(r,c-1)\n        for r in range(R):\n            for c in range(C):\n                if grid[r][c] == 1:\n                    dfs(r,c)\n        return self.res\n        \n        ',
      name: 'Island Perimeter',
      problem: '6859b56b3b18cfb398e51d26',
    },
  },
  floodFill: {
    python: {
      lang: 'python',
      body: 'class Solution:\n    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:\n        seen, q, R, C = set(), [[sr, sc]], len(image), len(image[0])\n        while q:\n            r, c = heappop(q)\n            tmp = image[r][c]\n            image[r][c] = color\n            for dr, dc in [[r+1,c], [r-1,c], [r,c+1], [r,c-1]]:\n                if (dr,dc) in seen: continue\n                seen.add((dr,dc))\n                inbounds = 0 <= dr < R and 0 <= dc < C\n                if inbounds and image[dr][dc] == tmp:\n                    heappush(q, [dr,dc])\n        return image\n        ',
      name: 'Flood Fill',
      problem: '6859b3fb43dafedf12e0c0cd',
    },
  },
  findTheTownJudge: {
    python: {
      lang: 'python',
      body: 'class Solution:\n    def findTheTownJudge(self, n: int, trust: List[List[int]]) -> int:\n        g = defaultdict(int)\n        for a, b in trust:\n            g[a] -= 1\n            g[b] += 1 \n\n        for i in range(1, n+1):\n            if n-1 == g[i]: return i\n        return -1\n\n\n\n\n\n\n\n\n\n\n',
      name: 'Find the Town Judge',
      problem: '685a211d9d686431e3311873',
    },
  },
  numberOfIslands: {
    python: {
      lang: 'python',
      body: 'class Solution:\n    def numberOfIslands(self, grid: List[List[str]]) -> int:\n        res, seen, R, C = 0, set(), len(grid), len(grid[0])\n        \n        def dfs(r,c):\n            inbounds = 0 <= r < R and 0 <= c < C\n            if inbounds and (r,c) not in seen and grid[r][c] == "1":\n                seen.add((r,c))\n                dfs(r+1,c)\n                dfs(r-1,c)\n                dfs(r,c+1)\n                dfs(r,c-1)\n                return True\n        \n        for r in range(R):\n            for c in range(C):\n                if dfs(r,c) and grid[r][c] == "1":\n                    res+=1\n        return res\n\n\n\n\n\n\n\n\n\n\n',
      name: 'Number of Islands',
      problem: '685a21fc8a404845cfe3abec',
    },
  },
  maxAreaOfIsland: {
    python: {
      lang: 'python',
      body: 'class Solution:\n    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:\n        res, seen, R, C = 0, set(), len(grid), len(grid[0])\n        def dfs(r,c):\n            inbounds = 0 <= r < R and 0 <= c < C\n            if inbounds and (r,c) not in seen and grid[r][c] == 1:\n                seen.add((r,c))\n                return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1)\n            else:\n                return 0\n\n        for r in range(R):\n            for c in range(C):\n                if grid[r][c] == 1:\n                    res = max(res, dfs(r,c))\n        return res\n        ',
      lang: 'python',
      problem: '685a2363e9ae18e695c7334d',
    },
  },
}

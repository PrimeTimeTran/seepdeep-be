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
      body: "class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        if len(nums1) > len(nums2):\n            nums1, nums2 = nums2, nums1\n\n        x, y = len(nums1), len(nums2)\n        low, high = 0, x\n\n        while low <= high:\n            partitionX = (low + high) // 2\n            partitionY = (x + y + 1) // 2 - partitionX\n\n            maxX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]\n            minX = float('inf') if partitionX == x else nums1[partitionX]\n\n            maxY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]\n            minY = float('inf') if partitionY == y else nums2[partitionY]\n\n            if maxX <= minY and maxY <= minX:\n                if (x + y) % 2 == 0:\n                    return (max(maxX, maxY) + min(minX, minY)) / 2\n                else:\n                    return max(maxX, maxY)\n            elif maxX > minY:\n                high = partitionX - 1\n            else:\n                low = partitionX + 1",
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
}

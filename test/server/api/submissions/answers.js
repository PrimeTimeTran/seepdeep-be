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
}

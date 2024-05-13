export const languages = [
  'python',
  'ruby',
  'js',
  'ts',
  'dart',
  'java',
  'go',
  'cplusplus',
]

// Python, ruby, js working in prod
// TS timing out in prod but not local. Not consistent.
// Dart just errors. Dart command not found.
export const problemSolutionMap = {
  1: {
    python: {
      code: `
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        store = {}
        for idx, n in enumerate(nums):
            remainder = target - n
            if store.get(remainder) != None:
                return [store.get(remainder), idx]
            store[n] = idx
`,
    },
    ruby: {
      code: `
      # @param {Integer[]} nums
      # @param {Integer} target
      # @return {Integer[]}
      def two_sum(nums, target)
        seen = {}
        nums.each_with_index do |n,i|
          diff = target-n
          if seen[diff]
            return [i,seen[diff]]
          else
            seen[n] = i
          end
        end
      end`,
    },
    js: {
      code: `
      var twoSum = function (nums, target) {
        const map = new Map()
        for(let i = 0; i < nums.length; i++) {
          const num = nums[i]
          const diff = target - num
          if (map.has(diff)) {
            return [map.get(diff), i]
          }
          map.set(num, i)
        }
      }`,
    },
    ts: {
      code: `
      function twoSum(nums: number[], target: number): number[] | undefined {
        const map = new Map()
        for (let i = 0; i < nums.length; i++) {
          const num = nums[i]
          const diff = target - num
          if (map.has(num)){
            return [map.get(num), i]
          }
          map.set(diff, i)
        }
      };`,
    },
    dart: {
      code: `
      class Solution {
        List<int> twoSum(List<int> nums, int target) {
          var seen = {};
          
          for (var i = 0; i < nums.length; i++) {
            var num = nums[i];
            var diff = target - num;
            if (seen[diff] != null) return [i, seen[diff]];
            seen[num] = i;
          }
          return [];
        }
      }`,
    },
    java: {
      code: `
      class Solution {
        public int[] twoSum(int[] nums, int target) {
            int[] result = new int[2];
            HashMap < Integer, Integer > map = new HashMap < Integer, Integer > ();
            for (int i = 0; i < nums.length; i++) {
                if (map.containsKey(target - nums[i])) {
                    result[0] = map.get(target - nums[i]);
                    result[1] = i;
                    return result;
                }
                map.put(nums[i], i);
            }
            return result;
        }
    }`,
    },
    go: {
      code: `
      func twoSum(nums []int, target int) []int {
        dict := make(map[int]int)   
        for idx, num := range nums {
          diff := target - num
          if _, ok := dict[diff]; ok {
            return []int{dict[diff], idx}
          }
          dict[num] = idx
        }
        return make([]int, 0, 0)
      }`,
    },
    cplusplus: {
      code: `
      class Solution {
        public:
            vector<int> twoSum(vector<int>& nums, int target) {
                unordered_map<int, int> numMap;
                for (int i = 0; i < nums.size(); i++) {
                    int complement = target - nums[i];
                    if (numMap.count(complement)) {
                        return {numMap[complement], i};
                    }
                    numMap[nums[i]] = i;
                }
                return {};
            }
        };
      `,
    },
  },
  2: {
    python: {
      code: `
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        store = {}
        for idx, n in enumerate(nums):
            remainder = target - n
            if store.get(remainder) != None:
                return [store.get(remainder), idx]
            store[n] = idx
`,
    },
    ruby: {
      code: `
      # @param {Integer[]} nums
      # @param {Integer} target
      # @return {Integer[]}
      def two_sum(nums, target)
        seen = {}
        nums.each_with_index do |n,i|
          diff = target-n
          if seen[diff]
            return [i,seen[diff]]
          else
            seen[n] = i
          end
        end
      end`,
    },
    js: {
      code: `
      var twoSum = function (nums, target) {
        const map = new Map()
        for(let i = 0; i < nums.length; i++) {
          const num = nums[i]
          const diff = target - num
          if (map.has(diff)) {
            return [map.get(diff), i]
          }
          map.set(num, i)
        }
      }`,
    },
    ts: {
      code: `
      function twoSum(nums: number[], target: number): number[] | undefined {
        const map = new Map()
        for (let i = 0; i < nums.length; i++) {
          const num = nums[i]
          const diff = target - num
          if (map.has(num)){
            return [map.get(num), i]
          }
          map.set(diff, i)
        }
      };`,
    },
    dart: {
      code: `
      class Solution {
        List<int> twoSum(List<int> nums, int target) {
          var seen = {};
          
          for (var i = 0; i < nums.length; i++) {
            var num = nums[i];
            var diff = target - num;
            if (seen[diff] != null) return [i, seen[diff]];
            seen[num] = i;
          }
          return [];
        }
      }`,
    },
    java: {
      code: `
      class Solution {
        public int[] twoSum(int[] nums, int target) {
            int[] result = new int[2];
            HashMap < Integer, Integer > map = new HashMap < Integer, Integer > ();
            for (int i = 0; i < nums.length; i++) {
                if (map.containsKey(target - nums[i])) {
                    result[0] = map.get(target - nums[i]);
                    result[1] = i;
                    return result;
                }
                map.put(nums[i], i);
            }
            return result;
        }
    }`,
    },
    go: {
      code: `
      func twoSum(nums []int, target int) []int {
        dict := make(map[int]int)   
        for idx, num := range nums {
          diff := target - num
          if _, ok := dict[diff]; ok {
            return []int{dict[diff], idx}
          }
          dict[num] = idx
        }
        return make([]int, 0, 0)
      }`,
    },
    cplusplus: {
      code: `
      class Solution {
        public:
            vector<int> twoSum(vector<int>& nums, int target) {
                unordered_map<int, int> numMap;
                for (int i = 0; i < nums.size(); i++) {
                    int complement = target - nums[i];
                    if (numMap.count(complement)) {
                        return {numMap[complement], i};
                    }
                    numMap[nums[i]] = i;
                }
                return {};
            }
        };
      `,
    },
  },
}

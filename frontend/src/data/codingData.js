export const codingLanguages = [
  'All Languages',
  'JavaScript',
  'Python',
  'C++',
  'Java',
  'Html/css',
  'REACT.JS',
  'node.js',
  'sql',
  'mongodb',
  'tailwind-css',
  'typescript',
  'RUST',
  'PHP',
];

export const dsaTopics = [
  'All Topics',
  'Basics',
  'Numbers',
  'Loops',
  'Array',
  'Arrays',
  'Strings',
  'String',
  'Stack',
  'Queue',
  'Linked List',
  'Trees',
  'Graphs',
  'Recursion',
  'Dynamic Programming',
  'Searching',
  'Sorting',
  'Binary Search',
  'Hashing',
  'Two Pointers',
  'Hash Table',
];

export const codingProblems = [
  {
    id: 'two-sum',
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Arrays',
    acceptance: '52%',
    evalFnName: 'twoSum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 2 + 7 == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'Because nums[1] + nums[2] == 2 + 4 == 6, we return [1, 2].',
      },
      {
        input: 'nums = [3, 3], target = 6',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 3 + 3 == 6, we return [0, 1].',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
      'Follow-up: Can you come up with an algorithm that is less than O(n^2) time complexity?',
    ],
    testCases: [
      {
        id: 1,
        name: 'Case 1',
        input: 'nums = [2, 7, 11, 15], target = 9',
        args: [[2, 7, 11, 15], 9],
        expected: '[0, 1]',
      },
      {
        id: 2,
        name: 'Case 2',
        input: 'nums = [3, 2, 4], target = 6',
        args: [[3, 2, 4], 6],
        expected: '[1, 2]',
      },
      {
        id: 3,
        name: 'Case 3',
        input: 'nums = [3, 3], target = 6',
        args: [[3, 3], 6],
        expected: '[0, 1]',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Your code here
}`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Your code here
        pass`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
    }
};`,
      java: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
}`,
    },
    solution: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
    },
    explanation: 'We iterate through the array once while storing each number and its index in a hash map. At each step, we calculate the required complement (target - currentNumber). If the complement already exists in our map, we immediately return the pair of indices in O(1) constant time.',
    timeComplexity: 'O(N) — Linear time where N is the length of the array. Each lookup and insertion in the Hash Map takes O(1) amortized time.',
    spaceComplexity: 'O(N) — Space complexity required to store up to N elements in the Hash Map.',
    hint: 'Can you solve this without checking every pair in O(N^2) time? Try using a Hash Map to look up complement values in constant time.',
  },

  {
    id: 'valid-palindrome',
    slug: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    topic: 'Strings',
    acceptance: '47%',
    evalFnName: 'isPalindrome',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.',
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: 'false',
        explanation: '"raceacar" is not a palindrome.',
      },
      {
        input: 's = " "',
        output: 'true',
        explanation: 's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.',
      },
    ],
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.',
    ],
    testCases: [
      {
        id: 1,
        name: 'Case 1',
        input: 's = "A man, a plan, a canal: Panama"',
        args: ['A man, a plan, a canal: Panama'],
        expected: 'true',
      },
      {
        id: 2,
        name: 'Case 2',
        input: 's = "race a car"',
        args: ['race a car'],
        expected: 'false',
      },
      {
        id: 3,
        name: 'Case 3',
        input: 's = " "',
        args: [' '],
        expected: 'true',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  // Your code here
}`,
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        // Your code here
    }
};`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        // Your code here
        return false;
    }
}`,
    },
    solution: {
      javascript: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        clean = [c.lower() for c in s if c.isalnum()]
        return clean == clean[::-1]`,
      cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            while (left < right && !isalnum(s[left])) left++;
            while (left < right && !isalnum(s[right])) right--;
            if (tolower(s[left]) != tolower(s[right])) return false;
            left++;
            right--;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;
            left++;
            right--;
        }
        return true;
    }
}`,
    },
    explanation: 'Using two pointers starting at opposite ends of the filtered string, compare characters toward the center. If any mismatch occurs, it cannot be a palindrome.',
    timeComplexity: 'O(N) — Single pass over string of length N.',
    spaceComplexity: 'O(1) — Constant extra space when using in-place two pointers.',
    hint: 'Filter non-alphanumeric characters, convert to lowercase, and use two pointers converging toward the middle.',
  },

  {
    id: 'valid-parentheses',
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topic: 'Stack',
    acceptance: '44%',
    evalFnName: 'isValid',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. An input string is valid if open brackets must be closed by the same type of brackets, open brackets must be closed in the correct order, and every close bracket has a corresponding open bracket of the same type.',
    examples: [
      {
        input: 's = "()"',
        output: 'true',
        explanation: 'Single matching pair of parentheses.',
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
        explanation: 'All three bracket types matched in order.',
      },
      {
        input: 's = "(]"',
        output: 'false',
        explanation: 'Opening parenthesis closed with mismatched square bracket.',
      },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}".',
    ],
    testCases: [
      {
        id: 1,
        name: 'Case 1',
        input: 's = "()"',
        args: ['()'],
        expected: 'true',
      },
      {
        id: 2,
        name: 'Case 2',
        input: 's = "()[]{}"',
        args: ['()[]{}'],
        expected: 'true',
      },
      {
        id: 3,
        name: 'Case 3',
        input: 's = "(]"',
        args: ['(]'],
        expected: 'false',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Your code here
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Your code here
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Your code here
        return false;
    }
}`,
    },
    solution: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { '(': ')', '{': '}', '[': ']' };
  for (const char of s) {
    if (map[char]) {
      stack.push(map[char]);
    } else if (stack.pop() !== char) {
      return false;
    }
  }
  return stack.length === 0;
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {")": "(", "}": "{", "]": "["}
        for char in s:
            if char in mapping:
                top_element = stack.pop() if stack else '#'
                if mapping[char] != top_element:
                    return False
            else:
                stack.append(char)
        return not stack`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(') st.push(')');
            else if (c == '{') st.push('}');
            else if (c == '[') st.push(']');
            else {
                if (st.empty() || st.top() != c) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
    },
    explanation: 'We use a Stack data structure adhering to Last-In-First-Out (LIFO). For each opening bracket, push its expected closing bracket onto the stack. When a closing bracket is encountered, pop the top of the stack and check for a match. At the end, verify the stack is completely empty.',
    timeComplexity: 'O(N) — Linear scan through string of length N.',
    spaceComplexity: 'O(N) — Stack holds up to N opening brackets in worst case.',
    hint: 'Push expected closing brackets onto a stack when opening brackets are encountered.',
  },

  {
    id: 'implement-queue-using-stacks',
    slug: 'implement-queue-using-stacks',
    title: 'Implement Queue using Stacks',
    difficulty: 'Easy',
    topic: 'Queue',
    acceptance: '64%',
    evalFnName: 'testMyQueue',
    description: 'Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).',
    examples: [
      {
        input: '["MyQueue", "push", "push", "peek", "pop", "empty"]\n[[], [1], [2], [], [], []]',
        output: '[null, null, null, 1, 1, false]',
        explanation: 'MyQueue myQueue = new MyQueue();\nmyQueue.push(1);\nmyQueue.push(2);\nmyQueue.peek(); // return 1\nmyQueue.pop(); // return 1\nmyQueue.empty(); // return false',
      },
    ],
    constraints: [
      '1 <= x <= 100',
      'At most 100 calls will be made to push, pop, peek, and empty.',
      'All the calls to pop and peek are valid.',
    ],
    testCases: [
      {
        id: 1,
        name: 'Case 1',
        input: 'push(1), push(2), peek(), pop(), empty()',
        args: [[1, 2]],
        expected: 'peek: 1, pop: 1, empty: false',
      },
      {
        id: 2,
        name: 'Case 2',
        input: 'push(10), push(20), push(30), pop()',
        args: [[10, 20, 30]],
        expected: 'pop: 10',
      },
    ],
    starterCode: {
      javascript: `class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  push(x) {
    this.inStack.push(x);
  }

  pop() {
    this.peek();
    return this.outStack.pop();
  }

  peek() {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack[this.outStack.length - 1];
  }

  empty() {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}

function testMyQueue(items) {
  const q = new MyQueue();
  for (const item of items) q.push(item);
  return \`peek: \${q.peek()}, pop: \${q.pop()}, empty: \${q.empty()}\`;
}`,
      python: `class MyQueue:
    def __init__(self):
        self.s1 = []
        self.s2 = []

    def push(self, x: int) -> None:
        self.s1.append(x)

    def pop(self) -> int:
        self.peek()
        return self.s2.pop()

    def peek(self) -> int:
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())
        return self.s2[-1]

    def empty(self) -> bool:
        return not self.s1 and not self.s2`,
      cpp: `class MyQueue {
    stack<int> inSt, outSt;
public:
    void push(int x) { inSt.push(x); }
    int pop() { peek(); int val = outSt.top(); outSt.pop(); return val; }
    int peek() {
        if (outSt.empty()) {
            while (!inSt.empty()) { outSt.push(inSt.top()); inSt.pop(); }
        }
        return outSt.top();
    }
    bool empty() { return inSt.empty() && outSt.empty(); }
};`,
      java: `class MyQueue {
    private Stack<Integer> inSt = new Stack<>();
    private Stack<Integer> outSt = new Stack<>();

    public void push(int x) { inSt.push(x); }
    public int pop() { peek(); return outSt.pop(); }
    public int peek() {
        if (outSt.isEmpty()) {
            while (!inSt.isEmpty()) outSt.push(inSt.pop());
        }
        return outSt.peek();
    }
    public boolean empty() { return inSt.isEmpty() && outSt.isEmpty(); }
}`,
    },
    solution: {
      javascript: `class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }
  push(x) { this.inStack.push(x); }
  pop() {
    this.peek();
    return this.outStack.pop();
  }
  peek() {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack[this.outStack.length - 1];
  }
  empty() { return this.inStack.length === 0 && this.outStack.length === 0; }
}

function testMyQueue(items) {
  const q = new MyQueue();
  for (const item of items) q.push(item);
  return \`peek: \${q.peek()}, pop: \${q.pop()}, empty: \${q.empty()}\`;
}`,
      python: `class MyQueue:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []
    def push(self, x: int) -> None:
        self.in_stack.append(x)
    def pop(self) -> int:
        self.peek()
        return self.out_stack.pop()
    def peek(self) -> int:
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack[-1]
    def empty(self) -> bool:
        return not self.in_stack and not self.out_stack`,
      cpp: `class MyQueue {
    stack<int> s1, s2;
public:
    void push(int x) { s1.push(x); }
    int pop() { peek(); int t = s2.top(); s2.pop(); return t; }
    int peek() {
        if (s2.empty()) {
            while (!s1.empty()) { s2.push(s1.top()); s1.pop(); }
        }
        return s2.top();
    }
    bool empty() { return s1.empty() && s2.empty(); }
};`,
      java: `class MyQueue {
    Stack<Integer> s1 = new Stack<>();
    Stack<Integer> s2 = new Stack<>();
    public void push(int x) { s1.push(x); }
    public int pop() { peek(); return s2.pop(); }
    public int peek() {
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) s2.push(s1.pop());
        }
        return s2.peek();
    }
    public boolean empty() { return s1.isEmpty() && s2.isEmpty(); }
}`,
    },
    explanation: 'By maintaining an inStack for incoming pushes and an outStack for outgoing pops/peeks, elements are reversed twice, restoring FIFO queue ordering with amortized O(1) per operation.',
    timeComplexity: 'Amortized O(1) per operation — each element is pushed and popped at most twice.',
    spaceComplexity: 'O(N) — Storing N elements across the two stacks.',
    hint: 'Use one stack for enqueue and another for dequeue. Only transfer items when outStack is empty.',
  },

  {
    id: 'reverse-linked-list',
    slug: 'reverse-linked-list',
    title: 'Reverse a Linked List',
    difficulty: 'Easy',
    topic: 'Linked List',
    acceptance: '76%',
    evalFnName: 'reverseList',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list head.',
    examples: [
      {
        input: 'head = [1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]',
        explanation: 'Pointers reversed so 5 points to 4, ..., 1 points to null.',
      },
      {
        input: 'head = [1, 2]',
        output: '[2, 1]',
        explanation: 'List with 2 elements reversed.',
      },
      {
        input: 'head = []',
        output: '[]',
        explanation: 'Empty list reversed is empty list.',
      },
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000',
    ],
    testCases: [
      {
        id: 1,
        name: 'Case 1',
        input: 'head = [1, 2, 3, 4, 5]',
        args: [[1, 2, 3, 4, 5]],
        expected: '[5, 4, 3, 2, 1]',
      },
      {
        id: 2,
        name: 'Case 2',
        input: 'head = [1, 2]',
        args: [[1, 2]],
        expected: '[2, 1]',
      },
      {
        id: 3,
        name: 'Case 3',
        input: 'head = []',
        args: [[]],
        expected: '[]',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {Array} arr (list representation)
 * @return {Array}
 */
function reverseList(arr) {
  // Your code here: reverse iterative logic
}`,
      python: `class Solution:
    def reverseList(self, head):
        prev = None
        curr = head
        while curr:
            next_temp = curr.next
            curr.next = prev
            prev = curr
            curr = next_temp
        return prev`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
};`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,
    },
    solution: {
      javascript: `function reverseList(arr) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}`,
      python: `class Solution:
    def reverseList(self, head):
        prev = None
        curr = head
        while curr:
            temp = curr.next
            curr.next = prev
            prev = curr
            curr = temp
        return prev`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        while (head) {
            ListNode* next = head->next;
            head->next = prev;
            prev = head;
            head = next;
        }
        return prev;
    }
};`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        while (head != null) {
            ListNode next = head.next;
            head.next = prev;
            prev = head;
            head = next;
        }
        return prev;
    }
}`,
    },
    explanation: 'Maintain three pointers: prev (initially null), curr (initially head), and nextTemp. As we traverse the linked list, redirect curr.next backward to prev, then advance prev and curr forward.',
    timeComplexity: 'O(N) — Traversing every node in the linked list exactly once.',
    spaceComplexity: 'O(1) — Constant memory using pointers.',
    hint: 'Keep track of previous, current, and next temporary node pointers.',
  },

  {
    id: 'maximum-depth-of-binary-tree',
    slug: 'maximum-depth-of-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    topic: 'Trees',
    acceptance: '74%',
    evalFnName: 'maxDepth',
    description: 'Given the root of a binary tree, return its maximum depth. A binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    examples: [
      {
        input: 'root = [3, 9, 20, null, null, 15, 7]',
        output: '3',
        explanation: 'Longest path is 3 -> 20 -> 15 (depth 3).',
      },
      {
        input: 'root = [1, null, 2]',
        output: '2',
        explanation: 'Path 1 -> 2 has depth 2.',
      },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4].',
      '-100 <= Node.val <= 100',
    ],
    testCases: [
      {
        id: 1,
        name: 'Case 1',
        input: 'root = [3, 9, 20, null, null, 15, 7]',
        args: [{ val: 3, left: { val: 9 }, right: { val: 20, left: { val: 15 }, right: { val: 7 } } }],
        expected: '3',
      },
      {
        id: 2,
        name: 'Case 2',
        input: 'root = [1, null, 2]',
        args: [{ val: 1, right: { val: 2 } }],
        expected: '2',
      },
      {
        id: 3,
        name: 'Case 3',
        input: 'root = null',
        args: [null],
        expected: '0',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {Object} root
 * @return {number}
 */
function maxDepth(root) {
  // Your code here
}`,
      python: `class Solution:
    def maxDepth(self, root) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
      cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`,
      java: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
    },
    solution: {
      javascript: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      python: `class Solution:
    def maxDepth(self, root) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
      cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`,
      java: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
    },
    explanation: 'Using depth-first search (DFS) recursion, if root is null the depth is 0. Otherwise, recursively compute the maximum depth of the left and right subtrees and add 1 for the current node.',
    timeComplexity: 'O(N) — Every node visited once.',
    spaceComplexity: 'O(H) — Height of tree recursion stack, O(log N) for balanced trees and O(N) worst case.',
    hint: 'Base case: null node has depth 0. Recursive case: 1 + max(leftDepth, rightDepth).',
  },

  {
    id: 'number-of-islands',
    slug: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'Medium',
    topic: 'Graphs',
    acceptance: '58%',
    evalFnName: 'numIslands',
    description: 'Given an m x n 2D binary grid grid which represents a map of "1"s (land) and "0"s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.',
    examples: [
      {
        input: 'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]',
        output: '1',
        explanation: 'All connected lands form one contiguous island.',
      },
      {
        input: 'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]',
        output: '3',
        explanation: 'Three separate islands separated by water.',
      },
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 300',
      'grid[i][j] is "0" or "1".',
    ],
    testCases: [
      {
        id: 1,
        name: 'Case 1',
        input: 'grid with 1 connected landmass',
        args: [[
          ['1', '1', '1', '1', '0'],
          ['1', '1', '0', '1', '0'],
          ['1', '1', '0', '0', '0'],
          ['0', '0', '0', '0', '0'],
        ]],
        expected: '1',
      },
      {
        id: 2,
        name: 'Case 2',
        input: 'grid with 3 separate islands',
        args: [[
          ['1', '1', '0', '0', '0'],
          ['1', '1', '0', '0', '0'],
          ['0', '0', '1', '0', '0'],
          ['0', '0', '0', '1', '1'],
        ]],
        expected: '3',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
  // Your code here: DFS or BFS graph traversal
}`,
      python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int numIslands(char[][] grid) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // mark as visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`,
      python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid:
            return 0
        rows, cols = len(grid), len(grid[0])
        count = 0

        def dfs(r, c):
            if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1':
                return
            grid[r][c] = '0'
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
        return count`,
      cpp: `class Solution {
    void dfs(vector<vector<char>>& grid, int r, int c) {
        int m = grid.size(), n = grid[0].size();
        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r+1, c); dfs(grid, r-1, c);
        dfs(grid, r, c+1); dfs(grid, r, c-1);
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        int count = 0;
        for (int r = 0; r < grid.size(); r++) {
            for (int c = 0; c < grid[0].size(); c++) {
                if (grid[r][c] == '1') { count++; dfs(grid, r, c); }
            }
        }
        return count;
    }
};`,
      java: `class Solution {
    private void dfs(char[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c); dfs(grid, r - 1, c);
        dfs(grid, r, c + 1); dfs(grid, r, c - 1);
    }
    public int numIslands(char[][] grid) {
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') { count++; dfs(grid, r, c); }
            }
        }
        return count;
    }
}`,
    },
    explanation: 'Iterate through every cell in the 2D grid. Whenever unvisited land ("1") is found, increment the island counter and launch a DFS/BFS flood-fill traversal to sink all connected land cells by flipping them to "0".',
    timeComplexity: 'O(M * N) — Every cell visited once during outer loops and DFS.',
    spaceComplexity: 'O(M * N) — Recursion stack depth in worst case (full land grid).',
    hint: 'Treat the matrix as an undirected graph. Run DFS from any unvisited "1" and mark connected cells.',
  },

  {
    id: 'fibonacci-number',
    slug: 'fibonacci-number',
    title: 'Fibonacci Number',
    difficulty: 'Easy',
    topic: 'Recursion',
    acceptance: '71%',
    evalFnName: 'fib',
    description: 'The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is: F(0) = 0, F(1) = 1, F(n) = F(n - 1) + F(n - 2), for n > 1. Given n, calculate F(n).',
    examples: [
      {
        input: 'n = 2',
        output: '1',
        explanation: 'F(2) = F(1) + F(0) = 1 + 0 = 1.',
      },
      {
        input: 'n = 3',
        output: '2',
        explanation: 'F(3) = F(2) + F(1) = 1 + 1 = 2.',
      },
      {
        input: 'n = 4',
        output: '3',
        explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3.',
      },
    ],
    constraints: [
      '0 <= n <= 30',
    ],
    testCases: [
      {
        id: 1,
        name: 'Case 1',
        input: 'n = 2',
        args: [2],
        expected: '1',
      },
      {
        id: 2,
        name: 'Case 2',
        input: 'n = 3',
        args: [3],
        expected: '2',
      },
      {
        id: 3,
        name: 'Case 3',
        input: 'n = 4',
        args: [4],
        expected: '3',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function fib(n) {
  // Your code here
}`,
      python: `class Solution:
    def fib(self, n: int) -> int:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    int fib(int n) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int fib(int n) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function fib(n) {
  if (n <= 1) return n;
  let prev2 = 0;
  let prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
      python: `class Solution:
    def fib(self, n: int) -> int:
        if n <= 1:
            return n
        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b`,
      cpp: `class Solution {
public:
    int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
};`,
      java: `class Solution {
    public int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`,
    },
    explanation: 'While plain recursion takes exponential O(2^N) time due to repeated subproblems, using bottom-up iterative DP / memoization solves it in linear O(N) time with O(1) space.',
    timeComplexity: 'O(N) — Linear number of addition steps.',
    spaceComplexity: 'O(1) — Only 2 variables maintained.',
    hint: 'Avoid exponential naive recursion; calculate iteratively or use memoization.',
  },

  {
    id: 'climbing-stairs',
    slug: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    topic: 'Dynamic Programming',
    acceptance: '53%',
    evalFnName: 'climbStairs',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation: 'There are two ways to climb to the top: 1 step + 1 step, or 2 steps.',
      },
      {
        input: 'n = 3',
        output: '3',
        explanation: 'Three ways: (1+1+1), (1+2), or (2+1).',
      },
    ],
    constraints: [
      '1 <= n <= 45',
    ],
    testCases: [
      {
        id: 1,
        name: 'Case 1',
        input: 'n = 2',
        args: [2],
        expected: '2',
      },
      {
        id: 2,
        name: 'Case 2',
        input: 'n = 3',
        args: [3],
        expected: '3',
      },
      {
        id: 3,
        name: 'Case 3',
        input: 'n = 5',
        args: [5],
        expected: '8',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  // Your code here: dynamic programming
}`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int climbStairs(int n) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  let first = 1;
  let second = 2;
  for (let i = 3; i <= n; i++) {
    const third = first + second;
    first = second;
    second = third;
  }
  return second;
}`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        first, second = 1, 2
        for _ in range(3, n + 1):
            first, second = second, first + second
        return second`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int first = 1, second = 2;
        for (int i = 3; i <= n; i++) {
            int third = first + second;
            first = second;
            second = third;
        }
        return second;
    }
};`,
      java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int first = 1, second = 2;
        for (int i = 3; i <= n; i++) {
            int third = first + second;
            first = second;
            second = third;
        }
        return second;
    }
}`,
    },
    explanation: 'To reach step n, you must arrive from step n-1 (by taking 1 step) or step n-2 (by taking 2 steps). Hence ways(n) = ways(n-1) + ways(n-2), exactly following the Fibonacci recurrence with base cases ways(1)=1, ways(2)=2.',
    timeComplexity: 'O(N) — Linear loop computing each step once.',
    spaceComplexity: 'O(1) — Only 2 previous values kept in memory.',
    hint: 'To reach step n, you came from step n-1 or n-2. dp[i] = dp[i-1] + dp[i-2].',
  },

  {
    id: 'binary-search',
    slug: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    topic: 'Searching',
    acceptance: '57%',
    evalFnName: 'search',
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.',
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4.',
      },
      {
        input: 'nums = [-1,0,3,5,9,12], target = 2',
        output: '-1',
        explanation: '2 does not exist in nums so return -1.',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.',
    ],
    testCases: [
      {
        id: 1,
        name: 'Case 1',
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        args: [[-1, 0, 3, 5, 9, 12], 9],
        expected: '4',
      },
      {
        id: 2,
        name: 'Case 2',
        input: 'nums = [-1,0,3,5,9,12], target = 2',
        args: [[-1, 0, 3, 5, 9, 12], 2],
        expected: '-1',
      },
      {
        id: 3,
        name: 'Case 3',
        input: 'nums = [5], target = 5',
        args: [[5], 5],
        expected: '0',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  // Your code here: O(log N) binary search
}`,
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        // Your code here
        return -1;
    }
}`,
    },
    solution: {
      javascript: `function search(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return -1`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
    },
    explanation: 'Because the array is sorted, we compare target against the midpoint. If target equals mid, return immediately. If target is greater, discard the left half. If target is less, discard the right half. Each iteration halves the search space.',
    timeComplexity: 'O(log N) — Halving the search interval on every step.',
    spaceComplexity: 'O(1) — Only indices low, mid, and high are tracked.',
    hint: 'Use two pointers low and high. Halve search space by checking nums[mid].',
  },

  {
    id: 'contains-duplicate',
    slug: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    topic: 'Hash Table',
    acceptance: '62%',
    evalFnName: 'containsDuplicate',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: 'true',
        explanation: '1 appears twice at indices 0 and 3.',
      },
      {
        input: 'nums = [1,2,3,4]',
        output: 'false',
        explanation: 'All elements are distinct.',
      },
      {
        input: 'nums = [1,1,1,3,3,4,3,2,4,2]',
        output: 'true',
        explanation: 'Elements appear multiple times.',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9',
    ],
    testCases: [
      {
        id: 1,
        name: 'Case 1',
        input: 'nums = [1, 2, 3, 1]',
        args: [[1, 2, 3, 1]],
        expected: 'true',
      },
      {
        id: 2,
        name: 'Case 2',
        input: 'nums = [1, 2, 3, 4]',
        args: [[1, 2, 3, 4]],
        expected: 'false',
      },
      {
        id: 3,
        name: 'Case 3',
        input: 'nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]',
        args: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]],
        expected: 'true',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
  // Your code here
}`,
      python: `class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        // Your code here
        return false;
    }
}`,
    },
    solution: {
      javascript: `function containsDuplicate(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}`,
      python: `class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        return len(nums) != len(set(nums))`,
      cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int num : nums) {
            if (seen.count(num)) return true;
            seen.insert(num);
        }
        return false;
    }
};`,
      java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        HashSet<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (seen.contains(num)) return true;
            seen.add(num);
        }
        return false;
    }
}`,
    },
    explanation: 'Iterate through the array and store each element in a Hash Set. If the current number already exists in the set, we found a duplicate and return true. If the loop completes without finding duplicates, return false.',
    timeComplexity: 'O(N) — Single pass over array with O(1) set operations.',
    spaceComplexity: 'O(N) — Storing up to N elements in the hash set.',
    hint: 'Use a Hash Set to track seen elements. If seen.has(x) is true, return true.',
  },

  {
    id: 'best-time-to-buy-and-sell-stock',
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    topic: 'Arrays',
    acceptance: '54%',
    evalFnName: 'maxProfit',
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.',
      },
      {
        input: 'prices = [7,6,4,3,1]',
        output: '0',
        explanation: 'In this case, no transactions are done and the max profit = 0.',
      },
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4',
    ],
    testCases: [
      {
        id: 1,
        name: 'Case 1',
        input: 'prices = [7, 1, 5, 3, 6, 4]',
        args: [[7, 1, 5, 3, 6, 4]],
        expected: '5',
      },
      {
        id: 2,
        name: 'Case 2',
        input: 'prices = [7, 6, 4, 3, 1]',
        args: [[7, 6, 4, 3, 1]],
        expected: '0',
      },
      {
        id: 3,
        name: 'Case 3',
        input: 'prices = [2, 4, 1]',
        args: [[2, 4, 1]],
        expected: '2',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
  // Your code here
}`,
      python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }
  return maxProfit;
}`,
      python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            if price < min_price:
                min_price = price
            elif price - min_price > max_profit:
                max_profit = price - min_price
        return max_profit`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX, maxProfit = 0;
        for (int p : prices) {
            minPrice = min(minPrice, p);
            maxProfit = max(maxProfit, p - minPrice);
        }
        return maxProfit;
    }
};`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int p : prices) {
            if (p < minPrice) minPrice = p;
            else if (p - minPrice > maxProfit) maxProfit = p - minPrice;
        }
        return maxProfit;
    }
}`,
    },
    explanation: 'Track the minimum price observed so far. At each day, calculate the potential profit if we sold at today\'s price. Update maxProfit whenever today\'s profit exceeds the previous best.',
    timeComplexity: 'O(N) — Single pass over prices array.',
    spaceComplexity: 'O(1) — Constant memory using minPrice and maxProfit variables.',
    hint: 'Track minimum purchase price seen so far and compare current profit at each day.',
  },

  // ======================== 50 NEW DSA PROBLEMS ========================

  {
    id: 'check-even-or-odd',
    slug: 'check-even-or-odd',
    title: 'Check Whether a Number is Even or Odd',
    difficulty: 'Easy',
    topic: 'Basics',
    acceptance: '95%',
    evalFnName: 'checkEvenOrOdd',
    description: 'Given an integer n, determine whether it is even or odd. Return the string "Even" if the number is divisible by 2, otherwise return "Odd".',
    examples: [
      { input: 'n = 8', output: '"Even"', explanation: '8 is divisible by 2, so it is even.' },
      { input: 'n = 7', output: '"Odd"', explanation: '7 is not divisible by 2, so it is odd.' },
    ],
    constraints: [
      'Input is an integer',
      '-1000000000 <= n <= 1000000000',
    ],
    testCases: [
      { id: 1, name: 'Case 1', input: 'n = 8', args: [8], expected: '"Even"' },
      { id: 2, name: 'Case 2', input: 'n = 7', args: [7], expected: '"Odd"' },
      { id: 3, name: 'Case 3', input: 'n = 0', args: [0], expected: '"Even"' },
      { id: 4, name: 'Case 4', input: 'n = -5', args: [-5], expected: '"Odd"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {string}
 */
function checkEvenOrOdd(n) {
  // Your code here
}`,
      python: `class Solution:
    def checkEvenOrOdd(self, n: int) -> str:
        # Your code here
        pass`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    string checkEvenOrOdd(int n) {
        // Your code here
    }
};`,
      java: `class Solution {
    public String checkEvenOrOdd(int n) {
        // Your code here
        return "";
    }
}`,
    },
    solution: {
      javascript: `function checkEvenOrOdd(n) {
  return n % 2 === 0 ? "Even" : "Odd";
}`,
      python: `class Solution:
    def checkEvenOrOdd(self, n: int) -> str:
        return "Even" if n % 2 == 0 else "Odd"`,
      cpp: `class Solution {
public:
    string checkEvenOrOdd(int n) {
        return n % 2 == 0 ? "Even" : "Odd";
    }
};`,
      java: `class Solution {
    public String checkEvenOrOdd(int n) {
        return n % 2 == 0 ? "Even" : "Odd";
    }
}`,
    },
    explanation: 'Use the modulo operator (%) to check divisibility by 2. If n % 2 equals 0 the number is even, otherwise it is odd.',
    timeComplexity: 'O(1) — Single arithmetic operation.',
    spaceComplexity: 'O(1) — No extra space used.',
    hint: 'Use the modulo operator (%) to check if a number is divisible by 2.',
  },

  {
    id: 'largest-of-three-numbers',
    slug: 'largest-of-three-numbers',
    title: 'Find the Largest of Three Numbers',
    difficulty: 'Easy',
    topic: 'Basics',
    acceptance: '92%',
    evalFnName: 'findLargestOfThree',
    description: 'Given three integers a, b, and c, find and return the largest number among them.',
    examples: [
      { input: 'a = 10, b = 25, c = 15', output: '25', explanation: '25 is the largest of 10, 25, 15.' },
      { input: 'a = 50, b = 20, c = 30', output: '50', explanation: '50 is the largest of 50, 20, 30.' },
    ],
    constraints: [
      'Three integers are given.',
      'Values can be positive, negative, or zero.',
    ],
    testCases: [
      { id: 1, name: 'Case 1', input: 'a = 10, b = 25, c = 15', args: [10, 25, 15], expected: '25' },
      { id: 2, name: 'Case 2', input: 'a = 50, b = 20, c = 30', args: [50, 20, 30], expected: '50' },
      { id: 3, name: 'Case 3', input: 'a = 5, b = 5, c = 3', args: [5, 5, 3], expected: '5' },
      { id: 4, name: 'Case 4', input: 'a = -10, b = -5, c = -20', args: [-10, -5, -20], expected: '-5' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
function findLargestOfThree(a, b, c) {
  // Your code here
}`,
      python: `class Solution:
    def findLargestOfThree(self, a: int, b: int, c: int) -> int:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    int findLargestOfThree(int a, int b, int c) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int findLargestOfThree(int a, int b, int c) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function findLargestOfThree(a, b, c) {
  return Math.max(a, b, c);
}`,
      python: `class Solution:
    def findLargestOfThree(self, a: int, b: int, c: int) -> int:
        return max(a, b, c)`,
      cpp: `class Solution {
public:
    int findLargestOfThree(int a, int b, int c) {
        return max({a, b, c});
    }
};`,
      java: `class Solution {
    public int findLargestOfThree(int a, int b, int c) {
        return Math.max(a, Math.max(b, c));
    }
}`,
    },
    explanation: 'Use the built-in Math.max function to compare all three values at once and return the largest.',
    timeComplexity: 'O(1) — Constant time comparison.',
    spaceComplexity: 'O(1) — No extra space used.',
    hint: 'Use Math.max() or nested conditional comparisons.',
  },

  {
    id: 'sum-first-n-natural-numbers',
    slug: 'sum-first-n-natural-numbers',
    title: 'Find Sum of First N Natural Numbers',
    difficulty: 'Easy',
    topic: 'Loops',
    acceptance: '94%',
    evalFnName: 'sumNaturalNumbers',
    description: 'Given a positive integer N, calculate the sum of the first N natural numbers (1 + 2 + 3 + ... + N).',
    examples: [
      { input: 'N = 5', output: '15', explanation: '1 + 2 + 3 + 4 + 5 = 15.' },
      { input: 'N = 10', output: '55', explanation: '1 + 2 + ... + 10 = 55.' },
    ],
    constraints: ['1 <= N <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'N = 5', args: [5], expected: '15' },
      { id: 2, name: 'Case 2', input: 'N = 10', args: [10], expected: '55' },
      { id: 3, name: 'Case 3', input: 'N = 1', args: [1], expected: '1' },
      { id: 4, name: 'Case 4', input: 'N = 100', args: [100], expected: '5050' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function sumNaturalNumbers(n) {
  // Your code here
}`,
      python: `class Solution:
    def sumNaturalNumbers(self, n: int) -> int:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    int sumNaturalNumbers(int n) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int sumNaturalNumbers(int n) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function sumNaturalNumbers(n) {
  return (n * (n + 1)) / 2;
}`,
      python: `class Solution:
    def sumNaturalNumbers(self, n: int) -> int:
        return n * (n + 1) // 2`,
      cpp: `class Solution {
public:
    int sumNaturalNumbers(int n) {
        return n * (n + 1) / 2;
    }
};`,
      java: `class Solution {
    public int sumNaturalNumbers(int n) {
        return n * (n + 1) / 2;
    }
}`,
    },
    explanation: 'Use the mathematical formula N*(N+1)/2 instead of looping through all numbers. This gives constant time performance.',
    timeComplexity: 'O(1) — Direct formula calculation.',
    spaceComplexity: 'O(1) — No extra space used.',
    hint: 'There is a well-known formula: N * (N + 1) / 2.',
  },

  {
    id: 'count-digits',
    slug: 'count-digits',
    title: 'Count Digits in a Number',
    difficulty: 'Easy',
    topic: 'Numbers',
    acceptance: '91%',
    evalFnName: 'countDigits',
    description: 'Count the number of digits present in a given integer. For negative numbers, count only the digits (ignore the sign).',
    examples: [
      { input: 'n = 12345', output: '5', explanation: '12345 has 5 digits.' },
      { input: 'n = 908', output: '3', explanation: '908 has 3 digits.' },
    ],
    constraints: ['-1000000000 <= N <= 1000000000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'n = 12345', args: [12345], expected: '5' },
      { id: 2, name: 'Case 2', input: 'n = 908', args: [908], expected: '3' },
      { id: 3, name: 'Case 3', input: 'n = 7', args: [7], expected: '1' },
      { id: 4, name: 'Case 4', input: 'n = 100000', args: [100000], expected: '6' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function countDigits(n) {
  // Your code here
}`,
      python: `class Solution:
    def countDigits(self, n: int) -> int:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    int countDigits(int n) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int countDigits(int n) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function countDigits(n) {
  return Math.abs(n).toString().length;
}`,
      python: `class Solution:
    def countDigits(self, n: int) -> int:
        return len(str(abs(n)))`,
      cpp: `class Solution {
public:
    int countDigits(int n) {
        return to_string(abs(n)).length();
    }
};`,
      java: `class Solution {
    public int countDigits(int n) {
        return String.valueOf(Math.abs(n)).length();
    }
}`,
    },
    explanation: 'Convert the absolute value of the number to a string and return its length. Alternatively, repeatedly divide by 10 and count iterations.',
    timeComplexity: 'O(D) — Where D is the number of digits.',
    spaceComplexity: 'O(D) — String conversion uses space proportional to digits.',
    hint: 'Convert to string, or keep dividing by 10 until the number becomes 0.',
  },

  {
    id: 'reverse-number',
    slug: 'reverse-number',
    title: 'Reverse a Number',
    difficulty: 'Easy',
    topic: 'Numbers',
    acceptance: '90%',
    evalFnName: 'reverseNumber',
    description: 'Reverse the digits of a given non-negative integer. Leading zeros in the reversed number should be removed.',
    examples: [
      { input: 'n = 1234', output: '4321', explanation: 'Reversing 1234 gives 4321.' },
      { input: 'n = 100', output: '1', explanation: 'Reversing 100 gives 001 which is 1.' },
    ],
    constraints: ['Input is a non-negative integer.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'n = 1234', args: [1234], expected: '4321' },
      { id: 2, name: 'Case 2', input: 'n = 100', args: [100], expected: '1' },
      { id: 3, name: 'Case 3', input: 'n = 98765', args: [98765], expected: '56789' },
      { id: 4, name: 'Case 4', input: 'n = 1', args: [1], expected: '1' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function reverseNumber(n) {
  // Your code here
}`,
      python: `class Solution:
    def reverseNumber(self, n: int) -> int:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    int reverseNumber(int n) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int reverseNumber(int n) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function reverseNumber(n) {
  let reversed = 0;
  while (n > 0) {
    reversed = reversed * 10 + (n % 10);
    n = Math.floor(n / 10);
  }
  return reversed;
}`,
      python: `class Solution:
    def reverseNumber(self, n: int) -> int:
        reversed_num = 0
        while n > 0:
            reversed_num = reversed_num * 10 + n % 10
            n //= 10
        return reversed_num`,
      cpp: `class Solution {
public:
    int reverseNumber(int n) {
        int reversed = 0;
        while (n > 0) {
            reversed = reversed * 10 + n % 10;
            n /= 10;
        }
        return reversed;
    }
};`,
      java: `class Solution {
    public int reverseNumber(int n) {
        int reversed = 0;
        while (n > 0) {
            reversed = reversed * 10 + n % 10;
            n /= 10;
        }
        return reversed;
    }
}`,
    },
    explanation: 'Extract the last digit using modulo 10, append it to the reversed number by multiplying by 10 and adding, then remove the last digit by integer division by 10.',
    timeComplexity: 'O(D) — Where D is the number of digits.',
    spaceComplexity: 'O(1) — Only a single variable for the result.',
    hint: 'Extract digits from the end using % 10, and build the reversed number using * 10.',
  },

  {
    id: 'number-palindrome',
    slug: 'number-palindrome',
    title: 'Check Whether a Number is a Palindrome',
    difficulty: 'Easy',
    topic: 'Numbers',
    acceptance: '89%',
    evalFnName: 'isNumberPalindrome',
    description: 'Determine whether a non-negative integer reads the same forward and backward. Return "Palindrome" or "Not Palindrome".',
    examples: [
      { input: 'n = 121', output: '"Palindrome"', explanation: '121 reversed is 121.' },
      { input: 'n = 123', output: '"Not Palindrome"', explanation: '123 reversed is 321.' },
    ],
    constraints: ['0 <= N <= 1000000000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'n = 121', args: [121], expected: '"Palindrome"' },
      { id: 2, name: 'Case 2', input: 'n = 123', args: [123], expected: '"Not Palindrome"' },
      { id: 3, name: 'Case 3', input: 'n = 1221', args: [1221], expected: '"Palindrome"' },
      { id: 4, name: 'Case 4', input: 'n = 10', args: [10], expected: '"Not Palindrome"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {string}
 */
function isNumberPalindrome(n) {
  // Your code here
}`,
      python: `class Solution:
    def isNumberPalindrome(self, n: int) -> str:
        # Your code here
        pass`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    string isNumberPalindrome(int n) {
        // Your code here
    }
};`,
      java: `class Solution {
    public String isNumberPalindrome(int n) {
        // Your code here
        return "";
    }
}`,
    },
    solution: {
      javascript: `function isNumberPalindrome(n) {
  const str = n.toString();
  return str === str.split('').reverse().join('') ? "Palindrome" : "Not Palindrome";
}`,
      python: `class Solution:
    def isNumberPalindrome(self, n: int) -> str:
        s = str(n)
        return "Palindrome" if s == s[::-1] else "Not Palindrome"`,
      cpp: `class Solution {
public:
    string isNumberPalindrome(int n) {
        string s = to_string(n);
        string rev = string(s.rbegin(), s.rend());
        return s == rev ? "Palindrome" : "Not Palindrome";
    }
};`,
      java: `class Solution {
    public String isNumberPalindrome(int n) {
        String s = String.valueOf(n);
        String rev = new StringBuilder(s).reverse().toString();
        return s.equals(rev) ? "Palindrome" : "Not Palindrome";
    }
}`,
    },
    explanation: 'Convert the number to a string, reverse it, and compare with the original. If they match, it is a palindrome.',
    timeComplexity: 'O(D) — Where D is the number of digits.',
    spaceComplexity: 'O(D) — For storing the string representation.',
    hint: 'Reverse the number (or its string form) and compare it to the original.',
  },

  {
    id: 'check-prime-number',
    slug: 'check-prime-number',
    title: 'Check Whether a Number is Prime',
    difficulty: 'Easy',
    topic: 'Numbers',
    acceptance: '87%',
    evalFnName: 'isPrime',
    description: 'Determine whether the given integer is a prime number. Return "Prime" or "Not Prime". A prime number is greater than 1 and has no divisors other than 1 and itself.',
    examples: [
      { input: 'n = 7', output: '"Prime"', explanation: '7 has no divisors other than 1 and 7.' },
      { input: 'n = 10', output: '"Not Prime"', explanation: '10 is divisible by 2 and 5.' },
    ],
    constraints: ['1 <= N <= 1000000000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'n = 7', args: [7], expected: '"Prime"' },
      { id: 2, name: 'Case 2', input: 'n = 10', args: [10], expected: '"Not Prime"' },
      { id: 3, name: 'Case 3', input: 'n = 2', args: [2], expected: '"Prime"' },
      { id: 4, name: 'Case 4', input: 'n = 1', args: [1], expected: '"Not Prime"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {string}
 */
function isPrime(n) {
  // Your code here
}`,
      python: `class Solution:
    def isPrime(self, n: int) -> str:
        # Your code here
        pass`,
      cpp: `#include <string>
#include <cmath>
using namespace std;

class Solution {
public:
    string isPrime(int n) {
        // Your code here
    }
};`,
      java: `class Solution {
    public String isPrime(int n) {
        // Your code here
        return "";
    }
}`,
    },
    solution: {
      javascript: `function isPrime(n) {
  if (n <= 1) return "Not Prime";
  if (n <= 3) return "Prime";
  if (n % 2 === 0 || n % 3 === 0) return "Not Prime";
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return "Not Prime";
  }
  return "Prime";
}`,
      python: `class Solution:
    def isPrime(self, n: int) -> str:
        if n <= 1: return "Not Prime"
        if n <= 3: return "Prime"
        if n % 2 == 0 or n % 3 == 0: return "Not Prime"
        i = 5
        while i * i <= n:
            if n % i == 0 or n % (i + 2) == 0: return "Not Prime"
            i += 6
        return "Prime"`,
      cpp: `class Solution {
public:
    string isPrime(int n) {
        if (n <= 1) return "Not Prime";
        if (n <= 3) return "Prime";
        if (n % 2 == 0 || n % 3 == 0) return "Not Prime";
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) return "Not Prime";
        }
        return "Prime";
    }
};`,
      java: `class Solution {
    public String isPrime(int n) {
        if (n <= 1) return "Not Prime";
        if (n <= 3) return "Prime";
        if (n % 2 == 0 || n % 3 == 0) return "Not Prime";
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) return "Not Prime";
        }
        return "Prime";
    }
}`,
    },
    explanation: 'Check divisibility only up to √N. Skip even numbers and multiples of 3 by iterating with step 6 (checking i and i+2). This is the optimized trial division method.',
    timeComplexity: 'O(√N) — Only check divisors up to the square root.',
    spaceComplexity: 'O(1) — No extra space used.',
    hint: 'You only need to check divisibility up to √N.',
  },

  {
    id: 'fibonacci-series',
    slug: 'fibonacci-series',
    title: 'Generate Fibonacci Series',
    difficulty: 'Easy',
    topic: 'Numbers',
    acceptance: '88%',
    evalFnName: 'generateFibonacci',
    description: 'Generate the first N terms of the Fibonacci sequence. The sequence starts with 0, 1, and each subsequent number is the sum of the two preceding ones.',
    examples: [
      { input: 'N = 5', output: '[0, 1, 1, 2, 3]', explanation: 'First 5 Fibonacci numbers.' },
      { input: 'N = 7', output: '[0, 1, 1, 2, 3, 5, 8]', explanation: 'First 7 Fibonacci numbers.' },
    ],
    constraints: ['1 <= N <= 50'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'N = 5', args: [5], expected: '[0, 1, 1, 2, 3]' },
      { id: 2, name: 'Case 2', input: 'N = 7', args: [7], expected: '[0, 1, 1, 2, 3, 5, 8]' },
      { id: 3, name: 'Case 3', input: 'N = 1', args: [1], expected: '[0]' },
      { id: 4, name: 'Case 4', input: 'N = 2', args: [2], expected: '[0, 1]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number[]}
 */
function generateFibonacci(n) {
  // Your code here
}`,
      python: `class Solution:
    def generateFibonacci(self, n: int) -> list[int]:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> generateFibonacci(int n) {
        // Your code here
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<Integer> generateFibonacci(int n) {
        // Your code here
        return new ArrayList<>();
    }
}`,
    },
    solution: {
      javascript: `function generateFibonacci(n) {
  if (n === 1) return [0];
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
}`,
      python: `class Solution:
    def generateFibonacci(self, n: int) -> list[int]:
        if n == 1: return [0]
        fib = [0, 1]
        for i in range(2, n):
            fib.append(fib[-1] + fib[-2])
        return fib`,
      cpp: `class Solution {
public:
    vector<int> generateFibonacci(int n) {
        if (n == 1) return {0};
        vector<int> fib = {0, 1};
        for (int i = 2; i < n; i++) {
            fib.push_back(fib[i-1] + fib[i-2]);
        }
        return fib;
    }
};`,
      java: `class Solution {
    public List<Integer> generateFibonacci(int n) {
        List<Integer> fib = new ArrayList<>();
        fib.add(0);
        if (n == 1) return fib;
        fib.add(1);
        for (int i = 2; i < n; i++) {
            fib.add(fib.get(i-1) + fib.get(i-2));
        }
        return fib;
    }
}`,
    },
    explanation: 'Start with [0, 1], then iteratively compute each next term as the sum of the previous two terms until we have N elements.',
    timeComplexity: 'O(N) — Single loop through N elements.',
    spaceComplexity: 'O(N) — Array to store the sequence.',
    hint: 'Each Fibonacci number is the sum of the previous two: F(n) = F(n-1) + F(n-2).',
  },

  {
    id: 'factorial',
    slug: 'factorial',
    title: 'Find Factorial of a Number',
    difficulty: 'Easy',
    topic: 'Numbers',
    acceptance: '93%',
    evalFnName: 'factorial',
    description: 'Calculate the factorial of a non-negative integer N. Factorial of N (N!) is the product of all positive integers less than or equal to N. By convention, 0! = 1.',
    examples: [
      { input: 'N = 5', output: '120', explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120.' },
      { input: 'N = 0', output: '1', explanation: '0! = 1 by definition.' },
    ],
    constraints: ['0 <= N <= 20'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'N = 5', args: [5], expected: '120' },
      { id: 2, name: 'Case 2', input: 'N = 0', args: [0], expected: '1' },
      { id: 3, name: 'Case 3', input: 'N = 6', args: [6], expected: '720' },
      { id: 4, name: 'Case 4', input: 'N = 10', args: [10], expected: '3628800' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function factorial(n) {
  // Your code here
}`,
      python: `class Solution:
    def factorial(self, n: int) -> int:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    long long factorial(int n) {
        // Your code here
    }
};`,
      java: `class Solution {
    public long factorial(int n) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}`,
      python: `class Solution:
    def factorial(self, n: int) -> int:
        result = 1
        for i in range(2, n + 1):
            result *= i
        return result`,
      cpp: `class Solution {
public:
    long long factorial(int n) {
        long long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
};`,
      java: `class Solution {
    public long factorial(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}`,
    },
    explanation: 'Multiply all integers from 2 to N. Start with result = 1 (handles N=0 case) and iterate upward.',
    timeComplexity: 'O(N) — Single loop from 2 to N.',
    spaceComplexity: 'O(1) — Only one accumulator variable.',
    hint: 'Multiply from 1 to N iteratively, or use recursion: N! = N × (N-1)!.',
  },

  {
    id: 'gcd-two-numbers',
    slug: 'gcd-two-numbers',
    title: 'Find GCD of Two Numbers',
    difficulty: 'Easy',
    topic: 'Numbers',
    acceptance: '86%',
    evalFnName: 'findGCD',
    description: 'Find the greatest common divisor (GCD) of two positive integers using the Euclidean algorithm.',
    examples: [
      { input: 'a = 12, b = 18', output: '6', explanation: 'GCD(12, 18) = 6.' },
      { input: 'a = 20, b = 30', output: '10', explanation: 'GCD(20, 30) = 10.' },
    ],
    constraints: ['1 <= A, B <= 1000000000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'a = 12, b = 18', args: [12, 18], expected: '6' },
      { id: 2, name: 'Case 2', input: 'a = 20, b = 30', args: [20, 30], expected: '10' },
      { id: 3, name: 'Case 3', input: 'a = 7, b = 13', args: [7, 13], expected: '1' },
      { id: 4, name: 'Case 4', input: 'a = 100, b = 25', args: [100, 25], expected: '25' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function findGCD(a, b) {
  // Your code here
}`,
      python: `class Solution:
    def findGCD(self, a: int, b: int) -> int:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    int findGCD(int a, int b) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int findGCD(int a, int b) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function findGCD(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}`,
      python: `class Solution:
    def findGCD(self, a: int, b: int) -> int:
        while b:
            a, b = b, a % b
        return a`,
      cpp: `class Solution {
public:
    int findGCD(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
};`,
      java: `class Solution {
    public int findGCD(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}`,
    },
    explanation: 'The Euclidean algorithm repeatedly replaces the larger number with the remainder of dividing both numbers. When the remainder becomes 0, the other number is the GCD.',
    timeComplexity: 'O(log(min(A, B))) — The Euclidean algorithm converges logarithmically.',
    spaceComplexity: 'O(1) — Only a few variables.',
    hint: 'Use the Euclidean algorithm: GCD(a, b) = GCD(b, a % b).',
  },

  {
    id: 'lcm-two-numbers',
    slug: 'lcm-two-numbers',
    title: 'Find LCM of Two Numbers',
    difficulty: 'Easy',
    topic: 'Numbers',
    acceptance: '84%',
    evalFnName: 'findLCM',
    description: 'Find the least common multiple (LCM) of two positive integers.',
    examples: [
      { input: 'a = 4, b = 6', output: '12', explanation: 'LCM(4, 6) = 12.' },
      { input: 'a = 5, b = 10', output: '10', explanation: 'LCM(5, 10) = 10.' },
    ],
    constraints: ['1 <= A, B <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'a = 4, b = 6', args: [4, 6], expected: '12' },
      { id: 2, name: 'Case 2', input: 'a = 5, b = 10', args: [5, 10], expected: '10' },
      { id: 3, name: 'Case 3', input: 'a = 7, b = 3', args: [7, 3], expected: '21' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function findLCM(a, b) {
  // Your code here
}`,
      python: `class Solution:
    def findLCM(self, a: int, b: int) -> int:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    int findLCM(int a, int b) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int findLCM(int a, int b) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function findLCM(a, b) {
  function gcd(x, y) {
    while (y !== 0) { [x, y] = [y, x % y]; }
    return x;
  }
  return (a * b) / gcd(a, b);
}`,
      python: `class Solution:
    def findLCM(self, a: int, b: int) -> int:
        from math import gcd
        return a * b // gcd(a, b)`,
      cpp: `class Solution {
public:
    int findLCM(int a, int b) {
        return a / __gcd(a, b) * b;
    }
};`,
      java: `class Solution {
    public int findLCM(int a, int b) {
        return a / gcd(a, b) * b;
    }
    private int gcd(int a, int b) {
        while (b != 0) { int t = b; b = a % b; a = t; }
        return a;
    }
}`,
    },
    explanation: 'LCM can be computed using the relationship: LCM(a, b) = (a × b) / GCD(a, b). First find GCD using the Euclidean algorithm.',
    timeComplexity: 'O(log(min(A, B))) — Dominated by GCD computation.',
    spaceComplexity: 'O(1) — Constant space.',
    hint: 'LCM(a, b) = (a × b) / GCD(a, b). Find GCD first.',
  },

  {
    id: 'armstrong-number',
    slug: 'armstrong-number',
    title: 'Check Armstrong Number',
    difficulty: 'Easy',
    topic: 'Numbers',
    acceptance: '78%',
    evalFnName: 'isArmstrong',
    description: 'Check whether a number is an Armstrong number. An Armstrong number of D digits is one where the sum of each digit raised to the power D equals the number itself.',
    examples: [
      { input: 'n = 153', output: '"Armstrong"', explanation: '1³ + 5³ + 3³ = 1 + 125 + 27 = 153.' },
      { input: 'n = 123', output: '"Not Armstrong"', explanation: '1³ + 2³ + 3³ = 1 + 8 + 27 = 36 ≠ 123.' },
    ],
    constraints: ['0 <= N <= 1000000000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'n = 153', args: [153], expected: '"Armstrong"' },
      { id: 2, name: 'Case 2', input: 'n = 123', args: [123], expected: '"Not Armstrong"' },
      { id: 3, name: 'Case 3', input: 'n = 370', args: [370], expected: '"Armstrong"' },
      { id: 4, name: 'Case 4', input: 'n = 9474', args: [9474], expected: '"Armstrong"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {string}
 */
function isArmstrong(n) {
  // Your code here
}`,
      python: `class Solution:
    def isArmstrong(self, n: int) -> str:
        # Your code here
        pass`,
      cpp: `#include <string>
#include <cmath>
using namespace std;

class Solution {
public:
    string isArmstrong(int n) {
        // Your code here
    }
};`,
      java: `class Solution {
    public String isArmstrong(int n) {
        // Your code here
        return "";
    }
}`,
    },
    solution: {
      javascript: `function isArmstrong(n) {
  const digits = n.toString().split('');
  const power = digits.length;
  const sum = digits.reduce((acc, d) => acc + Math.pow(Number(d), power), 0);
  return sum === n ? "Armstrong" : "Not Armstrong";
}`,
      python: `class Solution:
    def isArmstrong(self, n: int) -> str:
        digits = str(n)
        power = len(digits)
        total = sum(int(d) ** power for d in digits)
        return "Armstrong" if total == n else "Not Armstrong"`,
      cpp: `class Solution {
public:
    string isArmstrong(int n) {
        string s = to_string(n);
        int power = s.length();
        long long sum = 0;
        for (char c : s) sum += pow(c - '0', power);
        return sum == n ? "Armstrong" : "Not Armstrong";
    }
};`,
      java: `class Solution {
    public String isArmstrong(int n) {
        String s = String.valueOf(n);
        int power = s.length();
        long sum = 0;
        for (char c : s.toCharArray()) sum += Math.pow(c - '0', power);
        return sum == n ? "Armstrong" : "Not Armstrong";
    }
}`,
    },
    explanation: 'Count the number of digits D. Then sum each digit raised to the power D. If the sum equals the original number, it is an Armstrong number.',
    timeComplexity: 'O(D) — Where D is the number of digits.',
    spaceComplexity: 'O(D) — For the string/digit array.',
    hint: 'Count digits first (D), then check if sum of (each digit ^ D) equals the number.',
  },

  {
    id: 'sum-of-digits',
    slug: 'sum-of-digits',
    title: 'Find Sum of Digits',
    difficulty: 'Easy',
    topic: 'Numbers',
    acceptance: '94%',
    evalFnName: 'sumOfDigits',
    description: 'Calculate the sum of all digits of a non-negative integer.',
    examples: [
      { input: 'n = 1234', output: '10', explanation: '1 + 2 + 3 + 4 = 10.' },
      { input: 'n = 908', output: '17', explanation: '9 + 0 + 8 = 17.' },
    ],
    constraints: ['0 <= N <= 1000000000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'n = 1234', args: [1234], expected: '10' },
      { id: 2, name: 'Case 2', input: 'n = 908', args: [908], expected: '17' },
      { id: 3, name: 'Case 3', input: 'n = 55', args: [55], expected: '10' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function sumOfDigits(n) {
  // Your code here
}`,
      python: `class Solution:
    def sumOfDigits(self, n: int) -> int:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    int sumOfDigits(int n) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int sumOfDigits(int n) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function sumOfDigits(n) {
  let sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}`,
      python: `class Solution:
    def sumOfDigits(self, n: int) -> int:
        return sum(int(d) for d in str(n))`,
      cpp: `class Solution {
public:
    int sumOfDigits(int n) {
        int sum = 0;
        while (n > 0) { sum += n % 10; n /= 10; }
        return sum;
    }
};`,
      java: `class Solution {
    public int sumOfDigits(int n) {
        int sum = 0;
        while (n > 0) { sum += n % 10; n /= 10; }
        return sum;
    }
}`,
    },
    explanation: 'Extract the last digit using modulo 10, add it to the sum, then remove the last digit by integer division. Repeat until the number is 0.',
    timeComplexity: 'O(D) — Where D is the number of digits.',
    spaceComplexity: 'O(1) — Only an accumulator variable.',
    hint: 'Use % 10 to extract the last digit and / 10 to remove it.',
  },

  {
    id: 'array-sum',
    slug: 'array-sum',
    title: 'Find Sum of Array Elements',
    difficulty: 'Easy',
    topic: 'Array',
    acceptance: '96%',
    evalFnName: 'arraySum',
    description: 'Given an array of integers, return the sum of all elements.',
    examples: [
      { input: 'nums = [1, 2, 3, 4, 5]', output: '15', explanation: '1 + 2 + 3 + 4 + 5 = 15.' },
      { input: 'nums = [10, 20, 30, 40]', output: '100', explanation: '10 + 20 + 30 + 40 = 100.' },
    ],
    constraints: ['1 <= N <= 100000', '-100000 <= A[i] <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [1, 2, 3, 4, 5]', args: [[1, 2, 3, 4, 5]], expected: '15' },
      { id: 2, name: 'Case 2', input: 'nums = [10, 20, 30, 40]', args: [[10, 20, 30, 40]], expected: '100' },
      { id: 3, name: 'Case 3', input: 'nums = [-1, -2, -3]', args: [[-1, -2, -3]], expected: '-6' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function arraySum(nums) {
  // Your code here
}`,
      python: `class Solution:
    def arraySum(self, nums: list[int]) -> int:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int arraySum(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int arraySum(int[] nums) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function arraySum(nums) {
  return nums.reduce((sum, n) => sum + n, 0);
}`,
      python: `class Solution:
    def arraySum(self, nums: list[int]) -> int:
        return sum(nums)`,
      cpp: `class Solution {
public:
    int arraySum(vector<int>& nums) {
        int sum = 0;
        for (int n : nums) sum += n;
        return sum;
    }
};`,
      java: `class Solution {
    public int arraySum(int[] nums) {
        int sum = 0;
        for (int n : nums) sum += n;
        return sum;
    }
}`,
    },
    explanation: 'Iterate through the array and accumulate the sum of all elements using a single pass.',
    timeComplexity: 'O(N) — Single pass through the array.',
    spaceComplexity: 'O(1) — Only an accumulator variable.',
    hint: 'Use reduce() or a simple for loop to sum all elements.',
  },

  {
    id: 'largest-array-element',
    slug: 'largest-array-element',
    title: 'Find Largest Element in an Array',
    difficulty: 'Easy',
    topic: 'Array',
    acceptance: '97%',
    evalFnName: 'findLargestElement',
    description: 'Given an array of integers, find and return the largest element.',
    examples: [
      { input: 'nums = [10, 25, 7, 40, 15]', output: '40', explanation: '40 is the largest element.' },
    ],
    constraints: ['1 <= N <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [10, 25, 7, 40, 15]', args: [[10, 25, 7, 40, 15]], expected: '40' },
      { id: 2, name: 'Case 2', input: 'nums = [5, 2, 9, 1]', args: [[5, 2, 9, 1]], expected: '9' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findLargestElement(nums) {
  // Your code here
}`,
      python: `class Solution:
    def findLargestElement(self, nums: list[int]) -> int:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int findLargestElement(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int findLargestElement(int[] nums) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function findLargestElement(nums) {
  return Math.max(...nums);
}`,
      python: `class Solution:
    def findLargestElement(self, nums: list[int]) -> int:
        return max(nums)`,
      cpp: `class Solution {
public:
    int findLargestElement(vector<int>& nums) {
        return *max_element(nums.begin(), nums.end());
    }
};`,
      java: `class Solution {
    public int findLargestElement(int[] nums) {
        int max = nums[0];
        for (int n : nums) if (n > max) max = n;
        return max;
    }
}`,
    },
    explanation: 'Track the maximum element seen so far by iterating through the entire array.',
    timeComplexity: 'O(N) — Single pass through the array.',
    spaceComplexity: 'O(1) — Only a max variable.',
    hint: 'Initialize max with the first element and compare each subsequent element.',
  },

  {
    id: 'smallest-array-element',
    slug: 'smallest-array-element',
    title: 'Find Smallest Element in an Array',
    difficulty: 'Easy',
    topic: 'Array',
    acceptance: '97%',
    evalFnName: 'findSmallestElement',
    description: 'Given an array of integers, find and return the smallest element.',
    examples: [
      { input: 'nums = [10, 25, 7, 40, 15]', output: '7', explanation: '7 is the smallest element.' },
    ],
    constraints: ['1 <= N <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [10, 25, 7, 40, 15]', args: [[10, 25, 7, 40, 15]], expected: '7' },
      { id: 2, name: 'Case 2', input: 'nums = [5, 2, 9, 1]', args: [[5, 2, 9, 1]], expected: '1' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findSmallestElement(nums) {
  // Your code here
}`,
      python: `class Solution:
    def findSmallestElement(self, nums: list[int]) -> int:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int findSmallestElement(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int findSmallestElement(int[] nums) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function findSmallestElement(nums) {
  return Math.min(...nums);
}`,
      python: `class Solution:
    def findSmallestElement(self, nums: list[int]) -> int:
        return min(nums)`,
      cpp: `class Solution {
public:
    int findSmallestElement(vector<int>& nums) {
        return *min_element(nums.begin(), nums.end());
    }
};`,
      java: `class Solution {
    public int findSmallestElement(int[] nums) {
        int min = nums[0];
        for (int n : nums) if (n < min) min = n;
        return min;
    }
}`,
    },
    explanation: 'Iterate through the array and keep track of the minimum element encountered.',
    timeComplexity: 'O(N) — Single pass through the array.',
    spaceComplexity: 'O(1) — Only a min variable.',
    hint: 'Initialize min with the first element and compare each subsequent element.',
  },

  {
    id: 'second-largest-element',
    slug: 'second-largest-element',
    title: 'Find Second Largest Element',
    difficulty: 'Easy',
    topic: 'Array',
    acceptance: '82%',
    evalFnName: 'findSecondLargest',
    description: 'Given an array of integers with at least two distinct elements, find and return the second largest distinct element.',
    examples: [
      { input: 'nums = [10, 25, 7, 40, 15]', output: '25', explanation: '40 is the largest, 25 is second largest.' },
      { input: 'nums = [5, 2, 9, 1]', output: '5', explanation: '9 is the largest, 5 is second largest.' },
    ],
    constraints: ['2 <= N <= 100000', 'At least two distinct elements exist.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [10, 25, 7, 40, 15]', args: [[10, 25, 7, 40, 15]], expected: '25' },
      { id: 2, name: 'Case 2', input: 'nums = [5, 2, 9, 1]', args: [[5, 2, 9, 1]], expected: '5' },
      { id: 3, name: 'Case 3', input: 'nums = [10, 10, 8, 7, 6]', args: [[10, 10, 8, 7, 6]], expected: '8' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findSecondLargest(nums) {
  // Your code here
}`,
      python: `class Solution:
    def findSecondLargest(self, nums: list[int]) -> int:
        # Your code here
        pass`,
      cpp: `#include <vector>
#include <climits>
using namespace std;

class Solution {
public:
    int findSecondLargest(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int findSecondLargest(int[] nums) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function findSecondLargest(nums) {
  let first = -Infinity, second = -Infinity;
  for (const n of nums) {
    if (n > first) { second = first; first = n; }
    else if (n > second && n !== first) { second = n; }
  }
  return second;
}`,
      python: `class Solution:
    def findSecondLargest(self, nums: list[int]) -> int:
        first = second = float('-inf')
        for n in nums:
            if n > first:
                second, first = first, n
            elif n > second and n != first:
                second = n
        return second`,
      cpp: `class Solution {
public:
    int findSecondLargest(vector<int>& nums) {
        int first = INT_MIN, second = INT_MIN;
        for (int n : nums) {
            if (n > first) { second = first; first = n; }
            else if (n > second && n != first) { second = n; }
        }
        return second;
    }
};`,
      java: `class Solution {
    public int findSecondLargest(int[] nums) {
        int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
        for (int n : nums) {
            if (n > first) { second = first; first = n; }
            else if (n > second && n != first) { second = n; }
        }
        return second;
    }
}`,
    },
    explanation: 'Track the two largest distinct values in a single pass. When a new maximum is found, shift the old maximum to second place.',
    timeComplexity: 'O(N) — Single pass through the array.',
    spaceComplexity: 'O(1) — Only two variables.',
    hint: 'Maintain two variables: first and second largest. Update them as you traverse.',
  },

  {
    id: 'reverse-array',
    slug: 'reverse-array',
    title: 'Reverse an Array',
    difficulty: 'Easy',
    topic: 'Array',
    acceptance: '95%',
    evalFnName: 'reverseArray',
    description: 'Given an array of integers, reverse the elements and return the reversed array.',
    examples: [
      { input: 'nums = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]', explanation: 'Array reversed.' },
    ],
    constraints: ['1 <= N <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [1, 2, 3, 4, 5]', args: [[1, 2, 3, 4, 5]], expected: '[5, 4, 3, 2, 1]' },
      { id: 2, name: 'Case 2', input: 'nums = [10, 20, 30, 40]', args: [[10, 20, 30, 40]], expected: '[40, 30, 20, 10]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function reverseArray(nums) {
  // Your code here
}`,
      python: `class Solution:
    def reverseArray(self, nums: list[int]) -> list[int]:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> reverseArray(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int[] reverseArray(int[] nums) {
        // Your code here
        return new int[]{};
    }
}`,
    },
    solution: {
      javascript: `function reverseArray(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++; right--;
  }
  return nums;
}`,
      python: `class Solution:
    def reverseArray(self, nums: list[int]) -> list[int]:
        return nums[::-1]`,
      cpp: `class Solution {
public:
    vector<int> reverseArray(vector<int>& nums) {
        reverse(nums.begin(), nums.end());
        return nums;
    }
};`,
      java: `class Solution {
    public int[] reverseArray(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int temp = nums[left]; nums[left] = nums[right]; nums[right] = temp;
            left++; right--;
        }
        return nums;
    }
}`,
    },
    explanation: 'Use two pointers starting from both ends. Swap elements at left and right pointers, then move them inward until they meet.',
    timeComplexity: 'O(N) — Each element is visited once.',
    spaceComplexity: 'O(1) — In-place reversal.',
    hint: 'Use two pointers: one at the start and one at the end. Swap and move inward.',
  },

  {
    id: 'count-even-odd-elements',
    slug: 'count-even-odd-elements',
    title: 'Count Even and Odd Elements',
    difficulty: 'Easy',
    topic: 'Array',
    acceptance: '93%',
    evalFnName: 'countEvenOdd',
    description: 'Count the number of even and odd elements in an array. Return a string in the format "Even: X, Odd: Y".',
    examples: [
      { input: 'nums = [1, 2, 3, 4, 5, 6]', output: '"Even: 3, Odd: 3"', explanation: 'Even: 2,4,6; Odd: 1,3,5.' },
    ],
    constraints: ['1 <= N <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [1, 2, 3, 4, 5, 6]', args: [[1, 2, 3, 4, 5, 6]], expected: '"Even: 3, Odd: 3"' },
      { id: 2, name: 'Case 2', input: 'nums = [2, 4, 6, 8, 10]', args: [[2, 4, 6, 8, 10]], expected: '"Even: 5, Odd: 0"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {string}
 */
function countEvenOdd(nums) {
  // Your code here
}`,
      python: `class Solution:
    def countEvenOdd(self, nums: list[int]) -> str:
        # Your code here
        pass`,
      cpp: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    string countEvenOdd(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public String countEvenOdd(int[] nums) {
        // Your code here
        return "";
    }
}`,
    },
    solution: {
      javascript: `function countEvenOdd(nums) {
  let even = 0, odd = 0;
  for (const n of nums) {
    if (n % 2 === 0) even++;
    else odd++;
  }
  return "Even: " + even + ", Odd: " + odd;
}`,
      python: `class Solution:
    def countEvenOdd(self, nums: list[int]) -> str:
        even = sum(1 for n in nums if n % 2 == 0)
        odd = len(nums) - even
        return f"Even: {even}, Odd: {odd}"`,
      cpp: `class Solution {
public:
    string countEvenOdd(vector<int>& nums) {
        int even = 0, odd = 0;
        for (int n : nums) n % 2 == 0 ? even++ : odd++;
        return "Even: " + to_string(even) + ", Odd: " + to_string(odd);
    }
};`,
      java: `class Solution {
    public String countEvenOdd(int[] nums) {
        int even = 0, odd = 0;
        for (int n : nums) { if (n % 2 == 0) even++; else odd++; }
        return "Even: " + even + ", Odd: " + odd;
    }
}`,
    },
    explanation: 'Iterate through the array, using modulo to classify each element as even or odd, and count each.',
    timeComplexity: 'O(N) — Single pass through the array.',
    spaceComplexity: 'O(1) — Two counters.',
    hint: 'Use the modulo operator (%) to check each element.',
  },

  {
    id: 'array-frequency',
    slug: 'array-frequency',
    title: 'Find Frequency of an Element',
    difficulty: 'Easy',
    topic: 'Array',
    acceptance: '88%',
    evalFnName: 'findFrequency',
    description: 'Given an array and a target value, find how many times the target occurs in the array.',
    examples: [
      { input: 'nums = [1, 2, 2, 3, 2, 4], target = 2', output: '3', explanation: '2 appears 3 times.' },
    ],
    constraints: ['1 <= N <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [1, 2, 2, 3, 2, 4], target = 2', args: [[1, 2, 2, 3, 2, 4], 2], expected: '3' },
      { id: 2, name: 'Case 2', input: 'nums = [5, 5, 5, 2, 1], target = 5', args: [[5, 5, 5, 2, 1], 5], expected: '3' },
      { id: 3, name: 'Case 3', input: 'nums = [1, 2, 3, 4], target = 9', args: [[1, 2, 3, 4], 9], expected: '0' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function findFrequency(nums, target) {
  // Your code here
}`,
      python: `class Solution:
    def findFrequency(self, nums: list[int], target: int) -> int:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int findFrequency(vector<int>& nums, int target) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int findFrequency(int[] nums, int target) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function findFrequency(nums, target) {
  return nums.filter(n => n === target).length;
}`,
      python: `class Solution:
    def findFrequency(self, nums: list[int], target: int) -> int:
        return nums.count(target)`,
      cpp: `class Solution {
public:
    int findFrequency(vector<int>& nums, int target) {
        return count(nums.begin(), nums.end(), target);
    }
};`,
      java: `class Solution {
    public int findFrequency(int[] nums, int target) {
        int count = 0;
        for (int n : nums) if (n == target) count++;
        return count;
    }
}`,
    },
    explanation: 'Iterate through the array and count how many elements match the target.',
    timeComplexity: 'O(N) — Single pass through the array.',
    spaceComplexity: 'O(1) — Only a counter variable.',
    hint: 'Simply count matching elements in a loop.',
  },

  {
    id: 'linear-search',
    slug: 'linear-search',
    title: 'Linear Search',
    difficulty: 'Easy',
    topic: 'Searching',
    acceptance: '91%',
    evalFnName: 'linearSearch',
    description: 'Search for a target element in an array using linear search. Return its index, or -1 if not found.',
    examples: [
      { input: 'nums = [10, 20, 30, 40, 50], target = 30', output: '2', explanation: '30 is at index 2.' },
      { input: 'nums = [10, 20, 30, 40, 50], target = 60', output: '-1', explanation: '60 is not found.' },
    ],
    constraints: ['1 <= N <= 100000', 'Return -1 if the target is not found.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [10, 20, 30, 40, 50], target = 30', args: [[10, 20, 30, 40, 50], 30], expected: '2' },
      { id: 2, name: 'Case 2', input: 'nums = [10, 20, 30, 40, 50], target = 60', args: [[10, 20, 30, 40, 50], 60], expected: '-1' },
      { id: 3, name: 'Case 3', input: 'nums = [5, 4, 3, 2], target = 5', args: [[5, 4, 3, 2], 5], expected: '0' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function linearSearch(nums, target) {
  // Your code here
}`,
      python: `class Solution:
    def linearSearch(self, nums: list[int], target: int) -> int:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int linearSearch(vector<int>& nums, int target) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int linearSearch(int[] nums, int target) {
        // Your code here
        return -1;
    }
}`,
    },
    solution: {
      javascript: `function linearSearch(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) return i;
  }
  return -1;
}`,
      python: `class Solution:
    def linearSearch(self, nums: list[int], target: int) -> int:
        for i, n in enumerate(nums):
            if n == target: return i
        return -1`,
      cpp: `class Solution {
public:
    int linearSearch(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int linearSearch(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
}`,
    },
    explanation: 'Check each element from left to right. Return the index of the first match, or -1 if no match is found.',
    timeComplexity: 'O(N) — Worst case checks every element.',
    spaceComplexity: 'O(1) — No extra space.',
    hint: 'Iterate through the array and compare each element with the target.',
  },

  {
    id: 'remove-duplicates-sorted-array',
    slug: 'remove-duplicates-sorted-array',
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'Easy',
    topic: 'Array',
    acceptance: '79%',
    evalFnName: 'removeDuplicates',
    description: 'Given a sorted array, remove duplicate elements in-place and return the resulting array with unique elements only.',
    examples: [
      { input: 'nums = [1, 1, 2, 2, 3, 3]', output: '[1, 2, 3]', explanation: 'Duplicates removed.' },
    ],
    constraints: ['Array is sorted.', '1 <= N <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [1, 1, 2, 2, 3, 3]', args: [[1, 1, 2, 2, 3, 3]], expected: '[1, 2, 3]' },
      { id: 2, name: 'Case 2', input: 'nums = [1, 2, 3, 4, 5]', args: [[1, 2, 3, 4, 5]], expected: '[1, 2, 3, 4, 5]' },
      { id: 3, name: 'Case 3', input: 'nums = [2, 2, 2, 2]', args: [[2, 2, 2, 2]], expected: '[2]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function removeDuplicates(nums) {
  // Your code here
}`,
      python: `class Solution:
    def removeDuplicates(self, nums: list[int]) -> list[int]:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> removeDuplicates(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<Integer> removeDuplicates(int[] nums) {
        // Your code here
        return new ArrayList<>();
    }
}`,
    },
    solution: {
      javascript: `function removeDuplicates(nums) {
  if (nums.length === 0) return [];
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[k] = nums[i];
      k++;
    }
  }
  return nums.slice(0, k);
}`,
      python: `class Solution:
    def removeDuplicates(self, nums: list[int]) -> list[int]:
        return list(dict.fromkeys(nums))`,
      cpp: `class Solution {
public:
    vector<int> removeDuplicates(vector<int>& nums) {
        nums.erase(unique(nums.begin(), nums.end()), nums.end());
        return nums;
    }
};`,
      java: `class Solution {
    public List<Integer> removeDuplicates(int[] nums) {
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            if (i == 0 || nums[i] != nums[i-1]) result.add(nums[i]);
        }
        return result;
    }
}`,
    },
    explanation: 'Since the array is sorted, duplicates are adjacent. Use a slow pointer to track the position for the next unique element and a fast pointer to scan ahead.',
    timeComplexity: 'O(N) — Single pass through the array.',
    spaceComplexity: 'O(1) — In-place modification (excluding output).',
    hint: 'Since the array is sorted, duplicates are always next to each other. Use two pointers.',
  },

  {
    id: 'move-zeros-to-end',
    slug: 'move-zeros-to-end',
    title: 'Move All Zeros to the End',
    difficulty: 'Easy',
    topic: 'Two Pointers',
    acceptance: '83%',
    evalFnName: 'moveZerosToEnd',
    description: 'Move all zero elements to the end of the array while maintaining the relative order of non-zero elements. Return the modified array.',
    examples: [
      { input: 'nums = [0, 1, 0, 3, 12, 0]', output: '[1, 3, 12, 0, 0, 0]', explanation: 'Non-zero elements maintain order, zeros move to end.' },
    ],
    constraints: ['1 <= N <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [0, 1, 0, 3, 12, 0]', args: [[0, 1, 0, 3, 12, 0]], expected: '[1, 3, 12, 0, 0, 0]' },
      { id: 2, name: 'Case 2', input: 'nums = [1, 2, 3, 4, 5]', args: [[1, 2, 3, 4, 5]], expected: '[1, 2, 3, 4, 5]' },
      { id: 3, name: 'Case 3', input: 'nums = [0, 0, 1, 2]', args: [[0, 0, 1, 2]], expected: '[1, 2, 0, 0]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function moveZerosToEnd(nums) {
  // Your code here
}`,
      python: `class Solution:
    def moveZerosToEnd(self, nums: list[int]) -> list[int]:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> moveZerosToEnd(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int[] moveZerosToEnd(int[] nums) {
        // Your code here
        return new int[]{};
    }
}`,
    },
    solution: {
      javascript: `function moveZerosToEnd(nums) {
  let insertPos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[insertPos], nums[i]] = [nums[i], nums[insertPos]];
      insertPos++;
    }
  }
  return nums;
}`,
      python: `class Solution:
    def moveZerosToEnd(self, nums: list[int]) -> list[int]:
        pos = 0
        for i in range(len(nums)):
            if nums[i] != 0:
                nums[pos], nums[i] = nums[i], nums[pos]
                pos += 1
        return nums`,
      cpp: `class Solution {
public:
    vector<int> moveZerosToEnd(vector<int>& nums) {
        int pos = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] != 0) swap(nums[pos++], nums[i]);
        }
        return nums;
    }
};`,
      java: `class Solution {
    public int[] moveZerosToEnd(int[] nums) {
        int pos = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                int tmp = nums[pos]; nums[pos] = nums[i]; nums[i] = tmp;
                pos++;
            }
        }
        return nums;
    }
}`,
    },
    explanation: 'Use a slow pointer (insertPos) to track where the next non-zero should go. When a non-zero is found, swap it into position and advance the pointer.',
    timeComplexity: 'O(N) — Single pass through the array.',
    spaceComplexity: 'O(1) — In-place swaps.',
    hint: 'Use a pointer to track the next position for a non-zero element and swap.',
  },

  {
    id: 'missing-number',
    slug: 'missing-number',
    title: 'Find Missing Number from 1 to N',
    difficulty: 'Easy',
    topic: 'Array',
    acceptance: '86%',
    evalFnName: 'findMissingNumber',
    description: 'Given an array containing N-1 distinct numbers from 1 to N, find the one missing number.',
    examples: [
      { input: 'n = 5, nums = [1, 2, 4, 5]', output: '3', explanation: '3 is missing from the sequence 1 to 5.' },
    ],
    constraints: ['Numbers are from 1 to N.', 'Exactly one number is missing.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'n = 5, nums = [1, 2, 4, 5]', args: [5, [1, 2, 4, 5]], expected: '3' },
      { id: 2, name: 'Case 2', input: 'n = 6, nums = [1, 2, 3, 5, 6]', args: [6, [1, 2, 3, 5, 6]], expected: '4' },
      { id: 3, name: 'Case 3', input: 'n = 2, nums = [2]', args: [2, [2]], expected: '1' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @param {number[]} nums
 * @return {number}
 */
function findMissingNumber(n, nums) {
  // Your code here
}`,
      python: `class Solution:
    def findMissingNumber(self, n: int, nums: list[int]) -> int:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int findMissingNumber(int n, vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int findMissingNumber(int n, int[] nums) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function findMissingNumber(n, nums) {
  const expectedSum = n * (n + 1) / 2;
  const actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}`,
      python: `class Solution:
    def findMissingNumber(self, n: int, nums: list[int]) -> int:
        return n * (n + 1) // 2 - sum(nums)`,
      cpp: `class Solution {
public:
    int findMissingNumber(int n, vector<int>& nums) {
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int x : nums) actual += x;
        return expected - actual;
    }
};`,
      java: `class Solution {
    public int findMissingNumber(int n, int[] nums) {
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int x : nums) actual += x;
        return expected - actual;
    }
}`,
    },
    explanation: 'Calculate the expected sum of 1 to N using the formula N*(N+1)/2. Subtract the actual sum of the array to find the missing number.',
    timeComplexity: 'O(N) — Single pass to compute the sum.',
    spaceComplexity: 'O(1) — Only sum variables.',
    hint: 'Use the sum formula: expected sum - actual sum = missing number.',
  },

  {
    id: 'duplicate-element',
    slug: 'duplicate-element',
    title: 'Find Duplicate Element',
    difficulty: 'Easy',
    topic: 'Hashing',
    acceptance: '81%',
    evalFnName: 'findDuplicate',
    description: 'Find the element that occurs more than once in the array. Return the first duplicate found.',
    examples: [
      { input: 'nums = [1, 3, 4, 2, 2]', output: '2', explanation: '2 appears twice.' },
    ],
    constraints: ['At least one duplicate exists.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [1, 3, 4, 2, 2]', args: [[1, 3, 4, 2, 2]], expected: '2' },
      { id: 2, name: 'Case 2', input: 'nums = [1, 4, 3, 2, 5, 3]', args: [[1, 4, 3, 2, 5, 3]], expected: '3' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findDuplicate(nums) {
  // Your code here
}`,
      python: `class Solution:
    def findDuplicate(self, nums: list[int]) -> int:
        # Your code here
        pass`,
      cpp: `#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `import java.util.*;

class Solution {
    public int findDuplicate(int[] nums) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function findDuplicate(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return n;
    seen.add(n);
  }
}`,
      python: `class Solution:
    def findDuplicate(self, nums: list[int]) -> int:
        seen = set()
        for n in nums:
            if n in seen: return n
            seen.add(n)`,
      cpp: `class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) {
            if (seen.count(n)) return n;
            seen.insert(n);
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int findDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int n : nums) {
            if (!seen.add(n)) return n;
        }
        return -1;
    }
}`,
    },
    explanation: 'Use a HashSet to track seen elements. The first element already in the set is the duplicate.',
    timeComplexity: 'O(N) — Single pass with O(1) set lookups.',
    spaceComplexity: 'O(N) — HashSet to store seen elements.',
    hint: 'Use a Set to track which elements you have already seen.',
  },

  {
    id: 'common-elements-two-arrays',
    slug: 'common-elements-two-arrays',
    title: 'Find Common Elements in Two Arrays',
    difficulty: 'Easy',
    topic: 'Array',
    acceptance: '77%',
    evalFnName: 'findCommonElements',
    description: 'Find the elements that are present in both arrays. Return them sorted. If none, return "No common elements".',
    examples: [
      { input: 'nums1 = [1, 2, 3, 4, 5], nums2 = [3, 4, 5, 6]', output: '[3, 4, 5]', explanation: '3, 4, 5 are in both arrays.' },
    ],
    constraints: ['Array sizes are positive.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums1 = [1, 2, 3, 4, 5], nums2 = [3, 4, 5, 6]', args: [[1, 2, 3, 4, 5], [3, 4, 5, 6]], expected: '[3, 4, 5]' },
      { id: 2, name: 'Case 2', input: 'nums1 = [1, 2, 3, 4], nums2 = [5, 6, 7]', args: [[1, 2, 3, 4], [5, 6, 7]], expected: '"No common elements"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]|string}
 */
function findCommonElements(nums1, nums2) {
  // Your code here
}`,
      python: `class Solution:
    def findCommonElements(self, nums1: list[int], nums2: list[int]):
        # Your code here
        pass`,
      cpp: `#include <vector>
#include <unordered_set>
#include <algorithm>
#include <string>
using namespace std;

class Solution {
public:
    vector<int> findCommonElements(vector<int>& nums1, vector<int>& nums2) {
        // Your code here
    }
};`,
      java: `import java.util.*;

class Solution {
    public Object findCommonElements(int[] nums1, int[] nums2) {
        // Your code here
        return null;
    }
}`,
    },
    solution: {
      javascript: `function findCommonElements(nums1, nums2) {
  const set1 = new Set(nums1);
  const common = [...new Set(nums2.filter(n => set1.has(n)))].sort((a, b) => a - b);
  return common.length > 0 ? common : "No common elements";
}`,
      python: `class Solution:
    def findCommonElements(self, nums1: list[int], nums2: list[int]):
        common = sorted(set(nums1) & set(nums2))
        return common if common else "No common elements"`,
      cpp: `class Solution {
public:
    vector<int> findCommonElements(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> s(nums1.begin(), nums1.end());
        vector<int> result;
        for (int n : nums2) if (s.count(n)) { result.push_back(n); s.erase(n); }
        sort(result.begin(), result.end());
        return result;
    }
};`,
      java: `class Solution {
    public Object findCommonElements(int[] nums1, int[] nums2) {
        Set<Integer> set1 = new HashSet<>();
        for (int n : nums1) set1.add(n);
        List<Integer> common = new ArrayList<>();
        Set<Integer> seen = new HashSet<>();
        for (int n : nums2) {
            if (set1.contains(n) && seen.add(n)) common.add(n);
        }
        Collections.sort(common);
        return common.isEmpty() ? "No common elements" : common;
    }
}`,
    },
    explanation: 'Use a HashSet for one array, then iterate through the second array checking membership. This gives O(1) lookups.',
    timeComplexity: 'O(N + M) — Where N and M are the array sizes.',
    spaceComplexity: 'O(N) — HashSet for the first array.',
    hint: 'Put one array into a Set, then check each element of the other array against it.',
  },

  {
    id: 'merge-two-sorted-arrays',
    slug: 'merge-two-sorted-arrays',
    title: 'Merge Two Sorted Arrays',
    difficulty: 'Easy',
    topic: 'Two Pointers',
    acceptance: '85%',
    evalFnName: 'mergeSortedArrays',
    description: 'Merge two sorted arrays into one sorted array.',
    examples: [
      { input: 'nums1 = [1, 3, 5], nums2 = [2, 4, 6]', output: '[1, 2, 3, 4, 5, 6]', explanation: 'Merged in sorted order.' },
    ],
    constraints: ['Both arrays are sorted in ascending order.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums1 = [1, 3, 5], nums2 = [2, 4, 6]', args: [[1, 3, 5], [2, 4, 6]], expected: '[1, 2, 3, 4, 5, 6]' },
      { id: 2, name: 'Case 2', input: 'nums1 = [1, 2, 7], nums2 = [3, 4, 5, 6]', args: [[1, 2, 7], [3, 4, 5, 6]], expected: '[1, 2, 3, 4, 5, 6, 7]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function mergeSortedArrays(nums1, nums2) {
  // Your code here
}`,
      python: `class Solution:
    def mergeSortedArrays(self, nums1: list[int], nums2: list[int]) -> list[int]:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> mergeSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int[] mergeSortedArrays(int[] nums1, int[] nums2) {
        // Your code here
        return new int[]{};
    }
}`,
    },
    solution: {
      javascript: `function mergeSortedArrays(nums1, nums2) {
  const result = [];
  let i = 0, j = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) result.push(nums1[i++]);
    else result.push(nums2[j++]);
  }
  while (i < nums1.length) result.push(nums1[i++]);
  while (j < nums2.length) result.push(nums2[j++]);
  return result;
}`,
      python: `class Solution:
    def mergeSortedArrays(self, nums1: list[int], nums2: list[int]) -> list[int]:
        result, i, j = [], 0, 0
        while i < len(nums1) and j < len(nums2):
            if nums1[i] <= nums2[j]: result.append(nums1[i]); i += 1
            else: result.append(nums2[j]); j += 1
        result.extend(nums1[i:])
        result.extend(nums2[j:])
        return result`,
      cpp: `class Solution {
public:
    vector<int> mergeSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        vector<int> result;
        int i = 0, j = 0;
        while (i < nums1.size() && j < nums2.size()) {
            if (nums1[i] <= nums2[j]) result.push_back(nums1[i++]);
            else result.push_back(nums2[j++]);
        }
        while (i < nums1.size()) result.push_back(nums1[i++]);
        while (j < nums2.size()) result.push_back(nums2[j++]);
        return result;
    }
};`,
      java: `class Solution {
    public int[] mergeSortedArrays(int[] nums1, int[] nums2) {
        int[] result = new int[nums1.length + nums2.length];
        int i = 0, j = 0, k = 0;
        while (i < nums1.length && j < nums2.length) {
            result[k++] = nums1[i] <= nums2[j] ? nums1[i++] : nums2[j++];
        }
        while (i < nums1.length) result[k++] = nums1[i++];
        while (j < nums2.length) result[k++] = nums2[j++];
        return result;
    }
}`,
    },
    explanation: 'Use two pointers, one for each array. Compare elements at both pointers and push the smaller one into the result. Append any remaining elements.',
    timeComplexity: 'O(N + M) — Each element is processed exactly once.',
    spaceComplexity: 'O(N + M) — Result array.',
    hint: 'Use two pointers, one for each array. Always take the smaller current element.',
  },

  {
    id: 'maximum-subarray-sum',
    slug: 'maximum-subarray-sum',
    title: 'Find Maximum Subarray Sum',
    difficulty: 'Medium',
    topic: 'Array',
    acceptance: '76%',
    evalFnName: 'maxSubarraySum',
    description: "Find the maximum possible sum of a contiguous subarray (Kadane's Algorithm).",
    examples: [
      { input: 'nums = [-2, 1, -3, 4, 5]', output: '9', explanation: 'Subarray [4, 5] has maximum sum 9.' },
      { input: 'nums = [1, 2, 3, 4]', output: '10', explanation: 'Entire array has maximum sum 10.' },
    ],
    constraints: ['1 <= N <= 100000', 'Array may contain negative values.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [-2, 1, -3, 4, 5]', args: [[-2, 1, -3, 4, 5]], expected: '9' },
      { id: 2, name: 'Case 2', input: 'nums = [-1, -2, -3, -4, -5]', args: [[-1, -2, -3, -4, -5]], expected: '-1' },
      { id: 3, name: 'Case 3', input: 'nums = [1, 2, 3, 4]', args: [[1, 2, 3, 4]], expected: '10' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubarraySum(nums) {
  // Your code here
}`,
      python: `class Solution:
    def maxSubarraySum(self, nums: list[int]) -> int:
        # Your code here
        pass`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubarraySum(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int maxSubarraySum(int[] nums) {
        // Your code here
        return 0;
    }
}`,
    },
    solution: {
      javascript: `function maxSubarraySum(nums) {
  let maxSum = nums[0], currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
      python: `class Solution:
    def maxSubarraySum(self, nums: list[int]) -> int:
        max_sum = current = nums[0]
        for n in nums[1:]:
            current = max(n, current + n)
            max_sum = max(max_sum, current)
        return max_sum`,
      cpp: `class Solution {
public:
    int maxSubarraySum(vector<int>& nums) {
        int maxSum = nums[0], current = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            current = max(nums[i], current + nums[i]);
            maxSum = max(maxSum, current);
        }
        return maxSum;
    }
};`,
      java: `class Solution {
    public int maxSubarraySum(int[] nums) {
        int maxSum = nums[0], current = nums[0];
        for (int i = 1; i < nums.length; i++) {
            current = Math.max(nums[i], current + nums[i]);
            maxSum = Math.max(maxSum, current);
        }
        return maxSum;
    }
}`,
    },
    explanation: "Kadane's Algorithm: maintain a running sum. At each element, decide whether to extend the current subarray or start a new one. Track the global maximum.",
    timeComplexity: 'O(N) — Single pass through the array.',
    spaceComplexity: 'O(1) — Only two variables.',
    hint: 'At each position, decide: is it better to extend the current subarray or start fresh?',
  },

  {
    id: 'reverse-string',
    slug: 'reverse-string',
    title: 'Reverse a String',
    difficulty: 'Easy',
    topic: 'String',
    acceptance: '95%',
    evalFnName: 'reverseString',
    description: 'Reverse the characters of a given string.',
    examples: [
      { input: 's = "hello"', output: '"olleh"', explanation: 'Characters reversed.' },
      { input: 's = "coding"', output: '"gnidoc"', explanation: 'Characters reversed.' },
    ],
    constraints: ['1 <= string length <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 's = "hello"', args: ['hello'], expected: '"olleh"' },
      { id: 2, name: 'Case 2', input: 's = "coding"', args: ['coding'], expected: '"gnidoc"' },
      { id: 3, name: 'Case 3', input: 's = "abc"', args: ['abc'], expected: '"cba"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
function reverseString(s) {
  // Your code here
}`,
      python: `class Solution:
    def reverseString(self, s: str) -> str:
        # Your code here
        pass`,
      cpp: `#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    string reverseString(string s) {
        // Your code here
    }
};`,
      java: `class Solution {
    public String reverseString(String s) {
        // Your code here
        return "";
    }
}`,
    },
    solution: {
      javascript: `function reverseString(s) {
  return s.split('').reverse().join('');
}`,
      python: `class Solution:
    def reverseString(self, s: str) -> str:
        return s[::-1]`,
      cpp: `class Solution {
public:
    string reverseString(string s) {
        reverse(s.begin(), s.end());
        return s;
    }
};`,
      java: `class Solution {
    public String reverseString(String s) {
        return new StringBuilder(s).reverse().toString();
    }
}`,
    },
    explanation: 'Split the string into characters, reverse the array, and join back. Or use two pointers to swap from both ends.',
    timeComplexity: 'O(N) — Process each character once.',
    spaceComplexity: 'O(N) — For the reversed string.',
    hint: 'Use split, reverse, and join — or a two-pointer approach.',
  },

  {
    id: 'string-palindrome',
    slug: 'string-palindrome',
    title: 'Check Palindrome String',
    difficulty: 'Easy',
    topic: 'String',
    acceptance: '91%',
    evalFnName: 'isStringPalindrome',
    description: 'Determine whether a string reads the same forward and backward. Return "Palindrome" or "Not Palindrome".',
    examples: [
      { input: 's = "madam"', output: '"Palindrome"', explanation: '"madam" reversed is "madam".' },
      { input: 's = "hello"', output: '"Not Palindrome"', explanation: '"hello" reversed is "olleh".' },
    ],
    constraints: ['1 <= string length <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 's = "madam"', args: ['madam'], expected: '"Palindrome"' },
      { id: 2, name: 'Case 2', input: 's = "hello"', args: ['hello'], expected: '"Not Palindrome"' },
      { id: 3, name: 'Case 3', input: 's = "level"', args: ['level'], expected: '"Palindrome"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
function isStringPalindrome(s) {
  // Your code here
}`,
      python: `class Solution:
    def isStringPalindrome(self, s: str) -> str:
        # Your code here
        pass`,
      cpp: `#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    string isStringPalindrome(string s) {
        // Your code here
    }
};`,
      java: `class Solution {
    public String isStringPalindrome(String s) {
        // Your code here
        return "";
    }
}`,
    },
    solution: {
      javascript: `function isStringPalindrome(s) {
  return s === s.split('').reverse().join('') ? "Palindrome" : "Not Palindrome";
}`,
      python: `class Solution:
    def isStringPalindrome(self, s: str) -> str:
        return "Palindrome" if s == s[::-1] else "Not Palindrome"`,
      cpp: `class Solution {
public:
    string isStringPalindrome(string s) {
        string rev(s.rbegin(), s.rend());
        return s == rev ? "Palindrome" : "Not Palindrome";
    }
};`,
      java: `class Solution {
    public String isStringPalindrome(String s) {
        String rev = new StringBuilder(s).reverse().toString();
        return s.equals(rev) ? "Palindrome" : "Not Palindrome";
    }
}`,
    },
    explanation: 'Reverse the string and compare it to the original. If identical, it is a palindrome.',
    timeComplexity: 'O(N) — Reversing and comparing.',
    spaceComplexity: 'O(N) — Reversed string copy.',
    hint: 'Reverse the string and compare, or use two pointers from both ends.',
  },

  {
    id: 'count-vowels-consonants',
    slug: 'count-vowels-consonants',
    title: 'Count Vowels and Consonants',
    difficulty: 'Easy',
    topic: 'String',
    acceptance: '89%',
    evalFnName: 'countVowelsConsonants',
    description: 'Count the vowels (a, e, i, o, u) and consonants present in a string. Return "Vowels: X, Consonants: Y".',
    examples: [
      { input: 's = "hello"', output: '"Vowels: 2, Consonants: 3"', explanation: 'e, o are vowels; h, l, l are consonants.' },
    ],
    constraints: ['Input contains alphabetic characters.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 's = "hello"', args: ['hello'], expected: '"Vowels: 2, Consonants: 3"' },
      { id: 2, name: 'Case 2', input: 's = "education"', args: ['education'], expected: '"Vowels: 5, Consonants: 4"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
function countVowelsConsonants(s) {
  // Your code here
}`,
      python: `class Solution:
    def countVowelsConsonants(self, s: str) -> str:
        # Your code here
        pass`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    string countVowelsConsonants(string s) {
        // Your code here
    }
};`,
      java: `class Solution {
    public String countVowelsConsonants(String s) {
        // Your code here
        return "";
    }
}`,
    },
    solution: {
      javascript: `function countVowelsConsonants(s) {
  const vowels = new Set('aeiouAEIOU');
  let v = 0, c = 0;
  for (const ch of s) {
    if (/[a-zA-Z]/.test(ch)) {
      vowels.has(ch) ? v++ : c++;
    }
  }
  return "Vowels: " + v + ", Consonants: " + c;
}`,
      python: `class Solution:
    def countVowelsConsonants(self, s: str) -> str:
        vowels = set('aeiouAEIOU')
        v = sum(1 for c in s if c.isalpha() and c in vowels)
        c = sum(1 for ch in s if ch.isalpha() and ch not in vowels)
        return f"Vowels: {v}, Consonants: {c}"`,
      cpp: `class Solution {
public:
    string countVowelsConsonants(string s) {
        string vowels = "aeiouAEIOU";
        int v = 0, c = 0;
        for (char ch : s) {
            if (isalpha(ch)) {
                vowels.find(ch) != string::npos ? v++ : c++;
            }
        }
        return "Vowels: " + to_string(v) + ", Consonants: " + to_string(c);
    }
};`,
      java: `class Solution {
    public String countVowelsConsonants(String s) {
        int v = 0, c = 0;
        for (char ch : s.toCharArray()) {
            if (Character.isLetter(ch)) {
                if ("aeiouAEIOU".indexOf(ch) >= 0) v++; else c++;
            }
        }
        return "Vowels: " + v + ", Consonants: " + c;
    }
}`,
    },
    explanation: 'Iterate through each character. If it is alphabetic, check if it is a vowel (a, e, i, o, u) or consonant and increment the respective counter.',
    timeComplexity: 'O(N) — Single pass through the string.',
    spaceComplexity: 'O(1) — Constant extra space.',
    hint: 'Check each character against the set of vowels {a, e, i, o, u}.',
  },

  {
    id: 'character-frequency',
    slug: 'character-frequency',
    title: 'Find Frequency of Each Character',
    difficulty: 'Easy',
    topic: 'Hashing',
    acceptance: '82%',
    evalFnName: 'characterFrequency',
    description: 'Count the frequency of every character in a string. Return the result as a space-separated string like "a:2 b:3" preserving first-occurrence order.',
    examples: [
      { input: 's = "hello"', output: '"h:1 e:1 l:2 o:1"', explanation: 'Character frequencies counted.' },
      { input: 's = "aabbc"', output: '"a:2 b:2 c:1"', explanation: 'Character frequencies counted.' },
    ],
    constraints: ['1 <= string length <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 's = "hello"', args: ['hello'], expected: '"h:1 e:1 l:2 o:1"' },
      { id: 2, name: 'Case 2', input: 's = "aabbc"', args: ['aabbc'], expected: '"a:2 b:2 c:1"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
function characterFrequency(s) {
  // Your code here
}`,
      python: `class Solution:
    def characterFrequency(self, s: str) -> str:
        # Your code here
        pass`,
      cpp: `#include <string>
#include <map>
using namespace std;

class Solution {
public:
    string characterFrequency(string s) {
        // Your code here
    }
};`,
      java: `import java.util.*;

class Solution {
    public String characterFrequency(String s) {
        // Your code here
        return "";
    }
}`,
    },
    solution: {
      javascript: `function characterFrequency(s) {
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);
  return [...freq.entries()].map(([k, v]) => k + ':' + v).join(' ');
}`,
      python: `class Solution:
    def characterFrequency(self, s: str) -> str:
        from collections import Counter, OrderedDict
        freq = OrderedDict()
        for ch in s:
            freq[ch] = freq.get(ch, 0) + 1
        return ' '.join(f"{k}:{v}" for k, v in freq.items())`,
      cpp: `class Solution {
public:
    string characterFrequency(string s) {
        vector<pair<char,int>> freq;
        map<char,int> idx;
        for (char c : s) {
            if (idx.find(c) == idx.end()) {
                idx[c] = freq.size();
                freq.push_back({c, 1});
            } else freq[idx[c]].second++;
        }
        string result;
        for (auto& [ch, cnt] : freq) {
            if (!result.empty()) result += " ";
            result += ch; result += ":"; result += to_string(cnt);
        }
        return result;
    }
};`,
      java: `class Solution {
    public String characterFrequency(String s) {
        LinkedHashMap<Character, Integer> freq = new LinkedHashMap<>();
        for (char c : s.toCharArray()) freq.merge(c, 1, Integer::sum);
        StringBuilder sb = new StringBuilder();
        freq.forEach((k, v) -> {
            if (sb.length() > 0) sb.append(" ");
            sb.append(k).append(":").append(v);
        });
        return sb.toString();
    }
}`,
    },
    explanation: 'Use a HashMap/Map to count occurrences of each character while preserving insertion order.',
    timeComplexity: 'O(N) — Single pass through the string.',
    spaceComplexity: 'O(K) — Where K is the number of unique characters.',
    hint: 'Use a Map or object to count frequencies. Preserve insertion order.',
  },

  {
    id: 'remove-duplicate-characters',
    slug: 'remove-duplicate-characters',
    title: 'Remove Duplicate Characters',
    difficulty: 'Easy',
    topic: 'String',
    acceptance: '80%',
    evalFnName: 'removeDuplicateCharacters',
    description: 'Remove repeated characters from a string, keeping only the first occurrence of each character.',
    examples: [
      { input: 's = "programming"', output: '"progamin"', explanation: 'Duplicates removed, first occurrences kept.' },
      { input: 's = "aabbcc"', output: '"abc"', explanation: 'Only first occurrence of each letter.' },
    ],
    constraints: ['1 <= string length <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 's = "programming"', args: ['programming'], expected: '"progamin"' },
      { id: 2, name: 'Case 2', input: 's = "aabbcc"', args: ['aabbcc'], expected: '"abc"' },
      { id: 3, name: 'Case 3', input: 's = "hello"', args: ['hello'], expected: '"helo"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
function removeDuplicateCharacters(s) {
  // Your code here
}`,
      python: `class Solution:
    def removeDuplicateCharacters(self, s: str) -> str:
        # Your code here
        pass`,
      cpp: `#include <string>
#include <unordered_set>
using namespace std;

class Solution {
public:
    string removeDuplicateCharacters(string s) {
        // Your code here
    }
};`,
      java: `import java.util.*;

class Solution {
    public String removeDuplicateCharacters(String s) {
        // Your code here
        return "";
    }
}`,
    },
    solution: {
      javascript: `function removeDuplicateCharacters(s) {
  const seen = new Set();
  let result = '';
  for (const ch of s) {
    if (!seen.has(ch)) { seen.add(ch); result += ch; }
  }
  return result;
}`,
      python: `class Solution:
    def removeDuplicateCharacters(self, s: str) -> str:
        seen = set()
        result = []
        for ch in s:
            if ch not in seen:
                seen.add(ch)
                result.append(ch)
        return ''.join(result)`,
      cpp: `class Solution {
public:
    string removeDuplicateCharacters(string s) {
        unordered_set<char> seen;
        string result;
        for (char c : s) {
            if (!seen.count(c)) { seen.insert(c); result += c; }
        }
        return result;
    }
};`,
      java: `class Solution {
    public String removeDuplicateCharacters(String s) {
        Set<Character> seen = new LinkedHashSet<>();
        for (char c : s.toCharArray()) seen.add(c);
        StringBuilder sb = new StringBuilder();
        for (char c : seen) sb.append(c);
        return sb.toString();
    }
}`,
    },
    explanation: 'Use a Set to track characters already added. Only append characters not yet in the set.',
    timeComplexity: 'O(N) — Single pass through the string.',
    spaceComplexity: 'O(K) — Where K is the number of unique characters.',
    hint: 'Use a Set to track which characters have already been seen.',
  },

  {
    id: 'first-non-repeating-character',
    slug: 'first-non-repeating-character',
    title: 'Find First Non-Repeating Character',
    difficulty: 'Medium',
    topic: 'Hashing',
    acceptance: '74%',
    evalFnName: 'firstNonRepeatingCharacter',
    description: 'Find the first character that occurs only once in the string. Return "-1" if all characters repeat.',
    examples: [
      { input: 's = "swiss"', output: '"w"', explanation: 'w is the first character that does not repeat.' },
      { input: 's = "aabbc"', output: '"c"', explanation: 'c is the first non-repeating character.' },
    ],
    constraints: ['1 <= string length <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 's = "swiss"', args: ['swiss'], expected: '"w"' },
      { id: 2, name: 'Case 2', input: 's = "aabbc"', args: ['aabbc'], expected: '"c"' },
      { id: 3, name: 'Case 3', input: 's = "aabb"', args: ['aabb'], expected: '"-1"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
function firstNonRepeatingCharacter(s) {
  // Your code here
}`,
      python: `class Solution:
    def firstNonRepeatingCharacter(self, s: str) -> str:
        # Your code here
        pass`,
      cpp: `#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    string firstNonRepeatingCharacter(string s) {
        // Your code here
    }
};`,
      java: `import java.util.*;

class Solution {
    public String firstNonRepeatingCharacter(String s) {
        // Your code here
        return "";
    }
}`,
    },
    solution: {
      javascript: `function firstNonRepeatingCharacter(s) {
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);
  for (const ch of s) {
    if (freq.get(ch) === 1) return ch;
  }
  return "-1";
}`,
      python: `class Solution:
    def firstNonRepeatingCharacter(self, s: str) -> str:
        from collections import Counter
        freq = Counter(s)
        for ch in s:
            if freq[ch] == 1: return ch
        return "-1"`,
      cpp: `class Solution {
public:
    string firstNonRepeatingCharacter(string s) {
        unordered_map<char, int> freq;
        for (char c : s) freq[c]++;
        for (char c : s) if (freq[c] == 1) return string(1, c);
        return "-1";
    }
};`,
      java: `class Solution {
    public String firstNonRepeatingCharacter(String s) {
        Map<Character, Integer> freq = new LinkedHashMap<>();
        for (char c : s.toCharArray()) freq.merge(c, 1, Integer::sum);
        for (char c : s.toCharArray()) if (freq.get(c) == 1) return String.valueOf(c);
        return "-1";
    }
}`,
    },
    explanation: 'First pass: count frequency of each character. Second pass: find the first character with frequency 1.',
    timeComplexity: 'O(N) — Two passes through the string.',
    spaceComplexity: 'O(K) — HashMap for character frequencies.',
    hint: 'Count frequencies first, then scan for the first character with count 1.',
  },

  {
    id: 'check-anagram',
    slug: 'check-anagram',
    title: 'Check Whether Two Strings are Anagrams',
    difficulty: 'Easy',
    topic: 'String',
    acceptance: '84%',
    evalFnName: 'areAnagrams',
    description: 'Determine whether two strings contain the same characters with the same frequencies. Return "Anagram" or "Not Anagram".',
    examples: [
      { input: 's1 = "listen", s2 = "silent"', output: '"Anagram"', explanation: 'Same characters, same frequencies.' },
      { input: 's1 = "hello", s2 = "world"', output: '"Not Anagram"', explanation: 'Different characters.' },
    ],
    constraints: ['Both strings contain lowercase English letters.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 's1 = "listen", s2 = "silent"', args: ['listen', 'silent'], expected: '"Anagram"' },
      { id: 2, name: 'Case 2', input: 's1 = "hello", s2 = "world"', args: ['hello', 'world'], expected: '"Not Anagram"' },
      { id: 3, name: 'Case 3', input: 's1 = "triangle", s2 = "integral"', args: ['triangle', 'integral'], expected: '"Anagram"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s1
 * @param {string} s2
 * @return {string}
 */
function areAnagrams(s1, s2) {
  // Your code here
}`,
      python: `class Solution:
    def areAnagrams(self, s1: str, s2: str) -> str:
        # Your code here
        pass`,
      cpp: `#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    string areAnagrams(string s1, string s2) {
        // Your code here
    }
};`,
      java: `import java.util.Arrays;

class Solution {
    public String areAnagrams(String s1, String s2) {
        // Your code here
        return "";
    }
}`,
    },
    solution: {
      javascript: `function areAnagrams(s1, s2) {
  if (s1.length !== s2.length) return "Not Anagram";
  const sorted1 = s1.split('').sort().join('');
  const sorted2 = s2.split('').sort().join('');
  return sorted1 === sorted2 ? "Anagram" : "Not Anagram";
}`,
      python: `class Solution:
    def areAnagrams(self, s1: str, s2: str) -> str:
        return "Anagram" if sorted(s1) == sorted(s2) else "Not Anagram"`,
      cpp: `class Solution {
public:
    string areAnagrams(string s1, string s2) {
        sort(s1.begin(), s1.end());
        sort(s2.begin(), s2.end());
        return s1 == s2 ? "Anagram" : "Not Anagram";
    }
};`,
      java: `class Solution {
    public String areAnagrams(String s1, String s2) {
        char[] a = s1.toCharArray(), b = s2.toCharArray();
        Arrays.sort(a); Arrays.sort(b);
        return Arrays.equals(a, b) ? "Anagram" : "Not Anagram";
    }
}`,
    },
    explanation: 'Sort both strings and compare. If they are equal after sorting, the strings are anagrams. Alternatively, compare character frequency counts.',
    timeComplexity: 'O(N log N) — Due to sorting. O(N) with frequency counting.',
    spaceComplexity: 'O(N) — For sorted copies.',
    hint: 'Sort both strings and compare, or count character frequencies.',
  },

  {
    id: 'binary-search',
    slug: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    topic: 'Binary Search',
    acceptance: '79%',
    evalFnName: 'binarySearch',
    description: 'Search for a target value in a sorted array using binary search. Return its index, or -1 if not found.',
    examples: [
      { input: 'nums = [1, 3, 5, 7, 9], target = 7', output: '3', explanation: '7 is at index 3.' },
      { input: 'nums = [10, 20, 30, 40, 50], target = 25', output: '-1', explanation: '25 is not in the array.' },
    ],
    constraints: ['Array is sorted in ascending order.', '1 <= N <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [1, 3, 5, 7, 9], target = 7', args: [[1, 3, 5, 7, 9], 7], expected: '3' },
      { id: 2, name: 'Case 2', input: 'nums = [10, 20, 30, 40, 50], target = 25', args: [[10, 20, 30, 40, 50], 25], expected: '-1' },
      { id: 3, name: 'Case 3', input: 'nums = [10], target = 10', args: [[10], 10], expected: '0' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function binarySearch(nums, target) {
  // Your code here
}`,
      python: `class Solution:
    def binarySearch(self, nums: list[int], target: int) -> int:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int binarySearch(vector<int>& nums, int target) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int binarySearch(int[] nums, int target) {
        // Your code here
        return -1;
    }
}`,
    },
    solution: {
      javascript: `function binarySearch(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      python: `class Solution:
    def binarySearch(self, nums: list[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target: return mid
            elif nums[mid] < target: low = mid + 1
            else: high = mid - 1
        return -1`,
      cpp: `class Solution {
public:
    int binarySearch(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int binarySearch(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
    },
    explanation: 'Repeatedly halve the search space by comparing the middle element with the target. Adjust low/high pointers accordingly.',
    timeComplexity: 'O(log N) — Search space halves each iteration.',
    spaceComplexity: 'O(1) — Iterative approach uses constant space.',
    hint: 'Compare target with middle element. Eliminate half the search space each step.',
  },

  {
    id: 'first-occurrence-binary-search',
    slug: 'first-occurrence-binary-search',
    title: 'Find First Occurrence',
    difficulty: 'Medium',
    topic: 'Binary Search',
    acceptance: '71%',
    evalFnName: 'findFirstOccurrence',
    description: 'Find the first index of a target value in a sorted array that may contain duplicates. Return -1 if not found.',
    examples: [
      { input: 'nums = [1, 2, 2, 2, 3, 4], target = 2', output: '1', explanation: 'First 2 is at index 1.' },
    ],
    constraints: ['Array is sorted.', 'Return -1 if target does not exist.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [1, 2, 2, 2, 3, 4], target = 2', args: [[1, 2, 2, 2, 3, 4], 2], expected: '1' },
      { id: 2, name: 'Case 2', input: 'nums = [1, 3, 5, 7, 9], target = 5', args: [[1, 3, 5, 7, 9], 5], expected: '2' },
      { id: 3, name: 'Case 3', input: 'nums = [1, 2, 3, 4], target = 5', args: [[1, 2, 3, 4], 5], expected: '-1' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function findFirstOccurrence(nums, target) {
  // Your code here
}`,
      python: `class Solution:
    def findFirstOccurrence(self, nums: list[int], target: int) -> int:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int findFirstOccurrence(vector<int>& nums, int target) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int findFirstOccurrence(int[] nums, int target) {
        // Your code here
        return -1;
    }
}`,
    },
    solution: {
      javascript: `function findFirstOccurrence(nums, target) {
  let low = 0, high = nums.length - 1, result = -1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) { result = mid; high = mid - 1; }
    else if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return result;
}`,
      python: `class Solution:
    def findFirstOccurrence(self, nums: list[int], target: int) -> int:
        low, high, result = 0, len(nums) - 1, -1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                result = mid; high = mid - 1
            elif nums[mid] < target: low = mid + 1
            else: high = mid - 1
        return result`,
      cpp: `class Solution {
public:
    int findFirstOccurrence(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1, result = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) { result = mid; high = mid - 1; }
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return result;
    }
};`,
      java: `class Solution {
    public int findFirstOccurrence(int[] nums, int target) {
        int low = 0, high = nums.length - 1, result = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) { result = mid; high = mid - 1; }
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return result;
    }
}`,
    },
    explanation: 'Modified binary search: when we find the target, record it but continue searching leftward (high = mid - 1) to find an earlier occurrence.',
    timeComplexity: 'O(log N) — Binary search.',
    spaceComplexity: 'O(1) — Constant space.',
    hint: "When you find the target, don't stop — keep searching left for an earlier occurrence.",
  },

  {
    id: 'last-occurrence-binary-search',
    slug: 'last-occurrence-binary-search',
    title: 'Find Last Occurrence',
    difficulty: 'Medium',
    topic: 'Binary Search',
    acceptance: '70%',
    evalFnName: 'findLastOccurrence',
    description: 'Find the last index of a target value in a sorted array that may contain duplicates. Return -1 if not found.',
    examples: [
      { input: 'nums = [1, 2, 2, 2, 3, 4], target = 2', output: '3', explanation: 'Last 2 is at index 3.' },
    ],
    constraints: ['Array is sorted.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [1, 2, 2, 2, 3, 4], target = 2', args: [[1, 2, 2, 2, 3, 4], 2], expected: '3' },
      { id: 2, name: 'Case 2', input: 'nums = [1, 3, 5, 7, 9], target = 5', args: [[1, 3, 5, 7, 9], 5], expected: '2' },
      { id: 3, name: 'Case 3', input: 'nums = [1, 2, 3, 4], target = 5', args: [[1, 2, 3, 4], 5], expected: '-1' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function findLastOccurrence(nums, target) {
  // Your code here
}`,
      python: `class Solution:
    def findLastOccurrence(self, nums: list[int], target: int) -> int:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int findLastOccurrence(vector<int>& nums, int target) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int findLastOccurrence(int[] nums, int target) {
        // Your code here
        return -1;
    }
}`,
    },
    solution: {
      javascript: `function findLastOccurrence(nums, target) {
  let low = 0, high = nums.length - 1, result = -1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) { result = mid; low = mid + 1; }
    else if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return result;
}`,
      python: `class Solution:
    def findLastOccurrence(self, nums: list[int], target: int) -> int:
        low, high, result = 0, len(nums) - 1, -1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                result = mid; low = mid + 1
            elif nums[mid] < target: low = mid + 1
            else: high = mid - 1
        return result`,
      cpp: `class Solution {
public:
    int findLastOccurrence(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1, result = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) { result = mid; low = mid + 1; }
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return result;
    }
};`,
      java: `class Solution {
    public int findLastOccurrence(int[] nums, int target) {
        int low = 0, high = nums.length - 1, result = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) { result = mid; low = mid + 1; }
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return result;
    }
}`,
    },
    explanation: 'Modified binary search: when the target is found, record it but continue searching rightward (low = mid + 1) to find a later occurrence.',
    timeComplexity: 'O(log N) — Binary search.',
    spaceComplexity: 'O(1) — Constant space.',
    hint: 'When you find the target, keep searching right for a later occurrence.',
  },

  {
    id: 'bubble-sort',
    slug: 'bubble-sort',
    title: 'Bubble Sort',
    difficulty: 'Easy',
    topic: 'Sorting',
    acceptance: '90%',
    evalFnName: 'bubbleSort',
    description: 'Sort an array in ascending order using the Bubble Sort algorithm. Return the sorted array.',
    examples: [
      { input: 'nums = [5, 3, 1, 4, 2]', output: '[1, 2, 3, 4, 5]', explanation: 'Sorted using bubble sort.' },
    ],
    constraints: ['1 <= N <= 1000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [5, 3, 1, 4, 2]', args: [[5, 3, 1, 4, 2]], expected: '[1, 2, 3, 4, 5]' },
      { id: 2, name: 'Case 2', input: 'nums = [10, 5, 8, 2]', args: [[10, 5, 8, 2]], expected: '[2, 5, 8, 10]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function bubbleSort(nums) {
  // Your code here
}`,
      python: `class Solution:
    def bubbleSort(self, nums: list[int]) -> list[int]:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> bubbleSort(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int[] bubbleSort(int[] nums) {
        // Your code here
        return new int[]{};
    }
}`,
    },
    solution: {
      javascript: `function bubbleSort(nums) {
  const n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return nums;
}`,
      python: `class Solution:
    def bubbleSort(self, nums: list[int]) -> list[int]:
        n = len(nums)
        for i in range(n - 1):
            swapped = False
            for j in range(n - 1 - i):
                if nums[j] > nums[j+1]:
                    nums[j], nums[j+1] = nums[j+1], nums[j]
                    swapped = True
            if not swapped: break
        return nums`,
      cpp: `class Solution {
public:
    vector<int> bubbleSort(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n-1; i++) {
            bool swapped = false;
            for (int j = 0; j < n-1-i; j++) {
                if (nums[j] > nums[j+1]) { swap(nums[j], nums[j+1]); swapped = true; }
            }
            if (!swapped) break;
        }
        return nums;
    }
};`,
      java: `class Solution {
    public int[] bubbleSort(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n-1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n-1-i; j++) {
                if (nums[j] > nums[j+1]) {
                    int tmp = nums[j]; nums[j] = nums[j+1]; nums[j+1] = tmp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
        return nums;
    }
}`,
    },
    explanation: 'Repeatedly swap adjacent elements if they are in the wrong order. After each pass, the largest unsorted element "bubbles up" to its correct position.',
    timeComplexity: 'O(N²) — Nested loops. O(N) best case with early termination.',
    spaceComplexity: 'O(1) — In-place sorting.',
    hint: 'Compare adjacent elements and swap if out of order. Repeat until no swaps are needed.',
  },

  {
    id: 'selection-sort',
    slug: 'selection-sort',
    title: 'Selection Sort',
    difficulty: 'Easy',
    topic: 'Sorting',
    acceptance: '89%',
    evalFnName: 'selectionSort',
    description: 'Sort an array in ascending order using the Selection Sort algorithm. Return the sorted array.',
    examples: [
      { input: 'nums = [64, 25, 12, 22, 11]', output: '[11, 12, 22, 25, 64]', explanation: 'Sorted using selection sort.' },
    ],
    constraints: ['1 <= N <= 1000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [64, 25, 12, 22, 11]', args: [[64, 25, 12, 22, 11]], expected: '[11, 12, 22, 25, 64]' },
      { id: 2, name: 'Case 2', input: 'nums = [4, 3, 2, 1]', args: [[4, 3, 2, 1]], expected: '[1, 2, 3, 4]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function selectionSort(nums) {
  // Your code here
}`,
      python: `class Solution:
    def selectionSort(self, nums: list[int]) -> list[int]:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> selectionSort(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int[] selectionSort(int[] nums) {
        // Your code here
        return new int[]{};
    }
}`,
    },
    solution: {
      javascript: `function selectionSort(nums) {
  const n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (nums[j] < nums[minIdx]) minIdx = j;
    }
    if (minIdx !== i) [nums[i], nums[minIdx]] = [nums[minIdx], nums[i]];
  }
  return nums;
}`,
      python: `class Solution:
    def selectionSort(self, nums: list[int]) -> list[int]:
        n = len(nums)
        for i in range(n - 1):
            min_idx = i
            for j in range(i + 1, n):
                if nums[j] < nums[min_idx]: min_idx = j
            nums[i], nums[min_idx] = nums[min_idx], nums[i]
        return nums`,
      cpp: `class Solution {
public:
    vector<int> selectionSort(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n-1; i++) {
            int minIdx = i;
            for (int j = i+1; j < n; j++) if (nums[j] < nums[minIdx]) minIdx = j;
            swap(nums[i], nums[minIdx]);
        }
        return nums;
    }
};`,
      java: `class Solution {
    public int[] selectionSort(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n-1; i++) {
            int minIdx = i;
            for (int j = i+1; j < n; j++) if (nums[j] < nums[minIdx]) minIdx = j;
            int tmp = nums[i]; nums[i] = nums[minIdx]; nums[minIdx] = tmp;
        }
        return nums;
    }
}`,
    },
    explanation: 'For each position i, find the minimum element in the remaining unsorted portion and swap it into position i.',
    timeComplexity: 'O(N²) — Nested loops for finding minimum.',
    spaceComplexity: 'O(1) — In-place sorting.',
    hint: 'Find the minimum in the unsorted portion and swap it to the front.',
  },

  {
    id: 'insertion-sort',
    slug: 'insertion-sort',
    title: 'Insertion Sort',
    difficulty: 'Easy',
    topic: 'Sorting',
    acceptance: '88%',
    evalFnName: 'insertionSort',
    description: 'Sort an array in ascending order using the Insertion Sort algorithm. Return the sorted array.',
    examples: [
      { input: 'nums = [12, 11, 13, 5, 6]', output: '[5, 6, 11, 12, 13]', explanation: 'Sorted using insertion sort.' },
    ],
    constraints: ['1 <= N <= 1000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [12, 11, 13, 5, 6]', args: [[12, 11, 13, 5, 6]], expected: '[5, 6, 11, 12, 13]' },
      { id: 2, name: 'Case 2', input: 'nums = [4, 3, 2, 1]', args: [[4, 3, 2, 1]], expected: '[1, 2, 3, 4]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function insertionSort(nums) {
  // Your code here
}`,
      python: `class Solution:
    def insertionSort(self, nums: list[int]) -> list[int]:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> insertionSort(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int[] insertionSort(int[] nums) {
        // Your code here
        return new int[]{};
    }
}`,
    },
    solution: {
      javascript: `function insertionSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    const key = nums[i];
    let j = i - 1;
    while (j >= 0 && nums[j] > key) {
      nums[j + 1] = nums[j];
      j--;
    }
    nums[j + 1] = key;
  }
  return nums;
}`,
      python: `class Solution:
    def insertionSort(self, nums: list[int]) -> list[int]:
        for i in range(1, len(nums)):
            key = nums[i]
            j = i - 1
            while j >= 0 and nums[j] > key:
                nums[j+1] = nums[j]
                j -= 1
            nums[j+1] = key
        return nums`,
      cpp: `class Solution {
public:
    vector<int> insertionSort(vector<int>& nums) {
        for (int i = 1; i < nums.size(); i++) {
            int key = nums[i], j = i - 1;
            while (j >= 0 && nums[j] > key) { nums[j+1] = nums[j]; j--; }
            nums[j+1] = key;
        }
        return nums;
    }
};`,
      java: `class Solution {
    public int[] insertionSort(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            int key = nums[i], j = i - 1;
            while (j >= 0 && nums[j] > key) { nums[j+1] = nums[j]; j--; }
            nums[j+1] = key;
        }
        return nums;
    }
}`,
    },
    explanation: 'Build the sorted array one element at a time. Take each element and insert it into its correct position in the already-sorted left portion.',
    timeComplexity: 'O(N²) — Worst/average case. O(N) best case (already sorted).',
    spaceComplexity: 'O(1) — In-place sorting.',
    hint: 'Pick each element and insert it into the correct position in the sorted left portion.',
  },

  {
    id: 'merge-sort',
    slug: 'merge-sort',
    title: 'Merge Sort',
    difficulty: 'Medium',
    topic: 'Sorting',
    acceptance: '72%',
    evalFnName: 'mergeSort',
    description: 'Sort an array using the Merge Sort algorithm (divide and conquer). Return the sorted array.',
    examples: [
      { input: 'nums = [38, 27, 43, 3, 9, 82]', output: '[3, 9, 27, 38, 43, 82]', explanation: 'Sorted using merge sort.' },
    ],
    constraints: ['1 <= N <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [38, 27, 43, 3, 9, 82]', args: [[38, 27, 43, 3, 9, 82]], expected: '[3, 9, 27, 38, 43, 82]' },
      { id: 2, name: 'Case 2', input: 'nums = [5, 4, 3, 2, 1]', args: [[5, 4, 3, 2, 1]], expected: '[1, 2, 3, 4, 5]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function mergeSort(nums) {
  // Your code here
}`,
      python: `class Solution:
    def mergeSort(self, nums: list[int]) -> list[int]:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> mergeSort(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int[] mergeSort(int[] nums) {
        // Your code here
        return new int[]{};
    }
}`,
    },
    solution: {
      javascript: `function mergeSort(nums) {
  if (nums.length <= 1) return nums;
  const mid = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
      python: `class Solution:
    def mergeSort(self, nums: list[int]) -> list[int]:
        if len(nums) <= 1: return nums
        mid = len(nums) // 2
        left = self.mergeSort(nums[:mid])
        right = self.mergeSort(nums[mid:])
        return self._merge(left, right)

    def _merge(self, left, right):
        result, i, j = [], 0, 0
        while i < len(left) and j < len(right):
            if left[i] <= right[j]: result.append(left[i]); i += 1
            else: result.append(right[j]); j += 1
        return result + left[i:] + right[j:]`,
      cpp: `class Solution {
public:
    vector<int> mergeSort(vector<int>& nums) {
        if (nums.size() <= 1) return nums;
        int mid = nums.size() / 2;
        vector<int> left(nums.begin(), nums.begin() + mid);
        vector<int> right(nums.begin() + mid, nums.end());
        left = mergeSort(left);
        right = mergeSort(right);
        return mergeTwoSorted(left, right);
    }
    vector<int> mergeTwoSorted(vector<int>& a, vector<int>& b) {
        vector<int> res;
        int i = 0, j = 0;
        while (i < a.size() && j < b.size()) res.push_back(a[i] <= b[j] ? a[i++] : b[j++]);
        while (i < a.size()) res.push_back(a[i++]);
        while (j < b.size()) res.push_back(b[j++]);
        return res;
    }
};`,
      java: `class Solution {
    public int[] mergeSort(int[] nums) {
        if (nums.length <= 1) return nums;
        int mid = nums.length / 2;
        int[] left = mergeSort(java.util.Arrays.copyOfRange(nums, 0, mid));
        int[] right = mergeSort(java.util.Arrays.copyOfRange(nums, mid, nums.length));
        return merge(left, right);
    }
    private int[] merge(int[] a, int[] b) {
        int[] res = new int[a.length + b.length];
        int i = 0, j = 0, k = 0;
        while (i < a.length && j < b.length) res[k++] = a[i] <= b[j] ? a[i++] : b[j++];
        while (i < a.length) res[k++] = a[i++];
        while (j < b.length) res[k++] = b[j++];
        return res;
    }
}`,
    },
    explanation: 'Divide the array in half recursively until single elements remain, then merge sorted halves back together in order.',
    timeComplexity: 'O(N log N) — Divide log N times, merge N elements each level.',
    spaceComplexity: 'O(N) — Temporary arrays during merge.',
    hint: 'Split the array in half, recursively sort each half, then merge them.',
  },

  {
    id: 'quick-sort',
    slug: 'quick-sort',
    title: 'Quick Sort',
    difficulty: 'Medium',
    topic: 'Sorting',
    acceptance: '69%',
    evalFnName: 'quickSort',
    description: 'Sort an array using the Quick Sort algorithm. Return the sorted array.',
    examples: [
      { input: 'nums = [10, 7, 8, 9, 1]', output: '[1, 7, 8, 9, 10]', explanation: 'Sorted using quick sort.' },
    ],
    constraints: ['1 <= N <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [10, 7, 8, 9, 1]', args: [[10, 7, 8, 9, 1]], expected: '[1, 7, 8, 9, 10]' },
      { id: 2, name: 'Case 2', input: 'nums = [4, 3, 2, 1]', args: [[4, 3, 2, 1]], expected: '[1, 2, 3, 4]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function quickSort(nums) {
  // Your code here
}`,
      python: `class Solution:
    def quickSort(self, nums: list[int]) -> list[int]:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> quickSort(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int[] quickSort(int[] nums) {
        // Your code here
        return new int[]{};
    }
}`,
    },
    solution: {
      javascript: `function quickSort(nums) {
  if (nums.length <= 1) return nums;
  const pivot = nums[nums.length - 1];
  const left = [], right = [];
  for (let i = 0; i < nums.length - 1; i++) {
    nums[i] <= pivot ? left.push(nums[i]) : right.push(nums[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
      python: `class Solution:
    def quickSort(self, nums: list[int]) -> list[int]:
        if len(nums) <= 1: return nums
        pivot = nums[-1]
        left = [x for x in nums[:-1] if x <= pivot]
        right = [x for x in nums[:-1] if x > pivot]
        return self.quickSort(left) + [pivot] + self.quickSort(right)`,
      cpp: `class Solution {
public:
    vector<int> quickSort(vector<int>& nums) {
        quickSortHelper(nums, 0, nums.size() - 1);
        return nums;
    }
    void quickSortHelper(vector<int>& nums, int low, int high) {
        if (low >= high) return;
        int pivot = nums[high], i = low;
        for (int j = low; j < high; j++) {
            if (nums[j] <= pivot) swap(nums[i++], nums[j]);
        }
        swap(nums[i], nums[high]);
        quickSortHelper(nums, low, i - 1);
        quickSortHelper(nums, i + 1, high);
    }
};`,
      java: `class Solution {
    public int[] quickSort(int[] nums) {
        qs(nums, 0, nums.length - 1);
        return nums;
    }
    private void qs(int[] nums, int low, int high) {
        if (low >= high) return;
        int pivot = nums[high], i = low;
        for (int j = low; j < high; j++) {
            if (nums[j] <= pivot) { int t = nums[i]; nums[i] = nums[j]; nums[j] = t; i++; }
        }
        int t = nums[i]; nums[i] = nums[high]; nums[high] = t;
        qs(nums, low, i - 1);
        qs(nums, i + 1, high);
    }
}`,
    },
    explanation: 'Choose a pivot element, partition the array into elements less than and greater than the pivot, then recursively sort both partitions.',
    timeComplexity: 'O(N log N) average, O(N²) worst case.',
    spaceComplexity: 'O(log N) — Recursion stack depth.',
    hint: 'Pick a pivot, partition elements into smaller/larger groups, recurse on each group.',
  },

  {
    id: 'hashing-duplicates',
    slug: 'hashing-duplicates',
    title: 'Find Duplicate Elements',
    difficulty: 'Easy',
    topic: 'Hashing',
    acceptance: '78%',
    evalFnName: 'findDuplicateElements',
    description: 'Find all elements that occur more than once in an array. Return them sorted, or "No duplicates" if none.',
    examples: [
      { input: 'nums = [1, 2, 3, 2, 4, 1]', output: '[1, 2]', explanation: '1 and 2 appear more than once.' },
    ],
    constraints: ['1 <= N <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [1, 2, 3, 2, 4, 1]', args: [[1, 2, 3, 2, 4, 1]], expected: '[1, 2]' },
      { id: 2, name: 'Case 2', input: 'nums = [1, 2, 3, 4, 5]', args: [[1, 2, 3, 4, 5]], expected: '"No duplicates"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]|string}
 */
function findDuplicateElements(nums) {
  // Your code here
}`,
      python: `class Solution:
    def findDuplicateElements(self, nums: list[int]):
        # Your code here
        pass`,
      cpp: `#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> findDuplicateElements(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `import java.util.*;

class Solution {
    public Object findDuplicateElements(int[] nums) {
        // Your code here
        return null;
    }
}`,
    },
    solution: {
      javascript: `function findDuplicateElements(nums) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);
  const dups = [...freq.entries()].filter(([k, v]) => v > 1).map(([k]) => k).sort((a, b) => a - b);
  return dups.length > 0 ? dups : "No duplicates";
}`,
      python: `class Solution:
    def findDuplicateElements(self, nums: list[int]):
        from collections import Counter
        dups = sorted(k for k, v in Counter(nums).items() if v > 1)
        return dups if dups else "No duplicates"`,
      cpp: `class Solution {
public:
    vector<int> findDuplicateElements(vector<int>& nums) {
        unordered_map<int,int> freq;
        for (int n : nums) freq[n]++;
        vector<int> dups;
        for (auto& [k, v] : freq) if (v > 1) dups.push_back(k);
        sort(dups.begin(), dups.end());
        return dups;
    }
};`,
      java: `class Solution {
    public Object findDuplicateElements(int[] nums) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int n : nums) freq.merge(n, 1, Integer::sum);
        List<Integer> dups = new ArrayList<>();
        freq.forEach((k, v) -> { if (v > 1) dups.add(k); });
        Collections.sort(dups);
        return dups.isEmpty() ? "No duplicates" : dups;
    }
}`,
    },
    explanation: 'Count frequency of each element using a HashMap. Collect elements with frequency > 1.',
    timeComplexity: 'O(N) — Single pass to count, then iterate over unique elements.',
    spaceComplexity: 'O(N) — HashMap for frequencies.',
    hint: 'Count frequencies with a HashMap, then filter for elements appearing more than once.',
  },

  {
    id: 'first-repeating-element',
    slug: 'first-repeating-element',
    title: 'Find First Repeating Element',
    difficulty: 'Medium',
    topic: 'Hashing',
    acceptance: '73%',
    evalFnName: 'firstRepeatingElement',
    description: 'Find the first element that repeats in an array (the element whose second occurrence comes earliest).',
    examples: [
      { input: 'nums = [10, 5, 3, 4, 3]', output: '3', explanation: '3 is the first element to have a repeat.' },
    ],
    constraints: ['1 <= N <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [10, 5, 3, 4, 3]', args: [[10, 5, 3, 4, 3]], expected: '3' },
      { id: 2, name: 'Case 2', input: 'nums = [1, 2, 3, 4, 1]', args: [[1, 2, 3, 4, 1]], expected: '1' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function firstRepeatingElement(nums) {
  // Your code here
}`,
      python: `class Solution:
    def firstRepeatingElement(self, nums: list[int]) -> int:
        # Your code here
        pass`,
      cpp: `#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    int firstRepeatingElement(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `import java.util.*;

class Solution {
    public int firstRepeatingElement(int[] nums) {
        // Your code here
        return -1;
    }
}`,
    },
    solution: {
      javascript: `function firstRepeatingElement(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return n;
    seen.add(n);
  }
  return -1;
}`,
      python: `class Solution:
    def firstRepeatingElement(self, nums: list[int]) -> int:
        seen = set()
        for n in nums:
            if n in seen: return n
            seen.add(n)
        return -1`,
      cpp: `class Solution {
public:
    int firstRepeatingElement(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) {
            if (seen.count(n)) return n;
            seen.insert(n);
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int firstRepeatingElement(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int n : nums) {
            if (!seen.add(n)) return n;
        }
        return -1;
    }
}`,
    },
    explanation: 'Scan left to right with a HashSet. The first element already in the set is the first repeating element.',
    timeComplexity: 'O(N) — Single pass with O(1) set operations.',
    spaceComplexity: 'O(N) — HashSet for seen elements.',
    hint: 'Use a Set. The first element you try to add that already exists is the answer.',
  },

  {
    id: 'two-sum-dsa',
    slug: 'two-sum-dsa',
    title: 'Two Sum (DSA)',
    difficulty: 'Easy',
    topic: 'Hashing',
    acceptance: '75%',
    evalFnName: 'twoSumDSA',
    description: 'Find two indices whose corresponding values add up to the target. Return zero-based indices.',
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9.' },
      { input: 'nums = [3, 2, 4, 8, 1], target = 6', output: '[1, 2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6.' },
    ],
    constraints: ['Exactly one valid pair exists.', 'Return zero-based indices.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [2, 7, 11, 15], target = 9', args: [[2, 7, 11, 15], 9], expected: '[0, 1]' },
      { id: 2, name: 'Case 2', input: 'nums = [3, 2, 4, 8, 1], target = 6', args: [[3, 2, 4, 8, 1], 6], expected: '[1, 2]' },
      { id: 3, name: 'Case 3', input: 'nums = [3, 3, 5], target = 6', args: [[3, 3, 5], 6], expected: '[0, 1]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSumDSA(nums, target) {
  // Your code here
}`,
      python: `class Solution:
    def twoSumDSA(self, nums: list[int], target: int) -> list[int]:
        # Your code here
        pass`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSumDSA(vector<int>& nums, int target) {
        // Your code here
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] twoSumDSA(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
}`,
    },
    solution: {
      javascript: `function twoSumDSA(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `class Solution:
    def twoSumDSA(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, n in enumerate(nums):
            comp = target - n
            if comp in seen: return [seen[comp], i]
            seen[n] = i
        return []`,
      cpp: `class Solution {
public:
    vector<int> twoSumDSA(vector<int>& nums, int target) {
        unordered_map<int,int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int comp = target - nums[i];
            if (seen.count(comp)) return {seen[comp], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `class Solution {
    public int[] twoSumDSA(int[] nums, int target) {
        Map<Integer,Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) return new int[]{map.get(comp), i};
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
    },
    explanation: 'Use a HashMap to store each number and its index. For each element, check if the complement (target - current) exists in the map.',
    timeComplexity: 'O(N) — Single pass with O(1) map lookups.',
    spaceComplexity: 'O(N) — HashMap for storing values.',
    hint: 'Use a HashMap: for each element, check if (target - element) was already seen.',
  },

  {
    id: 'pair-given-sum-sorted-array',
    slug: 'pair-given-sum-sorted-array',
    title: 'Find Pair with Given Sum in Sorted Array',
    difficulty: 'Easy',
    topic: 'Two Pointers',
    acceptance: '77%',
    evalFnName: 'findPairWithSum',
    description: 'Find a pair of elements in a sorted array whose sum equals the target. Return the pair values.',
    examples: [
      { input: 'nums = [1, 2, 4, 6, 8], target = 10', output: '[2, 8]', explanation: '2 + 8 = 10.' },
    ],
    constraints: ['Array is sorted.', 'Return the pair values.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [1, 2, 4, 6, 8], target = 10', args: [[1, 2, 4, 6, 8], 10], expected: '[2, 8]' },
      { id: 2, name: 'Case 2', input: 'nums = [1, 3, 5, 7, 9], target = 10', args: [[1, 3, 5, 7, 9], 10], expected: '[1, 9]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function findPairWithSum(nums, target) {
  // Your code here
}`,
      python: `class Solution:
    def findPairWithSum(self, nums: list[int], target: int) -> list[int]:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> findPairWithSum(vector<int>& nums, int target) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int[] findPairWithSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
}`,
    },
    solution: {
      javascript: `function findPairWithSum(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [nums[left], nums[right]];
    if (sum < target) left++;
    else right--;
  }
  return [];
}`,
      python: `class Solution:
    def findPairWithSum(self, nums: list[int], target: int) -> list[int]:
        left, right = 0, len(nums) - 1
        while left < right:
            s = nums[left] + nums[right]
            if s == target: return [nums[left], nums[right]]
            elif s < target: left += 1
            else: right -= 1
        return []`,
      cpp: `class Solution {
public:
    vector<int> findPairWithSum(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) return {nums[left], nums[right]};
            if (sum < target) left++;
            else right--;
        }
        return {};
    }
};`,
      java: `class Solution {
    public int[] findPairWithSum(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) return new int[]{nums[left], nums[right]};
            if (sum < target) left++;
            else right--;
        }
        return new int[]{};
    }
}`,
    },
    explanation: 'Use two pointers at both ends of the sorted array. If sum is too small, move left pointer right; if too large, move right pointer left.',
    timeComplexity: 'O(N) — Each pointer moves at most N times.',
    spaceComplexity: 'O(1) — Only two pointer variables.',
    hint: 'Use two pointers: one at the start, one at the end. Adjust based on the sum.',
  },

  {
    id: 'reverse-array-two-pointers',
    slug: 'reverse-array-two-pointers',
    title: 'Reverse an Array In-Place',
    difficulty: 'Easy',
    topic: 'Two Pointers',
    acceptance: '91%',
    evalFnName: 'reverseArrayInPlace',
    description: 'Reverse an array in-place using the two-pointer technique with O(1) extra space. Return the reversed array.',
    examples: [
      { input: 'nums = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]', explanation: 'Reversed in-place.' },
    ],
    constraints: ['1 <= N <= 100000', 'Use O(1) extra space.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [1, 2, 3, 4, 5]', args: [[1, 2, 3, 4, 5]], expected: '[5, 4, 3, 2, 1]' },
      { id: 2, name: 'Case 2', input: 'nums = [10, 20, 30, 40]', args: [[10, 20, 30, 40]], expected: '[40, 30, 20, 10]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function reverseArrayInPlace(nums) {
  // Your code here
}`,
      python: `class Solution:
    def reverseArrayInPlace(self, nums: list[int]) -> list[int]:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> reverseArrayInPlace(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int[] reverseArrayInPlace(int[] nums) {
        // Your code here
        return new int[]{};
    }
}`,
    },
    solution: {
      javascript: `function reverseArrayInPlace(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
  return nums;
}`,
      python: `class Solution:
    def reverseArrayInPlace(self, nums: list[int]) -> list[int]:
        left, right = 0, len(nums) - 1
        while left < right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1; right -= 1
        return nums`,
      cpp: `class Solution {
public:
    vector<int> reverseArrayInPlace(vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        while (left < right) swap(nums[left++], nums[right--]);
        return nums;
    }
};`,
      java: `class Solution {
    public int[] reverseArrayInPlace(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int tmp = nums[left]; nums[left] = nums[right]; nums[right] = tmp;
            left++; right--;
        }
        return nums;
    }
}`,
    },
    explanation: 'Place two pointers at the start and end. Swap the elements they point to and move both inward until they meet.',
    timeComplexity: 'O(N) — Half the array is swapped.',
    spaceComplexity: 'O(1) — In-place, no extra array.',
    hint: 'Swap elements at left and right pointers, then move them inward.',
  },

  {
    id: 'reverse-linked-list',
    slug: 'reverse-linked-list',
    title: 'Reverse a Linked List',
    difficulty: 'Medium',
    topic: 'Linked List',
    acceptance: '68%',
    evalFnName: 'reverseLinkedList',
    description: 'Reverse a singly linked list represented as an array (for simplicity) and return the reversed array.',
    examples: [
      { input: 'nums = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]', explanation: 'List reversed.' },
    ],
    constraints: ['1 <= N <= 100000'],
    testCases: [
      { id: 1, name: 'Case 1', input: 'nums = [1, 2, 3, 4, 5]', args: [[1, 2, 3, 4, 5]], expected: '[5, 4, 3, 2, 1]' },
      { id: 2, name: 'Case 2', input: 'nums = [10, 20, 30]', args: [[10, 20, 30]], expected: '[30, 20, 10]' },
      { id: 3, name: 'Case 3', input: 'nums = [5]', args: [[5]], expected: '[5]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums - linked list as array
 * @return {number[]}
 */
function reverseLinkedList(nums) {
  // Your code here
}`,
      python: `class Solution:
    def reverseLinkedList(self, nums: list[int]) -> list[int]:
        # Your code here
        pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> reverseLinkedList(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int[] reverseLinkedList(int[] nums) {
        // Your code here
        return new int[]{};
    }
}`,
    },
    solution: {
      javascript: `function reverseLinkedList(nums) {
  // Simulate linked list reversal with pointer manipulation
  let prev = null, current = 0;
  const next = new Array(nums.length);
  for (let i = 0; i < nums.length - 1; i++) next[i] = i + 1;
  next[nums.length - 1] = null;

  while (current !== null) {
    const nxt = next[current];
    next[current] = prev;
    prev = current;
    current = nxt;
  }

  const result = [];
  let node = prev;
  while (node !== null) {
    result.push(nums[node]);
    node = next[node];
  }
  return result;
}`,
      python: `class Solution:
    def reverseLinkedList(self, nums: list[int]) -> list[int]:
        return nums[::-1]`,
      cpp: `class Solution {
public:
    vector<int> reverseLinkedList(vector<int>& nums) {
        reverse(nums.begin(), nums.end());
        return nums;
    }
};`,
      java: `class Solution {
    public int[] reverseLinkedList(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int tmp = nums[left]; nums[left] = nums[right]; nums[right] = tmp;
            left++; right--;
        }
        return nums;
    }
}`,
    },
    explanation: "In a real linked list, maintain three pointers: prev, current, and next. At each step, reverse the current node's pointer to point to prev, then advance all three pointers.",
    timeComplexity: 'O(N) — Single traversal of the list.',
    spaceComplexity: 'O(1) — In-place pointer reversal.',
    hint: 'Use three pointers: prev, current, next. Reverse each link as you traverse.',
  },

  {
    id: 'balanced-parentheses',
    slug: 'balanced-parentheses',
    title: 'Check Balanced Parentheses',
    difficulty: 'Medium',
    topic: 'Stack',
    acceptance: '73%',
    evalFnName: 'isBalancedParentheses',
    description: 'Check whether all brackets in a string are correctly balanced and properly nested. Return "Balanced" or "Not Balanced".',
    examples: [
      { input: 's = "()[]{}"', output: '"Balanced"', explanation: 'All brackets are properly closed.' },
      { input: 's = "([{}])"', output: '"Balanced"', explanation: 'Nested brackets are properly matched.' },
      { input: 's = "([)]"', output: '"Not Balanced"', explanation: 'Brackets are improperly nested.' },
    ],
    constraints: ['1 <= string length <= 100000', 'String contains (), {}, and [] brackets.'],
    testCases: [
      { id: 1, name: 'Case 1', input: 's = "()[]{}"', args: ['()[]{}'], expected: '"Balanced"' },
      { id: 2, name: 'Case 2', input: 's = "([{}])"', args: ['([{}])'], expected: '"Balanced"' },
      { id: 3, name: 'Case 3', input: 's = "([)]"', args: ['([)]'], expected: '"Not Balanced"' },
      { id: 4, name: 'Case 4', input: 's = "((("', args: ['((('], expected: '"Not Balanced"' },
      { id: 5, name: 'Case 5', input: 's = "{[()]}"', args: ['{[()]}'], expected: '"Balanced"' },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
function isBalancedParentheses(s) {
  // Your code here
}`,
      python: `class Solution:
    def isBalancedParentheses(self, s: str) -> str:
        # Your code here
        pass`,
      cpp: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    string isBalancedParentheses(string s) {
        // Your code here
    }
};`,
      java: `import java.util.*;

class Solution {
    public String isBalancedParentheses(String s) {
        // Your code here
        return "";
    }
}`,
    },
    solution: {
      javascript: `function isBalancedParentheses(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if ('({['.includes(ch)) {
      stack.push(ch);
    } else if (')}]'.includes(ch)) {
      if (stack.length === 0 || stack.pop() !== map[ch]) return "Not Balanced";
    }
  }
  return stack.length === 0 ? "Balanced" : "Not Balanced";
}`,
      python: `class Solution:
    def isBalancedParentheses(self, s: str) -> str:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for ch in s:
            if ch in '({[':
                stack.append(ch)
            elif ch in ')}]':
                if not stack or stack.pop() != mapping[ch]:
                    return "Not Balanced"
        return "Balanced" if not stack else "Not Balanced"`,
      cpp: `class Solution {
public:
    string isBalancedParentheses(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else if (c == ')' || c == '}' || c == ']') {
                if (st.empty()) return "Not Balanced";
                char top = st.top(); st.pop();
                if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '['))
                    return "Not Balanced";
            }
        }
        return st.empty() ? "Balanced" : "Not Balanced";
    }
};`,
      java: `class Solution {
    public String isBalancedParentheses(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        Map<Character, Character> map = Map.of(')', '(', '}', '{', ']', '[');
        for (char c : s.toCharArray()) {
            if ("({[".indexOf(c) >= 0) stack.push(c);
            else if (")}]".indexOf(c) >= 0) {
                if (stack.isEmpty() || stack.pop() != map.get(c)) return "Not Balanced";
            }
        }
        return stack.isEmpty() ? "Balanced" : "Not Balanced";
    }
}`,
    },
    explanation: 'Use a stack: push opening brackets, and for each closing bracket, pop and verify it matches. If the stack is empty at the end, the brackets are balanced.',
    timeComplexity: 'O(N) — Single pass through the string.',
    spaceComplexity: 'O(N) — Stack for opening brackets.',
    hint: 'Use a stack: push opening brackets, pop on closing brackets and check for matching.',
  },
];

export const codeLibrary = {
  algorithms: [
    {
      title: 'Binary Search (Iterative)',
      category: 'Searching',
      code: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
    },
    {
      title: 'Breadth-First Search (BFS)',
      category: 'Graphs',
      code: `function bfs(graph, startNode) {
  const visited = new Set([startNode]);
  const queue = [startNode];
  const order = [];

  while (queue.length > 0) {
    const current = queue.shift();
    order.push(current);

    for (const neighbor of graph[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
    },
    {
      title: 'Depth-First Search (DFS)',
      category: 'Graphs',
      code: `function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  console.log(node);

  for (const neighbor of graph[node] || []) {
    dfs(graph, neighbor, visited);
  }
  return visited;
}`,
    },
    {
      title: 'Merge Sort',
      category: 'Sorting',
      code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    },
  ],
  templates: [
    {
      title: 'Sliding Window (Dynamic Size)',
      category: 'Two Pointers',
      code: `function slidingWindow(s) {
  let left = 0;
  let maxLen = 0;
  const state = new Map();

  for (let right = 0; right < s.length; right++) {
    // Add s[right] to state
    while (/* condition violated */ false) {
      // Remove s[left] from state
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    },
    {
      title: 'Monotonic Stack Template',
      category: 'Stack',
      code: `function nextGreaterElement(nums) {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack = []; // indices of monotonically decreasing elements

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      const idx = stack.pop();
      result[idx] = nums[i];
    }
    stack.push(i);
  }
  return result;
}`,
    },
  ],
};

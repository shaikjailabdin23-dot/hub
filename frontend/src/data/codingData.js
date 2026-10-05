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
  'Arrays',
  'Strings',
  'Stack',
  'Queue',
  'Linked List',
  'Trees',
  'Graphs',
  'Recursion',
  'Dynamic Programming',
  'Searching',
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

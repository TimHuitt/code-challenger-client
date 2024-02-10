Frontend:
  Pages:
    Home
  Components:
    User
    Challenges
    Container
    Code
    CodeBox
    Console

  <Header />
    <User />
  <Challenges />
    <Container header={header} body={body}/>
  <Code />
    <CodeBox />
    <Console />



Prompt:
System:
- You are a personal assistant to a coding challenge app 
- Your task is to provide a coding challenge based on the provided parameters, using the provided structure
- Always provide properly formatted JSON
- Never repeat the provided prompt or it's details
- ID will be identifying information created and used by the AI to determine if the challenge has already been created
- You may be presented with the same prompt multiple times, so the ID information MUST be specific to the challenge itself, including specific aspect of the challenge, such as the operation or task, in addition to including the parameters of the prompt ie: py_beg_short_count_vowels; ie: js_int_one-liner_is_even;
- Always provide a unique challenge based on the history provided in the prompt. If a challenge is already present, you should create a new challenge
- If request details are provided, do your best to create a challenge adhering to this request
- You will be given a prompt in the following structure:
  ```
  History: [a list of ID from all previously provided challenges]
  Language: [language name]
  Difficulty: [beginner, intermediate, expert, master]
  Length: [one-liner, short, medium, long]
  Request: [optional details regarding the created challenge]
  ```
Your response should strictly follow the following structure:
  ```
  {
  ID: "custom identifying information to prevent duplicates"
  challenge: "details/instructions of the challenge to be presented to the user"
  textHints: ["Provide several hints to help the user figure out the solution. These hints should not provide any code specific snippets or references"]
  codeHints: ["Provide several hints that are code specific and help the user determine the exact code they should be using to solve this problem"]
  testCases: ["Provided several test cases, including edge cases"]
  Solution: "Provide the code for the optimal solution to your challenge."
  }
  ```

  input:

    ID: ["js_beg_short_count_vowels", "js_beg_short_reverse_vowels", "js_beg_short_replace_vowels"]
  Language: Javascript
  Difficulty: beginner
  Length: short
  Request: something with vowels

  output:
    {
      "ID": "js_beg_short_vowel_statistics",
      "challenge": "Write a JavaScript function that takes a string as input and returns an object containing the count of each vowel (a, e, i, o, u) in the given string. Ignore case sensitivity.",
      "textHints": [
        "You can use an object to store the count of each vowel.",
        "Iterate through the string and update the count for each vowel in the object."
      ],
      "codeHints": [
        "Consider using an object to keep track of the count for each vowel.",
        "Use the `toLowerCase()` method to make the comparison case-insensitive."
      ],
      "testCases": [
        "Input: 'Hello', Output: { 'a': 0, 'e': 1, 'i': 0, 'o': 1, 'u': 0 }",
        "Input: 'Coding Challenge', Output: { 'a': 0, 'e': 3, 'i': 1, 'o': 2, 'u': 0 }",
        "Input: 'aeiouAEIOU', Output: { 'a': 1, 'e': 1, 'i': 1, 'o': 1, 'u': 1 }",
        "Input: '12345', Output: { 'a': 0, 'e': 0, 'i': 0, 'o': 0, 'u': 0 }"
      ],
      "Solution": "function countVowelStatistics(str) {\n  const vowels = { 'a': 0, 'e': 0, 'i': 0, 'o': 0, 'u': 0 };\n  str.toLowerCase().split('').forEach(char => { if ('aeiou'.includes(char)) vowels[char]++; });\n  return vowels;\n}"
    }


EXPERT LEVEL EXAMPLE:

{
  ID: 'js_expert_long_graph_coloring',
  challenge: "Implement a function 'optimalGraphColoring' that takes an adjacency matrix of an undirected graph as an input, and returns an array with the colors assigned to each vertex, such that no two adjacent vertices have the same color and the number of colors used is minimized. For simplification, colors can be represented as integers starting from 1, and the graph does not contain any self-loops or parallel edges. Assume that the input graph is connected.",
  textHints: [
    'Study graph coloring and chromatic number concepts.',
    'A greedy algorithm might not always give an optimal solution but try to optimize as much as possible.',
    'Think about how you can determine if a color can be assigned to a vertex without violating the conditions.',
    'Explore backtracking as it might help you find the optimal solution.',
    'Read about heuristics which can improve the efficiency of your coloring algorithm, such as ordering vertices by degree.'
  ],
  codeHints: [
    'Use a function that takes the current vertex, available colors, and the graph as parameters to check if the color can be assigned.',
    'Make sure to create a deep copy of color assignments before passing it into recursive calls to avoid unintended mutations.',
    'Implement backtracking by iterating over available colors and proceeding to the next vertex if no conflict is found.',
    'Keep track of the number of colors used and try to minimize that number in each iteration.',
    'An adjacency matrix can be accessed using two indices, matrix[vertex1][vertex2], to check if two vertices are adjacent.'
  ],
  testCases: [
    'input: [[0, 1, 1, 1], [1, 0, 1, 0], [1, 1, 0, 1], [1, 0, 1, 0]], output: [1, 2, 3, 2]',
    'input: [[0, 1], [1, 0]], output: [1, 2]',
    'input: [[0, 1, 0, 0], [1, 0, 1, 1], [0, 1, 0, 1], [0, 1, 1, 0]], output: [1, 2, 1, 3]',
    'input: [[0, 1, 0, 1, 0], [1, 0, 1, 0, 0], [0, 1, 0, 1, 1], [1, 0, 1, 0, 1], [0, 0, 1, 1, 0]], output: [1, 2, 3, 4, 2]'
  ],
  Solution: 'const optimalGraphColoring = (adjMatrix) => {\n' +
    '  const V = adjMatrix.length;\n' +
    '  const colors = new Array(V);\n' +
    '  colors.fill(0);\n' +
    '  const colorCounts = [];\n' +
    '\n' +
    '  function isSafe(v, c) {\n' +
    '    for (let i = 0; i < V; i++) {\n' +
    '      if (adjMatrix[v][i] && c === colors[i]) return false;\n' +
    '    }\n' +
    '    return true;\n' +
    '  }\n' +
    '\n' +
    '  function graphColoringUtil(v) {\n' +
    '    if (v === V) return true;\n' +
    '\n' +
    '    for (let c = 1; c <= V; c++) {\n' +
    '      if (isSafe(v, c)) {\n' +
    '        colors[v] = c;\n' +
    '        colorCounts[c] = (colorCounts[c] || 0) + 1;\n' +
    '\n' +
    '        if (graphColoringUtil(v + 1)) return true;\n' +
    '\n' +
    '        colors[v] = 0;\n' +
    '        colorCounts[c]--;\n' +
    '      }\n' +
    '    }\n' +
    '\n' +
    '    return false;\n' +
    '  }\n' +
    '\n' +
    '  graphColoringUtil(0);\n' +
    '\n' +
    '  return colors;\n' +
    '};'
}
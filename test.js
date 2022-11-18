const { solution } = require('./path-problem');

const board1 = [
  "X.....>",
  "..v....",
  ".>.....",
  "A....^."
]

const board2 = [
  "X......",
  "A..X...",
]

const board3 = [
  "...Xv",
  "AX..^",
  ".XX..",
]

const board4 = [
  "..v",
  "..A"
]

test('Test with bad board', () => {
  expect(solution(board1)).toEqual(false)
})

test('Test with good board', () => {
  expect(solution(board2)).toEqual(true)
})

test('Test with good board', () => {
  expect(solution(board3)).toEqual(true)
})
test('Test with bad board', () => {
  expect(solution(board4)).toEqual(false)
})
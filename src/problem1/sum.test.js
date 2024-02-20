const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require("./sum.js");

test("sum_a to a positive number", () => {
  expect(sum_to_n_a(3)).toBe(6);
});

test("should throw an error if called with a negative input - sum_to_n_a", () => {
  expect(() => sum_to_n_a(-1)).toThrowError(
    "Invalid input for n. The function returns a sum from 1 to n. Cannot sum to a negative integer"
  );
});

test("sum_b to a positive number", () => {
  expect(sum_to_n_b(3)).toBe(6);
});

test("should throw an error if called with a negative input - sum_to_n_b", () => {
  expect(() => sum_to_n_b(-2)).toThrowError(
    "Invalid input for n. The function returns a sum from 1 to n. Cannot sum to a negative integer"
  );
});

test("sum_c to a postive number", () => {
  expect(sum_to_n_c(3)).toBe(6);
});

test("should throw an error if called with a negative input - sum_to_n_c", () => {
  expect(() => sum_to_n_c(-4)).toThrowError(
    "Invalid input for n. The function returns a sum from 1 to n. Cannot sum to a negative integer"
  );
});

var sum_to_n_a = function (n) {
    if (n < 0) {
      throw new Error(
        "Invalid input for n. The function returns a sum from 1 to n. Cannot sum to a negative integer"
      );
    }
    let sum = 0;
    for (i = 1; i < n + 1; i++) {
      sum += i;
    }
    return sum;
  };
  
  
  var sum_to_n_b = function (n) {
    if (n < 0) {
      throw new Error(
        "Invalid input for n. The function returns a sum from 1 to n. Cannot sum to a negative integer"
      );
    }
    return n === 0 ? 0 : n === 1 ? 1 : n + sum_to_n_b(n - 1);
  };
  
  
  var sum_to_n_c = function (n) {
    if (n < 0) {
      throw new Error(
        "Invalid input for n. The function returns a sum from 1 to n. Cannot sum to a negative integer"
      );
    }
    return (n * (n + 1)) / 2;
  };
  
  
  module.exports = { sum_to_n_a, sum_to_n_b, sum_to_n_c };
  
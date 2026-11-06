// 2.1-3：生成 10 个 0 到 100 的随机整数，并计算总和与平均值。

function generateRandomIntegers(count = 10, random = Math.random) {
  return Array.from({ length: count }, () => Math.floor(random() * 101));
}

function calculateStats(numbers) {
  if (numbers.length === 0) {
    return { total: 0, average: 0 };
  }
  const total = numbers.reduce((sum, number) => sum + number, 0);
  return { total, average: total / numbers.length };
}

if (require.main === module) {
  const numbers = generateRandomIntegers();
  const { total, average } = calculateStats(numbers);
  console.log("随机数组：", numbers);
  console.log("总和：", total);
  console.log("平均值：", average);
}

module.exports = { generateRandomIntegers, calculateStats };


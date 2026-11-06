// 2.2-1：使用 rest 参数接收任意数量的参数并求和。

function sum(...numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}

if (require.main === module) {
  console.log("sum(1, 2, 3) =", sum(1, 2, 3));
  console.log("sum() =", sum());
}

module.exports = { sum };


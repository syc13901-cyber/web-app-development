// 2.1-2：分别使用 for 和 while 计算 1 到 100 的和。

function sumWithFor(start, end) {
  let total = 0;
  for (let i = start; i <= end; i++) {
    total += i;
  }
  return total;
}

function sumWithWhile(start, end) {
  let total = 0;
  let i = start;
  while (i <= end) {
    total += i;
    i++;
  }
  return total;
}

if (require.main === module) {
  console.log("for 求和结果：", sumWithFor(1, 100));
  console.log("while 求和结果：", sumWithWhile(1, 100));
}

module.exports = { sumWithFor, sumWithWhile };


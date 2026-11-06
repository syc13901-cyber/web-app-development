// 2.1-4：解释并修正 sort() 的默认字典序陷阱。

function numericAscending(numbers) {
  return [...numbers].sort((a, b) => a - b);
}

if (require.main === module) {
  const numbers = [10, 2, 3];
  console.log("默认 sort()：", [...numbers].sort());
  console.log("原因：sort() 默认把元素转成字符串，按字典序比较，所以字符 '1' 排在 '2' 和 '3' 前面。");
  console.log("数值升序：", numericAscending(numbers));
}

module.exports = { numericAscending };


// 2.1-1：输入身高和体重，计算 BMI 并按四档输出。

function calculateBMI(height, weight) {
  if (!Number.isFinite(height) || height <= 0) {
    throw new RangeError("身高必须是大于 0 的数字");
  }
  if (!Number.isFinite(weight) || weight <= 0) {
    throw new RangeError("体重必须是大于 0 的数字");
  }
  return weight / (height ** 2);
}

function classifyBMI(bmi) {
  if (bmi < 18.5) return "偏瘦";
  if (bmi < 24) return "正常";
  if (bmi < 28) return "超重";
  return "肥胖";
}

function printBMI(height, weight) {
  const bmi = calculateBMI(height, weight);
  console.log(`身高 ${height} m，体重 ${weight} kg，BMI = ${bmi.toFixed(2)}，等级：${classifyBMI(bmi)}`);
}

if (require.main === module) {
  // 题目给定数据 + 另外 3 组数据，覆盖四个等级。
  printBMI(1.75, 70); // 正常
  printBMI(1.80, 55); // 偏瘦
  printBMI(1.65, 70); // 超重
  printBMI(1.60, 80); // 肥胖
}

module.exports = { calculateBMI, classifyBMI };


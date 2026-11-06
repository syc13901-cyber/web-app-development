// 2.2-2：用 map 转换等级，用 filter 筛选及格成绩。

function analyzeScores(scores) {
  const levels = scores.map(score => (score >= 60 ? "及格" : "不及格"));
  const passedScores = scores.filter(score => score >= 60);
  return { levels, passedScores };
}

if (require.main === module) {
  const scores = [45, 60, 78, 90, 55];
  const { levels, passedScores } = analyzeScores(scores);
  console.log("等级数组：", levels);
  console.log("及格成绩：", passedScores);
  console.log("原数组：", scores);
}

module.exports = { analyzeScores };


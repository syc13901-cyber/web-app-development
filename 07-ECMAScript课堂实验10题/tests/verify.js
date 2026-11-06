const assert = require("node:assert/strict");

const { calculateBMI, classifyBMI } = require("../01_bmi");
const { sumWithFor, sumWithWhile } = require("../02_for_while_sum");
const { generateRandomIntegers, calculateStats } = require("../03_random_stats");
const { numericAscending } = require("../04_sort_trap");
const { sum } = require("../05_rest_sum");
const { analyzeScores } = require("../06_map_filter");
const { createPasswordChecker } = require("../07_password_closure");
const { me } = require("../08_me_object");
const { Cat } = require("../09_cat");
const { runPromiseDemo } = require("../10a_promise_download");
const { runAsyncDemo } = require("../10b_async_download");

function pass(number, message) {
  console.log(`✓ ${number} ${message}`);
}

async function main() {
  const bmi = calculateBMI(1.75, 70);
  assert.ok(Math.abs(bmi - 22.8571428571) < 1e-9);
  assert.equal(classifyBMI(18.49), "偏瘦");
  assert.equal(classifyBMI(18.5), "正常");
  assert.equal(classifyBMI(24), "超重");
  assert.equal(classifyBMI(28), "肥胖");
  pass("2.1-1", "BMI 计算和四档边界正确");

  assert.equal(sumWithFor(1, 100), 5050);
  assert.equal(sumWithWhile(1, 100), 5050);
  pass("2.1-2", "for / while 均得到 5050");

  const sequence = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.999999];
  let index = 0;
  const randomNumbers = generateRandomIntegers(10, () => sequence[index++]);
  assert.equal(randomNumbers.length, 10);
  assert.ok(randomNumbers.every(number => Number.isInteger(number) && number >= 0 && number <= 100));
  const stats = calculateStats(randomNumbers);
  assert.equal(stats.average, stats.total / 10);
  pass("2.1-3", "随机整数范围、总和和平均值正确");

  const originalSortInput = [10, 2, 3];
  assert.deepEqual(numericAscending(originalSortInput), [2, 3, 10]);
  assert.deepEqual(originalSortInput, [10, 2, 3]);
  pass("2.1-4", "数值排序输出 [2, 3, 10]");

  assert.equal(sum(1, 2, 3), 6);
  assert.equal(sum(), 0);
  pass("2.2-1", "rest sum 支持任意参数且空参数返回 0");

  const scores = [45, 60, 78, 90, 55];
  const snapshot = [...scores];
  const analyzed = analyzeScores(scores);
  assert.deepEqual(analyzed.levels, ["不及格", "及格", "及格", "及格", "不及格"]);
  assert.deepEqual(analyzed.passedScores, [60, 78, 90]);
  assert.deepEqual(scores, snapshot);
  pass("2.2-2", "map / filter 结果正确且原数组不变");

  const checker = createPasswordChecker("secret");
  assert.deepEqual(Object.keys(checker), ["check"]);
  assert.equal(checker.check("secret"), true);
  assert.equal(checker.check("wrong"), false);
  assert.equal(checker.password, undefined);
  pass("2.2-3", "密码由闭包封装且只暴露 check");

  assert.ok("name" in me && "major" in me && "grade" in me);
  assert.match(me.introduce(), /小李.*网络空间安全.*大2/);
  pass("2.2-4", "对象含 3 个属性，方法使用 this 生成完整介绍");

  const cat1 = new Cat("咪咪");
  const cat2 = new Cat("花花");
  assert.equal(cat1.say(), "我是咪咪");
  assert.equal(cat2.say(), "我是花花");
  assert.equal(cat1.say, cat2.say);
  assert.equal(Object.hasOwn(cat1, "say"), false);
  pass("2.3-1", "两只猫数据独立且共享原型 say 方法");

  for (const [name, runDemo] of [["Promise 链", runPromiseDemo], ["async/await", runAsyncDemo]]) {
    const lines = [];
    const states = await runDemo({ delayMs: 5, log: line => lines.push(line) });
    assert.deepEqual(states.sort(), ["fulfilled", "rejected"]);
    for (const state of ["pending", "fulfilled", "rejected"]) {
      assert.ok(lines.some(line => line.includes(state)), `${name} 缺少 ${state} 输出`);
    }
  }
  pass("2.4-1", "Promise 链和 async/await 两版均打印三态");

  console.log("\n全部 10 道题验收通过。\n");
}

main().catch(error => {
  console.error("验收失败：", error);
  process.exitCode = 1;
});


// 2.2-3：用闭包保存密码，外部只获得 check(input) 接口。

function createPasswordChecker(password) {
  function check(input) {
    return input === password;
  }
  return Object.freeze({ check });
}

if (require.main === module) {
  const checker = createPasswordChecker("scu2026");
  console.log("输入 scu2026：", checker.check("scu2026"));
  console.log("输入 123456：", checker.check("123456"));
  console.log("外部读取 password：", checker.password); // undefined
}

module.exports = { createPasswordChecker };


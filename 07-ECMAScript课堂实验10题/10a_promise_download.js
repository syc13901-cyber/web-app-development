// 2.4-1（版本一）：Promise 链模拟 2 秒下载，并展示三种状态。

function downloadWithPromise(fileName, shouldSucceed = true, delayMs = 2000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve(`${fileName} 下载完成`);
      } else {
        reject(new Error(`${fileName} 下载失败`));
      }
    }, delayMs);
  });
}

function runOnePromiseChain(fileName, shouldSucceed, delayMs, log) {
  log(`[Promise 链] ${fileName}: pending`);
  return downloadWithPromise(fileName, shouldSucceed, delayMs)
    .then(message => {
      log(`[Promise 链] ${fileName}: fulfilled - ${message}`);
      return "fulfilled";
    })
    .catch(error => {
      log(`[Promise 链] ${fileName}: rejected - ${error.message}`);
      return "rejected";
    });
}

function runPromiseDemo({ delayMs = 2000, log = console.log } = {}) {
  return Promise.all([
    runOnePromiseChain("success.zip", true, delayMs, log),
    runOnePromiseChain("failed.zip", false, delayMs, log)
  ]);
}

if (require.main === module) {
  runPromiseDemo();
}

module.exports = { downloadWithPromise, runPromiseDemo };


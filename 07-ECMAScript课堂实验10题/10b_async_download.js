// 2.4-1（版本二）：async/await 模拟 2 秒下载，并展示三种状态。

function download(fileName, shouldSucceed = true, delayMs = 2000) {
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

async function runOneAsyncDownload(fileName, shouldSucceed, delayMs, log) {
  log(`[async/await] ${fileName}: pending`);
  try {
    const message = await download(fileName, shouldSucceed, delayMs);
    log(`[async/await] ${fileName}: fulfilled - ${message}`);
    return "fulfilled";
  } catch (error) {
    log(`[async/await] ${fileName}: rejected - ${error.message}`);
    return "rejected";
  }
}

async function runAsyncDemo({ delayMs = 2000, log = console.log } = {}) {
  return Promise.all([
    runOneAsyncDownload("success.zip", true, delayMs, log),
    runOneAsyncDownload("failed.zip", false, delayMs, log)
  ]);
}

if (require.main === module) {
  runAsyncDemo();
}

module.exports = { download, runAsyncDemo };


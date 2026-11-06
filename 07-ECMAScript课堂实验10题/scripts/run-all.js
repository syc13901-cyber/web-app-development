const { spawnSync } = require("node:child_process");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const files = [
  "01_bmi.js",
  "02_for_while_sum.js",
  "03_random_stats.js",
  "04_sort_trap.js",
  "05_rest_sum.js",
  "06_map_filter.js",
  "07_password_closure.js",
  "08_me_object.js",
  "09_cat.js",
  "10a_promise_download.js",
  "10b_async_download.js"
];

for (const file of files) {
  console.log(`\n========== ${file} ==========`);
  const result = spawnSync(process.execPath, [path.join(root, file)], {
    stdio: "inherit"
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}


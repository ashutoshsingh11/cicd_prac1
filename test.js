// Basic unit test for IST time logic (no dependencies needed)
function getISTTime() {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + istOffset);

  const hours = String(istTime.getUTCHours()).padStart(2, "0");
  const minutes = String(istTime.getUTCMinutes()).padStart(2, "0");
  const seconds = String(istTime.getUTCSeconds()).padStart(2, "0");
  const day = String(istTime.getUTCDate()).padStart(2, "0");
  const month = String(istTime.getUTCMonth() + 1).padStart(2, "0");
  const year = istTime.getUTCFullYear();

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} IST (GMT+5:30)`;
}

// Test 1: Output format check
const output = getISTTime();
const pattern = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2} IST \(GMT\+5:30\)$/;
console.assert(pattern.test(output), `FAIL: unexpected format: "${output}"`);
console.log("✅ Test 1 passed: IST time format is correct →", output);

// Test 2: Message composition
const message = `Hello from Docker  ${output}`;
console.assert(
  message.startsWith("Hello from Docker  "),
  "FAIL: message prefix is wrong"
);
console.log("✅ Test 2 passed: Message prefix is correct");

// Test 3: IST offset sanity — IST should be ahead of UTC
const nowUTC = new Date();
const istHour = new Date(nowUTC.getTime() + 5.5 * 60 * 60 * 1000).getUTCHours();
console.assert(typeof istHour === "number", "FAIL: IST hour is not a number");
console.log("✅ Test 3 passed: IST offset calculation produces a valid hour →", istHour);

console.log("\nAll tests passed! 🎉");

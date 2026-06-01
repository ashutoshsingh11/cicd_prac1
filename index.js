const http = require("http");

const PORT = process.env.PORT || 3000;

function getISTTime() {
  const now = new Date();
  // UTC+5:30 offset in minutes = 330
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

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  const currentTime = getISTTime();
  const message = `Hello from Docker  ${currentTime}`;

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(message);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Current IST time: ${getISTTime()}`);
});

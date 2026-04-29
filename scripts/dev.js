const { spawn } = require("child_process");
const path = require("path");

const isWindows = process.platform === "win32";
const npmCommand = isWindows ? "npm.cmd" : "npm";
const shellCommand = process.env.ComSpec || "cmd.exe";
const rootDir = path.resolve(__dirname, "..");
const clientDir = path.join(rootDir, "portfolio");

const children = [];

function runProcess(label, cwd, args) {
  const child = isWindows
    ? spawn(shellCommand, ["/c", npmCommand, ...args], {
        cwd,
        stdio: "inherit",
        shell: false,
      })
    : spawn(npmCommand, args, {
        cwd,
        stdio: "inherit",
        shell: false,
      });

  child.on("exit", (code, signal) => {
    const reason = signal ? `signal ${signal}` : `code ${code}`;
    console.log(`${label} exited with ${reason}.`);

    if (!shuttingDown) {
      shutdown(code ?? 0);
    }
  });

  children.push(child);
  return child;
}

let shuttingDown = false;

function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }

  process.exit(exitCode);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

console.log("Starting backend on http://localhost:3001 and frontend on http://localhost:5173");

runProcess("backend", rootDir, ["run", "server"]);
runProcess("frontend", clientDir, ["run", "dev"]);

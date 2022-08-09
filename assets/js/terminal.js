let userInput, terminalOutput;
let projAsk = false;
let lastCommands = [];


const COMMANDS = {
  ls:
    "about&nbsp;&nbsp;&nbsp;&nbsp;experience&nbsp;&nbsp;&nbsp;&nbsp;publications&nbsp;&nbsp;&nbsp;&nbsp;repositories&nbsp;&nbsp;&nbsp;&nbsp;cv",
  cd: "changed directory to root..",
  "cd about": "Opening Mihir's 'About' section...",
  "cd publications": "Opening Mihir's 'Publications' section...",
  "cd experience": "Opening Mihir's 'Experience' section...",
  "cd cv": "Opening Mihir's 'cv' section...",
  "cd repositories": "Opening Mihir's 'repositories' section...",
  "exit": "Exiting terminal...",

  "cd ..": "cd: no such file or directory",
  sudo: "user not in the sudoers file.  This incident will be reported.",
  help:
    'System commands: <span class="code">clear</span>, <span class="code">history</span>, <span class="code">cd</span>, <span class="code">ls</span>, <span class="code">exit</span> <br> Supported commands: <span class="code">info</span>, <span class="code">github</span>, <span class="code">linkedin</span><br>Tip: Use Up / Down arrow to go through recent commands',
  info:
    "<span class='aboutHead'>Name:</span> Mihir<br><span class='aboutHead'>Location:</span> Atlanta<br><span class='aboutHead'>Favourites:</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='aboutTail'>Os</span>: Arch, MacOs&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='aboutTail'>Editor</span>: Vim, Nova<br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class='aboutTail'>Version Control</span>: Git<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='aboutTail'>Tabs or Spaces</span>: Depends usually <i>Tabs</i><br>&nbsp;&nbsp;&nbsp;&nbsp;"
};

const app = () => {
  userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  document.getElementById("dummyKeyboard").focus();
  console.log("Application loaded");
};

const execute = function executeCommand(input) {
  input = input.toLowerCase();
  lastCommands.push(input);
  let delay = 2000;
  let output;
  if (input.length === 0) {
    return;
  }
  if (input.indexOf("sudo") >= 0) {
    input = "sudo";
  }

  if (input == "cd about" || input=="exit") {
    printout(input)
    setTimeout(function() {
      open("/","_self");
    }, delay);
  } else if (input == "cd experience") {
    printout(input)
    setTimeout(function() {
      open("/experience/","_self");
    }, delay);
  } else if (input == "cd publications") {
    printout(input)
    setTimeout(function() {
      open("/publications/","_self");
    }, delay);
  } else if (input == "cd cv") {
    printout(input)
    setTimeout(function() {
      open("/cv/","_self");
    }, delay);
  } else if (input == "cd repositories") {
    printout(input)
    setTimeout(function() {
      open("/repositories/","_self");
    }, delay);
  } else if (input === "clear" || input === "cls") {
    clearScreen();
  } else if (input === "history") {
    showHist();
  } else if (input === "github") {
    open("https://github.com/MihirBafna");
  } else {
    printout(input)
  }
};

function printout(input) {
  output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
  if (!COMMANDS.hasOwnProperty(input)) {
    output += `<div class="terminal-line">command not found: ${input}</div>`;
  } else {
    output += COMMANDS[input];
  }
  
  terminalOutput.innerHTML = `${terminalOutput.innerHTML}<br><div class="terminal-line">${output}<br></div>`;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}


const key = (e) => {
  const input = userInput.innerHTML;

  if (e.key === "Enter") {
    execute(input);
    userInput.innerHTML = "";
    return;
  }

  userInput.innerHTML = input + e.key;
};

const backspace = (e) => {
  if (e.keyCode !== 8 && e.keyCode !== 46) {
    return;
  }
  userInput.innerHTML = userInput.innerHTML.slice(
    0,
    userInput.innerHTML.length - 1
  );
};

function showHist() {
  terminalOutput.innerHTML = `${
    terminalOutput.innerHTML
  }<div class="terminal-line">${lastCommands.join(", ")}</div>`;
}

let iter = 0;
const up = (e) => {
  if (e.key === "ArrowUp") {
    if (lastCommands.length > 0 && iter < lastCommands.length) {
      iter += 1;
      userInput.innerHTML = lastCommands[lastCommands.length - iter];
    }
  }

  if (e.key === "ArrowDown") {
    if (lastCommands.length > 0 && iter > 1) {
      iter -= 1;
      userInput.innerHTML = lastCommands[lastCommands.length - iter];
    }
  }
};

function clearScreen() {
  location.reload();
}
document.addEventListener("keydown", up);

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);
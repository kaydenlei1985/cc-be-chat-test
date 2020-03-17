const inquirer = require('inquirer');
const WebSocket = require('ws');  

const wsclient = new WebSocket("ws://127.0.0.1:8080");

wsclient.on('message', function incoming(data) {
  console.log(data+'\n');
});

const run = async () => {
  let name = "";
  while ("" === name){

    // register
    const { name } = await askName();
    if ("" === name){
      continue;
    }
    wsclient.send(JSON.stringify({name: name}));

    // send message
    while (true) {
      const answers = await askChat();
      const { message } = answers;
      if ("" === message){
        continue;
      }

      wsclient.send(JSON.stringify({data:message}));
    }
  }
};

const askChat = () => {
  const questions = [
    {
      name: "message",
      type: "input",
      message: "Enter chat message:"
    }
  ];
  return inquirer.prompt(questions);
};

const askName = () => {
  const questions = [
    {
      name: "name",
      type: "input",
      message: "Enter your name:"
    }
  ];
  return inquirer.prompt(questions);
};

run();

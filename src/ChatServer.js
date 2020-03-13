const ws = require("ws");

const http = require("http");

const Filter = require("./Filter");

const Config = require("./Config");

const History = require("./History");

const Popular = require("./Popular");

const User = require("./User");

class ChatServer {
    constructor() {
        this.userSet = new Set();

        this.userNameMap = new Map();
    
        this.history = new History(Config.historyMaxLen);

        this.filter = new Filter(Config.blackWorldFile);

        this.popular = new Popular(Config.popularTimeLimit);

        this.httpServer = new http.Server();
        
        this.wsServer = new ws.Server({ server: this.httpServer });
     }

     start() {

        // load file first
        this.filter.loadFile().then(() => {
            this.wsServer.on('listening', () => {
                console.log('chat server listening...'); 
            });
    
            this.wsServer.on('connection', (ws, req) => {
               const user = new User(this, ws);
               this.userSet.add(user);
               console.log(`online user count ${this.userSet.size}`);
            });
    
            this.wsServer.on('error', error => {
               console.error('chat server error', error);
            });

            this.httpServer.listen(Config.port);
        });
     }

    onUserLogin(user) {
        this.userNameMap.set(user.name, user);
        user.sendMsg(this.history.getHistoryMsg());
        console.log(`online login user count ${this.userNameMap.size}`);
    }

    onUserSendMsg(user, msg) {
        msg = this.filter.filter(msg);

        if(this.handleUserCommand(user, msg)) {
            return;
        }

        let showMsg = `${user.name}: ${msg}`;

        for (const user of this.userSet) {
            user.sendMsg(showMsg);
        }

        this.history.addMsg(showMsg);
        this.popular.addMsg(user.name, msg);
    }

    onUserLogout(user) {
        this.userSet.delete(user);
        this.userNameMap.delete(user.name);
        console.log(`online user count ${this.userSet.size}`);
        console.log(`online login user count ${this.userNameMap.size}`);
    }

    handleUserCommand(user, msg) {
        if(this.handleCommandPopular(user, msg)) {
            return true;
        }

        if(this.handleCommandStats(user, msg)) {
            return true;
        }

        return false;
    }

    handleCommandPopular(user, msg) {
        if (msg.indexOf('/popular') === 0) {
        const popular = this.popular;
        if(popular) {
            user.sendMsg(`popular world: ${popular.getPopularWord()}`);
        } else {
            user.sendMsg(`there have no popular word`);
        }
            return true;
        }

        return false;
    }

    handleCommandStats(user, msg) {
        if (msg.indexOf('/stats') === 0) {
        const split = msg.split(/\s+/);
        if(split.length < 2) {
            user.sendMsg(`please input username.`);
            return true;
        }

        const targetName = split[1];

        const target = this.userNameMap.get(targetName);
        if (target) {
            user.sendMsg(`user ${targetName} logged in for: ${target.getUserOnlineTime()}`);
        }
        else {
            user.sendMsg(`user ${targetName} not found`);
        }
            return true;
        }

        return false;
    }
}

module.exports = ChatServer;

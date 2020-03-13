class User {
   constructor(server, socket) {
      this.server = server;

      this.socket = socket;

      this.name = null;

      this.socket.onmessage = event => { this.onMessage(event) };

      this.socket.onerror = event => { this.onError(event) };

      this.socket.onclose = event => { this.onClose(event) };
   }

   onMessage(event) {
      try {
         const msg = JSON.parse(event.data);
         if (msg.name) {
            this.name = msg.name;
            this.loginTime = Date.now();

            console.log(`user ${this.name} login in ${this.loginTime}.`);

            this.server.onUserLogin(this);
         }
         else if (msg.data && this.name) {
            this.server.onUserSendMsg(this, msg.data)
         }
      } catch(e) {
         console.error('JSON parse failed:', e);
      }
   }

   onError(event) {
      console.error(`user ${this.name} error:`, event);
   }

   onClose(event) {
      console.log(`user ${this.name} logout.`);
      this.server.onUserLogout(this);
   }

   sendMsg(msg) {
      if(msg) {
         console.log(`send msg to ${this.name}:`, msg);
         this.socket.send(JSON.stringify(msg));
      }
   }

   getUserOnlineTime() {
      return this.formatDurationTime(Date.now() - this.loginTime);
   }

   formatDurationTime(durationTime) {
      let days = durationTime / 1000 / 60 / 60 / 24;
      let daysRound = Math.floor(days);
      let hours = durationTime / 1000 / 60 / 60 - (24 * daysRound);
      let hoursRound = Math.floor(hours);
      let minutes = durationTime / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
      let minutesRound = Math.floor(minutes);
      let seconds = durationTime / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
      durationTime = daysRound + 'd'+ hoursRound + 'h'+ minutesRound + 'm' + seconds + 's';
      return durationTime;
   }
 }

 module.exports = User;
 
class History {

   constructor(maxLen) {
      this.maxLen = maxLen;
      this.msgArray = new Array();
   }

   addMsg(msg) {
      this.msgArray.push(msg)

      if(this.msgArray.length >= this.maxLen * 2) {
         this.msgArray.splice(0, this.msgArray.length - this.maxLen);
      }
   }
   
   getHistoryMsg(){
      if(this.msgArray.length >= this.maxLen) {
         return JSON.stringify(this.msgArray.slice(this.msgArray.length - this.maxLen));
      } else {
         return JSON.stringify(this.msgArray);
      } 
   }
 }
 
 module.exports = History;
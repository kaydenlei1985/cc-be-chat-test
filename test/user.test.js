const WebSocket = require('ws');

let callback = undefined;
const client = new WebSocket('ws://localhost:8080');
client.onmessage = (event) => {
    const data = event.data;
    if (callback) {
        console.log(data);
        callback(data);
    }
}

function sendMsg(data, cb) {
    client.send(typeof data === 'string' ? data : JSON.stringify(data));
    callback = cb || undefined;
}

describe('user', function() {
    it('login', function(done) {
        sendMsg({name: 'test'}, function (res) {
            done();
        });
    });

    it('sendMgs', function(done) {
        sendMsg({data: 'send test msg'}, function (res) {
            done();
        });
    });

    it('popular', function(done) {
        sendMsg({data: '/popular'}, function (res) {
            done();
        });
    });

    it('stats', function(done) {
        sendMsg({data: '/stats test'}, function (res) {
            client.close();
            done();
        });
    });
});

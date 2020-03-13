// const { describe } =  require("mocha");
const expect = require('chai').expect;

const History = require("../src/History");

console.log = () => {};             // disable console.log

describe('history',function(){
    const history = new History(2);

    it('history init', function() {
        expect(JSON.stringify(history.getHistoryMsg())).to.be.equal('"[]"');
    });

    it('history test1',function(){
        history.addMsg('test1');
        expect(JSON.stringify(history.getHistoryMsg())).to.be.equal('"[\\"test1\\"]"');
    });

    it('history test2',function(){
        history.addMsg('test2');
        expect(JSON.stringify(history.getHistoryMsg())).to.be.equal('"[\\"test1\\",\\"test2\\"]"');
    });

    it('history test3',function(){
        history.addMsg('test3');
        expect(JSON.stringify(history.getHistoryMsg())).to.be.equal('"[\\"test2\\",\\"test3\\"]"');
    });
});
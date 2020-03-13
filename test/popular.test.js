// const { describe } =  require("mocha");
const expect = require('chai').expect;

const Popular = require("../src/Popular");

console.log = () => {};             // disable console.log

describe('popular',function(){
    const popular = new Popular(5000);

    it('popular test', function() {
        expect(popular.getPopularWord()).to.be.equal('');
    });

    it('popular test1', function() {
        popular.addMsg('test', 'aaa bbb ccc');
        expect(popular.getPopularWord()).to.be.equal('aaa');
    });

    it('popular test2', function() {
        popular.addMsg('test', 'bbb ccc eee');
        expect(popular.getPopularWord()).to.be.equal('bbb');
    });
});
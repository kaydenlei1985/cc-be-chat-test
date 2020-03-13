const expect = require('chai').expect;

const Config = require("../src/Config");

const Filter = require("../src/Filter");

console.log = () => {};             // disable console.log

describe('filter', function() {
    const filter = new Filter(Config.blackWorldFile);
    it('No match', function(done) {
        filter.loadFile().then(() => {
            expect(filter.filter("aaabbcc")).to.be.equal("aaabbcc");
            done();
        });
    });

    it('Matched', function() {
        expect(filter.filter("4r5egogogo")).to.be.equal("****gogogo");
        expect(filter.filter("b!tchgogogo")).to.be.equal("*****gogogo");
        expect(filter.filter("f u c kgogogo")).to.be.equal("*******gogogo");
    });
});
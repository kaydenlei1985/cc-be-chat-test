const Cache = require("ttl-mem-cache");

class Popular {
    constructor(timeLimit) {
        this.timeLimit = timeLimit;
        this.cache = new Cache();
    }

    addMsg(key, msg) {
        const split = msg.split(/\s+/);
        this.cache.set(key + Date.now().toString(), split, this.timeLimit);
    }

    getPopularWord() {
        let entries = this.cache.entries();
        let arr = []
        entries.forEach(function (wordArray) {
            wordArray.forEach(function (word) {
                arr.push(word)
            })
        })

        let arrIndex = {};
        arr.forEach(function (word) {
            if (arrIndex[word]) {
                arrIndex[word]++
            } else {
                arrIndex[word] = 1;
            }
        });

        let items = Object.keys(arrIndex).map(function (key) {
            return [key, arrIndex[key]];
        });

        items.sort(function (first, second) {
            return second[1] - first[1];
        });

        if (items.length > 0) {
            return items[0][0]
        }
        return '';
    }
}

module.exports = Popular;
const fs = require("fs");

const path = require('path');

const readline = require('readline');

class Filter {
    constructor(filePath) {
        this.sensitiveMap = {};
        this.filePath = filePath;
    }

    async loadFile() {
        var words = await this.loadWords();

        var result = {};
        var count =  words.length;
        for (var i = 0; i < count; ++i) {
            var map = result;
            var word = words[i];
            for (var j = 0; j < word.length; ++j) {
                var c = word.charAt(j);
                if (typeof(map[c]) != "undefined") {
                    map = map[c];
                    if (map["empty"]) {
                       break;
                    }
                } else {
                    if (map["empty"]) { 
                      delete map["empty"]; 
                    }
                    map[c] = {"empty":true};
                    map = map[c];
                }
            }
        }
        this.sensitiveMap = result;

        console.log(`load file ${this.filePath} success`);
    }

    loadWords() {
        return new Promise((resolve, reject) => {
            const words = [];
            let input = fs.createReadStream(path.join(__dirname, this.filePath))
            const rl = readline.createInterface({
                input: input
            });
            rl.on('line', (line) => words.push(line));
            rl.on('close', () => resolve(words));
        });
    }

    replaceAt(string, index, replace) {
      if (index == 0) {
        return replace + string.substring(index + 1);
      }
      return string.substring(0, index) + replace + string.substring(index + 1);
    }

    filter(content) {
        var map = this.sensitiveMap;
        var count = content.length;
        var stack = [];
        var point = map;
        var sensitivesPos = -1;
        var sensitiveIndex = [];
        for (var i = 0; i < count; ++i) {
            var c = content.charAt(i);
            var item = point[c];
            if (typeof(item) == "undefined") {
                i = i - stack.length;
                stack = [];
                point = map;
                sensitivesPos = i;
            } else if (item["empty"]) {
                stack.push(c);
                stack = [];
                point = map;
                let flag = 0
                if (sensitivesPos != 0) flag = sensitivesPos + 1;
                for (; flag <= i; ++flag) {
                  sensitiveIndex.push(flag);
                }
                sensitivesPos = -1;
            } else {
                stack.push(c);
                point = item;
                if (i == 0) {
                    sensitivesPos = i;
                }
            }
        }
        
        for (var i = 0; i < sensitiveIndex.length; ++i) {
            content = this.replaceAt(content, sensitiveIndex[i], "*")
        }
        return content;
    }
}

module.exports = Filter;
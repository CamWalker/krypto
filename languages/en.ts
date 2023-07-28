import fs from "fs";
import path from 'path';

const splitRegex = new RegExp("[^a-zA-Z0-9']+", "g");
const FILE_WORDS = path.join(__dirname, 'words-en.txt');
let maxWordLen = 0;
const wordCost: Map<string, number> = new Map();
let maxCost = 9e999;

export class Messagizer {
    loadDictionary(): Promise<any> {
        return new Promise((resolve) => {
            fs.readFile(FILE_WORDS, 'utf8', function (err, data) {
                if (err)
                    throw err;

                let words = data.split('\n');

                words.forEach(function (word, index) {
									const cost = Math.log((index + 1) * Math.log(words.length));
									wordCost.set(word, cost);
									if (word.length > maxWordLen)
											maxWordLen = word.length;
									if (cost < maxCost)
											maxCost = cost;
                });
                resolve(wordCost);
            });
        });
    };

    splitSentence(string: string, settings?: any): string | string[] {
			let { camelCaseSplitter, capitalizeFirstLetter, joinWords } = settings;
			let list: string[] = [];
			let that = this;
			camelCaseSplitter = camelCaseSplitter || false;
			capitalizeFirstLetter = capitalizeFirstLetter || false;
			joinWords = joinWords || false;
			if (camelCaseSplitter)
					string = this.camelCaseSplitter(string);

			string.split(splitRegex).forEach(function (sub) {
					that.splitWords(sub).forEach(function (word) {
							word = capitalizeFirstLetter ? that.capitalizeFirstLetter(word) : word;
							list.push(word);
					})
			})
			if (joinWords)
					return list.join(' ');
			else
					return list;
    }

    addWords(words: string | string[]) {
        if (Array.isArray(words)) {
            for (let value of words)
                this.addWords(value);
        } else {
            let word = words.toLocaleLowerCase();
            wordCost.set(word, maxCost);
            if (word.length > maxWordLen)
                maxWordLen = word.length;
        }
    }

    splitWords(s: string): string[] {
        let cost = [0];

        function best_match(i: number) {
            let candidates = cost.slice(Math.max(0, i - maxWordLen), i).reverse();
            let minPair = [Number.MAX_SAFE_INTEGER, 0];
            candidates.forEach(function (c, k) {
                let ccost;
								const word = s.substring(i - k - 1, i).toLowerCase();
                if (wordCost.has(word)) {
                    ccost = c + (wordCost.get(word) || 0);
                } else {
                    ccost = Number.MAX_SAFE_INTEGER;
                }
                if (ccost < minPair[0]) {
                    minPair = [ccost, k + 1];
                }
            })
            return minPair;
        }

        for (let i = 1; i < s.length + 1; i++) {
            cost.push(best_match(i)[0]);
        }

        let out: string[] = [];
        let i = s.length;
        while (i > 0) {
            let c = best_match(i)[0];
            let k = best_match(i)[1];
            let newToken = true;
            if (s.slice(i - k, i) != "'") {
                if (out.length > 0) {
                    if (out[-1] === "'s" || (Number.isInteger(s[i - 1]) && Number.isInteger(out[-1][0]))) {
                        out[-1] = s.slice(i - k, i) + out[-1];
                        newToken = false;
                    }
                }
            }

            if (newToken) {
                out.push(s.slice(i - k, i))
            }

            i -= k
        }

        return out.reverse();
    }

    camelCaseSplitter(inputString: string): string {
        let notNullString = inputString || '';
        let trimmedString = notNullString.trim();
        let arrayOfStrings = trimmedString.split(' ');

        let splitStringsArray: string[] = [];
        arrayOfStrings.forEach(tempString => {
            if (tempString != '') {
                let splitWords = tempString.split(/(?=[A-Z])/).join(" ");
                splitStringsArray.push(splitWords);
            }
        });

        return splitStringsArray.join(" ");
    }

    capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

export const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
// https://en.wikipedia.org/wiki/Letter_frequency
export const letterFrequencies = [
	{
		"letter": "e",
		"frequency": 12.02,
	},
	{
		"letter": "t",
		"frequency": 9.10,
	},
	{
		"letter": "a",
		"frequency": 8.12,
	},
	{
		"letter": "o",
		"frequency": 7.68,
	},
	{
		"letter": "i",
		"frequency": 7.31,
	},
	{
		"letter": "n",
		"frequency": 6.95,
	},
	{
		"letter": "s",
		"frequency": 6.28,
	},
	{
		"letter": "r",
		"frequency": 6.02,
	},
	{
		"letter": "h",
		"frequency": 5.92,
	},
	{
		"letter": "d",
		"frequency": 4.32,
	},
	{
		"letter": "l",
		"frequency": 3.98,
	},
	{
		"letter": "u",
		"frequency": 2.88,
	},
	{
		"letter": "c",
		"frequency": 2.71,
	},
	{
		"letter": "m",
		"frequency": 2.61,
	},
	{
		"letter": "f",
		"frequency": 2.30,
	},
	{
		"letter": "y",
		"frequency": 2.11,
	},
	{
		"letter": "w",
		"frequency": 2.09,
	},
	{
		"letter": "g",
		"frequency": 2.03,
	},
	{
		"letter": "p",
		"frequency": 1.82,
	},
	{
		"letter": "b",
		"frequency": 1.49,
	},
	{
		"letter": "v",
		"frequency": 1.11,
	},
	{
		"letter": "k",
		"frequency": 0.69,
	},
	{
		"letter": "x",
		"frequency": 0.17,
	},
	{
		"letter": "q",
		"frequency": 0.11,
	},
	{
		"letter": "j",
		"frequency": 0.10,
	},
	{
		"letter": "z",
		"frequency": 0.07,
	},
];

export const digraphFrequencies = [
	{
		"digraph": "th",
		"frequency": 1.52,
	},
	{
		"digraph": "he",
		"frequency": 1.28,
	},
	{
		"digraph": "in",
		"frequency": 0.94,
	},
	{
		"digraph": "er",
		"frequency": 0.94,
	},
	{
		"digraph": "an",
		"frequency": 0.82,
	},
	{
		"digraph": "re",
		"frequency": 0.68,
	},
	{
		"digraph": "nd",
		"frequency": 0.63,
	},
	{
		"digraph": "at",
		"frequency": 0.59,
	},
	{
		"digraph": "on",
		"frequency": 0.57,
	},
	{
		"digraph": "nt",
		"frequency": 0.56,
	},
	{
		"digraph": "ha",
		"frequency": 0.56,
	},
	{
		"digraph": "es",
		"frequency": 0.56,
	},
	{
		"digraph": "st",
		"frequency": 0.55,
	},
	{
		"digraph": "en",
		"frequency": 0.55,
	},
	{
		"digraph": "ed",
		"frequency": 0.53,
	},
	{
		"digraph": "to",
		"frequency": 0.52,
	},
	{
		"digraph": "it",
		"frequency": 0.50,
	},
	{
		"digraph": "ou",
		"frequency": 0.50,
	},
	{
		"digraph": "ea",
		"frequency": 0.47,
	},
	{
		"digraph": "hi",
		"frequency": 0.46,
	},
	{
		"digraph": "is",
		"frequency": 0.46,
	},
	{
		"digraph": "or",
		"frequency": 0.43,
	},
	{
		"digraph": "ti",
		"frequency": 0.34,
	},
	{
		"digraph": "as",
		"frequency": 0.33,
	},
	{
		"digraph": "te",
		"frequency": 0.27,
	},
	{
		"digraph": "et",
		"frequency": 0.19,
	},
	{
		"digraph": "ng",
		"frequency": 0.18,
	},
	{
		"digraph": "of",
		"frequency": 0.16,
	},
	{
		"digraph": "al",
		"frequency": 0.09,
	},
	{
		"digraph": "de",
		"frequency": 0.09,
	},
	{
		"digraph": "se",
		"frequency": 0.08,
	},
	{
		"digraph": "le",
		"frequency": 0.08,
	},
	{
		"digraph": "sa",
		"frequency": 0.06,
	},
	{
		"digraph": "si",
		"frequency": 0.05,
	},
	{
		"digraph": "ar",
		"frequency": 0.04,
	},
	{
		"digraph": "ve",
		"frequency": 0.04,
	},
	{
		"digraph": "ra",
		"frequency": 0.04,
	},
	{
		"digraph": "ld",
		"frequency": 0.02,
	},
	{
		"digraph": "ur",
		"frequency": 0.02,
	},
];

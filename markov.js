"use strict";

/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   * 
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   * 
   * */

  getChains() {
    // TODO: optimize
    let wordsMap = new Map();

    this.words.map(word => wordsMap.set(word,[]));
    for (let i = 0; i < this.words.length - 1; i++) {
      if (wordsMap.has(this.words[i])) {
        let wordArr = wordsMap.get(this.words[i]);
        wordArr.push(this.words[i+1]);
        wordsMap.set(this.words[i],wordArr);
      }
    }
    let wordArr = wordsMap.get(this.words.at(-1));
        wordArr.push(null);
        wordsMap.set(this.words.at(-1),wordArr);
    return wordsMap;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {

    let currentWord = this.words[0];
    let phrase = [currentWord];
    while (currentWord != null) {
      let choices = this.chains.get(currentWord);
      let nextWord = choices[Math.floor(Math.random()*choices.length)];
      phrase.push(nextWord);
      currentWord = nextWord;
    }
    phrase.pop();
    return phrase.join(' ')
  }
}

const test = new MarkovMachine('This is our test phrase. This was our phrasiest phrase. And this sentence.');

console.log(test.getChains());
console.log(test.getText());
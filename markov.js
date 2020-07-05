/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i+1] || null;

      if (chains[word]) {
        chains[word].push(nextWord);
      }
      else {
        chains[word] = [nextWord];
      }
    }
    return chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Object.keys(this.chains);
    let key = keys[Math.floor(Math.random() * keys.length)];
    let output = [];

    while (output.length < numWords && key !== null) {
      output.push(key);
      key = this.chains[key][Math.floor(Math.random() * this.chains[key].length)]
    }
    return output.join(" ")
  }
}

module.exports = {
  MarkovMachine
}
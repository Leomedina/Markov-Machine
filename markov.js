/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains()
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  makeChains() {
    const container = new Map();

    for (let i = 0; i < this.words.length; i++) {
      const KEY = this.words[i];

      if (container.get(KEY)) {
        container.get(KEY).push(this.words[i + 1] || null)
      } else {
        container.set(KEY, [(this.words[i + 1] || null)])
      }
    }
    return container
  }

  getRandom(keys) {
    return keys[Math.floor(Math.random() * keys.length)];
  }

  /** return random text from chains */
  makeText(numWords = 100) {
    const KEYS = Array.from(this.chains.keys());
    let word = this.getRandom(KEYS)

    const words = [];

    while (words.length < numWords && word !== null) {
      words.push(word);
      word = this.getRandom(this.chains.get(word));
    }
    return words.join(" ");
  }
}

// const markovMachine = new MarkovMachine("the cat in the hat");
// console.log(markovMachine.makeText(100));
module.exports = { MarkovMachine }
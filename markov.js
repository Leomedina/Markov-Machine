/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const container = {}

    for (let i = 0; i < this.words.length; i++) {
      const KEY = this.words[i];

      if (container[KEY]) {
        container[KEY].push(this.checkForNull(this.words, i))
      } else {
        container[KEY] = [];
        container[KEY].push(this.checkForNull(this.words, i))
      }
    }
    console.log(container)
  }

  checkForNull(words, index) {
    if (words[index + 1]) {
      return words[index + 1];
    } else {
      return null;
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
  }
}

const markovMachine = new MarkovMachine("the cat in the hat");


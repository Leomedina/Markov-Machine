/** Command-line tool to generate Markov text. */

const chainMap = this.words.map((word, index, words) => {
    const container = {}
    const values = []
    const key = word;

    container[key] = values;
    values.push(this.checkForNull(words, index));

    return container;
})

console.log(chainMap)
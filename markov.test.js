const markovMachine = require('./markov')
const { MarkovMachine } = require('./markov')

describe('Test functionality around initiating a MarkovMachine Class', () => {
    let text;
    let mm;

    beforeEach(() => {
        text = "the cat in the hat"
        mm = new MarkovMachine(text);
    })
    
    test('Initiating with string should return class of MarkovMachine', () => {
        expect(mm).toEqual(expect.any(MarkovMachine));
    })
    
    test('MarkovChain should return accurate chains', () => {
        const RESULT = { "the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null] };
        expect(mm.makeChains()).toEqual(RESULT);
    })

})
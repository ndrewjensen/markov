/** Command-line tool to generate Markov text. */

const {MarkovMachine} = require('./markov');


/**test MarkovMachine class */

describe("markov machine test", function () {
  let complexMarkov;
  let simpleMarkov;
  beforeAll(function(){
    complexMarkov = new MarkovMachine('Welcome to our phrasiest phrase. This is in a testing center. Strawberries are in the testing phrase.')
    simpleMarkov = new MarkovMachine('Welcome to our phrasiest phrase.')


  })

  test("get chain", function () {
    let chains = complexMarkov.getChains();

    // expect(chains).toEqual({
    //   'Welcome'=> [ 'to' ],
    //   'to'=> [ 'our' ],
    //   'our'=> [ 'phrasiest' ],
    //   'phrasiest'=> [ 'phrase.' ],
    //   'phrase.'=> [ 'This', null ],
    //   'This'=> [ 'is' ],
    //   'is'=> [ 'in' ],
    //   'in'=> [ 'a', 'the' ],
    //   'a'=> [ 'testing' ],
    //   'testing'=> [ 'center.', 'phrase.' ],
    //   'center.'=> [ 'Strawberries' ],
    //   'Strawberries'=> [ 'are' ],
    //   'are'=> [ 'in' ],
    //   'the'=> [ 'testing' ]
    // });
    expect(chains.get('Welcome')).toEqual(['to']);
    expect(chains.get('to')).toEqual([ 'our' ]);
    expect(chains.get('our')).toEqual([ 'phrasiest' ]);
    expect(chains.get('phrasiest')).toEqual([ 'phrase.' ]);
    expect(chains.get('This')).toEqual([ 'is' ]);
    expect(chains.get('is')).toEqual([ 'in' ]);
    expect(chains.get('in')).toEqual([ 'a', 'the' ]);
    expect(chains.get('a')).toEqual([ 'testing' ]);
    expect(chains.get('testing')).toEqual([ 'center.', 'phrase.' ]);
    expect(chains.get('center.')).toEqual([ 'Strawberries' ]);
    expect(chains.get('Strawberries')).toEqual([ 'are' ]);
    expect(chains.get('are')).toEqual([ 'in' ]);
    expect(chains.get('the')).toEqual([ 'testing' ]);


  });


  test("get text", function () {
    let simpleText = simpleMarkov.getText();
    let complexText = complexMarkov.getText();

    let firstLetter = complexText[0];
    let lastChar = complexText[complexText.length - 1];

    expect(complexText).toEqual(expect.any(String));
    expect(firstLetter).toEqual('W');
    expect(lastChar).toEqual('.');
    expect(complexText.length).toBeGreaterThanOrEqual(32);
    expect(complexText).toEqual(expect.stringContaining('Welcome to our phrasiest phrase.'));

    expect(simpleText).toEqual('Welcome to our phrasiest phrase.');
    });

  });
//process.env.GOOGLE_APPLICATION_CREDENTIALS = '../cred.json'
require('./env.js')
const language = require('@google-cloud/language')
//functions

// Imports the Google Cloud client library

const analyze = (textIn) => {

// Instantiates a client
const client = new language.LanguageServiceClient();

// The text to analyze
//const text = textIn;

const document = {
  content: textIn,
  type: 'PLAIN_TEXT',
};

// Detects the sentiment of the text
return client.analyzeSentiment({document: document})
  .then(results => {
    const sentiment = results[0].documentSentiment;

    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    if(sentiment.score > 0.4) {
        return 'happy'
    } else {
        return 'not happy'
    }
  })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });
}

module.exports = analyze
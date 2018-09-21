const language = require('@google-cloud/language')

const client = new language.LanguageServiceClient();
//functions

// Imports the Google Cloud client library

const analyze = (textIn) => {

// Instantiates a client


// The text to analyze
//const text = textIn;

const document = {
  content: textIn,
  type: 'PLAIN_TEXT',
};

// Detects the sentiment of the text
return client.analyzeSentiment({document: document});
//   .then(results => {
//     const sentiment = results[0].documentSentiment;

//     console.log(`Text: ${textIn}`);
//     console.log(`Sentiment score: ${sentiment.score}`);
//     console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
//     if(sentiment.score > 0.4) {
//         return 'happy'
//     } else {
//         return 'not happy'
//     }
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });
}

module.exports = analyze
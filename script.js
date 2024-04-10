const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twtbnt = document.getElementById('X-share-button');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
// const twtbnt = document.getElementsByClassName('X-share-button');

let apiQuotes = [];

function showLoadingSpin() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpin() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  showLoadingSpin();
  // Pick a random quote from API quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // To check if author is blank, fills with "-Unknown"
  if (!quote.author) {
    authorText.textContent = '-Unknown';
  } else {
    authorText.textContent = quote.author;
  }

  // Check quote length to determine styling
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, hide loading
  quoteText.textContent = quote.text;
  hideLoadingSpin();
}

// Get Quotes From API
async function getQuotes() {
  showLoadingSpin();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const resp = await fetch(apiUrl);
    apiQuotes = await resp.json();
    newQuote();
  } catch (error) {}
}

// To tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twtbnt.addEventListener('click', tweetQuote);

// On Load
getQuotes();

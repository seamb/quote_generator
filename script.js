const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];
// Show New Quote
function newQuote() {
  // Pick a random quote from API quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // To check if author is blank, fills with "-Unknown"
  if (!quote.author) {
    authorText.textContent = "-Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check quote length to determine styling
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;

  console.log("Quote: ", quote);
}

// Get Quotes From API
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const resp = await fetch(apiUrl);
    apiQuotes = await resp.json();
    newQuote();
  } catch (error) {}
}

// To tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();

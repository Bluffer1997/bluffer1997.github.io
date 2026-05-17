// Make button into variable
// Add event listener
// When clicked, generate randomly a quote. 
// Change UI to display that quote

const button = document.querySelector('.generate');
const container = document.querySelector('.container');
let quotes = [
    '\"You miss 100% of the shots you don\'t take.\" - Wayne Grezky',
    '\“All our dreams can come true, if we have the courage to pursue them.\” – Walt Disney',
    '\"The secret of getting ahead is getting started.\” – Mark Twain',
    '\"It’s hard to beat a person who never gives up.\” – Babe Ruth',
    '\"If people are doubting how far you can go, go so far that you can’t hear them anymore.\” – Michele Ruiz',
    '\"Happiness is not something ready made. It comes from your own actions.\” ― Dalai Lama XIV',
    '\"Impossible is just an opinion.\” – Paulo Coelho',
    '\"Hold the vision, trust the process.\” – Unknown',
    '\"People who wonder if the glass is half empty or full miss the point. The glass is refillable.\” – Unknown',
    '\"One day or day one. You decide.\” – Unknown'
];

let quotesH2 = document.createElement('h2');
quotesH2.className = 'quote';
let quotesH2Content = document.createTextNode('');
quotesH2.appendChild(quotesH2Content);
container.appendChild(quotesH2);

button.addEventListener('click', function(e) {
    e.preventDefault();
    quotesH2.textContent = quotes[Math.floor(Math.random() * quotes.length)];
});
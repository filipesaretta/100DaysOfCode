const fromSelect = document.querySelector('[name="from_currency"');
const fromInput = document.querySelector('[name="from_amount"');
const toSelect = document.querySelector('[name="to_currency"');
const toEl = document.querySelector('.to_amount');
const form = document.querySelector('.app form');

const baseEndPoint = 'https://api.exchangerate.host/latest';

// This object is to keep a "cache like" 
const ratesByBase = {};

const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};



function generateOptions(options) {
  return Object.entries(options).map(([currencyCode, currencyName] )  => {
    return `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`
  }).join('');
}

async function fetchRates(base = 'BRL') {
  const response = await fetch(`${baseEndPoint}?base=${base}`);
  const rates = await response.json();
  return rates;
}


async function convert(amount, from , to ) {
  // Check if we have the rates to convert from that currency
  if (!ratesByBase[from]) {
    console.log(`Oh no we don't have ${from} to convert to ${to}`);
    const rates = await fetchRates(from);  
    // store for next time
    ratesByBase[from] = rates;
  }

  // convert the amount it was pass in
  const rate = ratesByBase[from].rates[to];
  const convertedAmount = rate * amount;

  console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);
  return  convertedAmount;
}

function formatCurrency(amount, currency) {
  return Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency,
  }).format(amount);
}

async function handleInput(e) {
  const rawAmount = await convert(fromInput.value, fromSelect.value, toSelect.value);
  toEl.textContent = formatCurrency(rawAmount, toSelect.value);


}

// Is store into a variable load only once for the innerHTML
const optionsHTML = generateOptions(currencies);

// populate all the options 
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;


// Trick we can listening  for an input event on the form and will cover all of we need
form.addEventListener('input', handleInput);
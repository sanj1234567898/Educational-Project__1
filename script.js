'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2022-10-17T07:43:59.331Z',
    '2022-10-18T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseNickname = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatCurrency = function (value, locale, currency) {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const formatTransactionsDate = function (date, locale) {
  const getDaysBetween2Dates = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = getDaysBetween2Dates(new Date(), date);

  if (daysPassed === 0) return 'Сегодня';
  if (daysPassed === 1) return 'Вчера';
  if (daysPassed <= 5) return `${daysPassed} дня назад`;
  else {
    // const day = `${date.getDate()}`.padStart(2, '0');
    // const month = `${date.getMonth() + 1}`.padStart(2, '0');
    // const year = date.getFullYear();

    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const displayTransactions = function (account, sort = false) {
  containerTransactions.innerHTML = '';

  const trans = sort
    ? account.transactions.slice().sort((a, b) => a - b)
    : account.transactions;

  trans.forEach((trans, index) => {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(account.transactionsDates[index]);
    const transDate = formatTransactionsDate(date, account.locale);

    const formatedTrans = formatCurrency(
      trans,
      account.locale,
      account.currency
    );

    const transactionsRow = ` <div class="transactions__row">
    <div class="transactions__type transactions__type--${transType}">
      ${index + 1} ${transType}
    </div>
    <div class="transactions__date">${transDate}</div>
    <div class="transactions__value">${formatedTrans}</div>
  </div>`;

    containerTransactions.insertAdjacentHTML('afterbegin', transactionsRow);
  });
};

const createNicknames = accounts =>
  accounts.forEach(acc => {
    acc.nickName = acc.userName
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });

createNicknames(accounts);

const displayBalance = account => {
  const balance = account.transactions.reduce((acc, value) => acc + value, 0);
  account.balance = balance;

  labelBalance.textContent = formatCurrency(
    balance,
    account.locale,
    account.currency
  );
};

function displayTotal(account) {
  let transOut = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);

  labelSumOut.textContent = formatCurrency(
    transOut,
    account.locale,
    account.currency
  );

  const balance = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);

  labelSumIn.textContent = formatCurrency(
    balance,
    account.locale,
    account.currency
  );

  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(deposit => (deposit * account.interest) / 100)
    .filter(interest => interest > 5)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = formatCurrency(
    interestTotal,
    account.locale,
    account.currency
  );
}

let currentAcount, currentLogOut;

const startLogoutTimer = function () {
  let time = 300;

  const logoutTimerCallBack = () => {
    //Вызов таймера через 1сек
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    // Выводить оставшееся время
    labelTimer.textContent = `${minutes}:${seconds}`;
    //Закрыть приложеие
    if (time === 0) {
      clearInterval(setIntervalTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Войдите в свой аккаунт';
    }
    time--;
  };
  //Установка таймера
  logoutTimerCallBack();
  const setIntervalTimer = setInterval(logoutTimerCallBack, 1000);

  return setIntervalTimer;
};

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAcount = accounts.find(
    account => account.nickName === inputLoginUsername.value
  );

  if (currentAcount?.pin === +inputLoginPin.value) {
    containerApp.style.opacity = 100;

    labelWelcome.textContent = `Welcome to aboard ${
      currentAcount.userName.split(' ')[0]
    }!`;

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // labelDate.textContent = `${day}/${month}/${year}`;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: '2-digit',
      year: 'numeric',
    };
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAcount.locale,
      options
    ).format(now);

    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    if (currentLogOut) clearInterval(currentLogOut);
    currentLogOut = startLogoutTimer();
    updateUI(currentAcount);
  }
});

function updateUI(account) {
  displayTransactions(account);
  displayBalance(account);
  displayTotal(account);
}

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    account => account.nickName === recipientNickname
  );

  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  if (
    transferAmount > 0 &&
    currentAcount.balance >= transferAmount &&
    currentAcount.nickName !== recipientAccount?.nickName &&
    recipientAccount
  ) {
    //Add trans
    currentAcount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);

    //Add trans date
    currentAcount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());

    updateUI(currentAcount);

    //reset timer
    clearInterval(currentLogOut);
    currentLogOut = startLogoutTimer();
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseNickname.value === currentAcount.nickName &&
    +inputClosePin.value === currentAcount.pin
  ) {
    const currentAcountIndex = accounts.findIndex(
      account => account.nickName === currentAcount.nickName
    );
    accounts.splice(currentAcountIndex, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Войдите в свой аккаунт';
  }
  inputCloseNickname.value = '';
  inputClosePin.value = '';
});

// // Always Logged IN
// currentAcount = account1;
// updateUI(currentAcount);
// containerApp.style.opacity = 100;

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAcount.transactions.some(trans => trans >= (loanAmount * 10) / 100)
  ) {
    setTimeout(() => {
      currentAcount.transactions.push(loanAmount);
      currentAcount.transactionsDates.push(new Date().toISOString());
      updateUI(currentAcount);
    }, 5000);
  }
  inputLoanAmount.value = '';

  clearInterval(currentLogOut);
  currentLogOut = startLogoutTimer();
});

let transSorted = false;

btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayTransactions(currentAcount, !transSorted);
  transSorted = !transSorted;
});

const logoImage = document.querySelector('.logo');
logoImage.addEventListener('click', () => {
  [...document.querySelectorAll('.transactions__row')].forEach((row, i) => {
    if (i % 2 === 0) {
      row.style.backgroundColor = 'grey';
    }
  });
});

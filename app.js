const accountInput = document.querySelector('#account');
const checkBalanceBtn = document.querySelector('#checkBalance');
const displayBalance = document.querySelector('#balance');

const amountInput = document.querySelector('#amount');
const toAccountInput = document.querySelector('#toAccount');
const sendTrxBtn = document.querySelector('#sendTrxBtn');

const numberOfBlocks = document.querySelector('#numberOfBlocks');
const displayNumberOfBlocksBtn = document.querySelector(
  '#displayNumberOfBlocks'
);

let accounts;

async function checkBalance() {
  document.querySelector('#eth').style.opacity = 1;
  if (typeof ethereum !== undefined) {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    const balance = await ethereum.request({
      method: 'eth_getBalance',
      params: [accountInput.value, 'latest'],
    });
    // Convert
    const parsedBalance = parseInt(balance) / Math.pow(10, 18);

    displayBalance.innerText = parsedBalance;
  } else {
    console.log('No ethereum');
  }
}

async function sendTrx() {
  try {
    const amount = parseFloat(amountInput.value) * Math.pow(10, 18);
    let params = [
      {
        from: accountInput.value,
        to: toAccountInput.value,
        value: Number(amount.toString(16)),
        gas: Number(21000).toString(16),
        gasPrice: Number(2500000).toString(16),
      },
    ];
    // Make the transaction
    await ethereum.request({
      method: 'eth_sendTransaction',
      params: params,
    });
  } catch (error) {
    console.log(error);
  }
}

const checkNumberOfBlocks = async () => {
  document.querySelector('#blocks').style.opacity = 1;
  const amountOfBlocks = await ethereum.request({
    method: 'eth_blockNumber',
    params: [],
  });
  const numberBlocks = parseFloat(amountOfBlocks) / Math.pow(10, 18);
  numberOfBlocks.innerHTML = numberBlocks;
  console.log(numberBlocks);
};

checkBalanceBtn.addEventListener('click', checkBalance);
sendTrxBtn.addEventListener('click', sendTrx);
displayNumberOfBlocksBtn.addEventListener('click', checkNumberOfBlocks);

// Cajero electrónico con JS

const users = [
  { username: 'Javier', password: '1234', id: '0000', type: 'admin' },
  { username: 'Pedro', password: '5678', id: '0001', type: 'client' },
  { username: 'Diana', password: '9123', id: '0002', type: 'client' },
  { username: 'David', password: '4567', id: '0003', type: 'client' },
  { username: 'Lorena', password: '8912', id: '0004', type: 'client' },
];

const bills = [
  { value: 100000, quantity: 0, counter: 0, flag: false },
  { value: 50000, quantity: 0, counter: 0, flag: false },
  { value: 20000, quantity: 0, counter: 0, flag: false },
  { value: 10000, quantity: 0, counter: 0, flag: false },
  { value: 5000, quantity: 0, counter: 0, flag: false },
  { value: 2000, quantity: 0, counter: 0, flag: false },
];

let id,
  password,
  amountToWithdraw,
  amountInAtm = 0,
  amountToGive = 0;

while (true) {
  id = prompt(`Welcome to your ATM Machine!\n\nPlease enter your ID:`);
  password = prompt('Please enter your password:');

  // user entered is identified
  const foundUser = users.find(
    element => element.id === id && element.password === password
  );

  if (!foundUser) {
    alert('The user entered does not exist.');
  } else if (foundUser.type === 'admin') {
    // amount is set to 0 to avoid error in the calculation below
    amountInAtm = 0;
    alert(`Welcome back ${foundUser.username}!`);

    chargeAtm(bills);

    console.log(`\n-------------------------------------------------------`);
    console.log('%cATM WAS CORRECTLY CHARGED!', 'color: green');

    showBillsInAtm(bills);

    calculateTotalAmountInAtm(bills);

    console.log(`\n`);
    console.log(
      '%cTOTAL AMOUNT IN ATM: $' + amountInAtm.toLocaleString(),
      'color: greenyellow'
    );
  } else if (foundUser.type === 'client') {
    if (amountInAtm === 0) {
      alert('ATM IN MAINTENANCE, PLEASE COME BACK SOON!');
    } else {
      amountToWithdraw = Number.parseInt(
        prompt('How much money do you want to withdraw?')
      );

      console.log(`\n`);
      console.log(
        '%cMONEY TO WITHDRAW: $' + amountToWithdraw.toLocaleString(),
        'color: tomato'
      );

      calculateBillsToGive(bills);

      console.log(`\nNUMBER OF BILLS TO GIVE:`);

      showBillsToGive(bills);

      // variables are set to 0 to not affect the calculations below
      amountInAtm = 0;
      amountToGive = 0;

      calculateTotalAmountToGive(bills);

      console.log(`\n`);
      console.log(
        '%cTOTAL AMOUNT TO GIVE: ' + amountToGive.toLocaleString(),
        'background-color: green'
      );

      calculateRemainingBills(bills);

      console.log(`\n`);
      console.log('%cREMAINING BILLS:', 'color: sandybrown');

      showBillsInAtm(bills);

      calculateTotalAmountInAtm(bills);

      console.log(`\n`);
      console.log(
        '%cREMAINING AMOUNT IN ATM: ' + amountInAtm.toLocaleString(),
        'color: sandybrown'
      );
      console.log(`\n-------------------------------------------------------`);
    }
  }
  if (prompt('Would you like to continue? (y/n)') === 'n') break;
}

function chargeAtm(bills) {
  for (const bill of bills) {
    bill.quantity += Number.parseInt(
      prompt(`Please enter the number of $${bill.value} bills`)
    );
  }
}

function showBillsInAtm(bills) {
  bills.map(bill =>
    console.log(
      `Number of $${bill.value.toLocaleString()} bills: ${
        bill.quantity
      } - Subtotal: $${(bill.value * bill.quantity).toLocaleString()}`
    )
  );
}

function showBillsToGive(bills) {
  bills.map(bill =>
    console.log(
      `Number of $${bill.value.toLocaleString()} bills: ${
        bill.counter
      } - Subtotal: $${(bill.value * bill.counter).toLocaleString()}`
    )
  );
}

// function to calculate how many bills give to the user (using substraction)
function calculateBillsToGive(bills) {
  while (amountToWithdraw >= bills[bills.length - 1].value) {
    for (const bill of bills) {
      if (!bill.flag && bill.quantity !== 0) {
        for (let quantity = bill.quantity; quantity > 0; quantity--) {
          if (Math.sign(amountToWithdraw - bill.value * quantity) >= 0) {
            amountToWithdraw -= bill.value * quantity;
            bill.counter = quantity;
            bill.flag = true;
            break;
          }
        }
      }
    }
    break;
  }
}

function calculateRemainingBills(bills) {
  for (const bill of bills) {
    bill.quantity -= bill.counter;
    bill.counter = 0;
    bill.flag = false;
  }
}

function calculateTotalAmountInAtm(bills) {
  bills.map(bill => (amountInAtm += bill.value * bill.quantity));
}

function calculateTotalAmountToGive(bills) {
  bills.map(bill => (amountToGive += bill.value * bill.counter));
}

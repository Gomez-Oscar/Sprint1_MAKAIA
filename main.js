// Cajero electrónico con JS

const users = [
  { username: 'javier', password: '1234', id: '0000', type: 'admin' },
  { username: 'pedro', password: '5678', id: '0001', type: 'client' },
  { username: 'diana', password: '9123', id: '0002', type: 'client' },
  { username: 'david', password: '4567', id: '0003', type: 'client' },
  { username: 'lorena', password: '8912', id: '0004', type: 'client' },
];

const bills = [
  { value: 100000, quantity: 0, subtotal: 0, counter: 0, flag: false },
  { value: 50000, quantity: 0, subtotal: 0, counter: 0, flag: false },
  { value: 20000, quantity: 0, subtotal: 0, counter: 0, flag: false },
  { value: 10000, quantity: 0, subtotal: 0, counter: 0, flag: false },
  { value: 5000, quantity: 0, subtotal: 0, counter: 0, flag: false },
  { value: 2000, quantity: 0, subtotal: 0, counter: 0, flag: false },
];

let id,
  password,
  amountToWithdraw,
  auxAmount,
  amountInAtm = 0,
  amountToGive = 0;

//! ingresar con cedula

while (true) {
  id = prompt('Please enter your ID or enter "exit" to finish');
  if (id === 'exit') break;
  password = prompt('Please enter your password');

  const foundUser = users.find(
    element => element.id === id && element.password === password
  );

  if (!foundUser) {
    alert('The user entered does not exist, please try again');
  } else if (foundUser.type === 'admin') {
    amountInAtm = 0;
    for (const bill of bills) {
      bill.quantity += Number.parseInt(
        prompt(`Please enter the number of $${bill.value} bills`)
      );
      bill.subtotal = bill.value * bill.quantity;
      amountInAtm += bill.subtotal;
    }

    console.log(`\n-------------------------------------------------------`);
    console.log('%cATM WAS CORRECTLY CHARGED!', 'color: green');

    bills.map(bill =>
      console.log(
        `Number of $${bill.value} bills: ${bill.quantity} - Subtotal: $${bill.subtotal}`
      )
    );

    console.log(`\n`);
    console.log('%cTOTAL AMOUNT IN ATM: $' + amountInAtm, 'color: greenyellow');
  } else if (foundUser.type === 'client') {
    if (amountInAtm === 0) {
      console.log('\nATM IN MAINTENANCE, PLEASE COME BACK SOON!');
    } else {
      amountToWithdraw = Number.parseInt(
        prompt('How much money do you want to withdraw?')
      );

      console.log(`\n`);
      console.log('%cMONEY TO WITHDRAW: $' + amountToWithdraw, 'color: tomato');

      auxAmount = amountToWithdraw;

      while (auxAmount >= bills[5].value) {
        if (!bills[0].flag && bills[0].quantity !== 0) {
          for (let quantity = bills[0].quantity; quantity > 0; quantity--) {
            if (Math.sign(auxAmount - bills[0].value * quantity) >= 0) {
              auxAmount -= bills[0].value * quantity;
              bills[0].counter = quantity;
              bills[0].flag = true;
              break;
            }
          }
          bills[0].flag = true;
        } else if (!bills[1].flag && bills[1].quantity !== 0) {
          for (let quantity = bills[1].quantity; quantity > 0; quantity--) {
            if (Math.sign(auxAmount - bills[1].value * quantity) >= 0) {
              auxAmount -= bills[1].value * quantity;
              bills[1].counter = quantity;
              bills[1].flag = true;
              break;
            }
          }
          bills[1].flag = true;
        } else if (!bills[2].flag && bills[2].quantity !== 0) {
          for (let quantity = bills[2].quantity; quantity > 0; quantity--) {
            if (Math.sign(auxAmount - bills[2].value * quantity) >= 0) {
              auxAmount -= bills[2].value * quantity;
              bills[2].counter = quantity;
              bills[2].flag = true;
              break;
            }
          }
          bills[2].flag = true;
        } else if (!bills[3].flag && bills[3].quantity !== 0) {
          for (let quantity = bills[3].quantity; quantity > 0; quantity--) {
            if (Math.sign(auxAmount - bills[3].value * quantity) >= 0) {
              auxAmount -= bills[3].value * quantity;
              bills[3].counter = quantity;
              bills[3].flag = true;
              break;
            }
          }
          bills[3].flag = true;
        } else if (!bills[4].flag && bills[4].quantity !== 0) {
          for (let quantity = bills[4].quantity; quantity > 0; quantity--) {
            if (Math.sign(auxAmount - bills[4].value * quantity) >= 0) {
              auxAmount -= bills[4].value * quantity;
              bills[4].counter = quantity;
              bills[4].flag = true;
              break;
            }
          }
          bills[4].flag = true;
        } else if (!bills[5].flag && bills[5].quantity !== 0) {
          for (let quantity = bills[5].quantity; quantity > 0; quantity--) {
            if (Math.sign(auxAmount - bills[5].value * quantity) >= 0) {
              auxAmount -= bills[5].value * quantity;
              bills[5].counter = quantity;
              bills[5].flag = true;
              break;
            }
          }
          bills[5].flag = true;
        } else {
          break;
        }
      }

      console.log(`\nNUMBER OF BILLS TO GIVE:`);

      for (let i = 0; i <= bills.length - 1; i++) {
        console.log(`Number of $${bills[i].value} bills: ${bills[i].counter}`);
        amountToGive += bills[i].value * bills[i].counter;
        bills[i].quantity -= bills[i].counter;
        bills[i].counter = 0;
        bills[i].flag = false;
      }

      console.log(`\n`);
      console.log(
        '%cTOTAL AMOUNT TO GIVE: ' + amountToGive,
        'background-color: green'
      );

      amountInAtm = 0;
      amountToGive = 0;
      bills.map(bill => (amountInAtm += bill.value * bill.quantity));

      console.log(`\n`);
      console.log('%cREMAINING BILLS:', 'color: sandybrown');

      bills.map(bill =>
        console.log(
          `Number of $${bill.value} bills: ${bill.quantity} - Subtotal: $${bill.subtotal}`
        )
      );

      console.log(`\n`);
      console.log(
        '%cREMAINING AMOUNT IN ATM: ' + amountInAtm,
        'color: sandybrown'
      );
      console.log(`\n-------------------------------------------------------`);
    }
  }
}
alert('Come back soon!');

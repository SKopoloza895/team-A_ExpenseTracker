const currencyHolder = document.getElementById("currency") //currency from html to getElementById
const balanceHolder = document.getElementById("balance") // balance from html to getElementById

const tnxdescriptionNameHolder = document.getElementById("description-Name") // description-Name from html to getElementById 
const tnxAmountolder = document.getElementById("amount") //amount from html to getElementById

const income = document.getElementById("income") // income (radio)from html to getElementById
const expense = document.getElementById("expense") // expense (radio)from html to getElementById

const saveButton = document.getElementById("save"); //save button from html to getElementById
const cancelButton = document.getElementById("cancel");

const displayList = document.getElementById("list-of-transactions"); // list-of-transactions from html to getElementById


//Set Balance for budget Part
totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  //empty or negative input
  if (tempAmount === "" || tempAmount < 0) { // check the if statement true OR 
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    //Set Budget
    amount.innerHTML = tempAmount;
    //Set Balance
    balanceValue.innerText = tempAmount - expenditureValue.innerText; //calculate
    balanceValue.innerText = tempAmount + incomeValue.innerText; //calculate for income
    //Clear Input Box
    totalAmount.value = "";
  }
});

//Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Function To Modify List Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;
  let currentIncome = incomeValue.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText; // returns the first element that matches a CSS selector.
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
  incomeValue.innerText = parseInt(currentIncome) + parseInt(parentAmount); //income
  parentDiv.remove();
};

//Function To Create List
const listCreator = (expenseName, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space"); // to create add for list 
  list.appendChild(sublistContent); // AppendChild use for return to the object
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => { // e.g actual like onclick ="editButton()"
    modifyElement(editButton, true); // change for add then display
  });

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton); // for delete then empty
  });

  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent); // display the list 
};

//Function To Add Expenses
checkAmountButton.addEventListener("click", () => {
  //empty checks
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  //Enable buttons
  disableButtons(false);
  //Expense
  let expenditure = parseInt(userAmount.value);
  //Total expense (existing + new)
  let sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  //Total balance(budget - total expense)
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  //Create list
  listCreator(productTitle.value, userAmount.value);
  //Empty inputs
  productTitle.value = "";
  userAmount.value = "";
});

//Function To Add Income
checkIncomeButton.addEventListener("click", () => {
  //empty checks
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  //Enable buttons
  disableButtons(false);
  //Income
  let incomeAdd = parseInt(userAmount.value);
  //Total income (existing + new)
  let sum = parseInt(incomeValue.innerText) + incomeAdd;
  incomeValue.innerText = sum;
  //Total balance(budget + total income)
  const totalBalance = tempAmount + sum;
  balanceValue.innerText = totalBalance;
  //Create list
  listCreator(productTitle.value, userAmount.value);
  //Empty inputs
  productTitle.value = "";
  userAmount.value = "";
});

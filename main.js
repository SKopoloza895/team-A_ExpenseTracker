// Declare and variable with const initialization
const currencyHolder = document.getElementById("currency") //currency from html to getElementById
const balanceHolder = document.getElementById("balance") // balance from html to getElementById

const tnxdescriptionNameHolder = document.getElementById("description-Name") // description-Name from html to getElementById 
const tnxAmountolder = document.getElementById("amount") //amount from html to getElementById

const income = document.getElementById("income") // income (radio)from html to getElementById
const expense = document.getElementById("expense") // expense (radio)from html to getElementById

const saveButton = document.getElementById("save"); //save button from html to getElementById
const cancelButton = document.getElementById("cancel");

const displayList = document.getElementById("list-of-transactions"); // list-of-transactions from html to getElementById

// we need few variable for list transactions
let symbol = "R";
let currentBalance = 0;
let listOfTransactions = [];

let editIndex = -1; // make new variable for cancel

// Function for Edit onclick="edit(${i})" 
function edit(i) { // i for index
  cancelButton.style.display = "block"; // from css
  editIndex = i;
  tnxdescriptionNameHolder.value =listOfTransactions[i].name;
  tnxAmountolder.value =listOfTransactions[i].amount;

  if (listOfTransactions[i].type == "income") {
      income.checked = true;
  }
  else{
      expense.checked =true;
  }
  
}

// Function for Delete onclick="deleteBtn(${i})" 
function deleteBtn(i) {
  listOfTransactions = listOfTransactions.
  filter((e,index) => i !== index); // [filter((e,index) => mean if return is true] [i !== index mean list otherwise it wont be in list that how filter after deleting]
  display();
}

// function for load data in local storage
function loadData() {
  symbol = localStorage.getItem("symbol");
  currentBalance = Number(localStorage.getItem("balance"));
  listOfTransactions = JSON.parse(localStorage.getItem("list"));

}

// Function for display (render)
function display() {
  currentBalance = listOfTransactions.reduce(
      (total,value) => {return value.type == "expense" ? total - value.amount : total + value.amount},0) //in order array function and take callback with value. return will reach on total plus and value
  
  displayList.innerHTML = ""; 
  
  if (listOfTransactions.length == 0) {
      displayList.innerHTML += "No Transaction found"
  }
  else{
      listOfTransactions.forEach((e,i) =>{ // forEach((e,i) from callback the function accept to 3 arguments in array. (e => element and this)
          displayList.innerHTML += `
          <li class="transaction ${e.type}"> 
              <p>${e.name}</p>
              <div class="right_side">
                  <p>${symbol}${e.amount}</p>
                  <button onclick="edit(${i})"><i class="fas fa-edit"></i></button>
                  <button onclick="deleteBtn(${i})"><i class="fas fa-trash-alt"></i></button>
              </div>
          </li>
          `;
      })
  }


  currencyHolder.innerHTML = symbol;
  balanceHolder.innerHTML = currentBalance;
  keepData();
}

// Function for Cancel Button
cancelButton.addEventListener("click", () => {
  editIndex = -1;    
  tnxdescriptionNameHolder.value ="";
  tnxAmountolder.value = "";
  cancelButton.style.display = "none";
})

// Function for Save Button
saveButton.addEventListener("click", () => { // "click" event and on click event 
  if (tnxdescriptionNameHolder.value == "" || (tnxAmountolder.value) <= 0) { // if true with blank then check OR Aamount with 0 
      alert("Can't be blank!");
      return;
  }
  
  let transaction = { // use for objects
      name: tnxdescriptionNameHolder.value,
      amount: Number(tnxAmountolder.value), // convert it to number
      type: income.checked? "income" : "expense" // selected 
  };
  // console.log(transaction);

  if (editIndex == -1) listOfTransactions.push(transaction);

  else 
      listOfTransactions[editIndex] = transaction;

  editIndex = -1;    
  tnxdescriptionNameHolder.value ="";
  tnxAmountolder.value = "";
  display(); 
  cancelButton.style.display = "none";
})
loadData();

display();

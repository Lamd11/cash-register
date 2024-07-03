const purchaseBtn = document.getElementById("purchase-btn");
const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const totalOwned = document.getElementById("price-owed");
const drawer = document.getElementById("drawer");

let price = 11.95;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 5],
    ['FIVE', 10],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

const updateDrawer = () => {
    drawer.innerHTML = `
    Change in drawer: <br>
    Pennies: $${cid[0][1]} <br>
    Nickels: $${cid[1][1]} <br>
    Dimes: $${cid[2][1]} <br>
    Quarters: $${cid[3][1]} <br>
    Ones: $${cid[4][1]} <br>
    Fives: $${cid[5][1]} <br>
    Tens: $${cid[6][1]} <br>
    Twenties: $${cid[7][1]} <br>
    Hundreds: $${cid[8][1]} <br>
`;
};

let moneyValue = [
    0.01,
    0.05,
    0.1,
    0.25,
    1,
    5,
    10,
    20,
    100
];

totalOwned.textContent = `Total: $${price}`;
updateDrawer();

const calculateChange = (cashValue) => {
    changeDue.innerHTML = ``;
    console.log(cashValue)
    if (cashValue < price) {
        alert("Customer does not have enough money to purchase the item");
    }
    else if (cashValue === price) {
        changeDue.innerHTML = "No change due - customer paid with exact cash";
    }
    else {
        let total = 0;
        cid.forEach(element => {
            total += element[1];
        });
        if (cashValue - price > total) {
            changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
        }
        else {
            if(total == (cashValue - price)) changeDue.innerHTML += `Status: CLOSED <br>`;
            else changeDue.innerHTML += `Status: OPEN <br>`
            let changeAmount = parseFloat((cashValue - price).toFixed(2));
            for (let i = cid.length - 1; i >= 0; i--) {
                let printedValue = 0;
                while (changeAmount >= moneyValue[i] && cid[i][1] > 0) {
                    changeAmount -= moneyValue[i];
                    changeAmount = parseFloat(changeAmount.toFixed(2));  // Fix precision issues
                    printedValue += moneyValue[i];
                    cid[i][1] -= moneyValue[i];
                    cid[i][1] = parseFloat(cid[i][1]).toFixed(2);  // Fix precision issues
                }
                if (printedValue > 0) {
                    changeDue.innerHTML += `${cid[i][0]}: $${printedValue.toFixed(2)} <br>`;
                }
            }
            if (changeAmount > 0) {
                changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
            }
            updateDrawer();
        }
    }
};

purchaseBtn.addEventListener("click", () => {
    calculateChange(Number(cash.value));
});

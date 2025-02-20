document.addEventListener("DOMContentLoaded", () => {
    const balanceElement = document.getElementById("balance");
    const transactionForm = document.getElementById("transaction-form");
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const transactionList = document.getElementById("transaction-list");

    let balance = 0;

    transactionForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value);

        if (description === "" || isNaN(amount)) {
            alert("Syötä kelvollinen kuvaus ja määrä!");
            return;
        }

        // Determine if the transaction is income or expense
        const transactionType = amount >= 0 ? "income" : "expense";

        // Update balance
        balance += amount;
        updateBalance();

        // Add transaction to the list
        addTransactionToList(description, amount, transactionType);

        // Clear input fields
        descriptionInput.value = "";
        amountInput.value = "";
    });

    function updateBalance() {
        balanceElement.textContent = `${balance.toFixed(2)} €`;
    }

    function addTransactionToList(description, amount, type) {
        const listItem = document.createElement("li");
        listItem.classList.add(type);
        listItem.innerHTML = `
            <span>${description}: ${amount.toFixed(2)} €</span>
            <button class="delete-btn">✖</button>
        `;


        listItem.querySelector(".delete-btn").addEventListener("click", () => {
            balance -= amount;
            updateBalance();
            listItem.remove();
        });

        transactionList.appendChild(listItem);
    }
});
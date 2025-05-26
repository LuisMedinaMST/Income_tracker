let respuestaIngreso = document.getElementById("respuesta_ingreso");
let descripcionIngreso = document.getElementById("descripcion_ingreso");
let botonIngreso = document.getElementById("boton_ingreso");
let mostrarIngresos = document.getElementById("mostrar_ingresos");
let incomesList = document.getElementById("incomes_list");

let respuestaGasto = document.getElementById("respuesta_gasto");
let descripcionGasto = document.getElementById("descripcion_gasto");
let botonGasto = document.getElementById("boton_gasto");
let mostrarGastos = document.getElementById("mostrar_gastos");
let expensesList = document.getElementById("expenses_list");

// Arrays to store Income and Expenses instances
const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Save data to local storage
function saveToLocalStorage() {
    localStorage.setItem("incomes", JSON.stringify(incomes));
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Income class
class Income {
    constructor(amount, description) {
        this.amount = amount;
        this.description = description;
    }
}

// Expenses class
class Expenditure {
    constructor(amount, description) {
        this.amount = amount;
        this.description = description;
    }
}

// Add income on button click
botonIngreso.addEventListener("click", () => {
    const montoIngreso = respuestaIngreso.value;
    const textoDescripcion = descripcionIngreso.value;

    if (montoIngreso && textoDescripcion) {
        const ingreso = new Income(parseFloat(montoIngreso), textoDescripcion);
        incomes.push(ingreso); // Store the instance
        saveToLocalStorage(); // Save to local storage

        const messageElement1 = document.getElementById("message1");
        messageElement1.innerHTML = `Agregaste un ingreso por la cantidad de $${ingreso.amount} y descrito como ${ingreso.description}`;

        // Clear inputs
        respuestaIngreso.value = "";
        descripcionIngreso.value = "";
    } else {
        console.log("Por favor, ingresa un monto y una descripción válidos");
    }
});

// Add expense on button click
botonGasto.addEventListener("click", () => {
    const montoGasto = respuestaGasto.value;
    const textoDescripcion = descripcionGasto.value;

    if (montoGasto && textoDescripcion) {
        const gasto = new Expenditure(parseFloat(montoGasto), textoDescripcion);
        expenses.push(gasto); // Store the instance
        saveToLocalStorage(); // Save to local storage

        const messageElement2 = document.getElementById("message2");
        messageElement2.innerHTML = `Agregaste un gasto por la cantidad de $${gasto.amount} y descrito como ${gasto.description}`;

        // Clear inputs
        respuestaGasto.value = "";
        descripcionGasto.value = "";
    } else {
        console.log("Por favor, ingresa un monto y una descripción válidos");
    }
});

// Display all incomes on button click
mostrarIngresos.addEventListener("click", () => {
    incomesList.innerHTML = "";
    if (incomes.length > 0) {
        const ul = document.createElement("ul");
        incomes.forEach((income, index) => {
            const li = document.createElement("li");
            li.textContent = `Ingreso ${index + 1}: ${income.amount} - ${income.description}`;
            ul.appendChild(li);
        });
        incomesList.appendChild(ul);
    } else {
        incomesList.textContent = "No hay ingresos registrados.";
    }
});

// Display all expenses on button click
mostrarGastos.addEventListener("click", () => {
    expensesList.innerHTML = "";
    if (expenses.length > 0) {
        const ul = document.createElement("ul");
        expenses.forEach((expense, index) => {
            const li = document.createElement("li");
            li.textContent = `Gasto ${index + 1}: ${expense.amount} - ${expense.description}`;
            ul.appendChild(li);
        });
        expensesList.appendChild(ul);
    } else {
        expensesList.textContent = "No hay gastos registrados.";
    }
});

// Load and display saved data on page load
window.addEventListener("load", () => {
    mostrarIngresos.click();
    mostrarGastos.click();
});

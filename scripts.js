// Seleciona os elemtnso do formulario
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul");
const expensesTotal = document.querySelector("aside header h2");
const expensesQuantity = document.querySelector("aside header p span");

// Captura o evento de input para formatar o valor
amount.oninput = () => {
    // Obtém o valor atual do input e remove os caracteres não numéricos
    let value = amount.value.replace(/[^0-9]/g, "");

    // Transforma o valor em centavos
    value = Number(value) / 100;

    // Atualiza o valor do input
    amount.value = formatCurrencyBRL(value);
}

function formatCurrencyBRL(value) {
    // Formata o valor como moeda brasileira
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return value;
}

form.onsubmit = (event) => {
    event.preventDefault(); // Previne o envio do formulário

    // Cria objeto com os dados do novo gasto
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),

    }
    expenseAdd(newExpense); // Chama a função para adicionar o gasto
} 

function expenseAdd(newExpense) {
    try {

        // Cria o elemento para adicionar o item (li) na lista (ul).
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");

        // Cria o ícone da categoria
        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        // Cria a info da despesa
        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");

        // Cria o nome da despesa
        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense;

        // Cria a categoria da despesa
        const expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExpense.category_name;

        // Cria a info do valor da despesa
        const expenseInfoAmount = document.createElement("span");
        expenseInfoAmount.classList.add("expense-amount");
        expenseInfoAmount.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace("R$", "")}`;

        const deleteIcon = document.createElement("img");
        deleteIcon.classList.add("remove-icon");
        deleteIcon.setAttribute("src", "./img/remove.svg");
        deleteIcon.setAttribute("alt", "Remover despesa");

        // Adiciona as informações no item.
        expenseItem.append(expenseIcon, expenseInfo, expenseInfoAmount, deleteIcon);

        // Adicionao o item na lista.
        expenseList.append(expenseItem);

        // Adiciona o nome e a categoria da despesa na info.
        expenseInfo.append(expenseName, expenseCategory);

        updateTotals(); // Atualiza os totais
        formClear();

    } catch (error) {
        alert("Não foi possivel atualizar a lista de despesas");
        console.log(error);
    }
}

// Adiciona count para despesas
function updateTotals(){
    try {
        //Recupera todos os itens (li) da lista (ul)
        const items = expenseList.children
        
        // Atualiza a quantidade de itens da lista.
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;

        // Variável para incrementar o total
        let total = 0;

        // Percorre cada item (li) da lista (ul)
        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount");

            // Remover caracteres não numéricos e substituir vírgula por ponto
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");

            // Converte o valor para float.
            value = parseFloat(value);

            // Verifica se é um numero válido.
            if(isNaN(value)){
                return alert("Não foi possivel calcular o total. O valor não aparece ser um número")
            }

            // Incrementa o valor total
            total += Number(value);
        }

        // Cria a span para adicionar o R$ formatado.
        const symbolBRL = document.createElement("small");
        symbolBRL.textContent = "R$";

        // Formata o valor e remofe o sifrão que será exibido pela small com um estilo customizado.
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

        // Limpa o conteúdo do elemento.
        expensesTotal.innerHTML = "";

        // Adiciona o simbolo da moeda e o valor
        expensesTotal.append(symbolBRL, total);
    } catch (error) {
        alert("Não foi possível atualizar os totais");
        console.log(error);
    }
}

// Evento que caputa o clique nos itens da lista
expenseList.addEventListener("click", function(event) {
    // Verifica se o elemento clicado é o icone de remover.
    if (event.target.classList.contains("remove-icon")) {
        // Obtém a li pai do elemento clicado.
        const item = event.target.closest(".expense");

         // Remove o item da lista
        item.remove();
    }
    updateTotals();
})

function formClear() {
    // Limpa os campos do formulário
    amount.value = "";
    expense.value = "";
    category.value = "";

    // Coloca foco no input de amount
    expense.focus();
}
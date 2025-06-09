// Seleciona os elemtnso do formulario
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

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
} 
import calcularDesconto from "./desconto.js";

const botao = document.getElementById("calcular");

botao.addEventListener("click", () => {

    const preco = Number(document.getElementById("preco").value);
    const desconto = Number(document.getElementById("desconto").value);

    const resultado = calcularDesconto(preco, desconto);

    console.log("Preço original: R$ " + preco);
    console.log("Desconto: " + desconto + "%");
    console.log("Preço final: R$ " + resultado.toFixed(2));
});
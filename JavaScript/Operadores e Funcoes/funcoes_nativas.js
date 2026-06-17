console.log("----- Funções Nativas -----");

// Exemplo - Função nativa - data e hora //
let agora = new Date();
console.log(agora);

function mostrarDataHora() {
    let data = new Date();
    console.log("dia: ", data.getDate());
    console.log("mês: ", data.getMonth() + 1);
    console.log("ano: ", data.getFullYear());
    console.log("hora: ", data.getHours());
    console.log("minuto: ", data.getMinutes());
    console.log("segundo: ", data.getSeconds());
    console.log("Desafio:", data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds() + " " + data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear());

}
console.log(mostrarDataHora());

console.log("Desafio 2");
let pi = Math.PI;
console.log(pi.toFixed(2));

function calcularOperacoes(numero) {
    console.log("Número:", numero);
    console.log("Raiz quadrada:", Math.sqrt(numero));
    console.log("Número arredondado para 2 casas decimais:", Math.round(numero * 100) / 100);
    console.log("Número arredondado para cima:", Math.ceil(numero));
    console.log("Número arredondado para baixo:", Math.floor(numero));
    console.log("10² elevado ao quadrado:", Math.pow(numero, 2));
    console.log("Valor absoluto:", Math.abs(numero));
}
calcularOperacoes(7.8);

function analisarTexto(texto) {
    console.log("Texto:", texto);
    console.log("Tamanho do texto:", texto.length);
    console.log("Texto em maiúsculas:", texto.toUpperCase());
    console.log("Texto em minúsculas:", texto.toLowerCase());   
}
analisarTexto("JavaScript");

function verificaTexto(frase) {
    console.log(frase.includes("JavaScript"));
}
verificaTexto("Eu estudo JavaScript!");

function concatena(nome, curso) {
    return "Aluno: " + nome + " | Curso: " + curso;
}
console.log(concatena("José" , "Front-End"));
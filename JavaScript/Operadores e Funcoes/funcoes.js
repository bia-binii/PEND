// Bloco de códigos reutilizaveis - Funções - Estrutura //
function saudacao() {
    console.log("Olá, JavaScript!");
}
saudacao(); 


// Função com parâmetros //
function nomeDaFuncao(parametro) {
    return resultado; 
}


// Exemplo - Função com retorno //
function soma(a, b) {
    return a + b;
}
console.log(soma(5, 3));


// Exemplo - Função sem retorno //
function nomes (nome) {
    console.log("Olá, " + nome + "!");
}
nomes("Bianca");

// Exercício 07 - Criar função que calcula o IMC //
console.log("***** Atividades Funções *****");

function calcularIMC(peso, altura) {
    let imc = peso / (altura * altura);
    return imc;
}
let peso = prompt("Digite seu peso em kg:"); 
let altura = prompt("Digite sua altura em metros:");
let imc = calcularIMC(peso, altura);
let imcarcd = imc.toFixed(2);
console.log("Seu IMC é:", imcarcd);



// Exercício 08 - Criar função que verifica se um número é par ou ímpar //
function verificarParOuImpar(numero) {
    if (numero % 2 === 0) {
        return "par";
    } else {
        return "ímpar";
    }
}
let numeroVerificar = Number (prompt("Digite um número para verificar se é par ou ímpar:"));
let resultadoVerificacao = verificarParOuImpar(numeroVerificar);
console.log("O número", numeroVerificar, "é", resultadoVerificacao);


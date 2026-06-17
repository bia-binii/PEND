console.log("***** Atividade 1 *****");

function mostraHoraAtual() {
    let data = new Date();
    let hora = data.getHours();
    let minuto = data.getMinutes();
    let segundo = data.getSeconds();
    console.log("Hora atual:", hora + ":" + minuto + ":" + segundo);
}
mostraHoraAtual();

console.log("***** Atividade 2 *****");

// Uma função que receba dois numeros digitados e mostre a soma e media//

function somaEMedia() {
    let n1 = Number(prompt("Digite o primeiro número:"));
    let n2 = Number(prompt("Digite o segundo número:"));
    let soma = n1 + n2;
    let media = soma / 2;
    console.log("A soma dos números é:", soma);
    console.log("A média dos números é:", media);
}
somaEMedia();

console.log("***** Atividade 3 *****");

// Uma função que receba um nome e mostre a quantidade de letras e coloque nome em maiúsculo//

function mostraNomeQuantidadeLetras(name) {
    let nome = prompt("Digite seu nome:");
    let quantidadeLetras = nome.length;
    let nomeMaiusculo = nome.toUpperCase();
    console.log("Quantidade de caracteres:", quantidadeLetras);
    console.log("Nome em maiúsculo:", nomeMaiusculo);
}
mostraNomeQuantidadeLetras();

console.log("***** Atividade 4 *****");

// Uma função que receba uma frase e verifica se contém a palavra "HTML"
function verificaPalavraHTML(texto) {
    let frase = prompt("Digite uma frase:");
    console.log("Frase:", frase);
    console.log("Contém 'HTML':", frase.includes("HTML"));
}
verificaPalavraHTML();
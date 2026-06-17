console.log("Olá, JavaScript!");

// Operadores Aritméticos - Exemplo //

let a = 10;
let b = 3;

console.log("Operador de Adição", a + b);
console.log("Operador de Subtração", a - b);
console.log("Operador de Multiplicação", a * b);
console.log("Operador de Divisão", a / b);
console.log("Operador de Resto da Divisão", a % b);
console.log("Operador de Potência", a ** b);

let contador = 5;
contador++;
console.log(contador);

// Calcular media de 3 números - Exercício 01 //
let num1 = 10;
let num2 = 9;
let num3 = 8;
console.log((num1 + num2 + num3) / 3);

// Calcular resto da divisão - Exercício 02 //
let numero = 29;
let divisor = 5;
let resto = numero % divisor;
console.log(resto);

// Operadores Relacionais - Exemplo //

let x = 10;       // Número inteiro //
let y = "10";    // String //

console.log(x == y);
console.log(x === y);
console.log(x != y);
console.log(x !== y);

// Comparar idade para verificar se é maior de idade - Exercício 03 //
let idade = 14;
if (idade >= 18) {
    console.log("Maior de idade");
} else {
    console.log("Menor de idade");
}

// Comparar dois números e exibir o maior - Exercício 04 //
let numero1 = 1;
let numero2 = 12;
if (numero1 > numero2) {
    console.log("O maior número é:", numero1);
} else if (numero2 > numero1) {
    console.log("O maior número é:", numero2);
} else {
    console.log("Os números são iguais.");
}

// Operadores Lógicos - Exemplo usados para combinar condições //
let idade1 = 20;
let possuiCarteira = true;

console.log(idade1 >= 18 && possuiCarteira);

let chovendo = false;
let guardaChuva = true;

console.log(chovendo || guardaChuva);

let ligado = false
console.log(!ligado); // True

// Verificar se um aluno foi aprovado (nota >= 7 e Frequência >= 75%) - Exercício 05 //
let nota = 10;
let frequencia =80;
if (nota >= 7 && frequencia >= 75) {
    console.log("Aluno aprovado");
} else {
    console.log("Aluno reprovado");
}   

// Verificar acesso com login OU token - Exercício 06 //
let temLogin = true;
let temToken = false;
if (temLogin || temToken) {
    console.log("Acesso permitido");
} else {
    console.log("Acesso negado");
}
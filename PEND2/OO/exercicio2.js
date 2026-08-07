// Classe: alunos
// Atributos: nome, idade, curso, matricula
// Métodos: estudar(), aprender(), apresentar()

class Aluno {
    nome;
    idade;
    curso;
    matricula; 

    constructor(nome, idade, curso, matricula) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.matricula = matricula;
    }

    estudar() {
        console.log(`${this.nome} está estudando.`);
    }   

    aprender() {
        console.log(`${this.nome} está aprendendo.`);
    }

    apresentar() {
        console.log(`Olá, meu nome é ${this.nome}, tenho ${this.idade} anos, curso ${this.curso} e minha matrícula é ${this.matricula}.`);
    }

}

const aluno1 = new Aluno("Vitória", 17, "Desenvolvimento de Sistemas", "12345");
console.log("Aluno 1", aluno1);
aluno1.estudar();
aluno1.aprender();
aluno1.apresentar();
console.log("---------------------------------");

const aluno2 = new Aluno("Gabriela", 18, "Administração", "67890");
console.log("Aluno 2", aluno2);
aluno2.estudar();
aluno2.aprender();
aluno2.apresentar();
console.log("---------------------------------");

const aluno3 = new Aluno("Bianca", 17, "Biomedicina", "54321");
console.log("Aluno 3", aluno3);
aluno3.estudar();
aluno3.aprender();
aluno3.apresentar();
console.log("---------------------------------");

const aluno4 = new Aluno("Evelyn", 18, "Psicologia", "98765");
console.log("Aluno 4", aluno4);
aluno4.estudar();
aluno4.aprender();
aluno4.apresentar();

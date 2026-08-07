// Classe - classe é um molde para criar objetos
class Carro {

    // // Atributos - variáveis que pertencem a um objeto da classe
    marca;
    modelo;
    ano;
    cor;    


    // Construtor - método chamado quando um objeto da classe é criado
    constructor(marca, modelo, ano, cor) {


        // this - para falar que o atributo pertence ao objeto que está sendo criado
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
    }

        // Métodos - funções que pertencem a um objeto da classe
         ligar() {
        console.log("Carro ligado");
    }

        // Métodos - funções que pertencem a um objeto da classe
        acelerar() {
        console.log("Carro acelerando");
    }

        frear() {
        console.log(`${this.modelo} freiou.`);
    }

}

    // Objeto 1 - objeto é uma instância da classe, ou seja, um exemplar da classe
    const carro1 = new Carro("Volksvagen", "gol", 2022, "Branco");
    console.log("Carro 1", carro1);

    console.log("---------------------------------");
    console.log("Atributos do Carro 1");
    console.log("- ", carro1.marca);
    console.log("- ", carro1.modelo);
    console.log("- ", carro1.ano);
    console.log("- ", carro1.cor);
    console.log("---------------------------------");
    

    // Objeto 2 - objeto é uma instância da classe, ou seja, um exemplar da classe
    const carro2 = new Carro("Toyota", "Corolla", 2025, "Preto");
    console.log("Carro 2", carro2);

    console.log("---------------------------------");
    console.log("Atributos do Carro 2");
    console.log("- ", carro2.marca);
    console.log("- ", carro2.modelo);
    console.log("- ", carro2.ano);
    console.log("- ", carro2.cor);
    console.log("---------------------------------");


    // Objeto 3 - objeto é uma instância da classe, ou seja, um exemplar da classe
    const carro3 = new Carro("Honda", "Civic", 2025, "Preto");
    console.log("Carro 3", carro3);

    console.log("---------------------------------");
    console.log("Atributos do Carro 3");
    console.log("- ", carro3.marca);
    console.log("- ", carro3.modelo);
    console.log("- ", carro3.ano);
    console.log("- ", carro3.cor);
    console.log("---------------------------------");

    //
    carro1.ligar();

    //
    carro1.acelerar();

    //
    carro3.frear();
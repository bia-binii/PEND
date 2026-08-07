// Classe: Produto
// Atributos: nome, preco, quantidade, categoria, estoque, descricao
// Métodos: vender(), repor(), calcularValorTotal(), alterarPreco(), alterarDescricao()

class Produto {
    nome;
    preco;
    quantidade;
    categoria;
    estoque;
    descricao;

    constructor(nome, preco, quantidade, categoria, estoque, descricao) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
        this.categoria = categoria;
        this.estoque = estoque;
        this.descricao = descricao;
    }

    vender() {
        if (this.quantidade > 0) {
            this.quantidade--;
            console.log(`${this.nome} foi vendido.`);
        } else {
            console.log(`Não há ${this.nome} em estoque.`);
        }
    }

    repor() {
        this.quantidade++;
        console.log(`${this.nome} foi reabastecido.`);
    }

    calcularValorTotal() {
        return this.quantidade * this.preco;
    }

    alterarPreco(novoPreco) {
        this.preco = novoPreco;
        console.log(`O preço de ${this.nome} foi alterado para R$${this.preco.toFixed(2)}.`);
    }

    alterarDescricao(novaDescricao) {
        this.descricao = novaDescricao;
        console.log(`A descrição de ${this.nome} foi alterada para: ${this.descricao}`);
    }
}

const produto1 = new Produto("Notebook", 3500.00, 10, "Eletrônicos", true, "Notebook de última geração");
console.log("Produto 1", produto1);
produto1.vender();
produto1.repor();
produto1.alterarPreco(3200.00);
produto1.alterarDescricao("Notebook com processador rápido e tela de alta resolução");
produto1.calcularValorTotal();
console.log("---------------------------------");

const produto2 = new Produto("Smartphone", 2500.00, 5, "Eletrônicos", true, "Smartphone com câmera de alta resolução");
console.log("Produto 2", produto2);
produto2.repor();
console.log("---------------------------------");

const produto3 = new Produto("Camiseta", 50.00, 20, "Roupas", true, "Camiseta de algodão");
console.log("Produto 3", produto3);
produto3.alterarPreco(45.00);
produto3.alterarDescricao("Camiseta de algodão com estampa personalizada");

console.log("---------------------------------");

const produto4 = new Produto("Tênis", 200.00, 15, "Calçados", true, "Tênis confortável para corrida");
console.log("Produto 4", produto4);
produto4.vender();

console.log("---------------------------------");
class Produto {

    constructor(nome, preco, categoria, desconto) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.desconto = desconto;
    }

    aplicarDesconto() {
        const precoComDesconto = this.preco - (this.preco * (this.desconto / 100));
        return precoComDesconto;
    }

    exibir() {
        console.log(`${this.nome} custa R$ ${this.aplicarDesconto().toFixed(2)} com desconto aplicado.`);
    }
}

class Estoque {

    constructor() {
        this.produtos = [];
    }

    adicionarProduto(produto) {
    this.produtos = [produto];
    }

    exibirNaTela() {

        const resultado = document.querySelector("#resultado");

        resultado.innerHTML = "";

        this.produtos.forEach(produto => {

            const precoFinal = produto.aplicarDesconto();

            resultado.innerHTML += `
            <div>
                <p>Nome: ${produto.nome}</p>
                <p>Categoria: ${produto.categoria}</p>
                <p>Desconto: ${produto.desconto}%</p>
                <p>Preço com desconto: R$ ${precoFinal.toFixed(2)}</p>
            </div>
        `;

        });
    }
}

//Array ou vetor para armazenar os produtos cadastrados
const estoque = new Estoque();
const nome = document.querySelector("#nome");
const preco = document.querySelector("#preco");
const categoria = document.querySelector("#categoria");
const desconto = document.querySelector("#desconto");
const botaoCadastrar = document.querySelector("#botaoCadastrar");

botaoCadastrar.addEventListener("click", function () {

    const produto = new Produto(nome.value, parseFloat(preco.value), categoria.value, parseFloat(desconto.value));

    estoque.adicionarProduto(produto);
    estoque.exibirNaTela();

    });
class Produto {

    constructor(nome, preco, categoria, desconto) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.desconto = desconto;
    }

    aplicarDesconto() {
        this.preco = this.preco - (this.preco * (this.desconto / 100));
    }

    exibirNaTela() {

        const resultado = document.querySelector("#resultado");

        resultado.innerHTML = `
            <div>
                <p>Nome: ${this.nome}</p>
                <p>Categoria: ${this.categoria}</p>
                <p>Desconto: ${this.desconto}%</p>
                <p>Preço com desconto: R$ ${this.preco}</p>
            </div>
        `;

    }
}

// class Estoque {

//     constructor() {
//         this.produtos = [];
//     }

//     adicionarProduto(produto) {
//     this.produtos = [produto];
//     }

//     exibirNaTela() {

//         const resultado = document.querySelector("#resultado");

//         resultado.innerHTML = "";

//         this.produtos.forEach(produto => {

//             const precoFinal = produto.aplicarDesconto();

//             resultado.innerHTML += `
//             <div>
//                 <p>Nome: ${produto.nome}</p>
//                 <p>Categoria: ${produto.categoria}</p>
//                 <p>Desconto: ${produto.desconto}%</p>
//                 <p>Preço com desconto: R$ ${precoFinal.toFixed(2)}</p>
//             </div>
//         `;

//         });
//     }
// }

//Array ou vetor para armazenar os produtos cadastrados
const nome = document.querySelector("#nome");
const preco = document.querySelector("#preco");
const categoria = document.querySelector("#categoria");
const desconto = document.querySelector("#desconto");
const botaoCadastrar = document.querySelector("#botaoCadastrar");

botaoCadastrar.addEventListener("click", function () {

    const produto = new Produto(nome.value, parseFloat(preco.value), categoria.value, parseFloat(desconto.value));
    produto.aplicarDesconto();
    localStorage.setItem("produto", JSON.stringify(produto));
    produto.exibirNaTela();

});

const dados = localStorage.getItem("produto");

if (dados) {

    const produtoSalvo = JSON.parse(dados)

    const produto = new Produto(
        produtoSalvo.nome,
        produtoSalvo.preco,
        produtoSalvo.categoria,
        produtoSalvo.desconto
    );

    produto.exibirNaTela();
}
class Produto {

    constructor(nome, preco, categoria, desconto) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.desconto = desconto;
    }

    aplicarDesconto() {
        const precoComDesconto =
            this.preco - (this.preco * (this.desconto / 100));

        return precoComDesconto;
    }

    exibir() {
        console.log(
            `${this.nome} custa R$ ${this.aplicarDesconto().toFixed(2)} com desconto aplicado.`
        );
    }
}


class Estoque {

    constructor() {
        this.produtos = [];
    }

    // Adiciona um produto ao array
    adicionarProduto(produto) {
        this.produtos.push(produto);
    }

    // Exclui um produto pelo índice
    excluirProduto(indice) {
        this.produtos.splice(indice, 1);

        // Atualiza a tela depois da exclusão
        this.exibirNaTela();
    }

    // Exibe os produtos na tela
    exibirNaTela() {

        const resultado = document.querySelector("#resultado");

        // Limpa a tela antes de exibir novamente
        resultado.innerHTML = "";

        this.produtos.forEach((produto, indice) => {

            const precoFinal = produto.aplicarDesconto();

            resultado.innerHTML += `
                <div class="produto">

                    <p>Nome: ${produto.nome}</p>

                    <p>Preço: R$ ${produto.preco.toFixed(2)}</p>

                    <p>Categoria: ${produto.categoria}</p>

                    <p>Desconto: ${produto.desconto}%</p>

                    <p>Preço com desconto: R$ ${precoFinal.toFixed(2)}</p>

                    <button 
                        class="botaoExcluir" 
                        data-indice="${indice}">
                        Excluir
                    </button>

                </div>
            `;
        });

        // Seleciona todos os botões Excluir
        const botoesExcluir = document.querySelectorAll(".botaoExcluir");

        // Adiciona o evento de clique em cada botão
        botoesExcluir.forEach(botao => {

            botao.addEventListener("click", function () {

                // Pega o índice do produto
                const indice = Number(this.dataset.indice);

                // Exclui o produto
                estoque.excluirProduto(indice);
            });
        });
    }
}


// Array para armazenar os produtos cadastrados
const estoque = new Estoque();


// Pegando os elementos do HTML
const nome = document.querySelector("#nome");
const preco = document.querySelector("#preco");
const categoria = document.querySelector("#categoria");
const desconto = document.querySelector("#desconto");
const botaoCadastrar = document.querySelector("#botaoCadastrar");


// Evento do botão Cadastrar
botaoCadastrar.addEventListener("click", function () {

    // Verifica se os campos estão preenchidos
    if (
        nome.value.trim() === "" ||
        preco.value === "" ||
        categoria.value.trim() === "" ||
        desconto.value === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    // Cria um novo produto
    const produto = new Produto(
        nome.value,
        parseFloat(preco.value),
        categoria.value,
        parseFloat(desconto.value)
    );

    // Adiciona o produto ao estoque
    estoque.adicionarProduto(produto);

    // Exibe os produtos na tela
    estoque.exibirNaTela();

    // Limpa os campos
    nome.value = "";
    preco.value = "";
    categoria.value = "";
    desconto.value = "";
});
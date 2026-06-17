//Atividade 01 //

let titulo = document.getElementById("titulo");

document.getElementById("azulButton").addEventListener("click", function() {
    document.getElementById("titulo").style.color = "blue";
});

document.getElementById("vermelhoButton").addEventListener("click", function() {
    document.getElementById("titulo").style.color = "red";
}); 

// Atividade 02 //
let mensagem = document.getElementById("mensagem");
document.getElementById("mensagemButton").addEventListener("click", function() {
    if (mensagem.style.display === "none") {    
        mensagem.style.display = "block";
    } else {
        mensagem.style.display = "none";
    }
});

// Atividade 03 //
let campoTexto = document.getElementById("campoTexto");
let contador = document.getElementById("contador");

campoTexto.addEventListener("input", function() {
    let quantidadeCaracteres = campoTexto.value.length;
    contador.textContent = "Caracteres digitados: " + quantidadeCaracteres;
});

// Atividade 04 //
let contadorCliques = 0;
let contadorCliquesElemento = document.getElementById("contadorCliques");
let botaoClique = document.getElementById("botaoClique");
botaoClique.addEventListener("click", function() {
    contadorCliques++;
    contadorCliquesElemento.textContent = "Contador de cliques: " + contadorCliques;
});

// Atividade 05 //
let adicionarItemButton = document.getElementById("adicionarItem");
let listaItens = document.getElementById("listaItens");

adicionarItemButton.addEventListener("click", function() {
    let novoItemInput = document.getElementById("novoItem");
    let novoItemTexto = novoItemInput.value.trim();
    if (novoItemTexto !== "") {
        let novoItem = document.createElement("li");
        novoItem.textContent = novoItemTexto;
        listaItens.appendChild(novoItem);
        novoItemInput.value = "";
    }
});

// Atividade 06 //
listaItens.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        event.target.remove();
    }
});

// Atividade - Desafio Extra //
listaItens.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        let confirmarRemocao = confirm("Tem certeza que deseja remover este item?");
        if (confirmarRemocao) {
            event.target.remove();
        }
    }
});

// Atividade - Desafio HARD! //
let enviarNomeButton = document.getElementById("enviarNome");
enviarNomeButton.addEventListener("click", function() {
    let nomeInput = document.getElementById("nomeInput");
    let mensagemNome = document.getElementById("mensagemNome");
    let nome = nomeInput.value.trim();
    if (nome === "") {
        mensagemNome.textContent = "O campo nome é obrigatório";
        mensagemNome.style.color = "red";
    } else {
        mensagemNome.textContent = "Nome enviado com sucesso!";
        mensagemNome.style.color = "green";
    }
});

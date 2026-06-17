// Seleciona o campo de nome e cria um parágrafo para mensagens
let nomeInput = document.querySelector("#nomeLabel");
let mensagemNome = document.createElement("p");
nomeInput.after(mensagemNome); // Insere a mensagem logo após o input

// Seleciona os campos principais do formulário
let email = document.querySelector("#email");
let mensagemEmail = document.createElement("p");
email.after(mensagemEmail); // Insere a mensagem logo após o input
let cpf = document.querySelector("#cpf");
let mensagemCpf = document.createElement("p");
cpf.after(mensagemCpf); // Insere a mensagem logo após o input
let rg = document.querySelector("#rg");
let mensagemRg = document.createElement("p");
rg.after(mensagemRg); // Insere a mensagem logo após o input

// Seleciona elementos relacionados ao telefone
let adicionarTelefoneButton = document.getElementById("adicionarTelefone");
let TelefoneInput = document.getElementById("Telefone");
let listaDeTelefones = document.getElementById("listaDeTelefones");

// Seleciona outros campos do formulário
let endereco = document.querySelector("#endereco");
let sexo = document.querySelector("#sexo");

// Seleciona campos de senha
let confirmarSenha = document.querySelector("#confirmarSenha");
let senha = document.querySelector("#senha");
let mensagemSenha = document.createElement("p");
senha.after(mensagemSenha); // Insere a mensagem logo após o input

// Seleciona botões de mostrar/ocultar senha
let mostrarConfirmarSenha = document.querySelector("#mostrarConfirmarSenha");
let botao = document.querySelector("#mostrarSenha");

// Seleciona o formulário
let form = document.querySelector("#formCadastro");


// Evento para validar e mostrar mensagem no campo nome
nomeInput.addEventListener("input", function () {
    if (nomeInput.value === "") {
        mensagemNome.textContent = "Por favor, insira seu nome.";
    } else {
        mensagemNome.textContent = "Olá, " + nomeInput.value + "! Continue seu cadastro.";
    }
});


// Validação simples de email (verifica se tem @ e .)
email.addEventListener("input", function () {
    let emailValor = email.value;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValor)) {
        email.style.borderColor = "green"; // válido
        mensagemEmail.textContent = "Email válido!";
    } else {
        email.style.borderColor = "red"; // inválido
        mensagemEmail.textContent = "Email inválido. Use formato: exemplo@email.com";
    }
});


// Validação de CPF (apenas números e verifica se tem 11 dígitos)
cpf.addEventListener("input", function () {
    let cpfValor = cpf.value.replace(/\D/g, '');
    cpf.style.borderColor = cpfValor.length === 11 ? "green" : "red";
    mensagemCpf.textContent = cpfValor.length === 11 ? "CPF válido!" : "CPF inválido. Deve conter 11 dígitos.";
});


// Validação de RG (entre 7 e 9 dígitos)
rg.addEventListener("input", function () {
    let rgValor = rg.value.replace(/\D/g, '');
    rg.style.borderColor = (rgValor.length >= 7 && rgValor.length <= 9) ? "green" : "red";
    mensagemRg.textContent = (rgValor.length >= 7 && rgValor.length <= 9) ? "RG válido!" : "RG inválido. Deve conter entre 7 e 9 dígitos.";
});


// Adiciona telefone na lista ao clicar no botão
adicionarTelefoneButton.addEventListener("click", function () {
    let telefoneValor = TelefoneInput.value.trim();

    if (telefoneValor !== "") {
        let novoTelefone = document.createElement("li"); // cria item da lista
        novoTelefone.textContent = telefoneValor;
        listaDeTelefones.appendChild(novoTelefone); // adiciona na lista
        TelefoneInput.value = ""; // limpa o campo
    }
});

// Remove telefone ao clicar no item (SEM confirmação)
listaDeTelefones.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        event.target.remove();
    }
});

// Remove telefone ao clicar no item (COM confirmação)
listaDeTelefones.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        let confirmarRemocao = confirm("Tem certeza que deseja remover este telefone?");
        if (confirmarRemocao) {
            event.target.remove();
        }
    }
});


// Validação do endereço (campo não pode estar vazio)
endereco.addEventListener("input", function () {
    endereco.style.borderColor = endereco.value.trim() === "" ? "red" : "green";
});

// Verificação da força da senha (mínimo 8 caracteres, pelo menos uma letra e um número)
senha.addEventListener("input", function () {
    let senhaValor = senha.value;
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    senha.style.borderColor = regex.test(senhaValor) ? "green" : "red";
    mensagemSenha.textContent = regex.test(senhaValor) ? "Senha forte!" : "Senha fraca. Use pelo menos 8 caracteres, incluindo letras e números.";
});

// Confirmação de senha (verifica se as duas são iguais)
confirmarSenha.addEventListener("input", function () {
    confirmarSenha.style.borderColor =
        confirmarSenha.value === senha.value ? "green" : "red";
        mensagemSenha.textContent = confirmarSenha.value === senha.value ? "Senhas coincidem!" : "As senhas não coincidem.";
});


// Botão para mostrar/ocultar senha
botao.addEventListener("click", function () {
    if (senha.type === "password") {
        senha.type = "text"; // mostra senha
        botao.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
    } else {
        senha.type = "password"; // esconde senha
        botao.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
    }
});


// Botão para mostrar/ocultar confirmação de senha
mostrarConfirmarSenha.addEventListener("click", function () {
    if (confirmarSenha.type === "password") {
        confirmarSenha.type = "text";
        mostrarConfirmarSenha.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
    } else {
        confirmarSenha.type = "password";
        mostrarConfirmarSenha.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
    }

});


// Seleciona o botão de cadastro
let cadastrar = document.getElementById("cadastrar");

// Evento de clique para validar tudo antes de cadastrar
cadastrar.addEventListener("click", function () {

    let cpfValido = cpf.value.replace(/\D/g, '').length === 11;
    let emailValido = email.value.includes("@") && email.value.includes(".");
    let senhaValida = senha.value === confirmarSenha.value;

    // Verifica se todos os campos obrigatórios estão corretos
    if (
        nomeInput.value.trim() !== "" &&
        emailValido &&
        cpfValido &&
        senhaValida
    ) {
        alert("Cadastro realizado com sucesso!");
    } else {
        alert("Preencha tudo corretamente!");
    }
});
let email = document.querySelector("#e-mail");
let senha = document.querySelector("#senha");
let mensagem = document.querySelector("#mensagem-senha");
let botao = document.querySelector("#botao-validar");
 
botao.addEventListener("click", function() {
    if (email.value.trim()=== "" || !email.value.includes("@") || !email.value.includes(".")){
        alert ("Por favor, insira um e-mail válido");
        return;
    }
    alert("Tudo Certo! Bem vindo!");
}
);

senha.addEventListener("keyup", function () {
    if (senha.value.length < 6) {
        mensagem.textContent = "Senha fraca!";
        mensagem.style.color = "red";
    } else if (senha.value.length >= 6 && senha.value.length < 10) {
        mensagem.textContent = "Senha aceitável!";
        mensagem.style.color = "orange";
    } else {
        mensagem.textContent = "Senha forte!";
        mensagem.style.color = "green";
    }
}
);

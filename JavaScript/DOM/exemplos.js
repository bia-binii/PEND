document.getElementById("conteudo").innerHTML = "<p>Olá, mundo DOM! (é usado .innerHTML)</p>";

document.getElementById("mensagem").textContent = "Texto simples, sem HTML! (é usado .textContent)";

document.getElementById("foto").setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKghm6DHE4XsRjXTVSC4Xt1h2qVhN9tP9-w&s");

let url = document.getElementById("link").getAttribute("href")
console.log(url);

document.getElementById("caixa").style.backgroundColor = "orange";

document.getElementById("alerta").classList.add("destaque");

document.getElementById("alert").classList.remove("oculto");

let novoParagrafo = document.createElement("p");
novoParagrafo.textContent = "Este elementofoi criado pelo javaScript!";

document.getElementById("container").appendChild(novoParagrafo);

let novoItem = document.createElement("li");
novoItem.textContent = "Item novo";
document.getElementById("list").appendChild(novoItem);

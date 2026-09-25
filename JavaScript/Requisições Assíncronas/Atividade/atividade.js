const botao = document.getElementById("buscarAnimais");
const idAnimal = document.getElementById("idAnimal");
const resultado = document.getElementById("resultado");

botao.addEventListener("click", async () => {

    const id = idAnimal.value;

    if (id === "") {
        resultado.innerHTML = "Digite um ID do animal.";
        return;
    }

    resultado.innerHTML = "Procurando animal...";

    try {

        const resposta = await fetch(`https://extinct-api.herokuapp.com/api/v1/animal/${id}`);

        const dados = await resposta.json();

        const animal = dados.data[0];
        console.log(animal.imageSrc);
        console.log(animal);

        resultado.innerHTML = `
            <div class="card">
                <h2>${animal.commonName}</h2>

                <img src="${animal.imageSrc}" alt="${animal.commonName}" width="250"  onerror="this.src='https://placehold.co/600x300/E8DDC7/315B4A?text=Imagem+indispon%C3%ADvel'">

                <div class="info">
                <p><strong>Nome Científico:</strong> ${animal.binomialName}</p>
                <p><strong>Localização:</strong> ${animal.location}</p>
                <p><strong>Último registro:</strong> ${animal.lastRecord}</p>
                <p><strong>Descrição:</strong> ${animal.shortDesc}</p>

                <a href="${animal.wikiLink}" target="_blank">Ver na Wikipédia</a>
                </div>
            </div>
        `;

    } catch (erro) {
        resultado.innerHTML = "Erro ao buscar animal.";
        console.log("Erro:", erro);
    }

});
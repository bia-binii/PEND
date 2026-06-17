const cavalos = [
  {
    nome: "Mangalarga",
    tipo: "passeio",
    origem: "Brasil",
    altura: "1,45m - 1,60m",
    peso: "400 - 500kg",
    velocidade: "40 km/h",
    temperamento: "Dócil e confortável",
    uso: "Cavalgadas e lazer",
    desc: "Muito valorizado no Brasil por seu conforto e andamento macio.",
    img: "https://www.mercadodecavalos.com.br/upload_arquivos/2024/08/2024080673885001723240940.jpg"
  },
  {
    nome: "Crioulo",
    tipo: "trabalho",
    origem: "América do Sul",
    altura: "1,40m - 1,50m",
    peso: "350 - 450kg",
    velocidade: "50 km/h",
    temperamento: "Resistente e forte",
    uso: "Trabalho com gado",
    desc: "Uma das raças mais resistentes do mundo.",
    img: "https://comprerural.com/wp-content/uploads/2016/09/JLS-Hermoso-crioulo.jpg"
  },
  {
    nome: "Puro-Sangue Inglês",
    tipo: "corrida",
    origem: "Inglaterra",
    altura: "1,55m - 1,70m",
    peso: "450 - 550kg",
    velocidade: "60 km/h",
    temperamento: "Energético",
    uso: "Corridas",
    desc: "Conhecido pela sua velocidade em competições.",
    img: "https://www.escoladocavalo.com.br/wp-content/uploads/2021/02/puro-sangue-ingles-cavalo.jpg"
  },
  {
    nome: "Quarto de Milha",
    tipo: "corrida",
    origem: "Estados Unidos",
    altura: "1,45m - 1,60m",
    peso: "450 - 550kg",
    velocidade: "70 km/h",
    temperamento: "Ágil",
    uso: "Corridas curtas",
    desc: "Especialista em arrancadas rápidas.",
    img: "https://blog.mfrural.com.br/wp-content/uploads/2020/10/cavalo-quarto-de-milha-2.jpg"
  },
  {
    nome: "Árabe",
    tipo: "passeio",
    origem: "Oriente Médio",
    altura: "1,45m - 1,55m",
    peso: "350 - 450kg",
    velocidade: "55 km/h",
    temperamento: "Inteligente",
    uso: "Enduro",
    desc: "Uma das raças mais antigas do mundo.",
    img: "https://fazendadaroseta.com.br/wp-content/uploads/2020/11/qual-o-cavalo-mais-caro-do-mundo-1-arabe.jpg"
  },
  {
    nome: "Andaluz",
    tipo: "passeio",
    origem: "Espanha",
    altura: "1,55m - 1,65m",
    peso: "400 - 500kg",
    velocidade: "50 km/h",
    temperamento: "Calmo",
    uso: "Adestramento",
    desc: "Muito elegante e usado em apresentações.",
    img: "https://fazendadaroseta.com.br/wp-content/uploads/2022/01/cavalo-andaluz.jpg"
  },
  {
    nome: "Frísio",
    tipo: "passeio",
    origem: "Holanda",
    altura: "1,60m - 1,70m",
    peso: "600 - 700kg",
    velocidade: "45 km/h",
    temperamento: "Dócil",
    uso: "Passeio",
    desc: "Conhecido pela pelagem preta.",
    img: "https://www.zooplus.pt/magazine/wp-content/uploads/2022/08/frisio_2.webp"
  },
  {
    nome: "Appaloosa",
    tipo: "passeio",
    origem: "Estados Unidos",
    altura: "1,45m - 1,60m",
    peso: "450 - 500kg",
    velocidade: "50 km/h",
    temperamento: "Versátil",
    uso: "Trabalho e lazer",
    desc: "Famoso por suas manchas.",
    img: "https://qualanimal.com.br/wp-content/uploads/2023/05/cavalo-appaloosa01.jpg"
  },

  {
    nome: "Mustang",
    tipo: "trabalho",
    origem: "Estados Unidos",
    altura: "1,40m - 1,55m",
    peso: "350 - 450kg",
    velocidade: "55 km/h",
    temperamento: "Independente e resistente",
    uso: "Trabalho e vida selvagem",
    desc: "Cavalo selvagem conhecido por sua resistência e liberdade.",
    img: "https://files.agro20.com.br/uploads/2020/11/cavalo-mustang-4.jpg"
  },
  {
    nome: "Shire",
    tipo: "trabalho",
    origem: "Inglaterra",
    altura: "1,70m - 1,90m",
    peso: "800 - 1.100kg",
    velocidade: "35 km/h",
    temperamento: "Calmo e forte",
    uso: "Tração pesada",
    desc: "Uma das maiores e mais fortes raças de cavalo do mundo.",
    img: "https://www.escoladocavalo.com.br/wp-content/uploads/2021/02/shire-uma-das-racas-de-equinos-mais-imponentes-e-exoticas-do-mundo.jpg"
  }
];

// ⭐ favoritos com salvamento
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function render() {
  const container = document.getElementById("container");
  const busca = document.getElementById("busca").value.toLowerCase();
  const filtro = document.getElementById("filtro").value;

  container.innerHTML = "";

  cavalos.forEach((cavalo, index) => {
    if (
      cavalo.nome.toLowerCase().includes(busca) &&
      (filtro === "todos" || cavalo.tipo === filtro)
    ) {
      container.innerHTML += `
        <div class="card">
          <img src="${cavalo.img}">
          <div class="card-content">
            <h3>${cavalo.nome}</h3>
            <span class="tag">${cavalo.tipo}</span>

            <p><strong>Origem:</strong> ${cavalo.origem}</p>
            <p><strong>Altura:</strong> ${cavalo.altura}</p>
            <p><strong>Peso:</strong> ${cavalo.peso}</p>
            <p><strong>Velocidade:</strong> ${cavalo.velocidade}</p>
            <p><strong>Temperamento:</strong> ${cavalo.temperamento}</p>
            <p><strong>Uso:</strong> ${cavalo.uso}</p>

            <p>${cavalo.desc}</p>

            <span class="favorito" onclick="favoritar(${index})">
              ${favoritos.includes(index) ? "★" : "☆"}
            </span>

            <button onclick="detalhes(${index})">
              Ver detalhes
            </button>
          </div>
        </div>
      `;
    }
  });
}

// ⭐ Favoritar com salvamento
function favoritar(i) {
  if (favoritos.includes(i)) {
    favoritos = favoritos.filter(f => f !== i);
  } else {
    favoritos.push(i);
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  render();
}

// 📄 Página de detalhes
function detalhes(i) {
  localStorage.setItem("cavaloSelecionado", JSON.stringify(cavalos[i]));
  window.location.href = "detalhes.html";
}

// Eventos
document.getElementById("busca").addEventListener("input", render);
document.getElementById("filtro").addEventListener("change", render);

// Inicial
render();
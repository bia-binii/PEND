const NEWS_API_KEY = "35922ab64226434ab2ac53206e274078";
const NEWS_API_URL =
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

//  notícia em destaque
const noticiasContainer = document.getElementById("noticias");
const tituloDestaque = document.getElementById("titulo-destaque");
const resumoDestaque = document.getElementById("resumo-destaque");
const imagemDestaque = document.getElementById("imagem-destaque");
const linkDestaque = document.getElementById("link-destaque");
const categoriaDestaque = document.getElementById("categoria-destaque");

async function buscarNoticias() {
    try {
        const resposta = await fetch(NEWS_API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar notícias.");
        }

        const dados = await resposta.json();
        mostrarNoticias(dados.articles);

    } catch (erro) {
        console.error("Erro ao carregar notícias:", erro);

        if (noticiasContainer) {
            noticiasContainer.innerHTML = `
                <p>Não foi possível carregar as notícias no momento.</p>
            `;
        }
    }
}

function mostrarNoticias(noticias) {
    if (!noticias || noticias.length === 0) {
        noticiasContainer.innerHTML = "<p>Nenhuma notícia encontrada.</p>";
        return;
    }

    // embaralha noticias em destaque
    noticias.sort(() => Math.random() - 0.5);

    const destaque = noticias[0];

    tituloDestaque.textContent = destaque.title || "Notícia sem título";
    resumoDestaque.textContent = destaque.description || "Confira os detalhes desta notícia.";
    linkDestaque.href = destaque.url || "#";
    imagemDestaque.src = destaque.urlToImage || "news_today.png";
    imagemDestaque.alt = destaque.title || "Notícia";

    if (destaque.source) {
        categoriaDestaque.textContent = destaque.source.name;
    }

    noticiasContainer.innerHTML = "";

    noticias.slice(1, 7).forEach((noticia) => {
        const artigo = document.createElement("article");
        artigo.classList.add("cartao-noticia");

        artigo.innerHTML = `
            <figure class="cartao-noticia__figura">
                <img
                    src="${noticia.urlToImage || "news_today.png"}"
                    alt="${noticia.title || "Notícia"}"
                    class="cartao-noticia__imagem"
                    loading="lazy">
            </figure>

            <div class="cartao-noticia__corpo">
                <span class="etiqueta etiqueta--tecnologia">
                    ${noticia.source?.name || "NewsToday"}
                </span>

                <h3 class="cartao-noticia__titulo">
                    ${noticia.title || "Notícia sem título"}
                </h3>

                <p class="cartao-noticia__resumo">
                    ${noticia.description || "Confira mais informações sobre esta notícia."}
                </p>

                <a
                    href="${noticia.url || "#"}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="cartao-noticia__link">
                    Leia mais →
                </a>
            </div>
        `;

        noticiasContainer.appendChild(artigo);
    });
}


// cidade padrão usada caso o usuario não permita geolocalização
const CIDADE_PADRAO = { nome: "São Paulo", lat: -23.55, lon: -46.63 };

// elementos clima
const climaIcone = document.getElementById("clima-icone");
const climaCidadeEl = document.getElementById("clima-cidade");
const climaTemperatura = document.getElementById("clima-temperatura");
const climaDescricao = document.getElementById("clima-descricao");

function interpretarCodigoClima(codigo) {
    const mapa = {
        0: { texto: "Céu limpo", icone: "☀️" },
        1: { texto: "Poucas nuvens", icone: "🌤️" },
        2: { texto: "Parcialmente nublado", icone: "⛅" },
        3: { texto: "Nublado", icone: "☁️" },
        45: { texto: "Neblina", icone: "🌫️" },
        48: { texto: "Neblina com geada", icone: "🌫️" },
        51: { texto: "Garoa fraca", icone: "🌦️" },
        53: { texto: "Garoa moderada", icone: "🌦️" },
        55: { texto: "Garoa forte", icone: "🌦️" },
        61: { texto: "Chuva fraca", icone: "🌧️" },
        63: { texto: "Chuva moderada", icone: "🌧️" },
        65: { texto: "Chuva forte", icone: "🌧️" },
        71: { texto: "Neve fraca", icone: "🌨️" },
        80: { texto: "Pancadas de chuva", icone: "🌦️" },
        95: { texto: "Trovoadas", icone: "⛈️" },
    };

    return mapa[codigo] || { texto: "Condição indisponível", icone: "🌡️" };
}

async function buscarClimaPorCoordenadas(lat, lon, nomeCidade) {
    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,weather_code` +
        `&timezone=auto`;

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar o clima.");
        }

        const dados = await resposta.json();
        const atual = dados.current;
        const clima = interpretarCodigoClima(atual.weather_code);

        climaCidadeEl.textContent = nomeCidade;
        climaTemperatura.textContent = `${Math.round(atual.temperature_2m)}°C`;
        climaDescricao.textContent = clima.texto;
        climaIcone.textContent = clima.icone;

    } catch (erro) {
        console.error("Erro ao carregar o clima:", erro);
        exibirErroWidget("widget-clima", climaDescricao, climaTemperatura, "--°C");
    }
}

function buscarClima() {
    climaDescricao.textContent = "Carregando...";

    if (!navigator.geolocation) {
        buscarClimaPorCoordenadas(CIDADE_PADRAO.lat, CIDADE_PADRAO.lon, CIDADE_PADRAO.nome);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        // sucesso quando o usuário permitiu compartilhar a localização
        (posicao) => {
            const { latitude, longitude } = posicao.coords;
            buscarClimaPorCoordenadas(latitude, longitude, "Sua localização");
        },
        // erro usa a cidade padrao
        () => {
            buscarClimaPorCoordenadas(CIDADE_PADRAO.lat, CIDADE_PADRAO.lon, CIDADE_PADRAO.nome);
        },
        { timeout: 5000 }
    );
}


const valorDolarEl = document.getElementById("valor-dolar");
const valorEuroEl = document.getElementById("valor-euro");

function formatarReal(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

async function buscarCambio() {
    const url = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL";

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar o câmbio.");
        }

        const dados = await resposta.json();

        valorDolarEl.textContent = formatarReal(dados.USDBRL.bid);
        valorEuroEl.textContent = formatarReal(dados.EURBRL.bid);

    } catch (erro) {
        console.error("Erro ao carregar o câmbio:", erro);
        valorDolarEl.textContent = "Indisponível";
        valorEuroEl.textContent = "Indisponível";
    }
}


const valorBitcoinEl = document.getElementById("valor-bitcoin");
const variacaoBitcoinEl = document.getElementById("variacao-bitcoin");

async function buscarBitcoin() {
    const url =
        "https://api.coingecko.com/api/v3/simple/price" +
        "?ids=bitcoin&vs_currencies=brl&include_24hr_change=true";

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar o Bitcoin.");
        }

        const dados = await resposta.json();
        const preco = dados.bitcoin.brl;
        const variacao = dados.bitcoin.brl_24h_change;

        valorBitcoinEl.textContent = formatarReal(preco);

        const variacaoArredondada = variacao.toFixed(2);
        const subiu = variacao >= 0;

        variacaoBitcoinEl.textContent = `${subiu ? "▲" : "▼"} ${variacaoArredondada}% (24h)`;
        variacaoBitcoinEl.classList.toggle("widget-card__legenda--alta", subiu);
        variacaoBitcoinEl.classList.toggle("widget-card__legenda--baixa", !subiu);

    } catch (erro) {
        console.error("Erro ao carregar o Bitcoin:", erro);
        valorBitcoinEl.textContent = "Indisponível";
        variacaoBitcoinEl.textContent = "";
    }
}


function exibirErroWidget(idCard, elementoLegenda, elementoValor, valorPadrao) {
    const card = document.getElementById(idCard);
    if (card) card.classList.add("widget-card--erro");
    if (elementoValor) elementoValor.textContent = valorPadrao;
    if (elementoLegenda) elementoLegenda.textContent = "Não foi possível carregar.";
}

function atualizarWidgets() {
    buscarClima();
    buscarCambio();
    buscarBitcoin();
}

// botao atualizar
const btnAtualizar = document.getElementById("btn-atualizar-widgets");
const iconeAtualizar = document.getElementById("icone-atualizar");

if (btnAtualizar) {
    btnAtualizar.addEventListener("click", () => {
        iconeAtualizar.classList.remove("girando");
        void iconeAtualizar.offsetWidth; 
        iconeAtualizar.classList.add("girando");

        atualizarWidgets();
    });
}

buscarNoticias();
atualizarWidgets();
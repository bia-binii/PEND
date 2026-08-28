const INGREDIENTS = {
    sabor: [
        {
            id: 'morango',
            emoji: '🍓',
            name: 'Morango'
        },
        {
            id: 'chocolate',
            emoji: '🍫',
            name: 'Chocolate'
        },
        {
            id: 'banana',
            emoji: '🍌',
            name: 'Banana'
        },
        {
            id: 'baunilha',
            emoji: '🍦',
            name: 'Baunilha'
        },
        {
            id: 'manga',
            emoji: '🥭',
            name: 'Manga'
        },
        {
            id: 'uva',
            emoji: '🍇',
            name: 'Uva'
        }
    ],

    cobertura: [
        {
            id: 'cobertura_chocolate',
            emoji: '🍫',
            name: 'Cobertura choc.'
        },
        {
            id: 'cobertura_morango',
            emoji: '🍓',
            name: 'Cobertura morango'
        },
        {
            id: 'caramelo',
            emoji: '🍯',
            name: 'Caramelo'
        }
    ],

    decoracao: [
        {
            id: 'granulado',
            emoji: '🌈',
            name: 'Granulado'
        },
        {
            id: 'cereja',
            emoji: '🍒',
            name: 'Cereja'
        },
        {
            id: 'biscoito',
            emoji: '🍪',
            name: 'Biscoito'
        },
        {
            id: 'confete',
            emoji: '🎊',
            name: 'Confete'
        }
    ]
};


// pedidos

const PHASES = [
    {
        quote:
            "Quero um sorvete de morango, com cobertura de chocolate e granulado.",

        pedido: {
            sabor: 'morango',
            cobertura: 'cobertura_chocolate',
            decoracao: 'granulado'
        }
    },

    {
        quote:
            "Quero chocolate, com caramelo por cima e uma cereja.",

        pedido: {
            sabor: 'chocolate',
            cobertura: 'caramelo',
            decoracao: 'cereja'
        }
    },

    {
        quote:
            "Pode ser manga, com cobertura de morango e confete?",

        pedido: {
            sabor: 'manga',
            cobertura: 'cobertura_morango',
            decoracao: 'confete'
        }
    }
];


// estado do jogo

let score = 0;
let phaseIndex = 0;
let currentOrder = null;

let filled = {
    sabor: null,
    cobertura: null,
    decoracao: null
};

let timeLeft = 60;
let timerHandle = null;

let acertos = 0;
let erros = 0;
let startTime = 60;

let toastTimeout;


// elementos da tela

const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-screen'),
    result: document.getElementById('result-screen')
};


// trocar de tela

function showScreen(name) {

    Object.values(screens).forEach(screen => {

        if (screen) {
            screen.classList.remove('active');
        }

    });

    if (screens[name]) {
        screens[name].classList.add('active');
    }
}


// botao como jogar

const btnHow = document.getElementById('btn-how');

if (btnHow) {

    btnHow.addEventListener('click', () => {

        const howToPlay =
            document.getElementById('how-to-play');

        if (howToPlay) {
            howToPlay.classList.toggle('active');
        }

    });

}


// botao comecar jogo

const btnStart = document.getElementById('btn-start');

if (btnStart) {

    btnStart.addEventListener('click', () => {

        console.log('Jogo iniciado!');

        phaseIndex = 0;
        score = 0;

        startPhase();

    });

}


// botao voltar menu

const btnMenu = document.getElementById('btn-menu');

if (btnMenu) {

    btnMenu.addEventListener('click', () => {

        clearInterval(timerHandle);

        showScreen('start');

    });

}


// botao proximo pedido

const btnNext = document.getElementById('btn-next');

if (btnNext) {

    btnNext.addEventListener('click', () => {

        phaseIndex =
            (phaseIndex + 1) % PHASES.length;

        startPhase();

    });

}


// criar lista

function renderIngredientLists() {

    const categories = [
        'sabor',
        'cobertura',
        'decoracao'
    ];

    categories.forEach(cat => {

        const list =
            document.getElementById('list-' + cat);

        if (!list) {
            return;
        }

        list.innerHTML = '';

        INGREDIENTS[cat].forEach(item => {

            const el =
                document.createElement('div');

            el.className = 'ingredient';

            el.draggable = true;

            el.dataset.id = item.id;
            el.dataset.cat = cat;

            el.innerHTML = `
                <span class="emoji">
                    ${item.emoji}
                </span>

                <span class="name">
                    ${item.name}
                </span>
            `;

            el.addEventListener(
                'dragstart',
                onDragStart
            );

            el.addEventListener(
                'dragend',
                onDragEnd
            );

            list.appendChild(el);

        });

    });

}



function onDragStart(e) {

    const el = e.currentTarget;

    el.classList.add('dragging');

    e.dataTransfer.setData(
        'text/plain',
        JSON.stringify({
            id: el.dataset.id,
            cat: el.dataset.cat
        })
    );

    e.dataTransfer.effectAllowed = 'copy';
}



function onDragEnd(e) {

    e.currentTarget.classList.remove('dragging');

}


function onDragOver(e) {

    e.preventDefault();

    e.dataTransfer.dropEffect = 'copy';

    e.currentTarget.classList.add('dragover');

}


function onDragLeave(e) {

    e.currentTarget.classList.remove('dragover');

}



function onDrop(e) {

    e.preventDefault();

    const zoneEl = e.currentTarget;

    zoneEl.classList.remove('dragover');

    const zoneCat =
        zoneEl.dataset.zone;

    let data;

    try {

        data = JSON.parse(
            e.dataTransfer.getData('text/plain')
        );

    } catch (err) {

        return;

    }


    /* Categoria errada */

    if (data.cat !== zoneCat) {

        showToast(
            '❌ Esse ingrediente não vai aí!',
            true
        );

        score = Math.max(
            0,
            score - 50
        );

        erros++;

        updateScore();

        return;
    }


    /* Zona já preenchida */

    if (filled[zoneCat]) {

        showToast(
            'Essa área já está preenchida!',
            true
        );

        return;
    }


    /* Encontrar ingrediente */

    const ing =
        INGREDIENTS[zoneCat].find(
            item => item.id === data.id
        );

    if (!ing) {
        return;
    }


    /* Ingrediente correto */

    if (
        currentOrder &&
        data.id === currentOrder.pedido[zoneCat]
    ) {

        filled[zoneCat] = data.id;

        zoneEl.classList.add('filled');

        const zoneContent =
            document.getElementById(
                'zone-' + zoneCat
            );

        if (zoneContent) {

            zoneContent.textContent =
                ing.emoji;

        }

        addConeLayer(ing.emoji);

        markChipDone(zoneCat);

        score += 100;

        acertos++;

        showToast(
            '✅ Boa escolha! +100 pontos',
            false
        );

        updateScore();

        checkCompletion();

    }


    /* Ingrediente errado */

    else {

        score = Math.max(
            0,
            score - 50
        );

        erros++;

        showToast(
            '❌ Esse ingrediente não foi solicitado! -50 pontos',
            true
        );

        updateScore();

    }

}

// adicionar camada ao sorvete

function addConeLayer(emoji) {

    const cone =
        document.getElementById('cone-visual');

    if (!cone) {
        return;
    }

    const layer =
        document.createElement('div');

    layer.className = 'layer';

    layer.textContent = emoji;

    cone.appendChild(layer);

}


//marcar ingrediente como concluido

function markChipDone(cat) {

    const chip =
        document.querySelector(
            `.chip[data-cat="${cat}"]`
        );

    if (chip) {

        chip.classList.add('done');

    }

}


function showToast(msg, isError) {

    const toast =
        document.getElementById('toast');

    if (!toast) {
        return;
    }

    toast.textContent = msg;

    toast.classList.toggle(
        'error',
        !!isError
    );

    toast.classList.add('show');

    clearTimeout(toastTimeout);

    toastTimeout =
        setTimeout(() => {

            toast.classList.remove('show');

        }, 1200);

}

// iniciar fase

function startPhase() {

    currentOrder =
        PHASES[phaseIndex];


    /* Resetar estado */

    filled = {
        sabor: null,
        cobertura: null,
        decoracao: null
    };

    acertos = 0;
    erros = 0;

    timeLeft = 60;
    startTime = 60;

// pedidos clientes

    const orderQuote =
        document.getElementById('order-quote');

    if (orderQuote) {

        orderQuote.textContent =
            '"' +
            currentOrder.quote +
            '"';

    }


    const chipsWrap =
        document.getElementById('order-chips');

    if (chipsWrap) {

        chipsWrap.innerHTML = '';

        const categories = [
            'sabor',
            'cobertura',
            'decoracao'
        ];

        categories.forEach(cat => {

            const id =
                currentOrder.pedido[cat];

            const ing =
                INGREDIENTS[cat].find(
                    item => item.id === id
                );

            if (!ing) {
                return;
            }

            const chip =
                document.createElement('span');

            chip.className = 'chip';

            chip.dataset.cat = cat;

            chip.textContent =
                `${ing.emoji} ${ing.name}`;

            chipsWrap.appendChild(chip);

        });

    }

// resetar sorvetes

    const cone =
        document.getElementById('cone-visual');

    if (cone) {

        cone.innerHTML = `
            <div class="cone-base">
                🍦
            </div>
        `;

    }

// resetar zonas

    const categories = [
        'sabor',
        'cobertura',
        'decoracao'
    ];

    categories.forEach(cat => {

        const zoneContent =
            document.getElementById(
                'zone-' + cat
            );

        if (zoneContent) {

            zoneContent.textContent = '';

        }

        const zone =
            document.querySelector(
                `.zone[data-zone="${cat}"]`
            );

        if (zone) {

            zone.classList.remove('filled');

        }

    });


// ingredientes

    renderIngredientLists();


// atualizar interface

    updateScore();
    updateTimerDisplay();


    showScreen('game');


// cronometro

    clearInterval(timerHandle);

    timerHandle =
        setInterval(tick, 1000);

}

function tick() {

    timeLeft--;

    updateTimerDisplay();

    if (timeLeft <= 0) {

        clearInterval(timerHandle);

        finishOrder(false);

    }

}


// atualizar cronometro

function updateTimerDisplay() {

    const el =
        document.getElementById('timer');

    if (!el) {
        return;
    }

    const minutes =
        String(
            Math.floor(
                Math.max(timeLeft, 0) / 60
            )
        ).padStart(2, '0');

    const seconds =
        String(
            Math.max(timeLeft, 0) % 60
        ).padStart(2, '0');

    el.textContent =
        `${minutes}:${seconds}`;

    el.classList.toggle(
        'low',
        timeLeft <= 10
    );

}


// atualizar pontuacao

function updateScore() {

    const scoreEl =
        document.getElementById('score');

    if (scoreEl) {

        scoreEl.textContent = score;

    }

}


// verificar conclusao

function checkCompletion() {

    const done =
        filled.sabor &&
        filled.cobertura &&
        filled.decoracao;

    if (done) {

        clearInterval(timerHandle);

        let bonus = 300;

        if (erros === 0) {
            bonus += 500;
        }

        if (timeLeft >= 20) {
            bonus += 200;
        }

        score += bonus;

        updateScore();

        finishOrder(
            true,
            bonus
        );

    }

}


// finalizar pedido

function finishOrder(
    success,
    bonus = 0
) {

    const usedTime =
        startTime - timeLeft;


// tempo

    const minutes =
        String(
            Math.floor(
                usedTime / 60
            )
        ).padStart(2, '0');

    const seconds =
        String(
            usedTime % 60
        ).padStart(2, '0');


// resultados

    const resCertos =
        document.getElementById('res-certos');

    const resErros =
        document.getElementById('res-erros');

    const resTempo =
        document.getElementById('res-tempo');

    const resPontos =
        document.getElementById('res-pontos');

    if (resCertos) {
        resCertos.textContent =
            `${acertos}/3`;
    }

    if (resErros) {
        resErros.textContent =
            erros;
    }

    if (resTempo) {
        resTempo.textContent =
            `${minutes}:${seconds}`;
    }

    if (resPontos) {
        resPontos.textContent =
            score;
    }


//estrelas

    let stars = 1;

    if (
        success &&
        erros === 0
    ) {

        stars = 5;

    } else if (
        success &&
        erros <= 1
    ) {

        stars = 4;

    } else if (success) {

        stars = 3;

    } else if (acertos > 0) {

        stars = 2;

    }


    const resStars =
        document.getElementById('res-stars');

    if (resStars) {

        resStars.textContent =
            '⭐'.repeat(stars) +
            '☆'.repeat(5 - stars);

    }

// resultado

    const titleEl =
        document.getElementById('result-title');

    const emojiEl =
        document.getElementById('result-emoji');

    const gradeEl =
        document.getElementById('res-grade');


    if (success) {

        if (titleEl) {
            titleEl.textContent =
                'Pedido finalizado!';
        }

        if (emojiEl) {
            emojiEl.textContent =
                '🎉';
        }

    } else {

        if (titleEl) {
            titleEl.textContent =
                'O tempo acabou!';
        }

        if (emojiEl) {
            emojiEl.textContent =
                '⏱️';
        }

    }


// nota

    const grades = {

        5: 'MESTRE DO SORVETE!',

        4: 'Sorveteiro experiente!',

        3: 'Bom trabalho!',

        2: 'Quase lá...',

        1: 'Continue treinando!'

    };


    if (gradeEl) {

        gradeEl.textContent =
            grades[stars];

    }



    showScreen('result');

}
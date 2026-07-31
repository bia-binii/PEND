ocument.addEventListener('DOMContentLoaded', () => {
  inicializarMenuMobile();
  inicializarAnoRodape();
  inicializarBotaoTopo();
  inicializarRevelacaoAoRolar();
  inicializarFormularioContato();
});

/* ---------------------------------------------------------
   MENU MOBILE
--------------------------------------------------------- */
function inicializarMenuMobile() {
  const botao = document.getElementById('menuAlterna');
  const nav = document.getElementById('navPrincipal');

  if (!botao || !nav) return;

  botao.addEventListener('click', () => {
    const aberto = botao.getAttribute('aria-expanded') === 'true';
    botao.setAttribute('aria-expanded', String(!aberto));
    nav.classList.toggle('navegacao--aberta');
  });

  // Fecha o menu automaticamente ao clicar em um link (bom para UX em telas pequenas)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      botao.setAttribute('aria-expanded', 'false');
      nav.classList.remove('navegacao--aberta');
    });
  });
}

/* ---------------------------------------------------------
   ANO ATUAL NO RODAPÉ
--------------------------------------------------------- */
function inicializarAnoRodape() {
  const spanAno = document.getElementById('anoAtual');
  if (spanAno) {
    spanAno.textContent = new Date().getFullYear();
  }
}

/* ---------------------------------------------------------
   BOTÃO "VOLTAR AO TOPO"
--------------------------------------------------------- */
function inicializarBotaoTopo() {
  const botaoTopo = document.getElementById('botaoTopo');
  if (!botaoTopo) return;

  const alternarVisibilidade = () => {
    const deveMostrar = window.scrollY > 480;
    botaoTopo.classList.toggle('botao-topo--visivel', deveMostrar);
  };

  window.addEventListener('scroll', alternarVisibilidade, { passive: true });
  alternarVisibilidade();

  botaoTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ---------------------------------------------------------
   REVELAÇÃO DE SEÇÕES AO ROLAR A PÁGINA
--------------------------------------------------------- */
function inicializarRevelacaoAoRolar() {
  const alvos = document.querySelectorAll(
    '.secao__cabecalho, .especime, .projeto, .sobre__retrato, .sobre__texto'
  );

  alvos.forEach((el) => el.classList.add('revelar'));

  if (!('IntersectionObserver' in window)) {
    // Sem suporte: mostra tudo imediatamente
    alvos.forEach((el) => el.classList.add('revelar--visivel'));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('revelar--visivel');
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  alvos.forEach((el) => observador.observe(el));
}

/* ---------------------------------------------------------
   VALIDAÇÃO DO FORMULÁRIO DE CONTATO
--------------------------------------------------------- */
function inicializarFormularioContato() {
  const formulario = document.getElementById('formularioContato');
  if (!formulario) return;

  const campoNome = document.getElementById('nome');
  const campoEmail = document.getElementById('email');
  const erroNome = document.getElementById('erroNome');
  const erroEmail = document.getElementById('erroEmail');
  const respostaFormulario = document.getElementById('respostaFormulario');

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Limpa o erro assim que a pessoa começa a corrigir o campo (feedback imediato = boa UX)
  campoNome.addEventListener('input', () => limparErro(campoNome, erroNome));
  campoEmail.addEventListener('input', () => limparErro(campoEmail, erroEmail));

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();

    let formularioValido = true;

    // --- validação do nome ---
    if (nome.length === 0) {
      exibirErro(campoNome, erroNome, 'Me conta seu nome, por favor. 🌱');
      formularioValido = false;
    } else if (nome.length < 2) {
      exibirErro(campoNome, erroNome, 'Esse nome parece curto demais.');
      formularioValido = false;
    } else {
      limparErro(campoNome, erroNome);
    }

    // --- validação do e-mail ---
    if (email.length === 0) {
      exibirErro(campoEmail, erroEmail, 'O e-mail é essencial para eu poder responder.');
      formularioValido = false;
    } else if (!regexEmail.test(email)) {
      exibirErro(campoEmail, erroEmail, 'Esse e-mail não parece válido. Confere pra mim?');
      formularioValido = false;
    } else {
      limparErro(campoEmail, erroEmail);
    }

    if (!formularioValido) {
      exibirRespostaFormulario(
        respostaFormulario,
        'Alguns campos precisam da sua atenção antes de florescer. 🌸',
        'erro'
      );
      return;
    }

    // --- sucesso: mensagem personalizada manipulando o DOM ---
    const primeiroNome = nome.split(' ')[0];
    const mensagemPersonalizada = `Obrigada, ${primeiroNome}! 🌷 Sua mensagem já foi plantada — ` +
      `em breve você recebe uma resposta em ${email}.`;

    exibirRespostaFormulario(respostaFormulario, mensagemPersonalizada, 'sucesso');
    formulario.reset();
  });

  function exibirErro(campo, elementoErro, mensagem) {
    campo.classList.add('campo--invalido');
    campo.setAttribute('aria-invalid', 'true');
    elementoErro.textContent = mensagem;
  }

  function limparErro(campo, elementoErro) {
    campo.classList.remove('campo--invalido');
    campo.removeAttribute('aria-invalid');
    elementoErro.textContent = '';
  }

  function exibirRespostaFormulario(elemento, mensagem, tipo) {
    elemento.textContent = mensagem;
    elemento.classList.remove('resposta--sucesso', 'resposta--erro');
    elemento.classList.add(tipo === 'sucesso' ? 'resposta--sucesso' : 'resposta--erro');
  }
}
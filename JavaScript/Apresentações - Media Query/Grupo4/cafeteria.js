// ========================= 
// 📱 MENU MOBILE
// =========================
function abrirMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('ativo');
}

const links = document.querySelectorAll('#menu a');
if (links.length) {
  links.forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('menu').classList.remove('ativo');
    });
  });
}

// ========================= 
// 🎨 HEADER COM SCROLL
// =========================
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});

// ========================= 
// ✨ ANIMAÇÃO DE ENTRADA
// =========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section, .card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ========================= 
// 📩 FORMULÁRIO FUNCIONAL
// =========================
const form = document.getElementById('pedido-form');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const pedido = document.getElementById('pedido').value.trim();

    // Validação simples
    if (!nome || !email || !pedido) {
      mostrarMensagem('Preencha todos os campos!', 'erro');
      return;
    }

    if (!email.includes('@')) {
      mostrarMensagem('Email inválido!', 'erro');
      return;
    }

    // Simulação de envio
    mostrarMensagem('Enviando pedido...', 'loading');

    setTimeout(() => {
      mostrarMensagem('Pedido enviado com sucesso! ☕', 'sucesso');
      form.reset();
    }, 1500);
  });
}

// ========================= 
// 💬 MENSAGEM VISUAL
// =========================
function mostrarMensagem(texto, tipo) {
  let msg = document.querySelector('.mensagem');

  if (!msg) {
    msg = document.createElement('div');
    msg.classList.add('mensagem');
    document.body.appendChild(msg);
  }

  msg.textContent = texto;
  msg.className = 'mensagem ' + tipo;

  msg.style.opacity = '1';

  setTimeout(() => {
    msg.style.opacity = '0';
  }, 3000);
}
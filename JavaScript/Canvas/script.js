const canvas = document.querySelector('#canvas');
const contexto = canvas.getContext('2d');

// comandos para desenhar uma linha
contexto.beginPath();  // indica que vamos começar a desenhar
contexto.moveTo(10, 0);  // define onde a linha vai começar (y= | para baixo - x= _ para o lado)
contexto.lineTo(50, 200);  // define onde a linha vai terminar
contexto.lineTo(200, 200);  // faz outra linha apartir do ponto final da linha anterior
contexto.stroke();  // desenha a linha


// comandos para desenhar um retângulo
contexto.fillRect(50, 50, 150, 100);  // desenha um retângulo preenchido (x, y, largura, altura)

contexto.strokeRect(250, 50, 150, 100);  // desenha um retângulo só contorno (x, y, largura, altura)

// comandos para desenhar um círculo
contexto.beginPath();
contexto.arc(250, 250, 50, 0 ,Math.PI * 2 ); // desenha um círculo (x, y, raio, ângulo inicial, ângulo final)
contexto.stroke();  // desenha o círculo (contexto.fill() - circulo preenchido)
// true indica que o círculo será desenhado no sentido anti-horário :(, sem o * 2 :)
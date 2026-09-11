const canvas = document.querySelector('#canvas');
const contexto = canvas.getContext('2d');

contexto.lineWidth = 14; 
contexto.lineCap = 'round';
contexto.lineJoin = 'round';

// cabeça
contexto.beginPath();
contexto.arc(260, 65, 35, 0 ,Math.PI * 2 ); 
contexto.stroke(); 

// tronco
contexto.beginPath();
contexto.moveTo(250, 100);
contexto.lineTo(250, 230);
contexto.stroke();

// braço direito
contexto.beginPath();
contexto.moveTo(250, 100);
contexto.lineTo(200, 150);
contexto.lineTo(260, 190);
contexto.stroke();

// braço esquerdo
contexto.beginPath();
contexto.moveTo(250, 100);
contexto.lineTo(300, 150);
contexto.lineTo(350, 110);
contexto.stroke();

// perna direita
contexto.beginPath();
contexto.moveTo(250, 230);
contexto.lineTo(200, 280);
contexto.lineTo(200, 360);
contexto.stroke();

// perna esquerda
contexto.beginPath();
contexto.moveTo(250, 230);
contexto.lineTo(300, 280);
contexto.lineTo(300, 360);
contexto.stroke();


// // animação
// let movimento = 0;

// function dancar() {
//     movimento += 0.1;

//     contexto.clearRect(0, 0, canvas.width, canvas.height);

//     contexto.save();
//     contexto.translate(Math.sin(movimento) * 10, Math.abs(Math.sin(movimento * 2)) * -10);
//     contexto.rotate(Math.sin(movimento) * 0.08);

//     // cabeça
//     contexto.beginPath();
//     contexto.arc(260, 65, 35, 0, Math.PI * 2);
//     contexto.stroke();

//     // tronco
//     contexto.beginPath();
//     contexto.moveTo(250, 100);
//     contexto.lineTo(250, 230);
//     contexto.stroke();

//     // braços dançando
//     contexto.beginPath();
//     contexto.moveTo(250, 100);
//     contexto.lineTo(200, 150 + Math.sin(movimento) * 30);
//     contexto.lineTo(260, 190);
//     contexto.stroke();

//     contexto.beginPath();
//     contexto.moveTo(250, 100);
//     contexto.lineTo(300, 150 - Math.sin(movimento) * 30);
//     contexto.lineTo(350, 110);
//     contexto.stroke();

//     // pernas dançando
//     contexto.beginPath();
//     contexto.moveTo(250, 230);
//     contexto.lineTo(200 - Math.sin(movimento) * 20, 280);
//     contexto.lineTo(200 + Math.sin(movimento) * 20, 360);
//     contexto.stroke();

//     contexto.beginPath();
//     contexto.moveTo(250, 230);
//     contexto.lineTo(300 + Math.sin(movimento) * 20, 280);
//     contexto.lineTo(300 - Math.sin(movimento) * 20, 360);
//     contexto.stroke();

//     contexto.restore();

//     requestAnimationFrame(dancar);
// }

// dancar();
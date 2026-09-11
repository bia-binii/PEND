const video = document.querySelector("#camera");
const canvas = document.querySelector("#canvas");
const foto = document.querySelector("#foto");
const botao = document.querySelector("#capture");

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
})
    .then(function (stream) {
        video.srcObject = stream;
    })
    .catch(function (error) {
        console.error("Não foi possivel acessar a câmera:", error);
    });

botao.addEventListener("click", function () {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const contexto = canvas.getContext("2d");

    contexto.drawImage(
        video, 
        0, 
        0, 
        canvas.width, 
        canvas.height
    );

    foto.src = canvas.toDataURL("image/png");
});
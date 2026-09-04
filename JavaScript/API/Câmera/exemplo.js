navigator.mediaDevices.getUserMedia({ 
    video: true, audio: true
})
.then(function(stream) {
    const video = document.querySelector("#camera");
    video.srcObject = stream;
})
.catch(function(error) {
    console.error("Não foi possivel acessar a câmera:", error);
});

navigator.geolocation.getCurrentPosition(

    function(position) {

        console.log("Latitude: " + position.coords.latitude);
        console.log("Longitude: " + position.coords.longitude);
        console.log("Precisão: " + position.coords.accuracy);

        document.getElementById("sucesso").style.display = "block";
        document.getElementById("imagem-sucesso").style.display = "block";

        document.getElementById("erro").style.display = "none";
        document.getElementById("imagem-erro").style.display = "none";
    },

    function(error) {

        console.error(
            "Não foi possível obter a localização. Erro: " + error.message
        );

        document.getElementById("erro").style.display = "block";
        document.getElementById("imagem-erro").style.display = "block";

        document.getElementById("sucesso").style.display = "none";
        document.getElementById("imagem-sucesso").style.display = "none";
    }

);
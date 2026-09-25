const buscarUsuarios = document.querySelector("#buscarUsuarios");
const resultado = document.querySelector("#resultado");
const idUsuario = document.querySelector("#idUsuario");

// fetch + then + catch

// buscarUsuarios.addEventListener("click", () => {

//   fetch("https://jsonplaceholder.typicode.com/users")

//     .then((response) => response.json()) 

//     .then((dados) => {

//       resultado.innerHTML = ""; 

//       dados.forEach((usuario) => {

//         resultado.innerHTML += `
//         <p>
//             <strong>${usuario.name}</strong><br>
//             ${usuario.email}
//         </p>
//         <hr>
//     `;

//       });

//     })

//     .catch((erro) => {
        
//         resultado.innerHTML = "<p>Erro ao buscar usuários.</p>";

//         console.log("Erro: " + erro);

//     });

// });



// async + await 
// buscarUsuarios.addEventListener("click", async () => {
//     try {

//         const response = await fetch(
//             "https://jsonplaceholder.typicode.com/users"
//         );

//         const dados = await response.json();

//         resultado.innerHTML = "";

//         dados.forEach((usuario) => {
//             resultado.innerHTML += `
//             <p>
//                 <strong>${usuario.name}</strong><br>
//                 ${usuario.email}
//             </p>
//             <hr>
//         `;
//         });

//     } catch (erro) {
//         resultado.innerHTML = "<p>Erro ao buscar usuários.</p>";
//         console.log(erro);
//     }

// });



//com campo de busca
buscarUsuarios.addEventListener("click", async () => {

    const id = idUsuario.value;

    if (id === "") {
        resultado.innerHTML = "Digite um ID";
        return;
    }

    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const dados = await response.json();

        resultado.innerHTML = `
            <p>
                <strong>${dados.name}</strong><br>
                Email: ${dados.email}<br>
                Cidade: ${dados.address.city}<br>
                Telefone: ${dados.phone}<br>
            </p>
            <hr>
        `;

    } catch (erro) {
        resultado.innerHTML = "<p>Erro ao buscar usuário.</p>";
        console.log(erro);
    }

});
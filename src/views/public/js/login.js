const frmLogin = document.getElementById("login");

function validationLogin() {




}

frmLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("/validationLogin", {
        method: 'POST',
        headers: {
            "soid": document.getElementById("soid").value,
            "password": document.getElementById("password").value
        }
    })
    setTimeout(() => {
        window.location.href = "/"
    }, 500)
})

/*

fetch("/createUser", {

    method: 'POST',

    body: {

        "id_usuario": "hola"

    },

    headers: data

})*/






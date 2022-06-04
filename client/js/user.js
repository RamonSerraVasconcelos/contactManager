$("#loginForm").submit(async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const values = Object.fromEntries(data.entries())

    request('/users/login', 'post', values)
        .then((res) => {
            sessionStorage.setItem('userToken', JSON.stringify(res.token))
            sessionStorage.setItem('refreshToken', JSON.stringify(res.refreshToken))
            location.href = 'http://127.0.0.1:5500/client/home.html'
        })
        .catch((error) => {
            message(error.responseJSON.message)
        })
})

$('#registerForm').submit((event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const values = Object.fromEntries(data.entries())

    if (values.name == "" || values.email == "" || values.phone == "" || values.password == "") {
        message("Por favor preencha todos os campos.")
        return
    }

    if (values.password != values.confirm_password) {
        message("Por favor, garanta que as 2 senhas são iguais.")
        return
    }

    request('/users/register', 'post', values)
        .then((res) => {
            message("Usuário cadastrado com sucesso.")
            location.href = 'http://127.0.0.1:5500/client/index.html'
        })
        .catch((error) => {
            message(error.responseJSON.message)
        })
})
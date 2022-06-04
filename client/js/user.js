$("#loginForm").submit(async (event) => {
    event.preventDefault()
    requestForm('users/login', 'post', event)
        .then((res) => {
            sessionStorage.setItem('userToken', JSON.stringify(res.token))
            sessionStorage.setItem('refreshToken', JSON.stringify(res.refreshToken))
        })
        .catch((error) => {
            message("Usuário não encontrado")
        })
})
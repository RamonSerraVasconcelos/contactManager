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
(() => {
    request('/contacts', 'get', {})
        .then((res) => {
            message("Logado com sucesso")
        })
        .catch((error) => {
            message(error.responseJSON.message)
        })
})()
$(document).ready(function () {
    if (!sessionStorage.getItem('userToken')) {
        location.href = "http://127.0.0.1:5500/client/index.html"
        return
    }
});

(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const userId = urlParams.get('id')
    if (!userId) {
        message("Usuário não encontrado")
        return
    }

    getRequest('/users/' + userId)
        .then((res) => {
            $('#userId').val(res.user.id)
            $('#userName').val(res.user.name)
            $('#userEmail').val(res.user.email)
            $('#userPhone').val(res.user.phone)
            $('#userPic').attr('src', res.user.profilePic)
            $('#myProfilepic').attr('src', res.user.profilePic)
            $('#profilePageUrl').attr("href", "http://127.0.0.1:5500/client/userPage.html?id=" + res.userId)
        })
        .catch((error) => {
            message(error.message)
        })
})();

$('#userForm').submit((event) => {
    event.preventDefault()

    const url = "/users/" + $('#userId').val()
    const data = new FormData(event.target)
    const values = Object.fromEntries(data.entries())

    request(url, 'put', values)
        .then((res) => {
            message("Informações atualizadas com sucesso")
        })
        .catch((error) => {
            message(error.message)
        })
})
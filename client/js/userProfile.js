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
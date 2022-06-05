function request(action, type, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:3000" + action,
            headers: {
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('userToken'))}`,
            },
            type: type,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(data),
        }).done((res) => {
            resolve(res)
        }).fail(async (err) => {
            if (err.status == 401) {
                refreshToken()
                resolve(await request(action, type, data))
                return
            }
            resolve(err)
        })
    })
}

function getRequest(action) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:3000" + action,
            headers: {
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('userToken'))}`,
            },
        }).done((res) => {
            resolve(res)
        }).fail(async (err) => {
            if (err.status == 401) {
                refreshToken()
                resolve(await request(action, type, data))
                return
            }
            resolve(err)
        })
    })
}

function refreshToken() {
    $.ajax({
        url: "http://localhost:3000/users/refresh",
        type: 'post',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ refreshToken: JSON.parse(sessionStorage.getItem('refreshToken')) })
    }).done((res) => {
        sessionStorage.setItem('userToken', JSON.stringify(res.token))
    }).fail((err) => {
        location.href = 'http://127.0.0.1:5500/client/index.html'
    })
}

function message(message) {
    $('#snackbar').html(message)
    const snackbar = document.getElementById('snackbar')
    snackbar.className = "show";
    setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}
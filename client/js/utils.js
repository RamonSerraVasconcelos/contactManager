function requestForm(action, type, event) {

    const data = new FormData(event.target)
    const values = Object.fromEntries(data.entries())

    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:3000/" + action,
            headers: {
                'Authorization': 'Bearer daoisdjoiasdjoias',
            },
            type: type,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(values),
        }).done((res) => {
            resolve(res)
        }).fail((err) => {
            resolve(err)
        })
    })
}

function message(message) {
    $('#snackbar').html(message)
    const snackbar = document.getElementById('snackbar')
    snackbar.className = "show";
    setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}
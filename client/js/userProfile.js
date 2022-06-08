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
            $('#profilePic').attr('src', res.user.profilePic)
            $('#profilePageUrl').attr("href", "http://127.0.0.1:5500/client/userPage.html?id=" + userId)
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

$("#myProfilepic").click(() => {
    $("#fileToUploadProfilePic").click()
})

$('#savePicForm').submit((event) => {
    event.preventDefault()

    var formData = new FormData();
    formData.append('fileToUploadProfilePic', document.getElementById('fileToUploadProfilePic').files[0])

    $.ajax({
        url: "http://localhost:3000/users/saveProfilePic",
        headers: {
            'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('userToken'))}`,
        },
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            message("Foto atualizada com sucesso.")
        }
    })
})

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profilePic').attr('src', e.target.result)
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function validarImagem(field) {
    documento = $("#" + field.id).val();
    var upld = documento.split('.').pop();
    if (upld == 'jpg' || upld == 'jpeg' || upld == 'png') {
        const fileSize = field.files[0].size / 1024 / 1024; // in MiB
        if (fileSize > 5) {
            message("O arquivo não deve ser maior que 5MB.")
            field.value = '';
        }

        readURL(field)
    } else {
        message("O documento deve estar nos formatos jpg, jpeg ou png.")
        field.value = '';
    }
}
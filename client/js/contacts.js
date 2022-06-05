(() => {
    getRequest('/contacts')
        .then((res) => {
            message("Logado com sucesso")
        })
        .catch((error) => {
            message(error.responseJSON.message)
        })
})()

$("#contactForm").submit(async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const values = Object.fromEntries(data.entries())

    request('/contacts/create', 'post', values)
        .then((res) => {
            message("Contato criado com sucesso")
        })
        .catch((error) => {
            message(error.responseJSON.message)
        })
})

$("#contactPic").click(() => {
    $("#fileToUploadContactPic").click()
})

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#contactPicture').attr('src', e.target.result)
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
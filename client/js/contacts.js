$(document).ready(function () {
    (() => {
        getRequest('/contacts')
            .then((res) => {
                let html = ``
                res.contacts.forEach(contact => {
                    html += `
                        <div class="col-md-3">
                            <div class="contact-box center-version">
                                <a href="http://127.0.0.1:5500/client/create.html?contact=${contact.id}">
                                <img alt="image" class="img-circle" src="https://bootdey.com/img/Content/avatar/avatar1.png">
                                <h3 class="m-b-xs"><strong>${contact.name}</strong></h3>
                                <div class="font-bold">${contact.lastName}</div>
                                <address class="m-t-md">
                                    <strong>${contact.email}</strong>
                                    <br>
                                    ${contact.phone}
                                </address>
                                </a>
                            </div>
                        </div>
                    `
                })
                $('#contactList').html(html)
            })
            .catch((error) => {
                message(error.message)
            })
    })();
    (() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)

        if (!urlParams.get('contact')) {
            $('#contact_name').val("")
            $('#contact_lastName').val("")
            $('#contact_email').val("")
            $('#contact_phone').val("")
            return
        }

        const contact = urlParams.get('contact')
        getRequest('/contacts/' + contact)
            .then((res) => {
                $('#contact_name').val(res.contact.name)
                $('#contact_lastName').val(res.contact.lastName)
                $('#contact_email').val(res.contact.email)
                $('#contact_phone').val(res.contact.phone)
            })
            .catch((error) => {
                message("Um erro inesperado aconteceu. Por favor tente novamente ou contate o suporte.")
            })
    })()
})


$("#contactForm").submit(async (event) => {
    event.preventDefault()

    const data = new FormData(event.target)
    const values = Object.fromEntries(data.entries())
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    let url = !urlParams.get('contact') ? '/contacts/create' : '/contacts/update/' + urlParams.get('contact')
    let method = !urlParams.get('contact') ? 'post' : 'put'

    request(url, method, values)
        .then((res) => {
            if (!urlParams.get('contact')) {
                message("Contato criado com sucesso")
                return
            }
            message("Contato atualizado com sucesso")
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
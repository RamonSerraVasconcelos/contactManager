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

                res.contact.phones.forEach(phone => {
                    let selected1 = phone.type == 1 ? "selected" : ""
                    let selected2 = phone.type == 2 ? "selected" : ""
                    let selected3 = phone.type == 3 ? "selected" : ""

                    $(".phones").last().append(`
                        <div class="row" id="rowIndex_${rowIndex}">
                            <input type="hidden" name="phonesIds" value="${phone.id}"></input>
                            <div class="col-md-6">
                                <div class="form-group">
                                <input type="text" name="phones" id="contact_phone" class="form-control" value="${phone.number}" onkeypress="$(this).mask('(00) 00000-0000')">
                                </div>
                            </div>
                            <div class="col-md-6 d-flex">
                                <div class="form-group col-md-10 p-0">
                                    <select type="text" name="phonesTypes" id="contact_phone" class="form-control">
                                        <option ${selected1} value="1">Celular</option>
                                        <option ${selected2} value="2">Trabalho</option>
                                        <option ${selected3} value="3">Residencial</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <i class="material-icons bg-danger text-white delete-button" onclick="deleteRowIndex(${rowIndex++});addToDeleteArray(${phone.id})">delete</i>
                                </div>
                            </div>
                        </div>
                    `)
                })
            })
            .catch((error) => {
                message("Um erro inesperado aconteceu. Por favor tente novamente ou contate o suporte.")
            })
    })()
})

let phonesToBeDeleted = [];

$("#contactForm").submit(async (event) => {
    event.preventDefault()

    const data = new FormData(event.target)
    const values = Object.fromEntries(data.entries())
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    const phonesIds = document.getElementsByName('phonesIds')
    const phones = document.getElementsByName('phones')
    const phonesTypes = document.getElementsByName('phonesTypes')

    const contactPhones = []

    for (i = 0; i < phones.length; i++) {
        let phone = {}
        phone.id = phonesIds[i].value
        phone.number = phones[i].value
        phone.type = phonesTypes[i].value
        contactPhones.push(phone)
    }

    values.phones = contactPhones
    values.phonesToBeDeleted = phonesToBeDeleted

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

let rowIndex = 1
$('.add-button').click(() => {
    $(".phones").last().append(`
        <div class="row" id="rowIndex_${rowIndex}">
            <input type="hidden" name="phonesIds" value="-1"></input>
            <div class="col-md-6">
                <div class="form-group">
                <input type="text" name="phones" class="form-control" onkeypress="$(this).mask('(00) 00000-0000')">
                </div>
            </div>
            <div class="col-md-6 d-flex">
                <div class="form-group col-md-10 p-0">
                    <select type="text" name="phonesTypes" class="form-control">
                        <option value="1">Celular</option>
                        <option value="2">Trabalho</option>
                        <option value="3">Residencial</option>
                    </select>
                </div>
                <div class="form-group">
                    <i class="material-icons bg-danger text-white delete-button" onclick="deleteRowIndex(${rowIndex++})">delete</i>
                </div>
            </div>
        </div>
    `)
})

let rowAddressIndex = 1
$('.add-button-address').click(() => {
    $(".addresses").last().append(`
        <div class="row address-row" id="rowAddressIndex_${rowAddressIndex}">
            <input type="hidden" name="addressesIds" value="-1"></input>
            <div class="col-md-6">
                <div class="form-group">
                    <input type="text" name="addressesCep" id="address_cep" class="form-control cep" onkeypress="$(this).mask('00000-000')" placeholder="CEP" onblur="searchCep(this.value)">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input type="text" name="addressesStreet" id="address_street" class="form-control" placeholder="Endereço">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input type="text" name="addressesState" id="address_state" class="form-control" placeholder="Estado">
                </div>
            </div>
            <div class="col-md-6 d-flex">
                <div class="form-group col-md-10 p-0">
                    <input type="text" name="addressesCity" id="address_city" class="form-control" placeholder="Cidade">
                </div>
                <div class="form-group">
                    <i class="material-icons bg-danger text-white delete-button" onclick="deleteRowAddress(${rowAddressIndex++})">delete</i>
                </div>
            </div>
        </div>
    `)
})

function searchCep(value) {
    const cep = value.replace(/\D/g, '');

    if (cep != "") {
        const validateCep = /^[0-9]{8}$/;

        if (validateCep.test(cep)) {
            $.get('https://viacep.com.br/ws/' + cep + '/json', (res) => {
                $('#address_street').val(res.logradouro)
                $('#address_state').val(res.uf)
                $('#address_city').val(res.localidade)
            })
            return
        }

        message("Formato de CEP inválido.");
    }
    cleanCepForm();
}

function cleanCepForm() {
    $('#address_cep').val('')
    $('#address_street').val('')
    $('#address_state').val('')
    $('#address_city').val('')
}

function deleteRowIndex(index) {
    $('#rowIndex_' + index).remove()
}

function deleteRowAddress(index) {
    $('#rowAddressIndex_' + index).remove()
}

function addToDeleteArray(phoneId) {
    phonesToBeDeleted.push(phoneId)
}

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
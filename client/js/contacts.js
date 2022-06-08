$(document).ready(function () {
    if (!sessionStorage.getItem('userToken')) {
        location.href = "http://127.0.0.1:5500/client/index.html"
        return
    }
})

$(document).ready(function () {
    (() => {
        getRequest('/contacts')
            .then((res) => {
                let html = ``
                res.contacts.forEach(contact => {
                    html += `
                        <div class="col-md-3 contactsDiv">
                            <div class="contact-box center-version">
                                <a href="http://127.0.0.1:5500/client/create.html?contact=${contact.id}">
                                <img alt="image" class="img-circle" src="${contact.profilePic}">
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
                $('#userPic').attr('src', res.profilePic)
                $('#profilePageUrl').attr("href", "http://127.0.0.1:5500/client/userPage.html?id=" + res.userId)
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

                $('#contactPicture').attr("src", res.contact.profilePic)

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

                res.contact.addresses.forEach(address => {
                    $(".addresses").last().append(`
                        <div class="row address-row" id="rowAddressIndex_${rowAddressIndex}">
                            <input type="hidden" name="addressesIds" value="${address.id}"></input>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" name="addressesCep" id="address_cep_${rowAddressIndex}" class="form-control cep" onkeypress="$(this).mask('00000-000')" placeholder="CEP" onblur="searchCep(this.value, ${rowAddressIndex})" value="${address.cep}" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" name="addressesStreet" id="address_street_${rowAddressIndex}" class="form-control" placeholder="Endereço" value="${address.street}" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" name="addressesState" id="address_state_${rowAddressIndex}" class="form-control" placeholder="Estado" value="${address.state}" required>
                                </div>
                            </div>
                            <div class="col-md-6 d-flex">
                                <div class="form-group col-md-10 p-0">
                                    <input type="text" name="addressesCity" id="address_city_${rowAddressIndex}" class="form-control" placeholder="Cidade" value="${address.city}" required>
                                </div>
                                <div class="form-group">
                                    <i class="material-icons bg-danger text-white delete-button" onclick="deleteRowAddress(${rowAddressIndex++});addAddressToDeleteArray(${address.id})">delete</i>
                                </div>
                            </div>
                        </div>
                    `)
                })
                $('#userPic').attr('src', res.profilePic)
                $('#profilePageUrl').attr("href", "http://127.0.0.1:5500/client/userPage.html?id=" + res.userId)
            })
            .catch((error) => {
                message("Um erro inesperado aconteceu. Por favor tente novamente ou contate o suporte.")
            })
    })()
})

let phonesToBeDeleted = []
let addressesToBeDeleted = []

$("#contactForm").submit(async (event) => {
    event.preventDefault()

    const data = new FormData(event.target)
    const values = Object.fromEntries(data.entries())
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    const phonesIds = document.getElementsByName('phonesIds')
    const phones = document.getElementsByName('phones')
    const phonesTypes = document.getElementsByName('phonesTypes')

    const addressesIds = document.getElementsByName('addressesIds')
    const addressesCep = document.getElementsByName('addressesCep')
    const addressesStreet = document.getElementsByName('addressesStreet')
    const addressesState = document.getElementsByName('addressesState')
    const addressesCity = document.getElementsByName('addressesCity')

    const contactPhones = []
    const addresses = []

    for (i = 0; i < phones.length; i++) {
        let phone = {}
        phone.id = phonesIds[i].value
        phone.number = phones[i].value
        phone.type = phonesTypes[i].value
        contactPhones.push(phone)
    }

    for (i = 0; i < addressesIds.length; i++) {
        let address = {}
        address.id = addressesIds[i].value
        address.cep = addressesCep[i].value
        address.street = addressesStreet[i].value
        address.state = addressesState[i].value
        address.city = addressesCity[i].value
        addresses.push(address)
    }

    values.phones = contactPhones
    values.phonesToBeDeleted = phonesToBeDeleted

    values.addresses = addresses
    values.addressesToBeDeleted = addressesToBeDeleted

    let url = !urlParams.get('contact') ? '/contacts/create' : '/contacts/update/' + urlParams.get('contact')
    let method = !urlParams.get('contact') ? 'post' : 'put'

    request(url, method, values)
        .then((res) => {
            if (document.getElementById('fileToUploadContactPic').files.length > 0) {
                saveContactPic(res.contactId)
            }
            if (!urlParams.get('contact')) {
                message("Contato criado com sucesso")
                return
            }
            message("Contato atualizado com sucesso")
        })
        .catch((error) => {
            message(error.message)
        })
})

function saveContactPic(contactId) {
    var formData = new FormData();
    formData.append('fileToUploadContactPic', document.getElementById('fileToUploadContactPic').files[0])
    formData.append('contactId', contactId);

    $.ajax({
        url: "http://localhost:3000/contacts/saveContactPic",
        headers: {
            'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('userToken'))}`,
        },
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {

        }
    })
}

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
                <input type="text" name="phones" class="form-control" onkeypress="$(this).mask('(00) 00000-0000')" required>
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
                    <input type="text" name="addressesCep" id="address_cep_${rowAddressIndex}" class="form-control cep" onkeypress="$(this).mask('00000-000')" placeholder="CEP" onblur="searchCep(this.value, ${rowAddressIndex})" required>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input type="text" name="addressesStreet" id="address_street_${rowAddressIndex}" class="form-control" placeholder="Endereço" required>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input type="text" name="addressesState" id="address_state_${rowAddressIndex}" class="form-control" placeholder="Estado" required>
                </div>
            </div>
            <div class="col-md-6 d-flex">
                <div class="form-group col-md-10 p-0">
                    <input type="text" name="addressesCity" id="address_city_${rowAddressIndex}" class="form-control" placeholder="Cidade" required>
                </div>
                <div class="form-group">
                    <i class="material-icons bg-danger text-white delete-button" onclick="deleteRowAddress(${rowAddressIndex++})">delete</i>
                </div>
            </div>
        </div>
    `)
})

$('#contactsSearch').on("keyup", () => {
    var value = $('#contactsSearch').val().toLowerCase()
    $(".contactsDiv").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
})

function searchCep(value, fieldsId) {
    const cep = value.replace(/\D/g, '');

    if (cep != "") {
        const validateCep = /^[0-9]{8}$/;

        if (validateCep.test(cep)) {
            $.get('https://viacep.com.br/ws/' + cep + '/json', (res) => {
                $('#address_street_' + fieldsId).val(res.logradouro)
                $('#address_state_' + fieldsId).val(res.uf)
                $('#address_city_' + fieldsId).val(res.localidade)
            })
            return
        }

        message("Formato de CEP inválido.");
    }
    cleanCepForm(fieldsId);
}

function cleanCepForm(fieldsId) {
    $('#address_cep' + fieldsId).val('')
    $('#address_street' + fieldsId).val('')
    $('#address_state' + fieldsId).val('')
    $('#address_city' + fieldsId).val('')
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

function addAddressToDeleteArray(addressId) {
    addressesToBeDeleted.push(addressId)
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
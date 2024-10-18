function registreUser() {
    document.getElementById('registre').addEventListener('click', () => {
        const username = document.getElementById('Username-registre').value
        const name = document.getElementById('Name-registre').value
        const password = document.getElementById('Password-registre').value
        const image = document.getElementById('Photo-registre').files[0]
        let formData = new FormData()
        formData.append("username", username)
        formData.append("name", name)
        formData.append("password", password)
        formData.append("image", image)
        const params = {
            "username": username,
            "password": password,
            "name": name
        }
        const url = 'https://tarmeezacademy.com/api/v1/register'
        axios.post(url, formData)
        .then((Response) => {
            localStorage.setItem("token", Response.data.token)
            localStorage.setItem("user", JSON.stringify(Response.data.user)) //local storage can't store a obj so we convert it to string
            /*Hidding modal after logging in*/
            const modal = document.getElementById('registre-modal')
            const modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
            showAlert('Nice, you register a new user')
            showUI()
        })
        .catch((error) => {
            const message = error.response.data.message
            showAlert(message,'danger')
        })
    })
}

registreUser()
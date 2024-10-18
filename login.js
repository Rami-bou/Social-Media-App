function loginUser() {

    document.getElementById('login').addEventListener('click', () => {
        const username = document.getElementById('Username-field').value
        const password = document.getElementById('Password-field').value
        const params = {
            "username": username,
            "password": password
        }
        const url = 'https://tarmeezacademy.com/api/v1/login'
        axios.post(url, params)
        .then((Response) => {
            localStorage.setItem("token", Response.data.token)
            localStorage.setItem("user", JSON.stringify(Response.data.user)) //local storage can't store a obj so we convert it to string
            /*Hidding modal after logging in*/
            const modal = document.getElementById('login-modal')
            const modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
            showAlert('Nice, you legged in successfully')
            showUI()
        })
        .catch((error) => {
            console.log(error)
        })
    })
}

function showUI() {
    const token = localStorage.getItem("token")

    const loginDiv = document.getElementById('login-div')
    const logoutDiv = document.getElementById('logout-div')
    const addPostDiv = document.getElementById('add-btn')
    const commentDiv = document.getElementById('comment-div')
    console.log(commentDiv)
    if (token == null) {
        if(addPostDiv != null) {
            addPostDiv.style.setProperty("display", "none", "important")
        }
        loginDiv.style.setProperty("display", "flex", "important")
        logoutDiv.style.setProperty("display", "none", "important")
        // commentDiv.style.setProperty("display", "none", "important")
    } else {
        if(addPostDiv != null) {
            addPostDiv.style.setProperty("display", "flex", "important")
        }
        loginDiv.style.setProperty("display", "none", "important")
        logoutDiv.style.setProperty("display", "flex", "important")
        // commentDiv.style.setProperty("display", "flex", "important")

        const registeredUser = localStorage.getItem("user")
        const registeredUserJson = JSON.parse(registeredUser)
        const logoutBtn = document.getElementById('logout-btn')
        document.getElementById('logout-div').innerHTML = ''
        /**if registeredUser != null*/
        document.getElementById('logout-div').innerHTML += `
            <img id="profile-img" class="rounded-circle border border-2" src="${registeredUserJson.profile_image}" style="width: 45px; height: 45px;">
            <b id="profile-username" style="margin-right: 5px; margin-left: 4px;">@${registeredUserJson.username}</b>
        `
        //show up username and profile username after the logout (just adjuste layout)
        document.getElementById('profile-img').after(logoutBtn)
        document.getElementById('profile-username').after(logoutBtn)
    }
}
showUI()
loginUser()
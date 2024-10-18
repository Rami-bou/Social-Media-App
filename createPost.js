document.getElementById('add-btn').addEventListener('click', () => {
    //te restart the value of hidden input to said that we clickd the add button (look at the comment below)
    document.getElementById('id-input').value = "" 

    //opne modal dynamiclly and edit title for creating new post
    document.getElementById('create-post').innerHTML = "Create"
    document.getElementById('modal-title').innerHTML = "Create Post"
    let postModal = new bootstrap.Modal(document.getElementById('create-post-modal'), {})
    postModal.toggle()
})
document.getElementById('create-post').addEventListener('click', () => {
    /** we do that to deting between create and edit click so when you click
     * edit button postId contain the id if we clicked on create button 
     * it gonna be null or empty
      */
    let postId = document.getElementById('id-input').value //hidden input 
    let isCreate = postId == null || postId == ""
    
    const title = document.getElementById('post-title').value
    const body = document.getElementById('post-body').value
    const image = document.getElementById('post-Photo').files[0]
    const token = localStorage.getItem('token')

    let formData = new FormData()
    formData.append("body", body)
    formData.append("title", title)
    formData.append("image", image)
    const header = {
        'Content-Type': 'multipart/form-data',
        'authorization': `Bearer ${token}`
    }
    let url = ``
    if (isCreate) {
        url = 'https://tarmeezacademy.com/api/v1/posts'
        
    } else {
        /**this is probleme on api than make you think that you do a put but actually in the back they
         *  treat it as post so we have to specify 
         * it on form data and do a post request */
        formData.append("_method",  "put")
        url = `https://tarmeezacademy.com/api/v1/posts/${postId}`
    }
    axios.post(url, formData, {
        headers:header
    })
    .then((Response) => {
        showAlert('You have successfully created the post', 'success')
        //To get new post without reload manually
        getPosts()
        const modal = document.getElementById('create-post-modal')
        const modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()

    })
    .catch((error) => {
        console.log(error)
        showAlert(error.response.data.message, 'danger')
        const modal = document.getElementById('create-post-modal')
        const modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
    })
})
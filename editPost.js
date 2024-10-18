function editPost(postObj) {
    //convert from string to obj
    let post = JSON.parse(decodeURIComponent(postObj))
    document.getElementById('id-input').value = post.id
    
    document.getElementById('create-post').innerHTML = "Update"
    document.getElementById('modal-title').innerHTML = "Edit Post"
    document.getElementById('post-title').value = post.title
    document.getElementById('post-body').innerHTML = post.body
    let postModal = new bootstrap.Modal(document.getElementById('create-post-modal'), {})
    postModal.toggle()

}
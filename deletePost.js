function deletePost(obj) {

    const token = localStorage.getItem('token')
    const userObj = JSON.parse(decodeURIComponent(obj))
    console.log(userObj)
    // const user = localStorage.getItem('user')
    // const userObj = JSON.parse(user)
    const URL = `https://tarmeezacademy.com/api/v1/posts/${userObj.id}`
    const header = {
        'authorization': `Bearer ${token}`
    }

    axios.delete(URL, {
        headers: header,
        data: {
            body: userObj.body
        }
    })
    .then(() => {
        getPosts();
        showAlert('You deleted the post successfully');
    })
    .catch(error => {
        console.log(error)
        showAlert(error.response.data.error_message, 'danger')
    });
}

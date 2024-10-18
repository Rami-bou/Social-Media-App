//getting the userId from the page url
const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("postId")
const token = localStorage.getItem('token')
function postDetailes() {
    axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
    .then((response) => {
        let post = response.data.data
        
        let username = post.author.username
        let profileImage = post.author.profile_image
        let image = post.image
        let createdAt = post.created_at
        let title = post.title
        let body = post.body
        let commentCount = post.comments_count
        let tags = post.tags
        let comments = post.comments
        console.log(comments)
        let com = ``
        for (comment of comments) {
            let commentUsername = comment.author.username
            let commentProfile = comment.author.profile_image
            let commentBody = comment.body
            
            com += `
                <div class="d-flex p-3">
                        <img class="rounded-circle" src="${commentProfile}" style="width: 35px; height: 35px; margin-right: 10px;">
                        <h6>${commentUsername}</h6>
                    </div>
                    <div>
                        <p>${commentBody}</p>
                    </div>
                    <hr>
            `
        }
        const temp = `
                <div class="card">
                <div class="card-header">
                        <img class="rounded-circle border border-2" src="${profileImage}" style="width: 45px; height: 45px;">
                        <b>@${username}</b>
                    </div>
                    <div class="card-body shadow">
                        <img class="rounded w-100" src="${image}" style="width: 100%; height: 420px;">
                        <h6 class="text-secondary mt-1">${createdAt}</h6>
                        <h5>${title}</h5>
                        <p>${body}</p>
                        <hr>
                    <div>
                        <span>
                            (${commentCount}) comments
                            <span id="post-tags-${post.id}"></span>
                        </span>
                    </div>
                </div>
                <div id="comments" style="background-color: white; padding-left: 5px;"></div>
                <div class="new-comment d-flex justify-content-center" style="gap: 0px; margin: 10px 10px;" id="comment-div">
                    <input type="text" class="form-control" id="comment-contetnt" style="border-radius: 10px 0px 0px 10px;">
                    <button class="btn btn-primary" style="border-radius: 0px 10px 10px 0px;" id="add-new-comment" onclick="addComment()">Add</button>
                </div>
            </div>
            `
                //craser l'enciene post quand tu refrichir la page
                document.getElementById('post-detailes').innerHTML = ''
                document.getElementById('post-detailes').innerHTML += temp
                document.getElementById('post-detailes-Bigusername').innerHTML = username
                document.getElementById('comments').innerHTML = com
    })
    
}
postDetailes()

function addComment() {
    let commentContent = document.getElementById('comment-contetnt').value
    const token = localStorage.getItem('token')
    const header = {
        'Content-Type': 'multipart/form-data',
        'authorization': `Bearer ${token}`
    }
    axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`,{
        "body": commentContent
    }, 
    {
        headers:header
    })
    .then(() => {
        postDetailes()
        showAlert('You added a new comment successfully')
    }).catch((error) => {
        showAlert(error.response.data.message, 'danger')
    })
}

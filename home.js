function getPosts(nbPage = 1) {
    axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=4&page=${nbPage}`)
    .then((response) => {
        const currentUserId = localStorage.getItem('user')
        const currentUserIdJson = JSON.parse(currentUserId)
        let posts = response.data.data
        lastPage = response.data.meta.last_page
        for(post of posts) {
            let username = post.author.username
            let profileImage = post.author.profile_image
            let image = post.image
            let createdAt = post.created_at
            let title = ""
            let body = post.body
            let commentCount = post.comments_count
            let tags = post.tags
            if (post.title != null) {
                title = post.title
            }
            //show or hide edit button
            let btnContent = ``
            if (post.author.id == currentUserIdJson.id && currentUserIdJson != null) {
                btnContent = `
                    <button style="float:right; border: 0px;" class="btn btn-secondary my-1" id="edit-btn" onclick="editPost('${encodeURIComponent(JSON.stringify(post))}')">Edit</button>
                    <button style="float:right; border: 0px;" class="btn btn-danger mx-2 my-1" id="delete-btn" onclick="deletePost('${encodeURIComponent(JSON.stringify(post))}')">Delete</button>
                    `
            }
                const temp = `
                <div class="card" >
                    <div class="card-header">
                        <img class="rounded-circle border border-2" src="${profileImage}" style="width: 45px; height: 45px;">
                        <b>@${username}</b>
                        ${btnContent}
                    </div>
                    <div class="card-body shadow" onClick="getDetails(${post.id})">
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
            </div>
            `
            document.getElementById('post').innerHTML += temp
            
            const currentTag = `post-tags-${post.id}`
            // document.getElementById(currentTag).innerHTML = ""
            for (tag of tags) {
                let temp = 
                `
                    <button class="btn btn-sm rounded-pill" style="background-color: gray; color: white;">${tag.name}</button>
                `
                document.getElementById(currentTag).innerHTML += temp
            }
        }
    }).catch((error) => {
        console.log(error)
    })
}
let pageNumber = 1
let lastPage = 1


//infinite scrolling
window.addEventListener('scroll', () => {
    const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight
    if (endOfPage && pageNumber < lastPage) {
        pageNumber+=1
        getPosts(pageNumber)
    }
})
getPosts()


 //change to the second page with user id
 function getDetails(id) {
    window.location = `postDetailes.html?postId=${id}`
 }

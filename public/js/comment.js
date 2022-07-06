const submitComment = async (event) => {
    event.preventDefault();

    const postId = document.querySelector(".new-post-comment").dataset.postId;
    const commentBody = document.querySelector("#comment").value.trim();

    if (commentBody) {
        await fetch ("/api/comments", {
            method: "POST",
            body: JSON.stringify({
                postId, 
                comments: commentBody,
            }),
            headers: {
                "content-type": "application/json"
            }
        });
        document.location.reload();
    }
};

document.getElementById("submitBtn").addEventListener("click", submitComment);
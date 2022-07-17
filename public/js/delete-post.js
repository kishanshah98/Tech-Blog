const deleteFormHandler = async (event) => {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[window.locataion.toString().split('/').length - 1];

    const response = await fetch(`/api/posts/${post_id}`, {
        method: "PUT",
        body: JSON.stringify({
            post_id: post_id,
        }),
        headers: {
            "content-type": "application/json"
        }
    });

    if (response.ok) {
        document.location.replace('dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector(".delete-post-button").addEventListener("click", deleteFormHandler);
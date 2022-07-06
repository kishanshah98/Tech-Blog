const submitPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#new-post-title").value.trim();
    const content = document.querySelector("#content").value.trim();

    if (content && title) {
        await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({
                title,
                content
            }),
            headers: {
                "content-type": "application/json"
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.getElementById("submitBtn").addEventListener("click", submitPost);
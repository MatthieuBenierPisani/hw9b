document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    fetch("http://localhost:3000/articles", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(d => document.getElementById("result").innerText = d)
})
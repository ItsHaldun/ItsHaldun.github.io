document.addEventListener("click", function(e) {
	if(e.target.classList.contains("gallery-img")) {
		const src = e.target.getAttribute("src");
		document.querySelector(".modal-img").src = src;
		document.querySelector(".modal-link").href = src;
		const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
		myModal.show();
	}
})
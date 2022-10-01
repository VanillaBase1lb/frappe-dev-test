document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('find_book').addEventListener('click', getBooksFromFrappe);
});

function getBooksFromFrappe() {
	const title = document.getElementById('inputTitle').value;
	const authors = document.getElementById('inputAuthors').value;
	const isbn = document.getElementById('inputisbn').value;
	const publisher = document.getElementById('inputPublisher').value;
	const params = {
		title: title,
		authors: authors,
		isbn: isbn,
		publisher: publisher,
	};
	console.log(params);
	const options = {
		method: 'GET',
	};
	fetch('/api/books?' + new URLSearchParams(params), options).then(res => res.json()).then(data => {
		console.log(data);
	});
}

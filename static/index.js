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
	// remove empty params
	Object.keys(params).forEach(key => params[key] === '' && delete params[key]);
	console.log(params);
	const options = {
		method: 'GET',
	};
	var books;
	fetch('/api/books?' + new URLSearchParams(params), options).then(res => res.json()).then(data => {
		console.log(data);
		books = data;
		// fill table with books
		let table = document.getElementById('booktable');
		table.getElementsByTagName('tbody')[0].innerHTML = '';
		for (let i = 0; i < books.length; i++) {
			console.log(books[i]["title"]);
			let row = table.getElementsByTagName('tbody')[0].insertRow();
			let cell0 = row.insertCell(0);
			cell0.className = "bs-checkbox";
			cell0.innerHTML = '<input type="checkbox">';
			row.insertCell().innerHTML = books[i]["bookID"];
			row.insertCell().innerHTML = books[i]["title"];
			row.insertCell().innerHTML = books[i]["authors"];
			row.insertCell().innerHTML = books[i]["average_rating"];
			row.insertCell().innerHTML = books[i]["isbn"];
			row.insertCell().innerHTML = books[i]["isbn13"];
			row.insertCell().innerHTML = books[i]["language_code"];
			row.insertCell().innerHTML = books[i]["  num_pages"];
			row.insertCell().innerHTML = books[i]["ratings_count"];
			row.insertCell().innerHTML = books[i]["text_reviews_count"];
			row.insertCell().innerHTML = books[i]["publication_date"];
			row.insertCell().innerHTML = books[i]["publisher"];
		}
	});
}

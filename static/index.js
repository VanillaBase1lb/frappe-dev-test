document.pagecount = 1;
document.getElementById('find_book').addEventListener('click', getBooksFromFrappe);
document.getElementById('add_book').addEventListener('click', addBooksToLibrary);
document.getElementById('select_all').addEventListener('click', function() {
	const state = document.getElementById('select_all').checked;
	for (let i = 0; i < document.books.length; i++) {
		document.getElementById(`book_${i}`).checked = state;
	}
});
document.getElementById('next_page').addEventListener('click', function() {
	document.pagecount += 1;
	getBooksFromFrappe();
});
document.getElementById('prev_page').addEventListener('click', function() {
	document.pagecount -= 1;
	getBooksFromFrappe();
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
		page: document.pagecount,
	};
	// remove empty params
	Object.keys(params).forEach(key => (params[key] === '' || params[key] === undefined) && delete params[key]);
	console.log(params);
	const options = {
		method: 'GET',
	};
	fetch('/api/books?' + new URLSearchParams(params), options).then(res => res.json()).then(data => {
		console.log(data);
		document.books = data;
		// fill table with books
		let table = document.getElementById('booktable');
		table.getElementsByTagName('tbody')[0].innerHTML = '';
		for (let i = 0; i < document.books.length; i++) {
			console.log(document.books[i]["title"]);
			let row = table.getElementsByTagName('tbody')[0].insertRow();
			let cell0 = row.insertCell(0);
			cell0.className = "bs-checkbox";
			// store isbn in checkbox value attribute
			cell0.innerHTML = `<input type="checkbox" id="book_${i}" value="${document.books[i]["isbn"]}">`;
			row.insertCell().innerHTML = document.books[i]["bookID"];
			row.insertCell().innerHTML = document.books[i]["title"];
			row.insertCell().innerHTML = document.books[i]["authors"];
			row.insertCell().innerHTML = document.books[i]["average_rating"];
			row.insertCell().innerHTML = document.books[i]["isbn"];
			row.insertCell().innerHTML = document.books[i]["isbn13"];
			row.insertCell().innerHTML = document.books[i]["language_code"];
			row.insertCell().innerHTML = document.books[i]["  num_pages"];
			row.insertCell().innerHTML = document.books[i]["ratings_count"];
			row.insertCell().innerHTML = document.books[i]["text_reviews_count"];
			row.insertCell().innerHTML = document.books[i]["publication_date"];
			row.insertCell().innerHTML = document.books[i]["publisher"];
		}
		changePageButtonState();
	});
}

function addBooksToLibrary() {
	for (let i = 0; i < document.books.length; i++) {
		const book = document.getElementById(`book_${i}`)
		if (book.checked) {
			console.log(document.books[i])
			fetch('/api/books', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ "isbn": book.value }) })
				.then(res => {
					if (res.status == 200) {
						alert("Book(s) added to library");
					}
				});
		}
	}
}

function changePageButtonState() {
	console.log("change")
	if (document.pagecount <= 1) {
		document.getElementById('prev_page').classList.add('disabled');
	}
	else {
		document.getElementById('prev_page').classList.remove('disabled');
	}
	if (document.books.length < 20) {
		document.getElementById('next_page').classList.add('disabled');
	}
	else {
		document.getElementById('next_page').classList.remove('disabled');
	}
}

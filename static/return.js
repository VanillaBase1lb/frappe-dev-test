document.getElementById('member_books').addEventListener('click', getMemberIssuedBooks);

function getMemberIssuedBooks() {
	const username = document.getElementById('inputUsername').value;
	fetch('/api/transactions/memberissued?' + new URLSearchParams({ "username": username }), { method: 'GET' })
		.then(res => res.json()).then(books => {
			console.log(books);
			let table = document.getElementById('returntable');
			table.getElementsByTagName('tbody')[0].innerHTML = '';
			for (let i = 0; i < books.length; i++) {
				let row = table.getElementsByTagName('tbody')[0].insertRow();
				let cell0 = row.insertCell(0);
				cell0.innerHTML = `<button class="btn btn-success" id="stock_${i}" value="${books[i][0]}">Return</button>`;
				cell0.getElementsByTagName('button')[0].onclick = function() { returnBook(i) };
				// do not put in loop
				row.insertCell().innerHTML = books[i][0]; // bookID
				row.insertCell().innerHTML = books[i][1]; // title
				row.insertCell().innerHTML = books[i][2]; // authors
				row.insertCell().innerHTML = books[i][3]; // average_rating
				row.insertCell().innerHTML = books[i][4]; // publisher
			}
		});
}

function returnBook(i) {
	const username = document.getElementById('inputUsername').value;
	const bookid = document.getElementById(`stock_${i}`).value;
	const data = { "username": username, "bookid": bookid };
	console.log(data);
	fetch('/api/transactions/return', { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(data) })
		.then(res => res.text()).then(result => {
			alert(result);
			getMemberIssuedBooks();
		});
}


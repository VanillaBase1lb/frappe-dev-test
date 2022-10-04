getStock();

function getStock() {
	fetch('/api/transactions/stock').then(res => res.json()).then(stock => {
		console.log(stock);
		let table = document.getElementById('stocktable');
		table.getElementsByTagName('tbody')[0].innerHTML = '';
		for (let i = 0; i < stock.length; i++) {
			let row = table.getElementsByTagName('tbody')[0].insertRow();
			let cell0 = row.insertCell(0);
			cell0.innerHTML = `<button class="btn btn-success" id="stock_${i}" value="${stock[i][0]}">Delete</button>`;
			cell0.getElementsByTagName('button')[0].onclick = function() { deleteBook(i) };
			// do not put in loop
			row.insertCell().innerHTML = stock[i][0]; // bookID
			row.insertCell().innerHTML = stock[i][1]; // title
			row.insertCell().innerHTML = stock[i][2]; // authors
			row.insertCell().innerHTML = stock[i][3]; // average_rating
			row.insertCell().innerHTML = stock[i][4]; // publisher
		}
	});
}

function deleteBook(i) {
	const bookid = document.getElementById(`stock_${i}`).value;
	const data = { "bookid": bookid };
	console.log(data);
	fetch('/api/transactions/delete', { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(data) })
		.then(res => res.text()).then(result => {
			alert(result);
			getStock();
		});
}


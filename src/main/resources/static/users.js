document.addEventListener("DOMContentLoaded", () => {
	loadUsers();
    document.getElementsByName('mainForm')[0].addEventListener('submit', () => {
    	storeUser(document.mainForm.firstname.value, document.mainForm.lastname.value);
    	return false;
    });
});

const storeUser = (firstName, lastName) => {
    const req = new XMLHttpRequest();
    req.addEventListener('load', loadUsers);
    req.open("POST", "./api/users/");
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify({
        name: `${firstName} ${lastName}`
    }));
};

let myData = 'data';

const loadUsers = () => {
	// myData vidi vzdy
	// this.myData = '';
    const req = new XMLHttpRequest();
    req.addEventListener('load', () => {
        const tableBody = document.getElementById('user-table');
        tableBody.innerHTML = '';
        const users = JSON.parse(req.responseText);
        users.forEach(user => createRow(tableBody, user.id, user.name));
    });
    req.open("GET", "./api/users/");
    req.send();
};

function loadUsersOld() {
	// myData vidi jen pokud je spustena ze stejneho contextu (napr. tohoto souboru) 
	this.myData = 'old';
}

const createRow = (tableBody, id, name) => {
    const idCell = document.createElement('td');
    idCell.innerText = id;
    const nameCell = document.createElement('td');
    nameCell.innerText = name;
    const userRow = document.createElement('tr');
    userRow.append(idCell, nameCell);
    tableBody.append(userRow);
};

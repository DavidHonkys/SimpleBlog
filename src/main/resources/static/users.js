document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
    loadRoles();
    // nebo document.forms.mainForm
    document.getElementsByName('mainForm')[0].addEventListener('submit', event => {
    	event.preventDefault();
    	storeUser(
    			document.mainForm.username.value, 
    			document.mainForm.password.value,
    			Array.from(document.mainForm.roles.selectedOptions).map(o => o.value)
		);
    	return false;
    });

//    document.getElementById('submit-the-form').addEventListener('click', () => {
//    	storeUser(document.mainForm.firstname.value, document.mainForm.lastname.value);
//    });
});

const storeUser = (username, password, roleIds) => {
    const req = new XMLHttpRequest();
    req.addEventListener('load', loadUsers);
    req.open("POST", "./api/users");
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('X-CSRF', )
    const newUser = {
        name: username,
        password: password,
        roles: roleIds.map(roleId => ({ id: roleId }))
    };
    req.send(JSON.stringify(newUser));
};

const loadRoles = () => {
    const req = new XMLHttpRequest();
    req.addEventListener('load', () => {
        const rolesSelect = document.getElementById('role-selector');
        rolesSelect.innerHTML = '';
        const roles = JSON.parse(req.responseText);
        roles.forEach(role => {
        	const roleOption = document.createElement('option');
        	roleOption.value = role.id;
        	roleOption.innerText = role.name;
        	rolesSelect.append(roleOption);
        });
    });
    req.open("GET", "./api/roles");
    req.send();
};

const loadUsers = () => {
    const req = new XMLHttpRequest();
    req.addEventListener('load', () => {
        const tableBody = document.getElementById('user-table');
        tableBody.innerHTML = '';
        const users = JSON.parse(req.responseText);
        users.forEach(user => createRow(tableBody, user.id, user.name));
    });
    req.open("GET", "./api/users");
    req.send();
};

const createRow = (tableBody, id, name) => {
    const idCell = document.createElement('td');
    idCell.innerText = id;
    const nameCell = document.createElement('td');
    nameCell.innerText = name;
    const userRow = document.createElement('tr');
    userRow.append(idCell, nameCell);
    tableBody.append(userRow);
};

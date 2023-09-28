    const form = document.getElementById('registrationForm');
    const table = document.getElementById('userTable');
    const tbody = table.querySelector('tbody');

    // Load saved data from web storage
    let usersData = [];
    let storageData=localStorage.getItem('userData');
    if(storageData){
        usersData= JSON.parse(storageData);
        console.log(usersData);
        usersData.forEach(user => {
            const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.acceptTerms ? 'Yes' : 'No'}</td>
        `;

        tbody.appendChild(newRow);
        });
        
    }


    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validate date of birth
        const dob = new Date(document.getElementById('dob').value);
        const today = new Date();
        const minAge = 18;
        const maxAge = 55;
        const age = today.getFullYear() - dob.getFullYear();

        if (age < minAge || age > maxAge) {
            alert(`You must be between ${minAge} and ${maxAge} years old to register.`);
            return;
        }

        // Store data in web storage
        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            dob: document.getElementById('dob').value,
            acceptTerms: document.getElementById('acceptTerms').checked
        };
        usersData.push(userData);
        localStorage.setItem('userData', JSON.stringify(usersData));

        // Add data to table
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${userData.name}</td>
            <td>${userData.email}</td>
            <td>${userData.password}</td>
            <td>${userData.dob}</td>
            <td>${userData.acceptTerms ? 'Yes' : 'No'}</td> `;

        tbody.appendChild(newRow);

        // Reset form
        form.reset();
    });

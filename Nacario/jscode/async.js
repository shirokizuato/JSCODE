async function getData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        const table = document.getElementById('table');

        data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
            `;
            table.appendChild(row);
        });

    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

getData();

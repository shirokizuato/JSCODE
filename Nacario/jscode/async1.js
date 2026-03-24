async function getData() {
    try {
        const response = await fetch('https://api.sampleapis.com/wines/reds');
        const data = await response.json();

        const table = document.getElementById('table');

        data.forEach(wine => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${wine.wine}</td>
                <td>${wine.winery}</td>
                <td>${wine.rating.average}</td>
                <td>${wine.location}</td>
                <td><img src="${wine.image}" alt="${wine.wine}" width="60"></td>
            `;
            table.appendChild(row);
        });

    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

getData();

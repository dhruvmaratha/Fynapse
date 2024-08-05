document.getElementById('stockForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const symbol = document.getElementById('symbol').value;
    fetch(`/api/stock/${symbol}`)
        .then(response => response.json())
        .then(data => {
            const stockData = data['Global Quote'];
            if (stockData) {
                document.getElementById('stockData').innerHTML = `
                    <p><strong>Symbol:</strong> ${stockData['01. symbol']}</p>
                    <p><strong>Price:</strong> $${stockData['05. price']}</p>
                    <p><strong>Change:</strong> ${stockData['09. change']}</p>
                    <p><strong>Change Percent:</strong> ${stockData['10. change percent']}</p>
                `;
            } else {
                document.getElementById('stockData').innerHTML = `<p>Stock data not found.</p>`;
            }
        })
        .catch(error => {
            document.getElementById('stockData').innerHTML = `<p>Error fetching data.</p>`;
            console.error('Error fetching stock data:', error);
        });
});


let data = [];

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
.then(response => response.json())
.then(dataResponse => {
    data = dataResponse;
    table(data);
})
.catch(e => {
    console.error('Error',e);
})

// fetch data using async/await
async function fetchData(){
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        table(data);
    }
    catch(e){
        console.error('Error' ,e)
    }
}
// fetchData();

// for rendering table
function table(data){
    const tableBody = document.getElementById('tablebody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        const percentageChange = item.price_change_percentage_24h;
        const percentageChangeClass = percentageChange >= 0 ? 'positive-change' : 'negative-change';


        row.innerHTML = `
        <td id = "data1"><img src = "${item.image}" alt = "${item.name}" width="20"></td>
        <td>${item.name}</td>
        <td>${item.symbol}</td>
        <td>${item.id}</td>
        <td>${"$"+item.current_price}</td>
        <td class="${percentageChangeClass}">${item.price_change_percentage_24h}%</td>
        <td>${"Mkt Cap : $"+item.total_volume}</td>
        `;
        row.classList.add('table-row-border');
        tableBody.appendChild(row);
    });
}

document.getElementById('search').addEventListener('click',() =>{
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.ariaValueMax.toLowerCase();

    const filter = data.filter(item => {
        const itemName = item.name.toLowerCase();
        const itemSymbol = item.symbol.toLowerCase();
        return itemName.includes(searchTerm) || itemSymbol.includes(searchTerm);
    });

    table(filter);
});

document.getElementById('sortMarketCapButton').addEventListener('click',() => {
    data.sort((a,b) => b.total_volume - a.total_volume);
    table(data);
});

document.getElementById('sortPercentageChangeButton').addEventListener('click',() => {
    data.sort((a,b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    table(data);
})

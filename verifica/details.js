const BASE_URL = 'https://striveschool-api.herokuapp.com/api/product/';
const params = new URLSearchParams(location.search);
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzYzU3YWM1NmIzNjAwMTMzZmU1N2MiLCJpYXQiOjE2NzkwMTczMzgsImV4cCI6MTY4MDIyNjkzOH0.qfMFXtft9_TZQ17RgZ6-MVUZdpRlGvqc4ox2Fyv2y6Y';
const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
});

function productDetails(product) {
    const contentArea = document.getElementById('cont-card');
    contentArea.innerHTML = `
    <div class="container px-0">
    <div class="d-flex justify-content-center">
    <img src=${product.imageUrl} class="rounded " />
    </div>
    <div class=" flex-column px-2">
    <h3 class="pt-3">${product.name}</h3>  
    <h6>${product.brand}</h6>
    <p class="p-1 mt-3 shadow rounded ">${product.description}</p>
    <p class="justify-content-end d-flex"><span class="rounded px-3 bg-info text-dark shadow text-center">${product.price}€</span></p>
    </div>    
    </div>
    `;
}

(async () => {
    const response = await fetch(BASE_URL + params.get('id'), { headers });
    const product = await response.json();
    const { _id, imageUrl, name, brand, description, price } = product;
    productDetails({ _id, imageUrl, name, brand, description, price });
})();
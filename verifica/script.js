const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzYzU3YWM1NmIzNjAwMTMzZmU1N2MiLCJpYXQiOjE2NzkwMTczMzgsImV4cCI6MTY4MDIyNjkzOH0.qfMFXtft9_TZQ17RgZ6-MVUZdpRlGvqc4ox2Fyv2y6Y';
const BASE_URL = 'https://striveschool-api.herokuapp.com/api/product/';
const FETCH_PARAM = {
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
};

const objId = new URLSearchParams(window.location.search).get('objId');

const fetchProduct = async (productId) => {
    const productUrl = objId ? `${BASE_URL}/${productId}?objId=${objId}` : `${BASE_URL}/${productId}`;
    const response = await fetch(productUrl, FETCH_PARAM);
    if (!response.ok) {
        throw new Error('Network response was not OK');
    }
    const productData = await response.json();
    return productData;
};

const createProductCard = (productData) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h3');
    title.classList.add('card-title');
    title.innerText = productData.name;
    card.appendChild(title);

    const description = document.createElement('p');
    description.classList.add('card-description');
    description.innerText = productData.description;
    card.appendChild(description);

    const price = document.createElement('p');
    price.classList.add('card-price');
    price.innerText = `${productData.price} €`;
    card.appendChild(price);

    const image = document.createElement('img');
    image.classList.add('card-image');
    image.src = productData.imageUrl;
    image.alt = productData.name;
    card.appendChild(image);

    return card;
};

const loadProducts = async () => {
    const productListUrl = `${BASE_URL}/`;
    const response = await fetch(productListUrl, FETCH_PARAM);
    if (!response.ok) {
        throw new Error('Network response was not OK');
    }
    const productList = await response.json();
    const container = document.getElementById('product-card');
    for (const product of productList) {
        const productData = await fetchProduct(product._id);
        const card = createProductCard(productData);
        container.appendChild(card);
    }
};

window.onload = () => {
    loadProducts().catch((error) => console.log(error));
};

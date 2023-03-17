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
    card.classList.add('card', 'col-2');

    const image = document.createElement('img');
    image.classList.add('card-img-top', 'p-2');
    image.src = productData.imageUrl;
    image.alt = productData.name;

    card.appendChild(image);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.innerText = productData.name;
    cardBody.appendChild(title);

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.innerText = productData.description;
    cardBody.appendChild(description);

    const price = document.createElement('h6');
    price.classList.add('card-subtitle');
    price.classList.add('mb-2');
    price.classList.add('text-muted');
    price.innerText = `${productData.price} €`;
    cardBody.appendChild(price);

    let divFirstBtn = document.createElement('div');
    const addButton = document.createElement('button');
    addButton.classList.add('btn', 'btn-info');
    addButton.innerText = 'Add to Cart';
    divFirstBtn.appendChild(addButton);
    cardBody.appendChild(divFirstBtn);

    const addButtonChange = document.createElement('button');
    addButtonChange.classList.add('btn', 'btn-success');
    addButtonChange.innerText = 'Change';
    divFirstBtn.appendChild(addButtonChange);
    cardBody.appendChild(divFirstBtn);
    divFirstBtn.classList.add('pt-3', 'd-flex', 'justify-content-between', 'gap-2', 'flex-wrap');

    const addButtonView = document.createElement('button');
    addButtonView.classList.add('btn', 'btn-dark', 'mt-2');
    addButtonView.innerText = 'View';
    let divBtn = document.createElement('div');
    divBtn.appendChild(addButtonView);
    cardBody.appendChild(divBtn);



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





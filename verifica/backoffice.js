
const params = new URLSearchParams(location.search)
const id = params.get('id')
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzYzU3YWM1NmIzNjAwMTMzZmU1N2MiLCJpYXQiOjE2NzkwMTczMzgsImV4cCI6MTY4MDIyNjkzOH0.qfMFXtft9_TZQ17RgZ6-MVUZdpRlGvqc4ox2Fyv2y6Y';
const BASE_URL = 'https://striveschool-api.herokuapp.com/api/product/';
const headers =
    new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,

    });


const method = id ? "PUT" : "POST"
const stringifyProduct = (product, callback) => {
    const endpoint = id ? BASE_URL + id : BASE_URL

    fetch(endpoint, {
        headers,
        method,
        body: JSON.stringify(product),
    })
        .then((res) => res.json())
        .then((data) => callback(null, data))
        .catch((error) => callback(error, null));
};


const formBackoffice = (e) => {
    e.preventDefault();
    const imageUrl = document.getElementById("imageUrl").value;
    const name = document.getElementById("name").value;
    const brand = document.getElementById("brand").value;
    const description = document.getElementById("description").value;
    const price = parseInt(document.getElementById("price").value);

    const product = { imageUrl, name, brand, description, price };

    stringifyProduct(product, (err) => {
        if (err) {
            alert(err.message)
        } else {
            e.target.reset();
            window.location.replace("index.html");
        }
    });
};


async function deleteProduct() {
    const confirmed = confirm("Procedere all'eliminazione del prodotto?");

    if (confirmed) {

        try {
            const response = await fetch(BASE_URL + id, { method: 'DELETE', headers })
            if (!response.ok) throw new Error("C'è stato un problema nell'eliminazione,riprova per cortesia.")
            alert("Prodotto eliminato correttamente")
            location.assign("index.html")
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }
}
const dltBtn = document.getElementById('delete-btn');
dltBtn.addEventListener('click', deleteProduct);


async function productDetails(id) {

    try {
        const response = await fetch(BASE_URL + id, { headers })
        const product = await response.json()

        Object.keys(product).forEach(key => {
            const field = document.querySelector(`#${key}`)
            if (field) field.value = product[key]
        })

    } catch (error) {
        alert(error.message)
    } finally {

    }
}


window.onload = () => {
    const form = document.querySelector("form");
    form.onsubmit = formBackoffice;

    if (id) {
        document.querySelector("#title-backoffice").innerHTML = "Modifica il tuo articolo"
        document.querySelector("#delete-btn").classList.remove("d-none")
        getProductDetails(id)
    }

};
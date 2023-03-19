const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzYzU3YWM1NmIzNjAwMTMzZmU1N2MiLCJpYXQiOjE2NzkwMTczMzgsImV4cCI6MTY4MDIyNjkzOH0.qfMFXtft9_TZQ17RgZ6-MVUZdpRlGvqc4ox2Fyv2y6Y';
const BASE_URL = 'https://striveschool-api.herokuapp.com/api/product/';
const headers =
    new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,

    });


window.onload = () => {
    fetch(BASE_URL, { headers })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const content = document.querySelector("#product-card");
            content.innerHTML = "";

            data.forEach((product) => {
                content.innerHTML +=
                    `<div class="col-6 col-md-2 col-lg-2">
                <div class="card shadow pt-3 px-3 p-md-0">
                <a  href="details.html?id=${product._id}" ><img style="height:9rem;" src="${product.imageUrl}" class="  object-fit-cover-contain card-img-top  " alt="..." /></a>
                
                <div class="card-body">
                <a class="title-link text-info" href="details.html?id=${product._id}"><h5 class="text-truncate flex-nowrap card-title text-info">${product.name}</h5></a>

                <p class="card-text overflow-hidden text-truncate">
                ${product.description}
                </p>

                <hr>

                <div class="pb-3">
                <a class="btn btn-success  me-2 " href="backoffice.html?id=${product._id}">Modifica</a>
                </div>
                <a class="btn btn-info text-white" href="details.html?id=${product._id}">Visualizza articolo</a>

                </div>
                </div>
            </div >`;
            });

        })

        .catch((error) => console.log({ error }));
};



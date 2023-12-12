// Filtro por marca
    
        document.addEventListener("DOMContentLoaded", function () {
            // Obtén una referencia al campo de entrada de filtro por marca
            var brandFilterInput = document.getElementById("brandFilter");
            
            // Obtén todas las tarjetas de productos
            var productCards = document.querySelectorAll(".card");
            
            // Agrega un evento de escucha para el campo de entrada
            brandFilterInput.addEventListener("input", function () {
                var enteredBrand = brandFilterInput.value.trim().toLowerCase();
                
                // Itera a través de todas las tarjetas de productos
                productCards.forEach(function (card) {
                    var brandElement = card.querySelector(".brand");
                    var brand = brandElement.textContent.toLowerCase();
                    
                    // Compara el valor ingresado en el campo de entrada con la marca de cada tarjeta
                    if (brand.includes(enteredBrand)) {
                        // Si coincide, muestra la tarjeta
                        card.style.display = "block";
                    } else {
                        // Si no coincide, oculta la tarjeta
                        card.style.display = "none";
                    }
                });
            });
        });

//------------------------------------------------------------------------------------------

// JavaScript code to filter and create cards for products with "Pendiente" status and the entered brand

document.addEventListener("DOMContentLoaded", function () {
    // ... (Your existing code)

    // Get a reference to the brand filter input element
    var brandFilterInput = document.getElementById("brandFilter");

    // Function to update the displayed cards based on the entered brand
    function updateFilteredCards() {
        // Get the entered brand from the input field
        var enteredBrand = brandFilterInput.value.toLowerCase();

        // Iterate through the data and create cards for products with "Pendiente" status and the entered brand
        for (let i = 0; i < data.table.rows.length; i++) {
            let productData = data.table.rows[i].c;

            if (productData[5].v.toLowerCase() === 'pendiente' && (enteredBrand === '' || productData[1].v.toLowerCase().includes(enteredBrand))) {
                // ... (Your existing card creation code)
            }
        }
    }

    // Listen for input changes in the brand filter input field and update the displayed cards
    brandFilterInput.addEventListener("input", updateFilteredCards);

    // Initially, update the cards based on the default input value
    updateFilteredCards();
});

//---------------------------------------------------------------------------------------------------------
// Fetch al sheet


       // JavaScript code to filter and create cards for products with "Pendiente" status
       let SHEET_ID = '12oyWR0FfX8BFTNKMMlra0p7DV6oBocQmywhmeCXK9fY';
       let SHEET_TITLE = 'aceptados';
       let SHEET_RANGE = 'A2:G35';
       let FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;
       
       fetch(FULL_URL)
           .then(res => res.text())
           .then(rep => {
               let data = JSON.parse(rep.substr(47).slice(0, -2));
               console.log(data);
       
               // Obtener el contenedor donde se agregarán las tarjetas
               let cardContainer = document.getElementById('card-container');
       
               // Limpiar el contenedor existente eliminando todas las tarjetas
               cardContainer.innerHTML = '';
       
               // Iterate through the data and create cards for products with "Pendiente" status
               for (let i = 0; i < data.table.rows.length; i++) {
                   let productData = data.table.rows[i].c;
       
                   // Check if the product status is "Pendiente"
                   if (productData[5].v.toLowerCase() === 'pendiente') {
       
                       let imageUrl;
       
                   if (productData[4] && productData[4].v && productData[4].v.toLowerCase() !== "#n/a" && productData[4].v.toLowerCase() !== "null") {
                       imageUrl = productData[4].v;
                   } else {
                       imageUrl = 'https://images.vexels.com/media/users/3/181818/isolated/preview/edefb9b4123a64d520dc7b91524bd9f9-icono-de-calzado-deportivo.png';
                   }
                       let card = document.createElement('div');
                       card.className = 'col-md-4 mb-4';
       
                       let cardTitleId = `cardTitle-${i}`;
       
                       // Create the content of the card
                       card.innerHTML = `
                           <div class="card border-dark rounded" style="width: 18rem;">
                               <img src="${imageUrl}" class="card-img-top" alt="Imagen del producto">
                       <div class="card-body text-center">
                               <div class="card-body text-center">
                                   <h5 class="card-title">
                                       ${productData[6].v}
                                   </h5>
                                   <p class="card-description">ASIN N°  ${productData[3].v}</p>
                                   <p class="card-description brand">${productData[1].v}</p>
                                   <p class="card-description status-color">Status: ${productData[5].v}</p>
                                   <a href="${productData[2].v}" target="_blank" class="btn btn-primary card-button">Go to Amazon Product</a>
                               </div>
                           </div>
                       `;
       
                       // Add the card to the container
                       cardContainer.appendChild(card);
                   }
               }
           })
           .catch(error => {
               console.error('Error al obtener los datos:', error);
           });
//------------------------------------------------------------------------------

// show iframe sel sheet
document.addEventListener("DOMContentLoaded", function () {
    var toggleButton = document.getElementById("toggleButton");
    var iframeContainer = document.getElementById("iframeContainer");

    toggleButton.addEventListener("click", function () {
        if (iframeContainer.style.display === "none" || iframeContainer.style.display === "") {
            iframeContainer.style.display = "block";
        } else {
            iframeContainer.style.display = "none";
        }
    });
});


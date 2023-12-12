
const toggleIframeButton = document.getElementById('toggle-iframe-button');
const iframeContainer = document.getElementById('iframeContainer');
let isIframeVisible = false;

toggleIframeButton.addEventListener('click', function () {
    if (isIframeVisible) {
        iframeContainer.style.display = 'none'; // Oculta el iframe
        toggleIframeButton.textContent = 'Mostrar Sheet'; // Cambia el texto del botón
    } else {
        iframeContainer.style.display = 'block'; // Muestra el iframe
        toggleIframeButton.textContent = 'Ocultar Sheet'; // Cambia el texto del botón
    }
    isIframeVisible = !isIframeVisible; // Cambia el estado
});

//-----------------------------------------------------------------------------------

  // Tu código JavaScript para cargar los datos en la tabla va aquí
  let SHEET_ID = '12oyWR0FfX8BFTNKMMlra0p7DV6oBocQmywhmeCXK9fY';
  let SHEET_TITLE = 'publicados';
  let SHEET_RANGE = 'A2:N15';
  let FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;
fetch(FULL_URL)
.then(res => res.text())
.then(rep => {
  let data = JSON.parse(rep.substr(47).slice(0, -2));

  // Obtener la tabla existente y su cuerpo
  let tablaBody = document.getElementById('tabla-body');

  // Limpiar la tabla existente eliminando todas las filas
  while (tablaBody.firstChild) {
    tablaBody.removeChild(tablaBody.firstChild);
  }

  // Iterar a través de los nuevos datos y agregar filas a la tabla
  for (let i = 0; i < data.table.rows.length; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < data.table.cols.length; j++) {
      let cell = document.createElement('td');
      let value = data.table.rows[i].c[j].v;

      if (j === 5) {
        // Si es la columna que contiene la URL de la imagen
        let img = document.createElement('img');
        img.src = value;
        img.width = 50; // Tamaño de la imagen en píxeles
        cell.appendChild(img);
      }
      else if (j === 2) {
        // Si quieres que los enlaces sean clicables
        let link = document.createElement('a');
        link.href = value;
        link.textContent = "enlace";
        cell.appendChild(link);
      } else {
        cell.textContent = value;
      }
      row.appendChild(cell);
    }
    tablaBody.appendChild(row);
  }
})
.catch(error => {
  // console.error('Error al obtener los datos:', error);
});

//----------------------------------------------------------------

function filterTableByStatus(selectedStatus) {
    const tablaBody = document.getElementById('tabla-body');
    const rows = tablaBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const statusCell = rows[i].querySelector('td:nth-child(5)'); // El 5 representa la columna "status"
        const status = statusCell.textContent.toLowerCase();

        if (selectedStatus === 'todos' || status === selectedStatus) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

// Agrega un evento de cambio al menú desplegable para aplicar el filtro
const filterSelect = document.getElementById('filter-status');
filterSelect.addEventListener('change', function () {
    const selectedStatus = filterSelect.value;
    filterTableByStatus(selectedStatus);
});

// Tu código JavaScript para cargar los datos en la tabla va aquí
let SHEET_ID = '12oyWR0FfX8BFTNKMMlra0p7DV6oBocQmywhmeCXK9fY';
let SHEET_TITLE = 'compras';
let SHEET_RANGE = 'A2:K12';
let FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;

// ... Código previo ...

fetch(FULL_URL)
  .then(res => res.text())
  .then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));
    console.log(data);

    // Obtener los datos de la hoja de cálculo
    let rows = data.table.rows;

    // Crear un nuevo array para almacenar solo las columnas deseadas
    let filteredData = [];
  

    for (let i = 1; i < rows.length; i++) {
      let rowData = rows[i].c;
      let filteredRow = [];

      // Obtener los valores de las posiciones 0, 2, 6, 7, 8 y 9 (sin la posición 1)
      filteredRow.push(rowData[0].f); // Fecha
      filteredRow.push(rowData[2].v); // Asin
      filteredRow.push(rowData[6].v); // Store
      filteredRow.push(rowData[7].v); // N° de orden
      filteredRow.push(rowData[8].v); // Costo
      filteredRow.push(rowData[9].v); // Tax sale
      

      // Agregar la fila filtrada al array
      filteredData.push(filteredRow);
    }

    // Obtener la tabla existente y su cuerpo
    let tablaBody = document.getElementById('tabla-body');

    // Limpiar la tabla existente eliminando todas las filas
    while (tablaBody.firstChild) {
      tablaBody.removeChild(tablaBody.firstChild);
    }

    // Iterar a través de los datos filtrados y agregar filas a la tabla
    for (let i = 0; i < filteredData.length; i++) {
      let row = document.createElement('tr');
      for (let j = 0; j < filteredData[i].length; j++) {
        let cell = document.createElement('td');
        cell.textContent = filteredData[i][j];
        row.appendChild(cell);
      }
      tablaBody.appendChild(row);
    }

   // Calcular las sumas de costos, tax sale y shipping
let totalCost = 0;
let totalTaxSale = 0;
let totalShipping = 0;

for (let i = 0; i < filteredData.length; i++) {
  // Verifiquemos los valores en las columnas 4, 5 y 6
  let costo = parseFloat(filteredData[i][3]);
  let taxSale = parseFloat(filteredData[i][4]);
  let shipping = parseFloat(filteredData[i][5]);

  // Verifiquemos si los valores son válidos
  if (!isNaN(costo)) {
    totalCost += costo;
  }
  if (!isNaN(taxSale)) {
    totalTaxSale += taxSale;
  }
  if (!isNaN(shipping)) {
    totalShipping += shipping;
  }
}

// Actualizar los elementos en el DOM con las sumas
document.getElementById('total-cost').textContent = `$${totalCost.toFixed(2)}`;
document.getElementById('total-tax-sale').textContent = `$${totalTaxSale.toFixed(2)}`;
document.getElementById('total-shipping').textContent = `$${totalShipping.toFixed(2)}`;
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });
/// Agrega un evento al botón "Filtrar"
const btnFiltrar = document.getElementById('btn-filtrara');
btnFiltrar.addEventListener('click', filtrarPorMes);

function filtrarPorMes() {
  // Obtiene el valor del mes seleccionado en el campo de selección
  const filtroMesSelect = document.getElementById('filtro-mes');
  const mesSeleccionado = filtroMesSelect.value;

  function filtrarPorMes() {
    // Obtiene el valor del mes seleccionado en el campo de selección
    const mesSeleccionado = filtroMesSelect.value;
  
    // Obtiene todas las filas de la tabla
    const filas = document.querySelectorAll('#tabla-body tr');
  
    // Itera sobre las filas y muestra solo las que coinciden con el mes seleccionado
    filas.forEach(fila => {
      const fecha = fila.children[0].textContent; // Suponiendo que la primera columna contiene la fecha en formato 'dd/mm/yyyy'
      const fechaParts = fecha.split('/');
      const mesDeLaFila = fechaParts[1]; // Obtiene el mes de la fecha de la fila
  
      // Compara el mes de la fila con el mes seleccionado
      if (mesDeLaFila === mesSeleccionado) {
        fila.style.display = 'table-row'; // Muestra la fila
      } else {
        fila.style.display = 'none'; // Oculta la fila si no coincide con el mes seleccionado
      }
    });
  }

  // Obtiene todas las filas de la tabla
  const filas = document.querySelectorAll('#tabla-body tr');

  // Itera sobre las filas y muestra solo las que coinciden con el mes seleccionado
  filas.forEach(fila => {
    const fecha = fila.children[0].textContent; // Suponiendo que la primera columna contiene la fecha en formato 'dd/mm/yyyy'
    const fechaParts = fecha.split('/');
    const mesDeLaFila = fechaParts[1]; // Obtiene el mes de la fecha de la fila

    // Compara el mes de la fila con el mes seleccionado
    if (mesDeLaFila === mesSeleccionado) {
      fila.style.display = 'table-row'; // Muestra la fila
    } else {
      fila.style.display = 'none'; // Oculta la fila si no coincide con el mes seleccionado
    }
  });
}


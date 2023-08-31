  // Tu código JavaScript para cargar los datos en la tabla va aquí
  let SHEET_ID = '12oyWR0FfX8BFTNKMMlra0p7DV6oBocQmywhmeCXK9fY';
  let SHEET_TITLE = 'aceptados';
  let SHEET_RANGE = 'A2:S15';
  let FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;

  fetch(FULL_URL)
.then(res => res.text())
.then(rep => {
  let data = JSON.parse(rep.substr(47).slice(0,-2));
  console.log(data)

  // Obtener la tabla existente y su cuerpo
  let tablaBody = document.getElementById('tabla-body');

  // Limpiar la tabla existente eliminando todas las filas
  while (tablaBody.firstChild) {
      tablaBody.removeChild(tablaBody.firstChild);
  }

  // Iterar a través de los nuevos datos y agregar filas a la tabla
  for (let i = 1; i < data.table.rows.length; i++) {
      let row = document.createElement('tr');
      for (let j = 0; j < data.table.cols.length; j++) {
          let cell = document.createElement('td');
          let value = data.table.rows[i].c[j].v;
          
          // Si quieres que los enlaces sean clicables, descomenta estas líneas
           if (j === 2) {
               let link = document.createElement('a');
               link.href = value;
               link.textContent = "Ver enlace";
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
  console.error('Error al obtener los datos:', error);
});

  // Tu código JavaScript para cargar los datos en la tabla va aquí
  let SHEET_ID = '12oyWR0FfX8BFTNKMMlra0p7DV6oBocQmywhmeCXK9fY';
  let SHEET_TITLE = 'compras';
  let SHEET_RANGE = 'A2:K12';
  let FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;

  // ... Código previo ...

// ... Código previo ...

fetch(FULL_URL)
.then(res => res.text())
.then(rep => {
let data = JSON.parse(rep.substr(47).slice(0, -2));
console.log(data);

// Obtener la tabla existente y su cuerpo
let tablaBody = document.getElementById('tabla-body');

// Limpiar la tabla existente eliminando todas las filas
while (tablaBody.firstChild) {
tablaBody.removeChild(tablaBody.firstChild);
}

// Obtener los datos de la hoja de cálculo
let rows = data.table.rows;

// Iterar a través de los datos y agregar filas a la tabla
for (let i = 1; i < data.table.rows.length; i++) {
  let row = document.createElement('tr');
  for (let j = 0; j < data.table.cols.length; j++) {
      let cell = document.createElement('td');
      let value = data.table.rows[i].c[j].v;
      
      if (j === 0) {
          // Utiliza replace para eliminar la palabra "Date"
          value = value.replace("Date", "");
      }
 
      // Si quieres que los enlaces sean clicables, descomenta estas líneas
       if (j === 1 || j=== 5) {
           let link = document.createElement('a');
           link.href = value;
           link.textContent = "enlace";
           cell.appendChild(link);
       }  else if (j === 7 || j === 8 || j === 9) {
          // Si es una de las columnas 7, 8 o 9, agrega el signo de dólar ($) antes del contenido
          cell.textContent = '$ us ' + value;
      } else if (j === 10) {
          // Si es la columna 10, aplica clases de texto verde o rojo según el valor
          if (value === "entregado") {
              cell.classList.add('texto-verde');
          } else {
              cell.classList.add('texto-rojo');
          }
          cell.textContent = value;
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

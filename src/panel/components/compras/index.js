document.addEventListener("DOMContentLoaded", function() {
    mostrarLoader(); // Mostrar loader al cargar la página
    setTimeout(function() {
        ocultarLoader();
        obtenerDatosCompras();
    }, 3000); // Esperar 3 segundos antes de obtener los datos
});

function mostrarLoader() {
    const loaderContainer = document.getElementById('loader-container');
    loaderContainer.style.display = 'flex'; // Mostrar el loader
}

function ocultarLoader() {
    const loaderContainer = document.getElementById('loader-container');
    loaderContainer.style.display = 'none'; // Ocultar el loader
}

function obtenerDatosCompras() {
    console.log('Iniciando la solicitud fetch');
    fetch('https://sheetdb.io/api/v1/mgtcl3kczv654')
        .then(response => {
            console.log('Respuesta recibida:', response);
            if (!response.ok) {
                throw new Error('Ocurrió un error al obtener los datos');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos obtenidos:', data);
            // Convertir todos los datos a cadenas de texto
            const datosConvertidos = data.map(compra => {
                const compraConvertida = {};
                for (const key in compra) {
                    if (compra.hasOwnProperty(key)) {
                        compraConvertida[key] = String(compra[key]);
                    }
                }
                return compraConvertida;
            });
            mostrarDatosCompras(datosConvertidos);
        })
        .catch(error => {
            console.error('Error al obtener los datos de la API:', error);
            mostrarError();
        });
}

function mostrarDatosCompras(datos) {
    const tbody = document.getElementById('tabla-body');
    tbody.innerHTML = ''; // Limpiar el contenido existente

    datos.forEach(compra => {
        console.log('Procesando compra:', compra); // Depuración adicional

        const tr = document.createElement('tr');

        // Verificación de cada campo para manejar datos faltantes o inválidos
        const storeLink = compra.store ? compra.store : '';
        const storeCell = storeLink ? `<a href="${storeLink}" target="_blank" style="a:{text-decoration: none;
        }}">🛒</a>` : 'N/A';

        const title = compra.title || 'N/A';
        const size = compra.size || 'N/A';
        const fnsku = compra.fnsku || 'N/A';
        const asin = compra.asin || 'N/A';
        const fecha = compra.fecha || 'N/A';
        const numeroOrden = String(compra.numeroOrden || 'N/A');
        const linkAmazon = compra.linkAmazon ? `<a href="${compra.linkAmazon}" target="_blank"> 🔗</a>` : 'N/A';
        const cantidad = !isNaN(parseFloat(compra.cantidad)) ? parseFloat(compra.cantidad) : 'N/A';
        const estado = compra.estado || 'N/A';
        const trackShipp = compra['# track shipp'] || 'N/A';

        console.log('Valor de total *Compra antes de convertir:', compra['total *Compra']);

        // Verificar y convertir el valor de total *Compra
        let totalCompra = 'N/A';
        if (compra['total *Compra']) {
            const totalCompraString = compra['total *Compra'].replace(/[^\d.-]/g, ''); // Eliminar cualquier caracter que no sea número, punto o guion
            console.log('totalCompraString:', totalCompraString);
            if (!isNaN(parseFloat(totalCompraString))) {
                totalCompra = parseFloat(totalCompraString);
            }
        }
        
        console.log('Valor de totalCompra después de convertir:', totalCompra);

        const totalUnidad = compra['total *unidad'] && typeof compra['total *unidad'] === 'string' && compra['total *unidad'].trim() !== '' && !isNaN(parseFloat(compra['total *unidad'].replace(/[^\d.-]/g, ''))) ? parseFloat(compra['total *unidad'].replace(/[^\d.-]/g, '')) : 'N/A';
        const taxSale = compra.taxSale && typeof compra.taxSale === 'string' && compra.taxSale.trim() !== '' && !isNaN(parseFloat(compra.taxSale.replace(/[^\d.-]/g, ''))) ? parseFloat(compra.taxSale.replace(/[^\d.-]/g, '')) : 'N/A';
        const shipping3PL = compra.shipping3PL && typeof compra.shipping3PL === 'string' && compra.shipping3PL.trim() !== '' && !isNaN(parseFloat(compra.shipping3PL.replace(/[^\d.-]/g, ''))) ? parseFloat(compra.shipping3PL.replace(/[^\d.-]/g, '')) : 'N/A';
        const shippingPlan = compra['shipping plan'] && typeof compra['shipping plan'] === 'string' && compra['shipping plan'].trim() !== '' && !isNaN(parseFloat(compra['shipping plan'].replace(/[^\d.-]/g, ''))) ? parseFloat(compra['shipping plan'].replace(/[^\d.-]/g, '')) : 'N/A';
        const embalaje = compra.embalaje && typeof compra.embalaje === 'string' && compra.embalaje.trim() !== '' && !isNaN(parseFloat(compra.embalaje.replace(/[^\d.-]/g, ''))) ? parseFloat(compra.embalaje.replace(/[^\d.-]/g, '')) : 'N/A';
        const almacenamiento = compra.almacenamiento && typeof compra.almacenamiento === 'string' && compra.almacenamiento.trim() !== '' && !isNaN(parseFloat(compra.almacenamiento.replace(/[^\d.-]/g, ''))) ? parseFloat(compra.almacenamiento.replace(/[^\d.-]/g, '')) : 'N/A';
        const costoTotalUnidad = compra['costo total final * unidad'] && typeof compra['costo total final * unidad'] === 'string' && compra['costo total final * unidad'].trim() !== '' && !isNaN(parseFloat(compra['costo total final * unidad'].replace(/[^\d.-]/g, ''))) ? parseFloat(compra['costo total final * unidad'].replace(/[^\d.-]/g, '')) : 'N/A';
        const costoTotalCompra = compra['costo total final * compra'] && typeof compra['costo total final * compra'] === 'string' && compra['costo total final * compra'].trim() !== '' && !isNaN(parseFloat(compra['costo total final * compra'].replace(/[^\d.-]/g, ''))) ? parseFloat(compra['costo total final * compra'].replace(/[^\d.-]/g, '')) : 'N/A';
        const precioVenta = compra['precio rec. de venta'] && typeof compra['precio rec. de venta'] === 'string' && compra['precio rec. de venta'].trim() !== '' && !isNaN(parseFloat(compra['precio rec. de venta'].replace(/[^\d.-]/g, ''))) ? parseFloat(compra['precio rec. de venta'].replace(/[^\d.-]/g, '')) : 'N/A';
        const estadoAmazon = compra['estado en amazon'] || 'N/A';

        tr.innerHTML = `
            <td>${storeCell}</td>
            <td>${title}</td>
            <td>${size}</td>
            <td>${fnsku}</td>
            <td>${asin}</td>
            <td>${fecha}</td>
            <td>${numeroOrden}</td>
            <td>${linkAmazon}</td>
            <td>${cantidad}</td>
            <td>${estado}</td>
            <td>${trackShipp}</td>
            <td>${totalCompra}</td>
            <td>${totalUnidad}</td>
            <td>${taxSale}</td>
            <td>${shipping3PL}</td>
            <td>${shippingPlan}</td>
            <td>${embalaje}</td>
            <td>${almacenamiento}</td>
            <td>${costoTotalUnidad}</td>
            <td>${costoTotalCompra}</td>
            <td>${precioVenta}</td>
            <td>${estadoAmazon}</td>
        `;

        tbody.appendChild(tr);
    });
}



function mostrarError() {
    const tbody = document.getElementById('tabla-body');
    tbody.innerHTML = '<tr><td colspan="23">Ocurrió un error al cargar los datos</td></tr>';
}
document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencia al select de estado
    const estadoFiltroSelect = document.getElementById('estadoFiltro');

    // Obtener referencia al select de mes
    const mesFiltroSelect = document.getElementById('mesFiltro');

    // Obtener referencia al input de ASIN
    const asinFiltroInput = document.getElementById('asinFiltro');

    // Escuchar cambios en el select de estado
    estadoFiltroSelect.addEventListener('change', function() {
        filtrarDatos();
    });

    // Escuchar cambios en el select de mes
    mesFiltroSelect.addEventListener('change', function() {
        filtrarDatos();
    });

    // Escuchar cambios en el input de ASIN
    asinFiltroInput.addEventListener('input', function() {
        filtrarDatos();
    });
});

function filtrarDatos() {
    // Obtener los valores seleccionados de los filtros
    const estadoSeleccionado = document.getElementById('estadoFiltro').value;
    const mesSeleccionado = document.getElementById('mesFiltro').value;
    const asinFiltrado = document.getElementById('asinFiltro').value.trim().toLowerCase();

    // Obtener todas las filas de la tabla
    const filas = document.querySelectorAll('#tabla-body tr');

    // Iterar sobre todas las filas y mostrar u ocultar según los filtros seleccionados
    filas.forEach(function(fila) {
        const estadoCelda = fila.querySelector('td:nth-child(10)').textContent; // Obtener el texto de la celda de estado
        const fechaCelda = fila.querySelector('td:nth-child(6)').textContent; // Obtener el texto de la celda de fecha
        const asinCelda = fila.querySelector('td:nth-child(5)').textContent.trim().toLowerCase(); // Obtener el texto de la celda de ASIN

        // Extraer el mes de la fecha en formato "DD/MM/YY"
        const mesFecha = fechaCelda.split('/')[1];

        // Verificar si la fila cumple con los filtros seleccionados
        const cumpleFiltros = (estadoSeleccionado === '' || estadoCelda === estadoSeleccionado) &&
                              (mesSeleccionado === '' || mesFecha === mesSeleccionado) &&
                              (asinFiltrado === '' || asinCelda.includes(asinFiltrado));

        // Mostrar u ocultar la fila según si cumple con los filtros
        fila.style.display = cumpleFiltros ? '' : 'none';
    });
}

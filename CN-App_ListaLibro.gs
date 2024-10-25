// OBTENER LA LISTA DE HOJAS DEL LIBRO POR URL
function obtenerListaNombreHojasPorUrl(urlGLibro){
    var libro = abrirLibroPorUrl(urlGLibro);
    listaNombreHojas = obtenerListaNombreHojasporLibro(libro);
    return listaNombreHojas;
}

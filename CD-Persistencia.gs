//FUNCION ABRIR LIBRO PARA ESTUDIAR POR ID
function abrirLibroPorId(idGLibro)
{
    try{
        return SpreadsheetApp.openById(idGLibro); // retorna objeto libro
    }
    catch(error){
        console.error(`Error al abrir el libro con id ${idGLibro}`, error);
        return null;
    }
}

//FUNCION ABRIR LIBRO PARA ESTUDIAR POR URL
function abrirLibroPorUrl(urlLibro)
{
    try{
        return SpreadsheetApp.openByUrl(urlLibro) //retorna el objeto libro
    }
    catch(error){
        console.error(`Error al abrir el libro con url ${urlLibro}`, error);
        return null;
    }
}

//FUNCION  OBTNER  LA HOJA POR EL NOMBRE
function obtenerHojaPorNombre(libro, nombreHoja){
    try{
        return libro.getSheetByName(nombreHoja); // retorna objeto hoja
    }
    catch(error){
        console.error(`Error al obtener la hoja ${nombreHoja}`, error);
        return null;
    }
}

//FUNCCION OBTENER UNA LISTA DE NOMBRES DE HOJAS POR LIBRO
function obtenerListaNombreHojasporLibro(libro){
    try{
        var listaNombreHojas = libro.getSheets().map(
            function (hoja){
                return {    nombre: hoja.getSheetName(),
                            url:    ScriptApp.getService().getUrl()+"?id="+libro.getId()+"&sheet="+hoja.getSheetName()
                        };
            }
        );
        return listaNombreHojas;
    }
    catch(error){
        console.error(`Error al obtener la lista de nombres de hojas`, error);
        return null;
    }
}

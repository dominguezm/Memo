var idGLibro;
var listaNombreHojas;
var nombreHoja;
var tablaPorEstudiar;

//FUNCION QUE INICIA, PRIMERA PAGINA A MOSTRAR
function doGet(e){
    idGLibro    = e.parameter.id;       //obtine de la url el parametro id, el id de google sheet
    nombreHoja  = e.parameter.sheet;    // obtine de la url el parametro sheet, el nombre de la hoja

    if (!idGLibro && !nombreHoja) //si el id o el nombre de la hoja son vacias
    {
        var _pagIndex = HtmlService.createTemplateFromFile('index.html');
        return _pagIndex.evaluate();
    }
    var libro = abrirLibroPorId(idGLibro);
    if (libro && !nombreHoja)
    {
        var _pagIndex = HtmlService.createTemplateFromFile('index.html');
        var _pagIndexplantilla = _pagIndex.evaluate();
        _pagIndexplantilla.append('<script>');
        _pagIndexplantilla.append("window.addEventListener('load', function(){");
        _pagIndexplantilla.append('insertarUrlGLibro("https://docs.google.com/spreadsheets/d/'+idGLibro+'/edit");');
        _pagIndexplantilla.append('});');
        _pagIndexplantilla.append('</script>');
        return _pagIndexplantilla;

    }
    if(!libro) //si al abrir el libro es nulo
    {
        return mostrarErrorPagina('Error: ACCESO AL LIBRO');
    }

    var hoja=obtenerHojaPorNombre(libro, nombreHoja);

    if(!hoja) //si al abrir la hoja es nulo
    {
        return mostrarErrorPagina('Error: ACCESO A LA HOJA');
    }
    // obtener los datos de la hoja (sin celdas vacias)
    tablaPorEstudiar = hoja.getDataRange().getDisplayValues();
    
    var _pagTabla  = HtmlService.createTemplateFromFile('tabla.html');

    var _pagTablaPlantilla = _pagTabla.evaluate();
    _pagTablaPlantilla.append('<script>');
    _pagTablaPlantilla.append("window.addEventListener('load', function(){");
    _pagTablaPlantilla.append('mostrarTablaEstudio('+JSON.stringify(tablaPorEstudiar)+');');
    _pagTablaPlantilla.append('});');
    _pagTablaPlantilla.append('</script>');
    //_pagTabla.data = tablaPorEstudiar;
    return _pagTablaPlantilla;
}

//FUNCION QUE MUESTRA LA PAGINA DE ERROR
function mostrarErrorPagina(nombreMensaje)
{
    return HtmlService.createHtmlOutputFromFile(nombreMensaje);
}

function obtenerUrlInicio(){
  return ScriptApp.getService().getUrl();
}

//FUNCION INCLUYE HTML DENTRO DE OTRO HTML
function include (filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}


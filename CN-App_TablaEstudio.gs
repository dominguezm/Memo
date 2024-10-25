function generarTareasRepasoEspaciado(_idGLibro, _nombreHoja){
    //console.log("id="+_idGLibro+" sheet="+_nombreHoja);
    // Obtiene la URL del servicio del script
  var urlWeb = ScriptApp.getService().getUrl();
  console.log(urlWeb);
  // Define el nombre o titulo de la tarea y detalles
  var nombre = "Repasar "+ _nombreHoja;
  var encoded_nombreHoja = encodeURIComponent(_nombreHoja);//codifica _nombreHoja para URL
  var adjuntar = urlWeb + "?id=" + _idGLibro + "&sheet=" + encoded_nombreHoja;
  Logger.log(adjuntar);

  // Obtiene la lista de tareas y la primera lista de tareas
  var taskLists = Tasks.Tasklists.list();
  var taskList = taskLists.items[0];
  var now = new Date();
  
  // Ajuste para obtener la fecha en la zona horaria local
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Crea fechas límite a partir de hoy (0, 1, 7, 28 días en el futuro)
  var deadlines = [0, 1, 3, 7, 14, 31, 93].map(days => {
    var date = new Date(today);
    date.setDate(date.getDate() + days);
    return date;
  });

  // Formatea las fechas límite en ISO 8601 con la zona horaria GMT-05
  var formattedDeadlines = deadlines.map(date => Utilities.formatDate(date, "GMT-05", "yyyy-MM-dd'T00:00:00.000Z'"));
  
  // Obtiene las tareas existentes en la lista de tareas
  var tasks = Tasks.Tasks.list(taskList.id);
  var existingTask = tasks.items && tasks.items.find(taskItem => 
    taskItem.notes === adjuntar && 
    formattedDeadlines.includes(taskItem.due)
  );

  // Si ya existe una tarea con las mismas notas y fecha límite, actualiza su estado a "completed"
  if (existingTask) {
    if (existingTask.status === "needsAction") {
      existingTask.status = "completed";
      Tasks.Tasks.update(existingTask, taskList.id, existingTask.id);
    }
  } else {
    // Plantilla de tarea
    var taskTemplate = {
      title: nombre,
      notes: adjuntar,
      status: "needsAction"
    };
    // Crea nuevas tareas con las fechas límite especificadas
    formattedDeadlines.forEach((due, index) => {
      var newTask = Object.assign({}, taskTemplate, {
        due: due,
        status: index === 0 ? "completed" : "needsAction"
      });
      Tasks.Tasks.insert(newTask, taskList.id);
    });
  }
}
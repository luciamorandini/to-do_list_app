var input = document.querySelector(".newtask input");
var tasks_document_list = document.querySelector('.task-list ul');
var check_button = document.querySelector(".check");
var tasks_array = [];


(function () {
    var actualizarHora = function(){
    var now = new Date();
    var hora = now.getHours();
    var minutos = now.getMinutes();
    var am_pm = '';
    var dia_semana = now.getDay();
    var dia = now.getDate();
    var mes = now.getMonth();
    var año = now.getFullYear();

    var semana = ["Domingo","Lunes", "Martes","Miercoles","Jueves","Viernes","Sabado"];

    if(hora >= 12){
        hora = hora - 12;
        am_pm = 'PM';
    }else{
        am_pm = 'AM';
    }

    if (hora == 12){
        hora == 0;
    }
    if(hora < 10) { hora = "0"+hora};
    if(minutos < 10) { minutos = "0"+minutos};
   
    var horaActual = hora + ":" + minutos + " ";
    var fechaActual = semana[dia_semana].toUpperCase() + ' ' + dia + '/' + (mes+1) + '/' + año;
    document.getElementById("number").innerHTML = horaActual;
    document.getElementById("am-pm").innerHTML = am_pm;
    document.querySelector(".date").innerHTML = fechaActual;
    }
    actualizarHora();
    var intervalo = setInterval(actualizarHora,1000); 
}())
    
setInterval(changeImage,1800000);
function changeImage(){  
    const img = [
        "'Imagenes/background-1.jpg'",
        "'Imagenes/background-2.jpg'",
        "'Imagenes/background-3.jpg'",
        "'Imagenes/background-4.jpg'",
        "'Imagenes/background-5.jpg'",
        "'Imagenes/background-6.jpg'",
        "'Imagenes/background-7.jpg'"        
    ];
    const picked = "url("+img[Math.floor(Math.random()*img.length)]+")";
    //window.alert(picked);
    document.body.style.backgroundImage = picked;
    
}

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', () => {
        tasks_array = JSON.parse(localStorage.getItem('tasks')) || [];
        createHTML();
    });
}

function addTask(){
    const task_text = input.value;
    if (task_text == ''){
        alert("Please Enter a Task...");
        return;
    }
    console.log(task_text);
    const taskObject = {
        task_text,
        id: Date.now(),
        checked: false
    };
    tasks_array.push(taskObject);

    createHTML();
    input.value = '';

    updateStorage();
}

function taskCompleted(e){
    console.log(e.parentNode.getAttribute('id'));
    tasks_array.forEach(task => {        
        if (task.id ===  parseInt(e.parentNode.getAttribute('id'))) {
        console.log("entra al if");
          task.checked = !task.checked;
        }
        });    
    createHTML()
}

function createHTML(){
    tasks_document_list.innerHTML = '';
    if (tasks_array.length > 0) {
        tasks_array.forEach(task => {
            const div = document.createElement('div');
            if(task.checked == true){
                div.innerHTML = `<li class="task completed" id="${task.id}"><input type="checkbox" onclick="taskCompleted(this)" class="check" checked><span class="task-span"><span class="task-text">${task.task_text}</span><button class="delete" onclick="deleteOne(this)"><i class="far fa-trash-alt"></i></button></span></li>`;
            }
            else{
                div.innerHTML = `<li class="task" id="${task.id}"><input type="checkbox" onclick="taskCompleted(this)" class="check"><span class="task-span"><span class="task-text">${task.task_text}</span><button class="delete" onclick="deleteOne(this)"><i class="far fa-trash-alt"></i></button></span></li>`;
            }            
        tasks_document_list.appendChild(div);
        });
    }
    updateStorage();
}
    
function updateStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks_array));
}

function deleteOne(e){
    //tasks_array = Array.from(JSON.parse(localStorage.getItem('tasks')));    
    const deleteId = parseInt((e.parentNode.parentNode).getAttribute('id'));
    tasks_array.forEach(task => {
      if (task.id === deleteId) {
        // borrar task seleccionada
        tasks_array.splice(tasks_array.indexOf(task), 1);
      }
    });
    createHTML(); //escribimos en el documento
}


function deleteCompleted(){
    tasks_array = tasks_array.filter((task) => task.checked !== true);  

    createHTML();
    ventanaTerminar.close();
}

function deleteAll(){
    tasks_array = [];
    createHTML();
    ventanaTerminar.close();
}

var abrirVentana = document.querySelector("#abrir-ventana");
var cerrarVentana = document.querySelector("#cerrar-ventana");
var ventanaTerminar = document.querySelector("#ventana-terminar");
var message = document.querySelector('.contenido-ventana');

abrirVentana.addEventListener("click", function(){
    ventanaTerminar.showModal();
})

cerrarVentana.addEventListener("click", function(){
    ventanaTerminar.close();
})















    


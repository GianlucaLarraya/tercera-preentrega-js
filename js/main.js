/* OBJETOS */

    class Alumno {

    constructor(nombre, apellido, edad, cinturon) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.cinturon = cinturon;
    }

    }
/* FUNCIONES */

    function renderizarBotonPrincipal(){
        let contenedorAgregar = document.getElementById("contenedor-agregar")
        const button = document.createElement("button");
        button.className = "botonAgregar";
        button.innerText = "AGREGAR ALUMNO";

        button.addEventListener("click", renderizarFormInscripcion);
        button.addEventListener("click", function() {
            document.querySelector(".popup").style.display = "flex";
        })

        contenedorAgregar.append(button);
    }

    function renderizarFormInscripcion(){

        contenedorForm.innerHTML = `<button id="closer" class="close">X</button> <div id="error" class="errores"></div>`;

        const inputNombre = document.createElement("input");
        inputNombre.placeholder = "Nombre";
        const inputApellido = document.createElement("input");
        inputApellido.placeholder = "Apellido";
        const inputEdad = document.createElement("input");
        inputEdad.placeholder = "Edad";
        const inputCinturon = document.createElement("input");
        inputCinturon.placeholder = "Color de cinturon";

        const button = document.createElement("button");
        const buttonClose = document.getElementById("closer");

        button.innerText = "Confirmar";

        button.addEventListener("click", function (){
            agregarAlumno(inputNombre.value, inputApellido.value, inputEdad.value, inputCinturon.value)
        } );

        buttonClose.addEventListener("click", function() {
            document.querySelector(".popup").style.display = "none";
        })
        contenedorForm.append(inputNombre, inputApellido, inputEdad, inputCinturon, button);


        

    }

    function agregarAlumno(nombre, apellido, edad, cinturon){

        let alumno = new Alumno(nombre, apellido, edad, cinturon);
        let messages = [];

        console.log(alumno)

        if (alumno.nombre.trim() === "") {
            messages.push("Ingrese un nombre valido!")
        }
        
        if (alumno.apellido.trim() === "") {
            messages.push("Ingrese un apellido valido!")
        }

        if (alumno.edad < 13) {
            messages.push("No admitimos alumnos de esas edad. Lo lamentamos.")
        }

       let cinturon_min = ""
       cinturon_min = (alumno.cinturon).toLowerCase();

        if ( (cinturon_min.trim() === "") || ( !["blanco", "azul", "violeta", "marron", "negro"].includes(cinturon_min)) ) {
            messages.push("Ingrese un color valido");
        }

        if ( messages.length > 0 ) {
            const divError = document.getElementById("error");
            console.log(divError)
            divError.innerText = messages.join(` 
            `)
        }

        if ( messages.length == 0 ) {
            alumnos.push(alumno)

            Toastify({
                text: `${alumno.nombre} fue añadido/a correctamente!`,
                duration: 6000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
        }

        guardarAlumnosLS();
        renderizarAlumnos(alumnos)
        inputNombreAlumno.value = "";

    }

    function obtenerAlumnosLS() {
        const alumnosLS = JSON.parse(localStorage.getItem("alumnos"));
    
        if(alumnosLS) {
            alumnos = alumnosLS;
        }

    
        renderizarAlumnos(alumnos);
    }

    function guardarAlumnosLS() {
        const json = JSON.stringify(alumnos);
        localStorage.setItem("alumnos", json);
    }
    
    function renderizarAlumnos(alumnos){

        contenedor.innerHTML = " ";

        for(const alumno of alumnos) {
            const div = document.createElement("div");
            const button = document.createElement("button");
            button.className = "boton-borrar";
            div.className = "alumno";
            div.innerHTML = `
            <img src="usuario_anon.jpeg" class="foto_usuario" />
            <h3>${alumno.nombre} ${alumno.apellido}</h3>
            <h5>Edad: ${alumno.edad}</h5>
            <h5>Cinturon: ${alumno.cinturon}</h5>`;
            button.innerText = "Borrar";
            button.addEventListener("click", () => {
                borrarAlumno(alumno);
            });
            div.append(button);
            contenedor.append(div);
        }

    }

    function borrarAlumno(alumno) {

        const indiceAlumno = alumnos.findIndex( (a) => {
            return a.nombre === alumno.nombre;
        });

        Toastify({
            text: `${alumno.nombre} fue borrado/a correctamente!`,
            duration: 6000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "red",
            },
            onClick: function(){} // Callback after click
          }).showToast();
    
        alumnos.splice(indiceAlumno, 1);
    
        renderizarAlumnos(alumnos);
        guardarAlumnosLS();
        inputNombreAlumno.value = "";
    }

    function filtrarAlumnos(){
    
    const nombreAlumno = inputNombreAlumno.value;

    const alumnosFiltrados = alumnos.filter( alumno => {
        return alumno.nombre.toLowerCase().includes(nombreAlumno.toLowerCase());
    })

    renderizarAlumnos(alumnosFiltrados);
    
    } 

    function obtenerProfesores() {
        
        fetch("../profesores.json")
        .then( (response) => {
            return response.json();
         })

        .then( (responseJSON) => {

            profesores = responseJSON;

            renderizarProfesores(profesores);
        });
 }

    function renderizarProfesores(profesores){

        contenedorProfesores.innerHTML = " ";

        for(const profesor of profesores) {
            const div = document.createElement("div");
            div.className = "profesor";
            div.innerHTML = `
            <img src="usuario_anon.jpeg" class="foto_usuario" />
            <h3>${profesor.nombre}</h3>
            <h5>Edad: ${profesor.edad}</h5>
            <h5>Cinturon: ${profesor.cinturon}</h5>`;
            contenedorProfesores.append(div);
        }

    }

/* Inicio del programa */

let alumnos = []
let profesores = []
const contenedor = document.getElementById("contenedor");
const contenedorProfesores = document.getElementById("contenedor-profes")
const contenedorForm = document.getElementById("form-elements")
const inputNombreAlumno = document.getElementById("nombreAlumno");
inputNombreAlumno.addEventListener("input", filtrarAlumnos);
renderizarBotonPrincipal();
obtenerAlumnosLS();
obtenerProfesores();




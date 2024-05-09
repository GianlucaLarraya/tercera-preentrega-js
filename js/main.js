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

        button.addEventListener("click", agregarAlumno);

        contenedorAgregar.append(button);
    }

    function agregarAlumno(){

        let alumno = new Alumno()
    
        do {
              alumno.nombre = prompt("Ingrese el nombre: ")
            if (alumno.nombre.trim() === "" ) {
                alert("Ingrese un nombre valido!")
            }
        } while (alumno.nombre.trim() === "");
    
        do {
            alumno.apellido = prompt("Ingrese el apellido: ")
           if (alumno.apellido.trim() === "" ) {
               alert("Ingrese un apellido valido!")
           }
       } while (alumno.apellido.trim() === "")

        do {
            alumno.edad = parseInt(prompt("Ingrese la edad"))
           if ( alumno.edad < 13) {
            alert("No admitimos alumnos de esas edad. Lo lamentamos ")
           }
       } while ( alumno.edad < 13 )

       let cinturon_min = ""

       do {

        alumno.cinturon = prompt("Ingrese el color del cinturon: ")
        cinturon_min = (alumno.cinturon).toLowerCase()

        if ((cinturon_min.trim() === "") || ( !["blanco", "azul", "violeta", "marron", "negro"].includes(cinturon_min)) ) {
            alert("Ingrese un color valido!")
        }
        } while ( (cinturon_min.trim() === "") || ( !["blanco", "azul", "violeta", "marron", "negro"].includes(cinturon_min) ) ) ;

        alumnos.push(alumno)

        guardarAlumnosLS();
        renderizarAlumnos(alumnos)
        inputNombreAlumno.value = "";

    }

    function obtenerAlumnosLS() {
        const alumnosLS = JSON.parse(localStorage.getItem("alumnos"));
    
        if(alumnosLS) {
            alumnos = alumnosLS;
        }

        console.log(alumnos)
    
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

/* Inicio del programa */

let alumnos = []
const contenedor = document.getElementById("contenedor");
const inputNombreAlumno = document.getElementById("nombreAlumno");
inputNombreAlumno.addEventListener("input", filtrarAlumnos);
renderizarBotonPrincipal();
obtenerAlumnosLS();




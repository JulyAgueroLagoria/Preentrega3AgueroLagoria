// Array de objetos con las opciones del juego
const opciones = [
    { id: 0, nombre: "Fuego", debilidades: [1] },
    { id: 1, nombre: "Agua", debilidades: [2] },
    { id: 2, nombre: "Planta", debilidades: [0] },
  ];
  
  // Función que devuelve la opción del juego correspondiente a un ID
  function obtenerOpcionPorId(id) {
    return opciones.find((opcion) => opcion.id === id);
  }
  
  // Función que determina el ganador de la partida
  function determinarGanador(opcionUsuario, opcionMaquina) {
    if (opcionUsuario.id === opcionMaquina.id) {
      return "Empate";
    } else if (opcionUsuario.debilidades.includes(opcionMaquina.id)) {
      return "Ganó la máquina";
    } else {
      return "Ganaste tú";
    }
  }
  
  // Array para almacenar los resultados de las partidas
  let resultados = JSON.parse(localStorage.getItem("resultados")) || [];
  
  const formulario = document.querySelector("form");
  const resultadosContainer = document.querySelector("#resultados");
  
  // Función que permite al usuario jugar una partida
  function jugar(e) {
    e.preventDefault();
  
    const opcionUsuarioId = parseInt(formulario.opcion.value);
    const opcionUsuario = obtenerOpcionPorId(opcionUsuarioId);
    const opcionMaquina = obtenerOpcionPorId(Math.floor(Math.random() * 3));
  
    const resultado = determinarGanador(opcionUsuario, opcionMaquina);
  
    resultados.push({
      usuario: opcionUsuario,
      maquina: opcionMaquina,
      resultado: resultado,
    });
  
    localStorage.setItem("resultados", JSON.stringify(resultados));
  
    mostrarResultados();
  }
  
  // Función que muestra los resultados en la página
  function mostrarResultados() {
    resultadosContainer.innerHTML = "";
  
    for (let i = 0; i < resultados.length; i++) {
      const resultado = resultados[i];
  
      const usuario = resultado.usuario.nombre;
      const maquina = resultado.maquina.nombre;
      const resultadoFinal = resultado.resultado;
  
      const resultadoElement = document.createElement("p");
      resultadoElement.textContent = `Usuario: ${usuario} - Máquina: ${maquina} - Resultado: ${resultadoFinal}`;
      resultadosContainer.appendChild(resultadoElement);
    }
  }

   // Mostrar los resultados al cargar la página
  mostrarResultados();
  
  // Agregar evento submit al formulario
  formulario.addEventListener("submit", jugar);

  // Función que limpia los resultados almacenados y el contenido de la sección de resultados en pantalla
function limpiarResultados() {
    resultados.length = 0;
    document.querySelector('#resultados').innerHTML = '';
  }
  
  // Evento de click del botón "Limpiar resultados"
  document.querySelector('#limpiar-resultados').addEventListener('click', limpiarResultados);
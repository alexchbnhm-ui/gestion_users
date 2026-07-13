let datosUsuarios = [];

document.addEventListener('DOMContentLoaded', mostrar_datos);

function guardar_usuario() {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const telefono = document.getElementById('telefono').value;
  const correo = document.getElementById('correo').value;
  const contraseña = document.getElementById('contraseña').value;
  console.log(nombre, apellido, telefono, correo, contraseña)
  if (!nombre || !apellido || !telefono || !correo || !contraseña) {
    alert('Por favor completa todos los campos.');
    return;
  }
  console.log(nombre, apellido, telefono, correo, contraseña + "2")

  const url = `backend/index.php?action=agregar_usuario&nombre=${nombre}&apellido=${apellido}&telefono=${telefono}&correo=${correo}&contraseña=${contraseña}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data === true || data === 1) {
        limpiarFormulario();
        mostrar_datos();
      } else {
        alert('No se pudo guardar el usuario. Verifica la información.');
      }
    })
    .catch(() => alert('Error al conectar con el servidor.'));
}

function mostrar_datos() {
  const url = 'backend/index.php?action=usuarios';
  const resultDiv = document.getElementById('resultado');
  let html = '';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      datosUsuarios = data;

      if (!Array.isArray(datosUsuarios) || datosUsuarios.length === 0) {
        resultDiv.innerHTML = '<div class="col-12"><div class="alert alert-info">No hay usuarios registrados.</div></div>';
        return;
      }

      datosUsuarios.forEach(usuario => {
        html += `
          <div class="col">
            <div class="card h-100 shadow-sm">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${usuario.nombre} ${usuario.apellido}</h5>
                <p class="card-text mb-1"><strong>Teléfono:</strong> ${usuario.telefono}</p>
                <p class="card-text mb-1"><strong>Correo:</strong> ${usuario.correo}</p>
                <p class="card-text mb-3"><strong>Contraseña:</strong> ${usuario.contrasena}</p>
                <button type="button" class="btn btn-danger mt-auto" onclick="eliminar_usuario(${usuario.id})">Eliminar</button>
              </div>
            </div>
          </div>`;
      });

      resultDiv.innerHTML = html;
    })
    .catch(() => {
      resultDiv.innerHTML = '<div class="col-12"><div class="alert alert-danger">Error al cargar los usuarios.</div></div>';
    });
}

function eliminar_usuario(id) {
  if (!confirm('¿Deseas eliminar este usuario?')) {
    return;
  }

  const url = `backend/index.php?action=eliminar_usuario&id=${encodeURIComponent(id)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data === true || data === 1) {
        mostrar_datos();
      } else {
        alert('No se pudo eliminar el usuario.');
      }
    })
    .catch(() => alert('Error al conectar con el servidor.'));
}

function limpiarFormulario() {
  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('correo').value = '';
  document.getElementById('contraseña').value = '';
}
function mostrarFormularioModificar(id) {

  // Obtiene los datos del usuario desde el backend

  const url = 'backend/index.php?action=usuario&id=' + id;



  fetch(url)

    .then(response => response.json())

    .then(usuario => {

      // Llena el formulario con los datos del usuario

      document.getElementById("usuarioId").value = id;

      document.getElementById("nombre").value = usuario.nombre;

      document.getElementById("email").value = usuario.email;



      // Cambia el texto del botón y su comportamiento

      document.getElementById("btnEnviar").textContent = "Modificar";

      document.getElementById("btnEnviar").onclick = function () {

        modificarUsuario(id,

          document.getElementById("nombre").value,

          document.getElementById("email").value);

      };



      // Muestra el botón de cancelar

      document.getElementById("btnCancelar").style.display = "inline-block";



      // Desplaza la página al formulario

      document.getElementById("frmUsuario").scrollIntoView({ behavior: 'smooth' });

    })

    .catch(error => console.error('Error al cargar usuario:', error));

}
function modificarUsuario(id, nombre, email) {

  const url = `backend/index.php?action=modificar_usuario&id=${id}&nombre=${encodeURIComponent(nombre)}&email=${encodeURIComponent(email)}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data === true || data === 1) {
        mostrar_datos();
      } else {
        alert('No se pudo modificar el usuario.');
      }
    })
    .catch(() => alert('Error al conectar con el servidor.'));
}
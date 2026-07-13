<?php
// Importa el DAO
require_once __DIR__ . '/dao/UsuarioDAO.php';
// Indica que la respuesta será JSON
header('Content-Type: application/json');
// Obtiene el parámetro action de la URL
$action = $_GET['action'] ?? '';
// Estructura de control principal
switch ($action) {

  case 'usuarios':
      // Devuelve todos los usuarios
      echo json_encode(getUsuarios());
      break;

  case 'usuario':
      // Verifica si viene el ID
      if (isset($_GET['id'])) {

          echo json_encode(getUsuario($_GET['id']));

      } else {
          echo json_encode(["error" => "Falta id"]);
      }
      break;
   case 'agregar_usuario':

      $nombre = $_GET['nombre'] ?? '';

      $apellido = $_GET['apellido'] ?? '';

      $telefono = $_GET['telefono'] ?? '';

      $correo = $_GET['correo'] ?? '';

      $contraseña = $_GET['contraseña'] ?? '';
      
      if ($nombre && $apellido && $telefono && $correo && $contraseña) {

          $ok = agregarUsuario($nombre, $apellido, $telefono, $correo, $contraseña);

          echo json_encode($ok);

      } else {

          echo json_encode(false);

      }

      break;

   case 'eliminar_usuario':
      if (isset($_GET['id'])) {
          $ok = eliminarUsuario($_GET['id']);
          echo json_encode($ok);
      } else {
          echo json_encode(false);
      }
      break;

      case 'modificar_usuario':
      $id = $_GET['id'] ?? '';
      $nombre = $_GET['nombre'] ?? '';
      $apellido = $_GET['apellido'] ?? '';
      $telefono = $_GET['telefono'] ?? '';
      $correo = $_GET['correo'] ?? '';
      $contraseña = $_GET['contraseña'] ?? '';

      if ($id && $nombre && $apellido && $telefono && $correo && $contraseña) {
          $ok = modificarUsuario($id, $nombre, $apellido, $telefono, $correo, $contraseña);
          echo json_encode($ok);
      } else {
          echo json_encode(false);
      }
      break;

  default:
      echo json_encode(["error" => "Ruta no válida"]);
}
?>
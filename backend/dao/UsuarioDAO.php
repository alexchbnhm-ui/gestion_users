<?php

// Importa la conexión a la base de datos
require_once __DIR__ . '/../config/database.php';

// Obtener todos los usuarios
function getUsuarios() {

  // Se conecta a la base
  $conn = conectar();

  // Ejecuta la consulta
  $res = $conn->query("SELECT * FROM usuarios");

  // Devuelve los datos en formato array
  return $res->fetch_all(MYSQLI_ASSOC);
}

// Obtener un usuario por ID
function getUsuario($id) {

  $conn = conectar();

  // Consulta preparada (más segura)
  $stmt = $conn->prepare("SELECT * FROM usuarios WHERE id = ?");

  // Vincula el parámetro
  $stmt->bind_param("i", $id);

  // Ejecuta la consulta
  $stmt->execute();

  // Devuelve un solo registro
  return $stmt->get_result()->fetch_assoc();
}
function agregarUsuario($nombre, $apellido, $telefono, $correo, $contraseña) {
  $conn = conectar();

  $stmt = $conn->prepare("INSERT INTO usuarios(nombre, apellido, telefono, correo, contrasena) VALUES(?, ?, ?, ?, ?)");

  $stmt->bind_param("sssss", $nombre, $apellido, $telefono, $correo, $contraseña);

  return $stmt->execute();
}

function eliminarUsuario($id) {
  $conn = conectar();
  $stmt = $conn->prepare("DELETE FROM usuarios WHERE id = ?");
  $stmt->bind_param("i", $id);
  return $stmt->execute();
}

function modificarUsuario($id, $nombre, $apellido, $telefono, $correo, $contraseña) {
  $conn = conectar();
  $stmt = $conn->prepare("UPDATE usuarios SET nombre = ?, apellido = ?, telefono = ?, correo = ?, contrasena = ? WHERE id = ?");
  $stmt->bind_param("sssssi", $nombre, $apellido, $telefono, $correo, $contraseña, $id);
  return $stmt->execute();
}
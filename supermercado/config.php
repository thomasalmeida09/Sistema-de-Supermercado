<?php
$host = "localhost"; 
$user = "root";       
$pass = "";         
$db   = "supermercado";

$conn = new mysqli($host, $user, $pass, $db);

// Verifica conexão
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}
?>

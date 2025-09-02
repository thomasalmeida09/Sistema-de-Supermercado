<?php
include "config.php";

$acao = $_GET['acao'] ?? '';

if ($acao === 'listar') {
    $sql = "SELECT * FROM produtos";
    $result = $conn->query($sql);
    $produtos = [];
    while ($row = $result->fetch_assoc()) {
        $produtos[] = $row;
    }
    echo json_encode($produtos);
}

if ($acao === 'adicionar') {
    $nome = $_POST['nome'];
    $preco = $_POST['preco'];
    $sql = "INSERT INTO produtos (nome, preco) VALUES ('$nome', '$preco')";
    if ($conn->query($sql)) {
        echo "Produto adicionado com sucesso!";
    } else {
        echo "Erro: " . $conn->error;
    }
}

if ($acao === 'excluir') {
    $id = $_POST['id'];
    $sql = "DELETE FROM produtos WHERE id = $id";
    if ($conn->query($sql)) {
        echo "Produto excluído!";
    } else {
        echo "Erro: " . $conn->error;
    }
}
?>
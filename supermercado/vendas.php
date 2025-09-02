<?php
include "config.php";

$acao = $_GET['acao'] ?? '';

if ($acao === 'listar') {
    $sql = "SELECT v.id, p.nome AS produto, v.quantidade, v.preco_total, v.data_venda 
            FROM vendas v 
            JOIN produtos p ON v.produto_id = p.id
            ORDER BY v.data_venda DESC";
    $result = $conn->query($sql);
    $vendas = [];
    while ($row = $result->fetch_assoc()) {
        $vendas[] = $row;
    }
    echo json_encode($vendas);
}

if ($acao === 'registrar') {
    $produto_id = $_POST['produto_id'];
    $quantidade = $_POST['quantidade'];

    // pega o preço do produto
    $sql = "SELECT preco FROM produtos WHERE id = $produto_id";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $preco_unitario = $row['preco'];

    $preco_total = $preco_unitario * $quantidade;

    $sql = "INSERT INTO vendas (produto_id, quantidade, preco_total) 
            VALUES ('$produto_id', '$quantidade', '$preco_total')";
    if ($conn->query($sql)) {
        echo "Venda registrada!";
    } else {
        echo "Erro: " . $conn->error;
    }
}
?>

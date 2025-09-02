// ========== PRODUTOS ==========

async function carregarProdutos() {
  const resp = await fetch("produtos.php?acao=listar");
  const data = await resp.json();
  produtos = data;
  renderizarProdutos();
}

function renderizarProdutos() {
  const tabela = document.querySelector("#tabelaProdutos tbody");
  tabela.innerHTML = "";

  produtos.forEach((produto) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${produto.nome}</td>
      <td>R$ ${parseFloat(produto.preco).toFixed(2)}</td>
      <td>
        <button class="excluir" onclick="excluirProduto(${produto.id})">Excluir</button>
      </td>
    `;

    tabela.appendChild(linha);
  });

  atualizarSelectProdutos();
}

function atualizarSelectProdutos() {
  const select = document.getElementById("produtoVenda");
  select.innerHTML = "";
  produtos.forEach((produto) => {
    const option = document.createElement("option");
    option.value = produto.id;
    option.textContent = `${produto.nome} - R$ ${parseFloat(produto.preco).toFixed(2)}`;
    select.appendChild(option);
  });
}

document.getElementById("formProduto").addEventListener("submit", async function (e) {
  e.preventDefault();
  const nome = document.getElementById("nomeProduto").value;
  const preco = document.getElementById("precoProduto").value;

  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("preco", preco);

  await fetch("produtos.php?acao=adicionar", {
    method: "POST",
    body: formData
  });

  e.target.reset();
  carregarProdutos();
});

async function excluirProduto(id) {
  if (confirm("Deseja excluir este produto?")) {
    const formData = new FormData();
    formData.append("id", id);

    await fetch("produtos.php?acao=excluir", {
      method: "POST",
      body: formData
    });

    carregarProdutos();
  }
}

// ========== VENDAS ==========

async function carregarVendas() {
  const resp = await fetch("vendas.php?acao=listar");
  const data = await resp.json();
  vendas = data;
  renderizarVendas();
}

function renderizarVendas() {
  const tabela = document.querySelector("#tabelaVendas tbody");
  tabela.innerHTML = "";

  vendas.forEach((venda) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${venda.produto}</td>
      <td>${venda.quantidade}</td>
      <td>R$ ${parseFloat(venda.preco_total).toFixed(2)}</td>
      <td>${new Date(venda.data_venda).toLocaleString()}</td>
    `;

    tabela.appendChild(linha);
  });
}

document.getElementById("formVenda").addEventListener("submit", async function (e) {
  e.preventDefault();
  const produto_id = document.getElementById("produtoVenda").value;
  const quantidade = document.getElementById("quantidadeVenda").value;

  const formData = new FormData();
  formData.append("produto_id", produto_id);
  formData.append("quantidade", quantidade);

  await fetch("vendas.php?acao=registrar", {
    method: "POST",
    body: formData
  });

  e.target.reset();
  carregarVendas();
});

// ========== INICIALIZAÇÃO ==========
let produtos = [];
let vendas = [];

carregarProdutos();
carregarVendas();

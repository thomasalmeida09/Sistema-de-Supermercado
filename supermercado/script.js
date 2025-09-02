const listaProdutos = document.getElementById("listaProdutos");
const listaCarrinho = document.getElementById("listaCarrinho");
const totalSpan = document.getElementById("total");

let produtos = [];
let carrinho = [];

document.getElementById("btnCadastrar").addEventListener("click", () => {
  const nome = document.getElementById("nomeProduto").value;
  const preco = parseFloat(document.getElementById("precoProduto").value);
  const estoque = parseInt(document.getElementById("estoqueProduto").value);

  if (nome && preco > 0 && estoque > 0) {
    produtos.push({ nome, preco, estoque });
    atualizarProdutos();
    document.getElementById("nomeProduto").value = "";
    document.getElementById("precoProduto").value = "";
    document.getElementById("estoqueProduto").value = "";
  } else {
    alert("Preencha todos os campos corretamente!");
  }
});

function atualizarProdutos() {
  listaProdutos.innerHTML = "";
  produtos.forEach((p, index) => {
    const li = document.createElement("li");
    li.textContent = `${p.nome} - R$${p.preco.toFixed(2)} (Estoque: ${p.estoque})`;

    const btn = document.createElement("button");
    btn.textContent = "Adicionar";
    btn.onclick = () => adicionarCarrinho(index);

    li.appendChild(btn);
    listaProdutos.appendChild(li);
  });
}

function adicionarCarrinho(index) {
  if (produtos[index].estoque > 0) {
    produtos[index].estoque--;
    carrinho.push(produtos[index]);
    atualizarProdutos();
    atualizarCarrinho();
  } else {
    alert("Produto sem estoque!");
  }
}

function atualizarCarrinho() {
  listaCarrinho.innerHTML = "";
  let total = 0;
  carrinho.forEach((c, i) => {
    const li = document.createElement("li");
    li.textContent = `${c.nome} - R$${c.preco.toFixed(2)}`;

    const btn = document.createElement("button");
    btn.textContent = "Remover";
    btn.onclick = () => {
      carrinho.splice(i, 1);
      c.estoque++;
      atualizarProdutos();
      atualizarCarrinho();
    };

    li.appendChild(btn);
    listaCarrinho.appendChild(li);
    total += c.preco;
  });
  totalSpan.textContent = total.toFixed(2);
}

// Modal pagamento
const modalPagamento = document.getElementById("modalPagamento");
document.getElementById("btnFinalizar").onclick = () => {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }
  modalPagamento.style.display = "flex";
};

document.getElementById("btnFechar").onclick = () => {
  modalPagamento.style.display = "none";
};

// Mostrar métodos
document.getElementById("metodoPagamento").addEventListener("change", (e) => {
  document.querySelectorAll(".pagamento-opcao").forEach(div => div.style.display = "none");
  if (e.target.value === "pix") {
    document.getElementById("pagPix").style.display = "block";
  } else if (e.target.value === "debito" || e.target.value === "credito") {
    document.getElementById("pagCartao").style.display = "block";
  }
});

// Confirmar pagamento
const modalNota = document.getElementById("modalNota");
document.getElementById("btnPagar").onclick = () => {
  const metodo = document.getElementById("metodoPagamento").value;
  if (!metodo) {
    alert("Selecione um método de pagamento!");
    return;
  }

  modalPagamento.style.display = "none";
  gerarNota(metodo);
};

function gerarNota(metodo) {
  const notaDiv = document.getElementById("notaConteudo");
  notaDiv.innerHTML = "<ul>" + carrinho.map(c => `<li>${c.nome} - R$${c.preco.toFixed(2)}</li>`).join("") + "</ul>";
  notaDiv.innerHTML += `<p><strong>Total:</strong> R$${totalSpan.textContent}</p>`;
  notaDiv.innerHTML += `<p><strong>Pagamento:</strong> ${metodo.toUpperCase()}</p>`;

  modalNota.style.display = "flex";
  carrinho = [];
  atualizarCarrinho();
}

document.getElementById("btnFecharNota").onclick = () => {
  modalNota.style.display = "none";
};

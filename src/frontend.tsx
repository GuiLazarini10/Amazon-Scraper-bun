// src/frontend.tsx

// Função que será executada ao clicar no botão
async function buscar() {
  const keywordInput = document.getElementById("keyword") as HTMLInputElement;
  const resultsDiv = document.getElementById("results")!;
  const keyword = keywordInput.value;

  if (!keyword) {
    resultsDiv.innerHTML = "<p>Digite uma palavra-chave.</p>";
    return;
  }

  resultsDiv.innerHTML = "<p>🔍 Buscando...</p>";

  try {
    const res = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    const data = await res.json();

    // 👇 log da resposta para depuração
    console.log("🔎 Dados recebidos:", data);

    if (!Array.isArray(data) || data.length === 0) {
      resultsDiv.innerHTML = "<p>Nenhum produto encontrado.</p>";
      return;
    }

    // Renderiza os produtos na tela
    resultsDiv.innerHTML = data
      .map(
        (product) => `
        <div class="product">
          <img src="${product.imageUrl}" alt="Imagem do produto" />
          <div>
            <h3>${product.title}</h3>
            <p>⭐ ${product.rating} | ${product.reviews} avaliações</p>
          </div>
        </div>
      `
      )
      .join("");
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    resultsDiv.innerHTML = "<p>Erro ao buscar produtos.</p>";
  }
}

// Conecta a função ao botão assim que o DOM for carregado
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("searchBtn");
  btn?.addEventListener("click", buscar);
});

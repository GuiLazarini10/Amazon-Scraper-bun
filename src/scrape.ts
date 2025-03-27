import axios from "axios";
import { JSDOM } from "jsdom";

export async function scrapeAmazon(keyword: string) {
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
  console.log("🔍 Buscando dados de:", url);

  try {
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "DNT": "1",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
    });

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const results: any[] = [];
    const items = document.querySelectorAll('[data-component-type="s-search-result"]');
    console.log(`🧩 Produtos encontrados na página: ${items.length}`);

    items.forEach((item, index) => {
      // Tenta múltiplas opções para capturar o título do produto
      const titleElement =
        item.querySelector("h2 a span") || // padrão mais comum
        item.querySelector("span.a-text-normal") || // alternativa comum
        item.querySelector("h2 span"); // fallback

      // Outros campos seguem igual
      const ratingElement = item.querySelector(".a-icon-alt");
      const reviewsElement = item.querySelector(".a-size-base.s-underline-text");
      const imageElement = item.querySelector("img.s-image");

      // Extrai os valores, mesmo que alguns possam estar ausentes
      const title = titleElement?.textContent?.trim();
      const rating = ratingElement?.textContent?.split(" ")[0];
      const reviews = reviewsElement?.textContent?.trim();
      const imageUrl = imageElement?.getAttribute("src");

      // Logs para debug individual (opcional)
      console.log(`🔸 Produto ${index + 1}`);
      console.log("   - Título:", title);
      console.log("   - Estrelas:", rating);
      console.log("   - Avaliações:", reviews);
      console.log("   - Imagem:", imageUrl);

      // Adiciona ao array mesmo que algum campo esteja faltando
      results.push({
        title: title || "Título não disponível",
        rating: rating || "N/A",
        reviews: reviews || "0",
        imageUrl: imageUrl || "",
      });
    });

    return results;
  } catch (error) {
    console.error("❌ Erro no scraping:", error);
    throw error;
  }
}

// Importa o servidor nativo do Bun
import { serve } from "bun";

// Importa o HTML que será servido nas rotas genéricas ("/")
import index from "./index.html";

// Importa a função que faz o scraping da Amazon
import { scrapeAmazon } from "./scrape";

// Cria o servidor Bun com rotas definidas
const server = serve({
  routes: {
    // Serve o arquivo HTML para qualquer rota que não seja API
    "/*": index,

    // Rota de exemplo: GET e PUT em /api/hello
    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    // Rota de exemplo com parâmetro dinâmico (/api/hello/:name)
    "/api/hello/:name": async (req) => {
      const name = req.params.name; // pega o nome da URL
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    // 🔥 Nosso endpoint de scraping: /api/scrape?keyword=algumaCoisa
    "/api/scrape": async (req) => {
      // Pega a URL completa da requisição
      const url = new URL(req.url);

      // Extrai o parâmetro "keyword" da query string (?keyword=mouse)
      const keyword = url.searchParams.get("keyword");

      // Se não tiver "keyword", retorna erro 400
      if (!keyword) {
        return new Response(
          JSON.stringify({ error: "Parâmetro 'keyword' é obrigatório" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      try {
        // Chama a função de scraping passando a palavra-chave
        const data = await scrapeAmazon(keyword);

        // Retorna os dados extraídos em formato JSON
        return Response.json(data);
      } catch (error) {
        console.error(error); // Loga o erro no terminal

        // Retorna erro 500 em caso de falha no scraping
        return new Response(
          JSON.stringify({ error: "Erro ao buscar dados da Amazon." }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    },
  },

  // Define se está em modo de desenvolvimento (útil para debug)
  development: process.env.NODE_ENV !== "production",
});

// Exibe a URL do servidor no console quando ele inicia
console.log(`🚀 Server running at ${server.url}`);

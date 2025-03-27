Este projeto é uma aplicação Full Stack que realiza scraping da Amazon para listar produtos com base em uma palavra-chave, exibindo os dados diretamente no navegador de forma simples e amigável.

---

## 🚀 Tecnologias Utilizadas

- ⚙️ **Bun** (runtime para backend)
- 🌐 **Express** (API HTTP)
- 🔍 **Axios** (requisições HTTP)
- 🧠 **JSDOM** (interpretação de HTML)
- 🧾 **HTML + CSS + JavaScript** (frontend leve, sem frameworks)
- 🎯 **TypeScript**

---

## 📌 Funcionalidades

- Campo de busca por palavra-chave
- Raspagem da primeira página da Amazon
- Retorna:
  - ✅ Título do produto
  - ✅ Avaliação (estrelas)
  - ✅ Número de avaliações
  - ✅ Imagem do produto
- Exibe os resultados formatados no navegador

---

## ▶️ Como executar localmente

### 1. Clone o projeto

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
2. Instale as dependências com Bun
bash

bun install
3. Execute o servidor
bash

bun --hot src/index.tsx
4. Acesse no navegador:

http://localhost:3000

💡 Observações Técnicas
A Amazon pode bloquear scraping em excesso. Utilize User-Agent válido (já incluso).

A extração tenta capturar o máximo de campos possíveis, mesmo com estrutura HTML variável.

Todos os campos são tratados para evitar quebras.


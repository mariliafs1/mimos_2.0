import { Produto } from "../../models/Produto.js";
import supertest from "supertest";
import { app } from "../../index.js";
import getPort from 'get-port';
import dotevn from 'dotenv'
import mongoose from "mongoose";

dotevn.config();

describe("Testando o modelo Produto", () => {

  let server;
  let port;

  beforeAll(async () => {
    port = await getPort(); // Obtém uma porta livre dinamicamente
    server = app.listen(port);
    global.agent = supertest.agent(server);

    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB Conectado!");

  });
  afterAll(async () => {
    await mongoose.disconnect();
        console.log("MongoDB Desconectado!");
    server.close();
  });

  const objetoProduto = {
    nome: "Sabonete",
    preco: 15,
    imagem: "uma imagem qualquer",
    categoria: "corpoebanho",
  };

  const categorias = [
    "maquiagem",
    "corpoebanho",
    "skincare",
    "perfumaria-masculina",
    "perfumaria-feminina",
    "cabelos",
  ];

  it("Deve instanciar um novo produto", () => {
    const produto = new Produto(objetoProduto);
    expect(produto).toEqual(expect.objectContaining(objetoProduto));
  });

  describe("GET produto", () => {

    describe("/produto/:id", () => {
      it("Deve retornar que o id do produto é inválido", async () => {
        const produtoId = "produto123";
        await supertest(app).get(`/produto/${produtoId}`).expect(400);
      });

      it(" Deve retornar que o id do produto não foi encontrado", async () => {
        const produtoId = "6685925084a837bb05960fda";
        await supertest(app).get(`/produto/${produtoId}`).expect(404);
      });

      it("Deve retornar produto selecionado", async()=>{
        const produtoId = '6685925084a837bb05960fdd';
        await supertest(app).get(`/produto/${produtoId}`).expect(200);
      })

    });

    describe("/produtos ", () => {
      it("Deve retornar a listagem de todos os produtos", async () => {
        const resposta = await supertest(app).get("/produtos").expect(200);
        const produtos = resposta.body;
        expect(Array.isArray(produtos)).toBe(true);

        produtos.forEach((produto) => {
          expect(produto).toHaveProperty("nome");
          expect(produto).toHaveProperty("preco");
          expect(produto).toHaveProperty("imagem");
          expect(produto).toHaveProperty("categoria");
        });
      });

      describe("/produtos/:categoria", () => {
        it("Deve retornar uma listagem de produtos de acordo com a categoria", async () => {
          for (const categoria of categorias) {
            let resposta = await supertest(app)
              .get(`/produtos/${categoria}`)
              .expect(200);

            let produtos = resposta.body;

            produtos.forEach((produto) => {
              expect(produto.categoria).toBe(categoria);
            });
          }
        });

        it("Deve avisar que a categoria está vazia", async () => {
          const categoria = "categoria-vazia";
          await supertest(app).get(`/produtos/${categoria}`).expect(404);
        });

        it("Deve avisar que a categoria não existe", async () => {
          const categoria = "categoria-inexistente";
          await supertest(app).get(`/produtos/${categoria}`).expect(404);
        });
      });
    });
  });
});

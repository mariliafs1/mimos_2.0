import Usuario from "../../models/Usuario.js";
import supertest from "supertest";
import { app } from "../../index.js";
import getPort from "get-port";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

describe("Testando a Sacola", () => {
  let server;
  let port;
  let tokenValido;

  beforeAll(async () => {
    port = await getPort(); // Obtém uma porta livre dinamicamente
    server = app.listen(port);
    global.agent = supertest.agent(server);

    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Conectado!");
  });

  afterAll(async () => {
    await mongoose.disconnect();
    console.log("MongoDB Desconectado!");
    server.close();
  });

  const cadastroUsuario = {
    nome: "Gertrudes",
    cpf: "15",
    dataNascimento: new Date("2022-10-02").toISOString(),
    email: "gege@gmail.com",
    senha: "senha",
  };

  const produtoTeste = {
    _id: "6685937a84a837bb05960fde",
    nome: "Palleta Sombras",
    preco: 89.99,
    imagem: "./img/produto_palleta_sombra.jpg",
    categoria: "maquiagem",
  };

  const produtoTesteIdFalso = new mongoose.Types.ObjectId();

  const registrarEAutenticarUsuario = async () => {
    await supertest(app)
      .post(`/usuario/registraUsuario`)
      .send(cadastroUsuario)
      .expect(201);

    let usuarioBody = {
      email_login: cadastroUsuario.email,
      senha_login: cadastroUsuario.senha,
    };

    const autenticacao = await supertest(app)
      .post(`/usuario/loginUsuario`)
      .send(usuarioBody)
      .expect(200);

    return autenticacao.body.token;
  };

  describe("POST Sacola", () => {
    it("Deve adicionar novo produto na sacola do usuário criado (Gertrudes)", async () => {
      tokenValido = await registrarEAutenticarUsuario();

      const resposta = await supertest(app)
        .post(`/sacola/${produtoTeste._id}`)
        .set("Authorization", `Bearer ${tokenValido}`)
        .expect(201);
      expect(resposta.body).toEqual({
        message: "Produto adicionado à sacola!",
      });
    });

    it("Deve dizer que não existe o id do produto adicionado", async () => {
      const resposta = await supertest(app)
        .post(`/sacola/${produtoTesteIdFalso}`)
        .set("Authorization", `Bearer ${tokenValido}`)
        .expect(404);
      expect(resposta.body).toEqual({ message: "Produto não encontrado" });
    });
  });

  describe("GET Sacola/produtos", () => {
    it("Deve listar todos os produtos da sacola de um usuário logado", async () => {
      const resposta = await supertest(app)
        .get(`/sacola/produtos`)
        .set("Authorization", `Bearer ${tokenValido}`)
        .expect(200);

      expect(resposta.body.message).toBe(
        "Itens da sacola listados com sucesso!"
      );
      expect(resposta.body.carrinho).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            produto: expect.objectContaining({
              _id: produtoTeste._id.toString(),
              nome: produtoTeste.nome,
              preco: produtoTeste.preco,
              imagem: produtoTeste.imagem,
              categoria: produtoTeste.categoria,
            }),
          }),
        ])
      );
    });
  });

  describe("DELETE Sacola", () => {
    it("Deve deletar o produto da sacola", async () => {
      const resposta = await supertest(app)
        .delete(`/sacola/${produtoTeste._id}`)
        .set("Authorization", `Bearer ${tokenValido}`)
        .expect(200);
      expect(resposta.body).toEqual({ message: "Produto deletado!" });
    });
    it("Deve avisar que o produto não existe na sacola", async () => {
      const resposta = await supertest(app)
        .delete(`/sacola/${produtoTesteIdFalso}`)
        .set("Authorization", `Bearer ${tokenValido}`)
        .expect(404);
      expect(resposta.body).toEqual({
        message: "Produto não encontrado na sacola.",
      });
      await supertest(app)
        .delete("/usuario")
        .set("Authorization", `Bearer ${tokenValido}`)
        .expect(200);
    });
  });
});

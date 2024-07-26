import Usuario from "../../models/Usuario.js";
import supertest from "supertest";
import { app } from "../../index.js";
import getPort from "get-port";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

describe("Testando o modelo Usuario", () => {
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

  const objetoUsuario = {
    nome: "Carlos",
    cpf: "15",
    dataNascimento: new Date("2022-10-02").toISOString(),
    email: "nhoc@gmail.com",
    senha: "senha",
    carrinho: [],
    favoritos: [],
  };

  const cadastroUsuario = {
    nome: "Carlos",
    cpf: "15",
    dataNascimento: new Date("2022-10-02").toISOString(),
    email: "nhoc@gmail.com",
    senha: "senha",
  };

  it("Deve instanciar um novo usuario", () => {
    const usuario = new Usuario(objetoUsuario);
    const usuarioObject = usuario.toObject();

    usuarioObject.dataNascimento = usuarioObject.dataNascimento.toISOString();
    // Remover o campo _id para comparação
    expect(usuarioObject).toEqual(expect.objectContaining(objetoUsuario));
  });

  describe("POST usuário", () => {
    it("Deve salvar usuario no DB", async () => {
      const resposta = await supertest(app)
        .post(`/usuario/registraUsuario`)
        .send(cadastroUsuario)
        .expect(201);
      expect(resposta.body).toMatchObject({message:'Usuário criado com sucesso!'});

    });
    it("Se email já estiver cadastrado no DB, impede cadastrado", async () => {
      const resposta = await supertest(app)
        .post(`/usuario/registraUsuario`)
        .send(cadastroUsuario)
        .expect(422);
        expect(resposta.body).toEqual({message:'E-mail já cadastrado!'});
    });

    it("Deve autenticar o usuário com login e senha", async()=>{
      let usuarioBody ={
        email_login: cadastroUsuario.email,
        senha_login: cadastroUsuario.senha
      }
      const resposta = await supertest(app).post(`/usuario/loginUsuario`).send(usuarioBody).expect(200);
      expect(resposta.body).toMatchObject({message:'Autenticação realizada com sucesso'});
      tokenValido = resposta.body.token;
    })

    it("Deve responder que o e-mail cadastrado não foi encontrado", async()=>{
      let usuarioBody ={
        email_login: 'email-que-não-existe-no-DB',
        senha_login: cadastroUsuario.senha
      }
      const resposta = await supertest(app).post(`/usuario/loginUsuario`).send(usuarioBody).expect(404);
      expect(resposta.body).toEqual({message:'E-mail não cadastrado!'});
    })

    it("Deve responder que a senha está incorreta", async()=>{
      let usuarioBody ={
        email_login: cadastroUsuario.email,
        senha_login: 'senha incorreta'
      }
      const resposta = await supertest(app).post(`/usuario/loginUsuario`).send(usuarioBody).expect(422);
      expect(resposta.body).toEqual({message:'Senha incorreta!'});
    })
  
  });

  describe("DELETE usuário", ()=>{
    it("Deve deletar o usuário autenticado", async()=>{
      const resposta = await supertest(app).delete('/usuario').set('Authorization', `Bearer ${tokenValido}`).expect(200);
      expect(resposta.body).toEqual({message:'Usuário deletado!'});
    })
  })

});

import supertest from "supertest";
import { app } from "../../index.js";
import getPort from "get-port";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

describe("Middleware de Autorização", () => {
  let server;
  let port;

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

  describe('Sacola', ()=>{  
      it("GET Deve retornar 401 se não houver autorização", async()=>{
        const resposta = await supertest(app).get('/sacola').expect(401);
        expect(resposta.body).toEqual({message:'Autorização negada!'})
      });
  })
});

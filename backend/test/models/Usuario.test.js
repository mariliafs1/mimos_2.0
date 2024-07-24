import Usuario from '../../models/Usuario.js'
import UsuarioController from '../../controllers/UsuarioController.js';

describe("Testando o modelo Usuario", () => {
    const objetoUsuario = {
      nome: "Carlos",
      cpf: '15',
      dataNascimento: new Date('2022-10-02').toISOString(),
      email: "nhoc@gmail.com",
      senha: 'senha',
      carrinho: [],
      favoritos: []
    };
  
    it('Deve instanciar um novo usuario', () => {
      const usuario = new Usuario(objetoUsuario);
      const usuarioObject = usuario.toObject();
      
      usuarioObject.dataNascimento = usuarioObject.dataNascimento.toISOString();
      // Remover o campo _id para comparação
      expect(usuarioObject).toEqual(expect.objectContaining(objetoUsuario));
    });
  
    it('Deve salvar usuario no DB', ()=>{
      const usuario = new Usuario(objetoUsuario);
    })
  });
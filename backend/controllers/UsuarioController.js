import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registraUsuario = async (req, res) => {
  try {
    let { nome, cpf, dataNascimento, email, senha, senha_repetida } = req.body;
    cpf = cpf.replace(/\.|-/g, "");

    const usuarioExiste = await Usuario.findOne({ email: email });
    if (usuarioExiste) {
      return res.status(422).json({ message: "E-mail já cadastrado!" });
    }

    const sal = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, sal);
    const usuario = await Usuario.create({
      nome,
      cpf,
      dataNascimento,
      email,
      senha: senhaHash,
    });
    res.status(201).json({ message: "Usuário criado com sucesso!", usuario });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const loginUsuario = async (req, res) => {
  const { email_login, senha_login } = req.body;
  const usuario = await Usuario.findOne({ email: email_login });

  if (!usuario) {
    return res.status(404).json({ message: "E-mail não cadastrado!" });
  }

  const checarSenha = await bcrypt.compare(senha_login, usuario.senha);
  if (!checarSenha) {
    return res.status(422).json({ message: "Senha incorreta!" });
  }

  try {
    const segredo = process.env.SECRET;
    const token = jwt.sign(
      {
        id: usuario._id,
      },
      segredo
    );
    
    const {senha, ...usuarioSemSenha} = usuario.toObject();

    res
      .status(200)
      .json({ message: "Autenticação realizada com sucesso", token, usuarioSemSenha }); //preciso disso aqui
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteUsuarioPorId = async (req, res) => {
  const usuarioId = req.userId;
  try {
    await Usuario.findByIdAndDelete(usuarioId);
    return res.status(200).json({ message: "Usuário deletado!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const UsuarioController = {
  registraUsuario,
  loginUsuario,
  deleteUsuarioPorId,
};

export default UsuarioController;

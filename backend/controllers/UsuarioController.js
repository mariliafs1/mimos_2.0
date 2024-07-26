import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registraUsuario = async (req, res) => {
  try {
    let { nome, cpf, dataNascimento, email, senha, senha_repetida } = req.body;
    console.log(req.body);
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
  console.log(usuario.senha);
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

// const getUsuarioPorId = async (req, res) => {
//   const id = req.params.id;
//   console.log(id);

//   try {
//     const usuario = await Usuario.findById(id).select("-senha");

//     if (!usuario) {
//       return res.status(404).json({ message: "Usuário não cadastrado" });
//     }
//     return res.status(200).json({ message: "logado com sucesso!", usuario });
//   } catch (error) {
//     console.error(error);
//   }
// };

// const getUsuarioPorLogin = async (req, res) => {
//   const email = req.params.email_login;
//   try {
//     const usuario = await Usuario.findOne({ email: email }).select("-senha");

//     if (!usuario) {
//       return res.status(400).json({ message: "Usuário não cadastrado" });
//     }
//     return res.status(200).json({ message: "logado com sucesso!", usuario });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// };

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
//   getUsuarioPorId,
//   getUsuarioPorLogin,
  deleteUsuarioPorId,
};

export default UsuarioController;

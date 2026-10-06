import { inserirUsuario, listarUsuarios, buscarUsuarioPorId, deletarUsuarioPorId, atualizarUsuarioPorId,buscarUsuarioPorEmail } from '../model/userModel.js';
import bcrypt from 'bcrypt';
export const postUsuario = async (req, res) => {
    try {
        const { nome, estado, senha, email} = req.body;
        const senhaHash = await bcrypt.hash(senha, 10);
        const resultado = await inserirUsuario(nome, estado, senhaHash,email);
        res.status(201).json({ id: resultado.insertId, nome, estado,email });
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: "Erro ao inserir usuário" });
    }
};

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await listarUsuarios();
        res.status(200).json(usuarios);
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: "Erro ao listar usuários" });
    }
};

export const getUsuarioPorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const usuarios = await buscarUsuarioPorId(id);

        if (usuarios.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
        res.status(200).json(usuarios[0]);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao buscar usuário por ID" });
    }
};

export const deleteUsuarioPorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const usuarios = await buscarUsuarioPorId(id);

        if (usuarios.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        await deletarUsuarioPorId(id);
        res.status(200).json({ mensagem: "Usuário deletado com sucesso" });
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao deletar usuário" });
    }
};

export const atualizaUsuarioPorId = async (req, res) => {
    const id = parseInt(req.params.id)
    const { nome, estado, senha} = req.body
    try {
        if (!nome || !estado ||!senha) {
            return res.status(400).json({ mensagem: "Dados Inválidos" })
        }
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ mensagem: "Id Inválido" })
        }
        const usuario = await buscarUsuarioPorId(id)
        if (usuario.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" })
        }
        const senhaHash = await bcrypt.hash(senha, 10)
        await atualizarUsuarioPorId(id, nome, estado, senhaHash)
        const [atualizado] = await buscarUsuarioPorId(id)
        return res.status(200).json(atualizado)


    } catch (error) {
        return res.status(500).json({ mensagem: "Erro Interno" })
    }
};

export const executaLogin = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ mensagem: "email e senha são obrigatórios" });
        }

        const usuarios = await buscarUsuarioPorEmail(email);
        if (usuarios.length === 0) {
            return res.status(401).json({ mensagem: "Email ou senha inválidos" });
        }

        const usuario = usuarios[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: "Email ou senha inválidos" });
        }

        res.status(200).json({ id: usuario.id, nome: usuario.nome, estado: usuario.estado });
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ mensagem: "Erro interno" });
    }
};
import { inserirUsuario, listarUsuarios, buscarUsuarioPorId, deletarUsuarioPorId, atualizarUsuarioPorId } from '../model/userModel.js';

export const postUsuario = async (req, res) => {
    try {
        const { nome, estado } = req.body;
        const resultado = await inserirUsuario(nome, estado);
        res.status(201).json({ id: resultado.insertId, nome, estado });
    } catch (erro) {
        res.status(500).json({mensagem:"Erro ao inserir usuário"});
    }
};

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await listarUsuarios();
        res.status(200).json(usuarios);
    } catch (erro) {
        console.log(erro);
        res.status(500).json({mensagem:"Erro ao listar usuários"});
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

export const atualizaUsuarioPorId = async(req, res) =>{
    const id = parseInt(req.params.id)
    const {nome, estado} = req.body
    try {
        if(!nome || !estado){
            return res.status(400).json({mensagem: "Dados Inválidos"})
        }
        if(isNaN(id) || id < 0){
            return res.status(400).json({mensagem: "Id Inválido"})
        }
        const usuario = await buscarUsuarioPorId(id)
        if(usuario.length === 0){
            return res.status(404).json({mensagem:"Usuário não encontrado"})
        }

        const resposta = await atualizarUsuarioPorId(id,nome, estado)
        return res.status(200).json({resposta})
        
        
    } catch (error) {
        return res.status(500).json({mensagem:"Erro Interno"})
    }
};
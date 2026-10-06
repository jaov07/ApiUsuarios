import conexao from '../database/conexao.js';

export const inserirUsuario = async (nome, estado) => {
    const sql = "INSERT INTO users (nome, estado) VALUES (?, ?)";
    const [resultado] = await conexao.query(sql, [nome, estado]);
    return resultado;
};

export const listarUsuarios = async () => {
    const [linhas] = await conexao.query("SELECT * FROM users");
    return linhas;
};

export const buscarUsuarioPorId = async (id) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    const [linhas] = await conexao.query(sql, [id]);
    return linhas;
};

export const deletarUsuarioPorId = async (id) => {
    await conexao.query("DELETE FROM users WHERE id = ?", [id]);
};
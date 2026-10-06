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
    const sql = "DELETE FROM users WHERE id = ?"
    const [linhas] = await conexao.query(sql, [id]);
    return linhas
};

export const atualizarUsuarioPorId = async(id, nome, estado)=>{
    const sql = "UPDATE users SET nome = ?, estado = ? WHERE id = ?"
    const [linhas] = await conexao.query(sql, [nome,estado,id]);
    return linhas;
}
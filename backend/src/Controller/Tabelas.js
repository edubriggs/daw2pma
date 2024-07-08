import { openDb } from '../db.js';

export async function createTableAtividade() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS Atividade (
            id INTEGER PRIMARY KEY,
            descricao TEXT,
            dt_inicial DATE,
            dt_final DATE,
            categoria_id INTEGER,
            usuario_id INTEGER,
            FOREIGN KEY (categoria_id) REFERENCES Categoria(id),
            FOREIGN KEY (usu    ario_id) REFERENCES Usuario(id)
        )
    `);
}

export async function createTableCategoria() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS Categoria (
            id INTEGER PRIMARY KEY,
            descricao TEXT,
            dt_criacao DATE,
            dt_edicao DATE
        )
    `);
}

export async function createTableUsuario() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS Usuario (
            id INTEGER PRIMARY KEY,
            nome TEXT,
            sobrenome TEXT,
            senha TEXT
        )
    `);
}

export async function insertUsuario(req, res) {
    try {
        const db = await openDb();
        const { nome, sobrenome, senha } = req.body;
        await db.run('INSERT INTO Usuario (nome, sobrenome, senha) VALUES (?, ?, ?)', [nome, sobrenome, senha]);
        res.status(200).json({ "statusCode": 200 });
    } catch (error) {
        res.status(500).json({ "statusCode": 500, "message": error.message });
    }
}

export async function insertCategoria(req, res) {
    try {
        const db = await openDb();
        const { descricao, dt_criacao, dt_edicao } = req.body;
        await db.run('INSERT INTO Categoria (descricao, dt_criacao, dt_edicao) VALUES (?, ?, ?)', [descricao, dt_criacao, dt_edicao]);
        res.status(200).json({ "statusCode": 200 });
    } catch (error) {
        res.status(500).json({ "statusCode": 500, "message": error.message });
    }
}

export async function insertAtividade(req, res) {
    try {
        const db = await openDb();
        const { descricao, dt_inicial, dt_final, categoria_id, usuario_id } = req.body;
        await db.run('INSERT INTO Atividade (descricao, dt_inicial, dt_final, categoria_id, usuario_id) VALUES (?, ?, ?, ?, ?)', [descricao, dt_inicial, dt_final, categoria_id, usuario_id]);
        res.status(200).json({ "statusCode": 200 });
    } catch (error) {
        res.status(500).json({ "statusCode": 500, "message": error.message });
    }
}

export async function updateUsuario(req, res) {
    try {
        const db = await openDb();
        const { id, nome, sobrenome, senha } = req.body;
        await db.run('UPDATE Usuario SET nome = ?, sobrenome = ?, senha = ? WHERE id = ?', [nome, sobrenome, senha, id]);
        res.status(200).json({ "statusCode": 200 });
    } catch (error) {
        res.status(500).json({ "statusCode": 500, "message": error.message });
    }
}

export async function updateCategoria(req, res) {
    try {
        const db = await openDb();
        const { id, descricao, dt_criacao, dt_edicao } = req.body;
        await db.run('UPDATE Categoria SET descricao = ?, dt_criacao = ?, dt_edicao = ? WHERE id = ?', [descricao, dt_criacao, dt_edicao, id]);
        res.status(200).json({ "statusCode": 200 });
    } catch (error) {
        res.status(500).json({ "statusCode": 500, "message": error.message });
    }
}

export async function updateAtividade(req, res) {
    try {
        const db = await openDb();
        const { id, descricao, dt_inicial, dt_final, categoria_id, usuario_id } = req.body;
        await db.run('UPDATE Atividade SET descricao = ?, dt_inicial = ?, dt_final = ?, categoria_id = ?, usuario_id = ? WHERE id = ?', [descricao, dt_inicial, dt_final, categoria_id, usuario_id, id]);
        res.status(200).json({ "statusCode": 200 });
    } catch (error) {
        res.status(500).json({ "statusCode": 500, "message": error.message });
    }
}

export async function deleteUsuario(req, res) {
    try {
        const db = await openDb();
        const { id } = req.body;
        await db.run('DELETE FROM Usuario WHERE id = ?', [id]);
        res.status(200).json({ "statusCode": 200 });
    } catch (error) {
        res.status(500).json({ "statusCode": 500, "message": error.message });
    }
}

export async function deleteCategoria(req, res) {
    try {
        const db = await openDb();
        const { id } = req.body;
        await db.run('DELETE FROM Categoria WHERE id = ?', [id]);
        res.status(200).json({ "statusCode": 200 });
    } catch (error) {
        res.status(500).json({ "statusCode": 500, "message": error.message });
    }
}

export async function deleteAtividade(req, res) {
    try {
        const db = await openDb();
        const { id } = req.body;
        await db.run('DELETE FROM Atividade WHERE id = ?', [id]);
        res.status(200).json({ "statusCode": 200 });
    } catch (error) {
        res.status(500).json({ "statusCode": 500, "message": error.message });
    }
}

export async function selectUsuario(req, res) {
    try {
        const db = await openDb();
        const usuarios = await db.all('SELECT * FROM Usuario');
        res.status(200).json({
            "statusCode": 200,
            "usuarios": usuarios
        });
    } catch (error) {
        res.status(500).json({
            "statusCode": 500,
            "message": error.message
        });
    }
}

export async function selectUsuarioById(req, res) {
    try {
        const db = await openDb();
        const usuario = await db.get('SELECT * FROM Usuario WHERE id = ?', [req.params.id]);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ "statusCode": 500, "message": error.message });
    }
}


export async function selectCategoria(req, res) {
    try {
        const db = await openDb();
        const categorias = await db.all('SELECT * FROM Categoria');
        res.status(200).json({
            "statusCode": 200,
            "categorias": categorias
        });
    } catch (error) {
        res.status(500).json({
            "statusCode": 500,
            "message": error.message
        });
    }
}

export async function selectCategoriaById(req, res) {
    try {
        const db = await openDb();
        const categoria = await db.get('SELECT * FROM Categoria WHERE id = ?', [req.params.id]);
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ "statusCode": 500, "message": error.message });
    }
}

export async function selectAtividade(req, res) {
    try {
        const db = await openDb();
        const atividades = await db.all('SELECT * FROM Atividade');
        res.status(200).json({
            "statusCode": 200,
            "atividades": atividades
        });
    } catch (error) {
        res.status(500).json({
            "statusCode": 500,
            "message": error.message
        });
    }
}

export async function selectAtividadeById(req, res) {
    try {
        const db = await openDb();
        const atividade = await db.get('SELECT * FROM Atividade WHERE id = ?', [req.params.id]);
        res.status(200).json(atividade);
    } catch (error) {
        res.status(500).json({ "statusCode": 500, "message": error.message });
    }
}

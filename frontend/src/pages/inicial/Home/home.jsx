import React, { useState, useEffect } from "react";
import styles from "./home.module.css";
import CardUsuarioComponent from "../../../components/Cards/CardUsuario/card_usuario";
import CardCategoriaComponent from "../../../components/Cards/CardCategoria/card_categoria";
import CardAtividadeComponent from "../../../components/Cards/CardAtividade/card_atividade";
import { Link } from "react-router-dom";
import ModalUsuarioComponent from "../../../components/Modais/ModalUsuario/modal_usuario";
import ModalCategoriaComponent from "../../../components/Modais/ModalCategoria/modal_categoria";
import ModalAtividadeComponent from "../../../components/Modais/ModalAtividade/modal_atividade";

const Home = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [atividades, setAtividades] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedCategoriaId, setSelectedCategoriaId] = useState(null);
    const [selectedAtividadeId, setSelectedAtividadeId] = useState(null);

    const fetchUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:3001/usuario');
            const data = await response.json();
            setUsuarios(data.usuarios);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    const fetchCategorias = async () => {
        try {
            const response = await fetch('http://localhost:3001/categoria');
            const data = await response.json();
            setCategorias(data.categorias);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };

    const fetchAtividades = async () => {
        try {
            const response = await fetch('http://localhost:3001/atividade');
            const data = await response.json();
            setAtividades(data.atividades);
        } catch (error) {
            console.error("Erro ao buscar atividades:", error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
        fetchCategorias();
        fetchAtividades();
    }, []);

    const findUserName = (usuario_id) => {
        const usuario = usuarios.find(user => user.id === usuario_id);
        return usuario ? `${usuario.nome} ${usuario.sobrenome}` : "Usuário não encontrado";
    };

    const handleOpenUserModal = (userId) => {
        setSelectedUserId(userId);
    };

    const handleCloseUserModal = () => {
        setSelectedUserId(null);
        fetchUsuarios();
    };

    const handleOpenCategoriaModal = (categoriaId) => {
        setSelectedCategoriaId(categoriaId);
    };

    const handleCloseCategoriaModal = () => {
        setSelectedCategoriaId(null);
        fetchCategorias();
    };

    const handleOpenAtividadeModal = (atividadeId) => {
        setSelectedAtividadeId(atividadeId);
    };

    const handleCloseAtividadeModal = () => {
        setSelectedAtividadeId(null);
        fetchAtividades();
    };

    return (
        <div id={styles.app}>
            <p id={styles.pma_titulo}>Personal Manager Activity</p>
            <div id={styles.container_usuarios}>
                <div className={styles.textos}>
                    <p className={`${styles.titulo} ${styles.titulo_usuarios}`}>Usuários</p>
                    <Link to="/cadastro_usuario"><p className={styles.adicionar}>+</p></Link>
                </div>
                <div id={styles.div_usuarios}>
                    {usuarios.map(usuario => (
                        <CardUsuarioComponent
                            key={usuario.id}
                            id={usuario.id}
                            nome={usuario.nome}
                            sobrenome={usuario.sobrenome}
                            onOpenModal={handleOpenUserModal}
                        />
                    ))}
                </div>
            </div>
            <div id={styles.container_categorias}>
                <div className={styles.textos}>
                    <p className={`${styles.titulo} ${styles.titulo_categorias}`}>Categorias</p>
                    <Link to="/cadastro_categoria"><p className={styles.adicionar}>+</p></Link>
                </div>
                <div id={styles.div_categorias}>
                    {categorias.map(categoria => (
                        <CardCategoriaComponent
                            key={categoria.id}
                            id={categoria.id}
                            dt_criacao={categoria.dt_criacao}
                            dt_edicao={categoria.dt_edicao}
                            onOpenModal={handleOpenCategoriaModal}
                        />
                    ))}
                </div>
            </div>
            <div id={styles.container_atividades}>
                <div className={styles.textos}>
                    <p className={`${styles.titulo} ${styles.titulo_atividades}`}>Atividades</p>
                    <Link to="/cadastro_atividade"><p className={styles.adicionar}>+</p></Link>
                </div>
                <div id={styles.div_atividades}>
                    {atividades.map(atividade => (
                        <CardAtividadeComponent
                            key={atividade.id}
                            id={atividade.id}
                            usuario_nome={findUserName(atividade.usuario_id)}
                            categoria_id={atividade.categoria_id}
                            onOpenModal={handleOpenAtividadeModal}
                        />
                    ))}
                </div>
            </div>
            {selectedUserId && (
                <ModalUsuarioComponent id={selectedUserId} onClose={handleCloseUserModal} />
            )}
            {selectedCategoriaId && (
                <ModalCategoriaComponent id={selectedCategoriaId} onClose={handleCloseCategoriaModal} />
            )}
            {selectedAtividadeId && (
                <ModalAtividadeComponent id={selectedAtividadeId} onClose={handleCloseAtividadeModal} />
            )}
        </div>
    );
}

export default Home;

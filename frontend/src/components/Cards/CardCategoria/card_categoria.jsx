import React from "react";
import styles from "./card_categoria.module.css";

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString('pt-BR', options);
    return formattedDate;
};

const CardCategoriaComponent = ({ id, dt_criacao, dt_edicao, onOpenModal }) => {
    return (
        <div id={styles.card}>
            <div id={styles.fundo}>
                <ul className={styles.lista_ul}>
                    <li className={styles.list_item}>
                        <p className={`${styles.id_categoria} ${styles.list_item} ${styles.list_tittle}`}>{`Categoria ${id}`}</p>
                        <div id={styles.card_item}>
                            <p className={`${styles.dt_criacao_categoria} ${styles.list_item}`}>{formatDate(dt_criacao)}</p>
                            <p className={`${styles.dt_edicao_categoria} ${styles.list_item}`}>{dt_edicao === "não editado" ? dt_edicao : formatDate(dt_edicao)}</p>
                        </div>
                    </li>
                </ul>
                <button id={styles.button_card} onClick={() => onOpenModal(id)}>VER MAIS</button>
            </div>
        </div>
    );
};

export default CardCategoriaComponent;

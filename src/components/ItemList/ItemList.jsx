import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./ItemList.module.css";

const listadoCategorias = ["Hombre", "Mujer", "Niños"];

const ItemList = ({ items, isLoading, categoria }) => {

    if (isLoading) {
        return <div className={styles.contenedor}>
            <div className={styles.circleLoader}></div>
            <div className={styles.mensajes}>
                <img
                    src={`/images/imagen_carga.png`}
                />
                <h2 >Cargando...</h2>
            </div>
        </div>
    }


    if (!listadoCategorias.includes(categoria) && categoria != undefined) {
        return <h2 className={styles.mensajes}>404 Not Found</h2>;
    }

    return (
        <div className="container mt-5">
            <h1>{categoria}</h1>

            <div className={styles.productListStyle}>
                {items.map((item) => (
                    <div key={item.id} className={styles.productItem}>
                        <Link to={`/item/${item.id}`} className="links">
                            <h3>{item.name}</h3>
                            <p> ${item.price}</p>
                            <p> {item.category}</p>
                            <img
                                src={`/images/productos/producto-${item.id}.jpg`}
                                alt={item.name}
                                style={{ width: "100%" }}
                            />
                        </Link>
                    </div>
                ))}
            </div>


        </div>
    );
};

ItemList.propTypes = {
    items: propTypes.array.isRequired,
    isLoading: propTypes.bool,
}

export default ItemList;

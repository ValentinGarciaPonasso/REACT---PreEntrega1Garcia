import PropTypes from "prop-types";
import styles from "./ItemDetail.module.css";
import { useState, useEffect } from "react";





const ItemDetail = ({ item, isLoading, addItem, count, incrementar, reducir, toggleTalle, talle }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        if (item) {
            setSelectedImage(`/images/productos/producto-${item.id}.jpg`);
        }
    }, [item]);

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
    };



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

    if (!item) {
        return <h2 className={styles.mensajes}>No se encontró Producto</h2>;
    }

    return (
        <div className={styles.item}>
            <h1>{item.name}</h1>
            <div className={styles.products}>
                <div className={styles.productPreview}>
                    <button onClick={() => handleImageClick(`/images/productos/producto-${item.id}.jpg`)}>
                        <img
                            src={`/images/productos/producto-${item.id}.jpg`}
                            alt={item.name}
                        />
                    </button>
                </div>
                <div className={styles.productItem}>
                    {selectedImage && <img src={selectedImage} alt={item.name} />}
                </div>
                <div className={styles.productPreview}>
                    <button onClick={() => handleImageClick(`/images/productos/producto-${item.id}-back.jpg`)}>
                        <img
                            src={`/images/productos/producto-${item.id}-back.jpg`}
                            alt={item.name}
                        />
                    </button>
                </div>
            </div>
            <div className={styles.productDetail}>
                <h2>{item.category}</h2>
                <h3>PRECIO: ${item.price}</h3>
                <hr />
                <p>{item.descripcion1}</p>
                <p>{item.descripcion2}</p>
                <p>{item.descripcion3}</p>
                <p className={styles.codigo}>Codigo: {item.id}</p>
                <hr />
                <h4>Cantidad: </h4>
                <div className= {styles.contadorContainer}>
                    <button className={styles.contadorButton} onClick={reducir}>-</button>
                    <span className={styles.contadorNumero}>{count}</span>
                    <button className={styles.contadorButton} onClick={incrementar}>+</button>
                </div>
                {/* <div className={styles.tallesError}> */}
                <h4>Talle:</h4>
                <div className={styles.talles}>
                    <button className="btn btn-success" data-bs-toggle="button" aria-pressed="true"  onClick={() => toggleTalle('S')}>S</button>
                    <button className="btn btn-success" data-bs-toggle="button" aria-pressed="true"  onClick={() => toggleTalle('M')}>M</button>
                    <button className="btn btn-success" data-bs-toggle="button" aria-pressed="true"  onClick={() => toggleTalle('L')}>L</button>
                    <button className="btn btn-success" data-bs-toggle="button" aria-pressed="true" onClick={() => toggleTalle('XL')}>XL</button>
                </div>
                {/* <p>el talle es: S {talle[0].cant}, M{talle[1].cant}, L{talle[2].cant}, XL{talle[3].cant}</p> */}
                <p>El talle es: {talle}</p>
                {/* </div> */}
                <div className={styles.comprar}>
                    <button className="btn btn-danger" onClick={() => addItem(item, count, talle)}>Agregar al carrito</button>
                </div>
            </div >
        </div>
    )
};

ItemDetail.propTypes = {
    item: PropTypes.object,
    count: PropTypes.number,
    isLoading: PropTypes.bool,
    addItem: PropTypes.func,
    incrementar: PropTypes.func,
    reducir: PropTypes.func,
    // talle: PropTypes.object,
};

export default ItemDetail;
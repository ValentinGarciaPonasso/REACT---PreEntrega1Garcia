import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { cartTotal } from "../../utilis";
import styles from "./Cart.module.css";


const Cart = ({}) => {

    const { cart, clear, removeItem, sumQuantity, substarctQuantity } = useContext(CartContext);
    const total = cartTotal(cart);


    return (
        <div>
            {/* NO SE ENCUENTRAN PRODUCTOS */}
            {!total && (
            <div className={styles.sinProductos}>
                        <h1>CARRITO</h1>
                        <h3>NO SE ENCONTRARON PRODUCTOS</h3>
                        <Link to="/" className={styles.inicio}>Volver al inicio</Link>
            </div>
            )}

            {/* SE ENCUENTRAN PRODUCTOS */}
            {total && (
                <div className={styles.carrito}>
                    <h1>CARRITO</h1>
                    <div className={styles.container}>
                        <h2>Productos:</h2>
                        <div className={styles.subtitulos}>
                            <h3>Articulos</h3>
                            <h3>Cantidad</h3>
                            <h3>Precio</h3>
                        </div>
                        <hr />
                        <ul className={styles.productos}>
                            {cart.map((item) => (
                                <li key={item.id + item.talle} className={styles.producto}>
                                    <div className={styles.datos}>
                                        <Link to={`/item/${item.id}`} className={styles.imagenCart}>
                                            <img
                                                src={`/images/productos/producto-${item.id}.jpg`}
                                                alt={item.name}
                                            />
                                        </Link>
                                        <div className={styles.datosDescr}>
                                            <h4>{item.name} {item.category}</h4>
                                            <h5>Talle: {item.talle} </h5>
                                            <p>Codigo: {item.code}</p>
                                        </div>
                                    </div>
                                    <div className={styles.contadorContainer}>
                                        <button className={styles.contadorButton} onClick={() => substarctQuantity(item, item.quantity)}>-</button>
                                        <span className={styles.contadorNumero}>{item.quantity}</span>
                                        <button className={styles.contadorButton} onClick={() => sumQuantity(item, item.quantity)}>+</button>
                                    </div>
                                    <div className={styles.precio}>
                                        <p>Subtotal: ${item.price * item.quantity}</p>
                                        <button className="btn btn-danger" onClick={() => removeItem(item)}>
                                            <i className={"bi bi-trash"}></i>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <hr />
                        <div className={styles.totales}>
                            <h3>TOTAL: ${total}</h3>
                            <Link to="/checkout" className={styles.linkStyle}>
                                <button className="btn btn-danger">COMPRAR</button>
                            </Link>
                            <button className="btn btn-primary" onClick={clear}>VACIAR CARRITO</button>
                        </div>
                    </div>
                </div>
            )}
        </div>



    )
}

export default Cart
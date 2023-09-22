import { useContext, useState } from "react"
import CartContext from "../../context/CartContext"
import { cartTotal, mapCartToOrder } from "../../utilis"
import { serverTimestamp } from "firebase/firestore"
import { createOrder, updateStock } from "../../services";
import styles from "./Checkout.module.css";
import { Link } from "react-router-dom";

const Checkout = () => {

    const [orderId, setOrderId] = useState(null);
    const [orderAux, setOrderAux] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const { cart, clear } = useContext(CartContext);

    const total = cartTotal(cart);

    const [formData, SetFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [validateForm, setValidateForm] = useState(false);
    const [validateEmail, setValidateEmail] = useState(false);




    const handleCheckout = () => {
        setValidateForm(false);
        setValidateEmail(false);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Validar que los campos no estén vacíos
        if (!formData.name || !formData.email || !formData.phone) {
            setValidateForm(true);
            // Validar el formato del email
            if (!emailPattern.test(formData.email)) {
                setValidateEmail(true);
                return;
            }
            return;
        } else if (!emailPattern.test(formData.email)) {
            setValidateEmail(true);
            return;
        }

        const order = {
            buyer: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
            },
            items: mapCartToOrder(cart),
            total: total,
            date: serverTimestamp(),
        };
        setIsLoading(true);
        setOrderAux({ ...order });
        createOrder(order)
            .then((docRef) => {
                setOrderId(docRef.id);
                setIsLoading(false);
                clear();
            });
    };


    const handleChangeForm = (eventForm) => {
        const { name, value } = eventForm.target;
        SetFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    }



    return (
        <div>
            {/* COMPRA EXITOSA */}
            {orderId && (
                <>
                    <div className="container">
                        <div className={styles.resumen}>
                            <h1>Resumen de compra</h1>
                            <div className={styles.idOrden}>
                                <h2>COMPRA EXITOSA!!!</h2>
                                <p>El ID de su orden es: {orderId}</p>
                            </div>
                            <div className={styles.idOrden}>
                                <h3>Productos:</h3>
                                <ul>
                                    {orderAux.items.map((item) => (
                                        <li key={item.id + item.talle} className={styles.productos}>
                                            <p>{item.title} {item.category}</p>
                                            <p>Cantidad: {item.quantity}</p>
                                            <p>Talle: {item.talle} </p>
                                            <p>Precio unitario: ${item.price}</p>
                                            <p>Subtotal: ${item.price * item.quantity}</p>
                                        </li>
                                    ))}
                                </ul>
                                <p>Total: ${orderAux.total}</p>
                            </div>
                            <div className={styles.idOrden}>
                                <h3>Datos del comprador:</h3>
                                <ul>
                                    <li><p>Nombre: {orderAux.buyer.name}</p></li>
                                    <li><p>Email: {orderAux.buyer.email}</p></li>
                                    <li><p>Teléfono: {orderAux.buyer.phone}</p></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </>
            )};


            {/* NO SE ENCUENTRAN PRODUCTOS */}
            {!orderId && !total && (
                <>
                    <div className={styles.sinProductos}>
                        <h2>CHECKOUT</h2>
                        <h3>NO SE ENCONTRARON PRODUCTOS</h3>
                        <Link to="/" className={styles.inicio}>Volver al inicio</Link>
                    </div>
                </>
            )}

            {/* SE ENCUENTRAN PRODUCTOS */}
            {!orderId && !!total && (
                <>
                    <div className={styles.checkout}>
                        <h1>Checkout</h1>
                        <div className={styles.container}>
                            <h2>Productos:</h2>
                            <ul>
                                {cart.map((item) => (
                                    <li key={item.id + item.talle} className={styles.producto}>
                                        <div>
                                            <p>{item.name} {item.category}</p>
                                            <p>Talle: {item.talle}</p>
                                            <p>Cantidad: {item.quantity}</p>
                                            <p>Precio unitario: ${item.price}</p>
                                            <p>Subtotal: ${item.price * item.quantity}</p>
                                        </div>
                                        <Link to={`/item/${item.id}`} className={styles.imagenCart}>
                                            <img
                                                src={`/images/productos/producto-${item.id}.jpg`}
                                                alt={item.name}
                                            />
                                        </Link>
                                        <br />
                                        <hr />
                                        <br />
                                    </li>
                                ))}
                            </ul>
                            <h3>TOTAL: ${total}</h3>
                        </div>
                        <div className={styles.container}>
                            <h2>Ingrese sus datos:</h2>
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.formItem}>
                                    <label htmlFor="name">Nombre Completo</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChangeForm}
                                    />
                                </div>
                                <div className={styles.formItem}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChangeForm}
                                    />
                                </div>
                                <div className={styles.formItem}>
                                    <label htmlFor="phone">Teléfono</label>
                                    <input
                                        type="phone"
                                        name="phone"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChangeForm}
                                    />
                                </div>
                                <div className={styles.formButton}>
                                    {validateForm && <p>Por favor, complete todos los campos.</p>}
                                    {validateEmail && <p>Por favor, ingrese un correo electrónico válido.</p>}
                                    <button type="submit" onClick={() => {handleCheckout(); updateStock(cart)}} className="btn btn-danger">FINALIZAR COMPRA</button>
                                    <Link to="/cart" aria-label="Carrito" className={styles.carrito}>
                                        <button type="submit" className="btn btn-primary">VOLVER AL CARRITO</button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                        {/* {isLoading && <p>Procesando compra...</p>} */}
                        {isLoading && (
                            <div className={styles.contenedor}>
                                <div className={styles.circleLoader}></div>
                                <div className={styles.mensajes}>
                                    <img
                                        src={`/images/imagen_carga.png`}
                                    />
                                    <h2 >Procesando...</h2>
                                </div>
                            </div>
                        )}







                    </div>
                </>
            )}
        </div>
    );
};

export default Checkout;
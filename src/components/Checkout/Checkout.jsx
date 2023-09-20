import { useContext, useState } from "react"
import CartContext from "../../context/CartContext"
import { cartTotal, mapCartToOrder } from "../../utilis"
import { serverTimestamp } from "firebase/firestore"
import { createOrder } from "../../services";

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
        // Validar que los campos no estén vacíos
        if (!formData.name || !formData.email || !formData.phone) {
            console.log('Por favor, complete todos los campos.');
            setValidateForm(true);
            return;
        }    
        // Validar el formato del email (puedes usar expresiones regulares)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            console.log('Por favor, ingrese un correo electrónico válido.');
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
        console.log("handleSubmit" , formData);
        event.preventDefault();
    }


    return (
        <div>
            {orderId && (
                <>
                    <div className="container">
                        <h1>Resumen de compra</h1>
                        <div>
                            <h2>COMPRA EXITOSA!!!</h2>
                            <p>El ID de su orden es: {orderId}</p>
                        </div>
                        <div>
                            <div>
                                <h3>Productos:</h3>
                                <ul>
                                    {orderAux.items.map((item) => (
                                        <li key={item.id}>
                                            <p>{item.title} {item.category}</p>
                                            <p>Cantidad: {item.quantity}</p>
                                            <p>Precio unitario: ${item.price}</p>
                                            <p>Subtotal: ${item.price * item.quantity}</p>
                                        </li>
                                    ))}
                                </ul>
                                <p>Total: ${orderAux.total}</p>
                            </div>
                            <div>
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

            {!orderId && (
                <>
                    <div className="container">
                        <h1>Checkout</h1>
                        <div className="container">
                            <h2>Productos:</h2>
                            <ul>
                                {cart.map((item) => (
                                    <li key={item.id}>
                                        <p>{item.name} {item.category}</p>
                                        <p>Cantidad: {item.quantity}</p>
                                        <p>Precio unitario: ${item.price}</p>
                                        <p>Subtotal: ${item.price * item.quantity}</p>
                                        <br />
                                        <hr />
                                        <br />
                                    </li>
                                ))}
                            </ul>
                            <p>TOTAL: ${total}</p>
                        </div>
                        <div className="container">
                            <h2>Ingrese sus datos:</h2>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChangeForm}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChangeForm}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone">Teléfono</label>
                                    <input
                                        type="phone"
                                        name="phone"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChangeForm}
                                    />
                                </div>
                                <button type= "submit" onClick={handleCheckout} className="btn btn-danger">FINALIZAR COMPRA</button>
                            </form>
                            {validateForm && <p>Por favor, complete todos los campos.</p>}
                            {validateEmail && <p>Por favor, ingrese un correo electrónico válido.</p>}
                        </div>
                        {isLoading && <p>Procesando compra...</p>}
                    </div>
                </>
            )}
        </div>
    );
};

export default Checkout;
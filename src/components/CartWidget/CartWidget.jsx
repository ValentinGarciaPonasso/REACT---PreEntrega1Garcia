import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import "./cartWidget.css"
import {getCartQuantity} from "./../../utilis";

const CartWidget = () => {
    const {cart} = useContext(CartContext);
    const quantity = getCartQuantity(cart);
    return(
        <Link to="/cart" aria-label="Carrito" className = "carrito">
            <button className="btn btn-success boton-carrito">
                <i className={!!quantity ? "bi bi-cart-plus-fill" : "bi bi-cart-plus-fill visible"}></i>
                <span className={!!quantity ? "badge text-bg-secondary" : "vacio"}>{quantity}</span>
            </button>
        </Link>
    );
};

export default CartWidget
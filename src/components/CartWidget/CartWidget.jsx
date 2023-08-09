import "./cartWidget.css"

const CartWidget = () => {
    return(
        <div className = "carrito">
            <button className="btn btn-success boton-carrito">
                <i className="bi bi-cart-plus-fill"></i>
                <span className="badge text-bg-secondary">5</span>
            </button>
        </div>
    );
};

export default CartWidget
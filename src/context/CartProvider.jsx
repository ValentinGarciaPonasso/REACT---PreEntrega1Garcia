import { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [count, setCount] = useState(0);

    const isInCart = (code) => {
        const itemInCart = cart.find((item) => item.code === code);
        return !!itemInCart
    };

    const [validateTalle, setValidateTalle] = useState(false);



    const addItem = (product, quantity, talle) => {
        setValidateTalle(false);
        //Evaluamos si hay talle elegido
        if (talle) {
            setValidateTalle(true);
            const code = product.id + talle;
            const itemInCart = isInCart(code);
            //evaluamos si existe
            if (itemInCart) {
                console.log("cart: ", cart);
                console.log("product: ", product.code);
                const newCart = cart.map((item) => {
                    if (item.code === code) {
                        return {
                            ...item,
                            quantity: item.quantity + quantity,
                        };
                    }
                    return item;
                });
                setCart(newCart);
                setCount(0);
            } else {
                //agrega item a cart
                setCart([...cart, { ...product, quantity, talle, code }]);
                setCount(0);
            }
        }
    };


    ///REMUEVE DEL TODO EL ITEM
    const removeItem = (product) => {
        const newCart = cart.filter((item) => item.code !== product.code);
        setCart(newCart);
    };

    ///VACIA EL CARRO
    const clear = () => {
        setCart([]);
    };

    //CONTADOR PARA ELEGIR LA CANTIDAD DE ITEMS A AGREGAR
    const reducir = () => {
        if (count == 0) {
            setCount(0);
        } else {
            setCount(count - 1);
        }
    };
    const incrementar = () => {
        if (count !== 10) {
            setCount(count + 1);
        }
    };


    const sumQuantity = (product, quantity) => {
        const itemInCart = isInCart(product.code);
        //evaluamos si existe
        if (itemInCart) {
            const newCart = cart.map((item) => {
                if (item.code === product.code) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };
                }
                return item;
            });
            setCart(newCart);
        }
    };

    const substarctQuantity = (product, quantity) => {
        const itemInCart = isInCart(product.code);
        //evaluamos si existe
        if (itemInCart) {
            const newCart = cart.map((item) => {
                if (item.code === product.code) {
                    if (item.quantity > 1) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        };
                    } else {
                        return {
                            ...item,
                            quantity: 1
                        };
                    };
                };
                return item;
            });
            setCart(newCart);
        };
    };



    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clear, isInCart, reducir, incrementar, count, sumQuantity, substarctQuantity, validateTalle, setValidateTalle }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
import {useState} from "react";
import CartContext from "./CartContext";

const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [count, setCount] = useState (0);

    const isInCart = (id) => {
        const itemInCart = cart.find((item) => item.id === id);
        return !!itemInCart
    };

    const addItem = (product, quantity) => {
        const itemInCart = isInCart(product.id);
        //evaluamos si existe
        if (itemInCart) {
            const newCart = cart.map ((item) => {
                if (item.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity
                    };
                }
                return item;
            });
            setCart(newCart);
            setCount (0)
        } else {
            //agrega item a cart
            setCart([...cart, {...product, quantity}]);
            setCount (0)
        }
    };


    ///REMUEVE DEL TODO EL ITEM
    const removeItem = (product) => {
        const newCart = cart.filter((item) => item.id !== product.id);
        setCart(newCart);        
    };

    ///VACIA EL CARRO
    const clear = () => {
        setCart([]);
    };

    //CONTADOR PARA ELEGIR LA CANTIDAD DE ITEMS A AGREGAR
    const reducir = () => {
        if (count == 0){
            setCount (0);
        } else {
            setCount (count - 1);
        }
    };
    const incrementar = () => {
        if (count !== 10){
            setCount (count + 1);
        }
    };


    const sumQuantity = (product, quantity) => {
        const itemInCart = isInCart(product.id);
        //evaluamos si existe
        if (itemInCart) {
            const newCart = cart.map ((item) => {
                if (item.id === product.id) {
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
        const itemInCart = isInCart(product.id);
        //evaluamos si existe
        if (itemInCart) {
            const newCart = cart.map ((item) => {
                if (item.id === product.id) {
                    if (item.quantity > 1){
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        };
                    } else {
                        return {
                            ...item,
                            quantity:  1
                        };
                    };
                };
                return item;
            });
            setCart(newCart);
        };
    };



    return (
        <CartContext.Provider value= {{cart, addItem, removeItem, clear,isInCart, reducir, incrementar, count, sumQuantity, substarctQuantity}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
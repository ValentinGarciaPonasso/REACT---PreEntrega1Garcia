import {useState} from "react";
import CartContext from "./CartContext";

const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [count, setCount] = useState (0);

    const isInCart = (code) => {
        console.log(code);
        console.log(cart);
        const itemInCart = cart.find((item) => item.code === code);
        console.log("Buscando item en carrito, resultado:", !!itemInCart);
        return !!itemInCart
    };

    //FUNCIONA!!!!!!!!!!!!!
    // const addItem = (product, quantity, talle) => {
    //     const itemInCart = isInCart(product.id);
    //     //evaluamos si existe
    //     if (itemInCart) {
    //         const newCart = cart.map ((item) => {
    //             if (item.id === product.id) {
    //                 return {
    //                     ...item,
    //                     quantity: item.quantity + quantity,
    //                     talle: talle,
    //                 };
    //             }
    //             return item;
    //         });
    //         setCart(newCart);
    //         setCount (0)
    //     } else {
    //         //agrega item a cart
    //         setCart([...cart, {...product, quantity, talle}]);
    //         setCount (0)
    //     }
    // };


    const addItem = (product, quantity, talle) => {
        const code = product.id + talle;
        //product.id = product.id + talle;
        const itemInCart = isInCart(code);
        //evaluamos si existe
        if (itemInCart) {
            console.log("cart: ", cart);
            console.log("product: ", product.code);
            const newCart = cart.map ((item) => {
                if (item.code === code) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity,
                        //talle: talle,
                        // code: item.id+talle,
                    };
                }
                return item;
            });
            setCart(newCart);
            setCount (0);
        } else {
            //agrega item a cart
            //const code = product.id+talle;
            setCart([...cart, {...product, quantity, talle, code}]);
            setCount (0);
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
        const itemInCart = isInCart(product.code);
        //evaluamos si existe
        if (itemInCart) {
            const newCart = cart.map ((item) => {
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
            const newCart = cart.map ((item) => {
                if (item.code === product.code) {
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
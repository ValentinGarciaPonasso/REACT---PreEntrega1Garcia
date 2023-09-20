export const getCartQuantity = (cart) => {

    let count = 0;

    cart.forEach((itemm)   =>{
        count += itemm.quantity;
    });
    return count;
};

export const cartTotal = (cart) => {
    return cart.reduce((sum, itemm) => sum + itemm.quantity * itemm.price, 0);
};


export const mapCartToOrder = (cart) => {
    return cart.map((item) => ({
            id: item.id,
            title: item.name,
            price: item.price,
            quantity: item.quantity,
            category: item.category,
    }));
};
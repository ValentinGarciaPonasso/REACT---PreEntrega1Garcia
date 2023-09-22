import { doc, getDoc, collection, getDocs, getFirestore, query, where, addDoc, orderBy,updateDoc } from "firebase/firestore";


export const getProduct = (id) => {
    return new Promise((resolve, reject) => {
        const db = getFirestore();

        const itemDoc = doc(db, "items", id);

        getDoc(itemDoc)
            .then((doc) => {
                if (doc.exists()) {
                    resolve({ id: doc.id, ...doc.data() });
                } else {
                    resolve(null);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};


export const getProducts = (category) => {
    return new Promise((resolve) => {
        const db = getFirestore();

        const itemCollection = collection(db, "items");

        let q;

        if (category) {
            q = query(itemCollection, where("category", "==", category));
        } else {
            q = query(itemCollection, orderBy("category", "asc"));
        }

        getDocs(q)
            .then((querySnapshot) => {
                const products = querySnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                resolve(products);
            })
            .catch((error) => {
                reject(error);
            });
    });
};


export const createOrder = (orden) => {
    const db = getFirestore();

    const ordenCollection = collection(db, "orders");

    return addDoc(ordenCollection, orden);
};



export const updateStock = (items) => {
    // Obtener la instancia de Firestore
    const db = getFirestore();


    //Obtener la referencia al Documento
    items.map((item) => {
        const orderDoc = doc(db, "items", item.id);
        console.log(item);
        console.log(orderDoc);
        switch (item.talle) {
            case "S":                
                //Actualizamos el Documento
                const stockSAuxliar = item.stockS - item.quantity;
                updateDoc(orderDoc, { stockS: stockSAuxliar })
                    .then(() => {
                        console.log("Orden actualizada");
                    })
                    .catch((error) => {
                        console.error("Error al actualizar la orden: ", error);
                    }
                    );
                break;
            case "M":
                //Actualizamos el Documento
                const stockMAuxliar = item.stockM - item.quantity;
                updateDoc(orderDoc, { stockM: stockMAuxliar })
                    .then(() => {
                        console.log("Orden actualizada");
                    })
                    .catch((error) => {
                        console.error("Error al actualizar la orden: ", error);
                    }
                    );
                break;
            case "L":
                //Actualizamos el Documento
                const stockLAuxliar = item.stockL - item.quantity;
                updateDoc(orderDoc, { stockL: stockLAuxliar })
                    .then(() => {
                        console.log("Orden actualizada");
                    })
                    .catch((error) => {
                        console.error("Error al actualizar la orden: ", error);
                    }
                    );
                break;
            case "XL":
                //Actualizamos el Documento
                const stockXLAuxliar = item.stockXL - item.quantity;
                updateDoc(orderDoc, { stockXL: stockXLAuxliar })
                    .then(() => {
                        console.log("Orden actualizada");
                    })
                    .catch((error) => {
                        console.error("Error al actualizar la orden: ", error);
                    }
                    );
                break;
            default:
                break;
        }
        console.log(items);
    })
}

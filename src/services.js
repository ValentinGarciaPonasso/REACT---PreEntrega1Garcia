import { doc, getDoc, collection, getDocs, getFirestore, query, where, addDoc, orderBy } from "firebase/firestore";


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



export const updateOrder = () => {
    // Obtener la instancia de Firestore
    const db = getFirestore();


    //Obtener la referencia al Documento
    items.map((item) => {
        switch (item.talle) {
            case "S":
                const orderDoc = doc(db, "items", item.id);

                //Actualizamos el Documento
                updateDoc(orderDoc, { stockS: -1 })
                    .then(() => {
                        console.log("Orden actualizada");
                        alert("Orden actualizada");
                    })
                    .catch((error) => {
                        console.error("Error al actualizar la orden: ", error);
                    }
                    );
                break;
            case "M":
                setTalle({ ...talle[1], m: valor, cant: talle.cant + cant });
                break;
            case "L":
                setTalle({ ...talle[2], l: valor, cant: talle.cant + cant });
                break;
            case "XL":
                setTalle({ ...talle[3], xl: valor, cant: talle.cant + cant });
                break;
            default:
                break;
        }
    })

    const orderDoc = doc(db, "items", orderId);

    //Actualizamos el Documento
    updateDoc(orderDoc, { total: 2000 })
        .then(() => {
            console.log("Orden actualizada");
            alert("Orden actualizada");
        })
        .catch((error) => {
            console.error("Error al actualizar la orden: ", error);
        }
        );
}

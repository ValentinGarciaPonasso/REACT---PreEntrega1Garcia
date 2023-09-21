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
            .catch ((error) => {
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

    return  addDoc(ordenCollection, orden);
};

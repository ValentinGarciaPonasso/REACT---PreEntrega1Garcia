import { doc, getDoc, collection, getDocs, getFirestore, query, where, addDoc, orderBy } from "firebase/firestore";


// const products = [
//     { id: "1", name: "Camiseta Oficial", price: "1000", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Hombre", descripcion1: "Nueva camiseta Oficial, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CO1H" },
//     { id: "2", name: "Camiseta Away", price: "1000", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Hombre", descripcion1: "Nueva camiseta Away, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CA1H" },
//     { id: "3", name: "Camiseta Away 3", price: "1000", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Hombre", descripcion1: "Nueva camiseta Away 3, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CA3H" },
//     { id: "4", name: "Camiseta Golero", price: "1000", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Hombre", descripcion1: "Nueva camiseta Golero, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CG1H" },
//     { id: "5", name: "Camiseta Local", price: "800", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Mujer", descripcion1: "Nueva camiseta Oficial, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CO1M" },
//     { id: "6", name: "Camiseta Away", price: "800", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Mujer", descripcion1: "Nueva camiseta Away, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CA1M" },
//     { id: "7", name: "Camiseta Away 3", price: "800", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Mujer", descripcion1: "Nueva camiseta Away 3, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CA3M" },
//     { id: "8", name: "Camiseta Golero", price: "800", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Mujer", descripcion1: "Nueva camiseta Golero, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CG1M" },
//     { id: "9", name: "Camiseta Local", price: "500", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Niños", descripcion1: "Nueva camiseta Oficial, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CO1N" },
//     { id: "10", name: "Camiseta Away", price: "500", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Niños", descripcion1: "Nueva camiseta Away, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CA1N" },
//     { id: "11", name: "Camiseta Away 3", price: "500", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Niños", descripcion1: "Nueva camiseta Away 3, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CA3N" },
//     { id: "12", name: "Camiseta Golero", price: "500", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Niños", descripcion1: "Nueva camiseta Golero, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CG1N" },
// ];

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

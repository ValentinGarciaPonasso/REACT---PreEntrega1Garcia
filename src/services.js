const products = [
    //Camiseta Local
    { id: "1", name: "Camiseta Oficial", price: "1000", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Hombre", descripcion1: "Nueva camiseta Oficial, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CLHS" },
    { id: "2", name: "Camiseta Away", price: "1000", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Hombre", descripcion1: "Nueva camiseta Away, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CLHM" },
    { id: "3", name: "Camiseta Away 3", price: "1000", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Hombre", descripcion1: "Nueva camiseta Away 3, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CLHL" },
    { id: "4", name: "Camiseta Golero", price: "1000", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Hombre", descripcion1: "Nueva camiseta Golero, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CLHXL" },
    { id: "5", name: "Camiseta Local", price: "800", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Mujer", descripcion1: "Nueva camiseta Oficial, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CLMS" },
    { id: "6", name: "Camiseta Away", price: "800", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Mujer", descripcion1: "Nueva camiseta Away, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CLMM" },
    { id: "7", name: "Camiseta Away 3", price: "800", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Mujer", descripcion1: "Nueva camiseta Away 3, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CLML" },
    { id: "8", name: "Camiseta Golero", price: "800", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Mujer", descripcion1: "Nueva camiseta Golero, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CLMXL" },
    { id: "9", name: "Camiseta Local", price: "500", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Niños", descripcion1: "Nueva camiseta Oficial, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CLNS" },
    { id: "10", name: "Camiseta Away", price: "500", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Niños", descripcion1: "Nueva camiseta Away, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CLNM" },
    { id: "11", name: "Camiseta Away 3", price: "500", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Niños", descripcion1: "Nueva camiseta Away 3, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CLNL" },
    { id: "12", name: "Camiseta Golero", price: "500", cantS: 100, cantM: 100, cantL: 100, cantXL: 100, category: "Niños", descripcion1: "Nueva camiseta Golero, temporada 23/24", descripcion2: "Corte clásico con tecnología de absorción AEROREADY", descripcion3: "Composición: 100% Poliester", codigo: "CLNXL" },
];

export const getProduct = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = products.find(p => p.id === id);

            if (product) {
                resolve(product);
            } else {
                reject("El produccto no existe");
            }
        }, 1000);
    });
};


export const getProducts = (category) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let categoryProducts;
            if (category) {
                categoryProducts = products.filter((product) => product.category === category);
            } else {
                categoryProducts = products;
            }
            resolve(categoryProducts);
        }, 1000);
    });
};
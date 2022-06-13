const fs = require("fs");


const BAR_DATA = {
  "burger1.jpeg": [
    "Burger clasica",
    "Burger de 200 grs de carne con doble cheddar, tomate, lechuga y cebolla",
      1100
  ],
  "burger2.jpeg": [
    "Burger Gourmet ",
    'Burger de 200 grs de cane con queso dambo, lechuga, tomate, cebolla morada, pepinillos ' +
    'y la salsa especial de la casa',
      1250
  ],
  "burger3.jpeg": [
    "Burger Cheedar",
    'Burger de 100 grs de carne con triple queso cheddar',
      1300
  ],
  "burga_vegana.jpeg": [
    "Burger Vegana",
    'Burger de medallon de quinoa, queso cheddar, tomate, cebolla morada y lechuga',
      1300
  ],
  "burger_xxl.jpeg": [
    "Burger XXL",
    'Burger con 300 grs de carne, queso cheddar, tomate, lechuga y huevo frito',
      1500
  ],
  "cocacola.jpeg": [
    "Coca-Cola común",
    "Coca-Cola - 500ml.",
      350
  ],
  "milanesa.jpeg": [
    "Milanesa con papas fritas",
    "Milanesa de peceto acompañada de papas fritas y ensalada",
      890
  ],
  "nuggets.jpeg":[
      "Nuggets",
      "Nuggets de pollo acompañadas de salsa barbacoa y honey beer mustard",
      800
  ],
  "papas_cheddar.jpeg":[
    "Papas fritas con cheddar y panceta",
    "Papas fritas bañadas con queso cheddar y panceta crocante",
      500
  ],
  "papas_provenzal.jpeg":[
    "Papas fritas a la provenzal",
    "Papas fritas con salsa provenzal", 560
  ],
  "botella_agua.jpeg":[
    "Agua mineral villa vicencio 500ml",
    "", 250
  ],
  "amber_cerveza.jpeg":[
    "Cerveza Patagonia amber lager",
    "", 450
  ]

}


const DATA_PIZZA = {
  "pizza.jpeg": [
    "Pizza Morron",
    "Pizza con salsa de tomates frescos, muzzarella, morrones rojos asados y orégano",
      1600
  ],
  "albaca.jpeg": ["Pizza", "Pizza con salsa de tomates frescos, muzzarella oregano y albaca", 1400],
  "pizza1.jpeg": [
    "Pizza Veggie",
    "Pizza a base de trigo cubierta con tomates, queso, y vegetales salteados..", 1500,
  ],
  "pizza2.jpeg": [
    "Pizza Gourmet",
    "Pizza a base de tomates, queso y peperonis.", 1850
  ],
  "fugazzeta.jpeg": [
    "Fugazzeta",
    "Pizza con muzzarela, cebolla, aceite de oliva y oregano.", 1800
  ],

  "cake2.jpeg": [
    "White Cake",
    "Porcion de torta de vainilla, con cobertura de chocolate blanco", 500
  ],
  "cake3.jpeg": [
    "Rainbow Cake",
    "Porcion de 4 capas de bizcochuelo de intenso color unido por una dulce y suave crema de queso, con corazon de confites.",
      550
  ],
  "cocacola.jpeg": [
    "Coca-Cola común",
    "Coca-Cola - 500ml.", 300
  ],
  "milanesa.jpeg": [
    "Milanesa con papas fritas",
    "Milanesa de peceto acompañada de papas fritas y ensalada", 800
  ],
  "botella_agua.jpeg":[
    "Agua mineral villa vicencio 500ml",
    "", 250
  ],
};

const DATA_ICE_CREAM = {
  "icecream.jpeg": [
    "Bocha de helado clasico",
    "Dos bochas de helado de vainilla ", 490
  ],
  "icecream0.jpeg": [
    "Helado de sandia",
    "Bochas de helado de sandia", 400
  ],
  "icecream1.jpeg": [
    "Ramo de helado",
    "Multiples bochas de helado para compartir de frutilla, vainilla y uva", 800
  ],
  "icecream2.jpeg": [
    "Granizado",
    "Bochas de helado granizado", 550
  ],
  "icecream3.jpeg": [
    "Helado mora",
    "Bochas de helado a base de moras", 450
  ],
  "botella_agua.jpeg":[
    "Agua mineral villa vicencio 500ml",
    "", 250
  ],
};



const images = fs.readdirSync("./images");

const makeProduct = (seller, shop) => {
  const image = images[(seller * 10 + shop) % images.length];
  return {
    image: `./images/${image}`,
    name: `${DATA[image][0]} O${seller} S${shop}`,
    description: DATA[image][1],
    price: parseInt(Math.random() * 1000),
  };
};


const makeBarProducts = () => {
  const products = []
  for (const image_name in BAR_DATA) {

    products.push(
    {
      image: `./images/${image_name}`,
      name: `${BAR_DATA[image_name][0]}`,
      description: BAR_DATA[image_name][1],
      price: BAR_DATA[image_name][2],
    });
  }
  return products
};


const makePizzaProducts = () => {
  const products = []
  for (const image_name in DATA_PIZZA) {

    products.push(
        {
          image: `./images/${image_name}`,
          name: `${DATA_PIZZA[image_name][0]}`,
          description: DATA_PIZZA[image_name][1],
          price: DATA_PIZZA[image_name][2],
        });
  }
  return products
};

const makeIceCreamProducts = () => {
  const products = []
  for (const image_name in DATA_ICE_CREAM) {

    products.push(
        {
          image: `./images/${image_name}`,
          name: `${DATA_ICE_CREAM[image_name][0]}`,
          description: DATA_ICE_CREAM[image_name][1],
          price: DATA_ICE_CREAM[image_name][2],
        });
  }
  return products
};

module.exports = { makeProduct, makeBarProducts, makePizzaProducts, makeIceCreamProducts };

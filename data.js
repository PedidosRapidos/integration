const fs = require("fs");

const DATA = {
  "acordion.jpeg": [
    "Acordion",
    "Accordions are a family of box-shaped musical instruments of the bellows-driven free-reed aerophone type, colloquially referred to as a squeezebox",
  ],
  "bass.jpeg": [
    "Bass",
    "A bass musical instrument produces tones in the low-pitched range C4- C2. Basses belong to different families of instruments and can cover a wide range of musical roles. Since producing low pitches usually requires a long air column or string, the string and wind bass instruments are usually the largest instruments in their families or instrument classes",
  ],
  "burger1.jpeg": [
    "Burger",
    'A hamburger is a food consisting of fillings —usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll. Hamburgers are often served with cheese, lettuce, tomato, onion, pickles, bacon, or chilis; condiments such as ketchup, mustard, mayonnaise, relish, or a "special sauce", often a variation of Thousand Island dressing; and are frequently placed on sesame seed buns.',
  ],
  "burger2.jpeg": [
    "Gourmet Burger",
    'A hamburger is a food consisting of fillings —usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll. Hamburgers are often served with cheese, lettuce, tomato, onion, pickles, bacon, or chilis; condiments such as ketchup, mustard, mayonnaise, relish, or a "special sauce", often a variation of Thousand Island dressing; and are frequently placed on sesame seed buns.',
  ],
  "burger3.jpeg": [
    "Cheedar Burger",
    'A hamburger is a food consisting of fillings —usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll. Hamburgers are often served with cheese, lettuce, tomato, onion, pickles, bacon, or chilis; condiments such as ketchup, mustard, mayonnaise, relish, or a "special sauce", often a variation of Thousand Island dressing; and are frequently placed on sesame seed buns.',
  ],
  "cake1.jpeg": [
    "Dark Cake",
    "Cake is a form of sweet food made from flour, sugar, and other ingredients, that is usually baked. In their oldest forms, cakes were modifications of bread, but cakes now cover a wide range of preparations that can be simple or elaborate, and that share features with other desserts such as pastries, meringues, custards, and pies.",
  ],
  "cake2.jpeg": [
    "White Cake",
    "Cake is a form of sweet food made from flour, sugar, and other ingredients, that is usually baked. In their oldest forms, cakes were modifications of bread, but cakes now cover a wide range of preparations that can be simple or elaborate, and that share features with other desserts such as pastries, meringues, custards, pies and.",
  ],
  "cake3.jpeg": [
    "Rainbow Cake",
    "Cake is a form of sweet food made from flour, sugar, and other ingredients, that is usually baked. In their oldest forms, cakes were modifications of bread, but cakes now cover a wide range of preparations that can be simple or elaborate, and that share features with other desserts such as pastries, meringues, custards, and pies.",
  ],
  "cleaning.jpeg": [
    "Cleaning Kit",
    "lean Up To 10 Different Surfaces With Our Bleach Free Cleaner Spray! All New Clorox® Multi-Purpose Refillable Cleaner Starter Kit With Crisp Lemon Fragrance",
  ],
  "cleaning2.jpeg": [
    "Cleaning Gloves",
    "2 Pairs Reusable Cleaning Gloves - Latex Free Kitchen Cleaning Gloves with Cotton Liner- Household Dishwashing Gloves, Non- Slip Waterproof (Medium, Blue+Pink) 4.6 out of 5 stars. 73. $7.99. $7. . 99 ($23.50/Pound) Get it as soon as Wed, May 4. FREE Shipping on orders over $25 shipped by Amazon.",
  ],
  "cocacola.jpeg": [
    "Coke Can",
    "Coca-Cola - 6pk/7.5 fl oz Cans. Coca-Cola. 4.6 out of 5 stars with 6652 ratings. 6652.",
  ],
  "cocacola.jpg": [
    "Coke Collection",
    "Coca-Cola - 6pk/7.5 fl oz Cans. Coca-Cola. 4.6 out of 5 stars with 6652 ratings. 6652.",
  ],
  "cocacola1.jpeg": [
    "Green Coke",
    "Coca-Cola - 6pk/7.5 fl oz Cans. Coca-Cola. 4.6 out of 5 stars with 6652 ratings. 6652.",
  ],
  "cocacola2.jpeg": [
    "Coke",
    "Coca-Cola - 6pk/7.5 fl oz Cans. Coca-Cola. 4.6 out of 5 stars with 6652 ratings. 6652.",
  ],
  "icecream.jpg": [
    "Ice Cream",
    "Ice cream is a sweetened frozen food typically eaten as a snack or dessert. It may be made from milk or cream and is flavoured with a sweetener, either sugar or an alternative, and a spice, such as cocoa or vanilla, or with fruit such as strawberries or peaches.",
  ],
  "icecream0.jpeg": [
    "Water Melon Ice Cream",
    "Ice cream is a sweetened frozen food typically eaten as a snack or dessert. It may be made from milk or cream and is flavoured with a sweetener, either sugar or an alternative, and a spice, such as cocoa or vanilla, or with fruit such as strawberries or peaches.",
  ],
  "icecream1.jpeg": [
    "Ice Cream Bouquet",
    "Ice cream is a sweetened frozen food typically eaten as a snack or dessert. It may be made from milk or cream and is flavoured with a sweetener, either sugar or an alternative, and a spice, such as cocoa or vanilla, or with fruit such as strawberries or peaches.",
  ],
  "icecream2.jpeg": [
    "Granizado",
    "Ice cream is a sweetened frozen food typically eaten as a snack or dessert. It may be made from milk or cream and is flavoured with a sweetener, either sugar or an alternative, and a spice, such as cocoa or vanilla, or with fruit such as strawberries or peaches.",
  ],
  "icecream3.jpeg": [
    "Purple Ice Cream",
    "Ice cream is a sweetened frozen food typically eaten as a snack or dessert. It may be made from milk or cream and is flavoured with a sweetener, either sugar or an alternative, and a spice, such as cocoa or vanilla, or with fruit such as strawberries or peaches.",
  ],
  "milanesa.jpg": [
    "Milanesa",
    "The milanesa is a South American variation of the Lombard Veal Milanese, or the Austrian Wiener schnitzel, where generic types of meat breaded cutlet preparations are known as a milanesa.",
  ],
  "phone1.jpeg": [
    "Office Phone",
    "SAMSUNG Galaxy S22 Ultra Smartphone, Factory Unlocked Android Cell Phone, 128GB, 8K Camera & Video, Brightest Display, S Pen, Long Battery Life, Fast 4nm Processor, US Version, Green. 4.4 out of 5 stars. 33. ",
  ],
  "phone2.jpeg": [
    "Vintage Phone",
    "SAMSUNG Galaxy S22 Ultra Smartphone, Factory Unlocked Android Cell Phone, 128GB, 8K Camera & Video, Brightest Display, S Pen, Long Battery Life, Fast 4nm Processor, US Version, Green. 4.4 out of 5 stars. 33. ",
  ],
  "pizza.jpeg": [
    "Pizza Morron",
    "Pizza is a dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients, which is then baked at a high temperature, traditionally in a wood-fired oven. A small pizza is sometimes called a pizzetta.",
  ],
  "pizza.jpg": [
    "Pizza",
    "Pizza is a dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients, which is then baked at a high temperature, traditionally in a wood-fired oven. A small pizza is sometimes called a pizzetta.",
  ],
  "pizza1.jpeg": [
    "Pizza Veggie",
    "Pizza is a dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients, which is then baked at a high temperature, traditionally in a wood-fired oven. A small pizza is sometimes called a pizzetta.",
  ],
  "pizza2.jpeg": [
    "Pizza Gourmet",
    " Pizza is a dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients, which is then baked at a high temperature, traditionally in a wood-fired oven. A small pizza is sometimes called a pizzetta.",
  ],
  "plant1.jpeg": [
    "Shadow Plant",
    "plant, (kingdom Plantae), any multicellular eukaryotic life-form characterized by (1) photosynthetic nutrition (a characteristic possessed by all plants except some parasitic plants and underground orchids), in which chemical energy is produced from water, minerals, and carbon dioxide with the aid of pigments and the radiant energy of the Sun, (2) essentially unlimited growth at localized regions, (3) cells that contain cellulose in their walls and are therefore to some extent rigid,",
  ],
  "plant2.jpeg": [
    "Desert Plant",
    "plant, (kingdom Plantae), any multicellular eukaryotic life-form characterized by (1) photosynthetic nutrition (a characteristic possessed by all plants except some parasitic plants and underground orchids), in which chemical energy is produced from water, minerals, and carbon dioxide with the aid of pigments and the radiant energy of the Sun, (2) essentially unlimited growth at localized regions, (3) cells that contain cellulose in their walls and are therefore to some extent rigid,",
  ],
  "plant3.jpeg": [
    "Shadow Plant 2 ",
    "plant, (kingdom Plantae), any multicellular eukaryotic life-form characterized by (1) photosynthetic nutrition (a characteristic possessed by all plants except some parasitic plants and underground orchids), in which chemical energy is produced from water, minerals, and carbon dioxide with the aid of pigments and the radiant energy of the Sun, (2) essentially unlimited growth at localized regions, (3) cells that contain cellulose in their walls and are therefore to some extent rigid,",
  ],
  "violin.jpeg": [
    "Violin",
    "The violin, sometimes known as a fiddle, is a wooden chordophone in the violin family. Most violins have a hollow wooden body. It is the smallest and thus highest-pitched instrument in the family in regular use",
  ],
};

const images = fs.readdirSync("./images");
const makeProduct = (seller, shop) => {
  const image = images[(seller + shop) % images.length];
  return {
    image: `./images/${image}`,
    name: `${DATA[image][0]} O${seller} S${shop}`,
    description: DATA[image][1],
    price: parseInt(Math.random() * 1000),
  };
};

module.exports = { makeProduct };

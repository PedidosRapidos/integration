const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const { makeProduct, makeBarProducts, makePizzaProducts, makeIceCreamProducts} = require("./data");
const API_HOST = "http://localhost:8080"; // "https://pedidos-rapidos.herokuapp.com";

const client = axios.create({
  baseURL: API_HOST,
});

async function replace(shopURL, imageURI, { name, description, price }) {
  const formData = new FormData();
  if (imageURI) {
    console.log("imageURI", imageURI);
    const filename = imageURI.split("/").pop();
    const extention = /\/?(\w+)\.(\w+)$/.exec(filename);
    const type = extention ? `image/${extention[2]}` : `image`;
    formData.append("image", fs.createReadStream(imageURI));
  }
  if (name) formData.append("name", name);
  if (description) formData.append("description", description);
  if (price) formData.append("price", price);

  console.log("uploading");
  return await client.put(shopURL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

async function upload(shopURL, { image, name, description, price }) {
  console.log("image", image)
  const filename = image.split("/").pop();
  const extention = /\/(\w+)\.(\w+)$/.exec(filename);
  const type = extention ? `image/${extention[2]}` : `image`;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("image", fs.createReadStream(image));

  console.log("uploading");
  return await client.post(shopURL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

async function createShop(user_name, shop_name, cbu, address, products) {
  try {
    const { data: user } = await client.post("/users/register", {
      username: `${user_name}`,
      email: `${user_name}@shops.com`,
      password: "PASS123",
      confirmPassword: "PASS123",
      isOwner: true,
      isClient: false,
    });
    console.log("user", user);
    const { data: seller } = await client.post("/users/login", {
      email: user.email,
      password: "PASS123",
    });
    console.log("seller", seller);
    const { data: shop } = await client.post(`/sellers/${seller.id}/shops`, {
      name: `${shop_name}`,
      cbu: `${cbu}`,
      address: `${address}`,
    });
    console.log("shop", shop);
   for (const prod of products) {
      console.log("prod", prod)
      const { data: product } = await upload(
        `/sellers/${seller.id}/shops/${shop.id}/products`,
        prod
      );
      console.log("product", product);
    }

  } catch (e) {
    console.error(JSON.stringify(e.response?.data || e.message || e));
  }
}


async function createShops(){
  try {

    const bar_products = makeBarProducts()
    const pizza_products = makePizzaProducts()
    const ice_cream_products = makeIceCreamProducts()
    await createShop("la_birra_bar", "La birra bar", "1234567890123456789019",
        "Fitz Roy 2238", bar_products)

    await createShop("kainos", "Kainos", "1234567890123456789018",
        "Av. Caseros 3301", ice_cream_products)
    await createShop("boom_pizza", "Boom Pizza", "1234567890123456789017",
        "Cordoba 4108", pizza_products)
    await createShop("bunker_bar", "Bunkeer", "1234567890123456789014",
        "Honduras 2503", pizza_products)
  } catch (e) {
  console.error(JSON.stringify(e.response?.data || e.message || e));
}

}

async function fillCart(user) {}

async function createCustomers() {
  try {
    for (let i = 1; i < 5; ++i) {
      let response = await client.post("/users/register", {
        username: `client${i}`,
        email: `client${i}@client.com`,
        password: "PASS123",
        confirmPassword: "PASS123",
        isOwner: false,
        isClient: true,
      });
      response = await client.post("/users/login", {
        email: `client${i}@client.com`,
        password: "PASS123",
      });
      const user = response.data;
      console.log("user", user);
      break;
      let cart;
      for (let j = 0; j < i; ++j) {
        const { data } = await client.post(
          `/shopping_cart/${user.cartId}/products`,
          {
            product_id: i + 2,
            quantity: 2,
          }
        );
        cart = data;
      }
      console.log("cart", [user, cart]);

      const { data: order } = await client.post(`/orders/${user.id}`, {
        payment_method: "cash",
      });
      console.log("order", order);
    }
  } catch (e) {
    console.error(JSON.stringify(e.response?.data || e.message || e));
  }
}

async function run() {
  await createShops();
}

console.log("running");
run();
console.log("done");

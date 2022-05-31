const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const { makeProduct } = require("./data");
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

async function createShops() {
  try {
    for (let i = 1; i < 5; ++i) {
      const { data: user } = await client.post("/users/register", {
        username: `shop${i}`,
        email: `shop${i}@shops.com`,
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
        name: `Shop ${i}`,
        cbu: `123456789012345678901${i}`,
        address: `Calle ${i}`,
      });
      console.log("shop", shop);
      for (let j = 0; j < 10; ++j) {
        const { data: product } = await upload(
          `/sellers/${seller.id}/shops/${shop.id}/products`,
          makeProduct(i, j)
        );
        console.log("product", product);
      }
    }
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
  await createCustomers();
}

console.log("running");
run();
console.log("done");

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

async function run() {
  try {
    for (let i = 0; i < 4; ++i) {
      const { data: user } = await client.post("/users/register", {
        username: `client${i}`,
        email: `client${i}@client.com`,
        password: "PASS123",
        confirmPassword: "PASS123",
        isOwner: false,
        isClient: true,
      });
      console.log("user", user);
    }
    for (let i = 0; i < 4; ++i) {
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
      for (let j = 0; j < 8; ++j) {
        const { data: product } = await upload(
          `/sellers/${seller.id}/shops/${shop.id}/products`,
          makeProduct(i * 8, j)
        );
        console.log("product", product);
      }
    }
  } catch (e) {
    console.error(JSON.stringify(e.response?.data || e.message || e));
  }
}

console.log("running");
run();

// replace(`/products/1`, null, {
//   name: "new name",
//   description: "new description",
//   price: 0,
// });

console.log("done");

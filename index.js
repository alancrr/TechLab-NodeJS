const args = process.argv.slice(2);

const API_URL = "https://fakestoreapi.com/products";

async function main() {
  const [method, resource, ...rest] = args;

  if (method === "GET" && resource === "products") {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    return;
  }

  if (method === "GET" && resource.startsWith("products/")) {
    const id = resource.split("/")[1];
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    console.log(data);
    return;
  }

  if (method === "POST" && resource === "products") {
    const [title, price, category] = rest;

    const producto = {
      title,
      price,
      category,
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    const data = await response.json();
    console.log(data);
    return;
  }

  if (method === "DELETE" && resource.startsWith("products/")) {
    const id = resource.split("/")[1];
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    return;
  }

  console.log("Comando no válido");
}

main();
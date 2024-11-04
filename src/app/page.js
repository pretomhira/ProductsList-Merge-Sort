"use client";
import { useState } from "react";

// Merge Sort Function
const mergeSort = (arr, key, order = "asc") => {
  if (arr.length <= 1) return arr;

  const middle = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, middle), key, order);
  const right = mergeSort(arr.slice(middle), key, order);

  return merge(left, right, key, order);
};

const merge = (left, right, key, order) => {
  let result = [];
  let compare;

  while (left.length && right.length) {
    if (order === "asc") {
      compare = left[0][key] <= right[0][key];
    } else {
      compare = left[0][key] >= right[0][key];
    }
    if (compare) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  return [...result, ...left, ...right];
};
export default function Home() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 1200, dateAdded: new Date("2023-10-01") },
    { id: 2, name: "Phone", price: 800, dateAdded: new Date("2023-11-02") },
    { id: 3, name: "Tablet", price: 600, dateAdded: new Date("2023-09-15") },
  ]);

  const [sortParam, setSortParam] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    dateAdded: "",
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.dateAdded) {
      setProducts([
        ...products,
        {
          id: products.length + 1,
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          dateAdded: new Date(newProduct.dateAdded),
        },
      ]);
      setNewProduct({ name: "", price: "", dateAdded: "" });
    }
  };

  const sortedProducts = mergeSort(products, sortParam, sortOrder);
  return (
    <div style={{ padding: "20px" }}>
      <h1>Product List</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Sort by: </label>
        <select
          value={sortParam}
          onChange={(e) => setSortParam(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="dateAdded">Date Added</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <ul>
        {sortedProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} -{" "}
            {product.dateAdded.toLocaleDateString()}
          </li>
        ))}
      </ul>

      <h2>Add New Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
      <input
        type="date"
        value={newProduct.dateAdded}
        onChange={(e) =>
          setNewProduct({ ...newProduct, dateAdded: e.target.value })
        }
      />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

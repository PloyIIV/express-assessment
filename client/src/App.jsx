import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({
    name: "",
    price: 0,
    quantity: 1,
  });

  return (
    <div className="bg-blue-400 min-h-screen text-center">
      <h1 className="font-bold uppercase text-white">Products</h1>
      <form className="w-fit flex flex-col gap-2 mx-auto p-10 rounded-3xl bg-blue-200 text-start font-semibold">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <label htmlFor="price">Price</label>
        <input type="text" id="price" />
        <label htmlFor="quantity">Quantity</label>
        <input type="text" id="quantity" />
      </form>
    </div>
  );
}

export default App;

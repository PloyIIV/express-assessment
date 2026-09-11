import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const url = "http://localhost:5000";
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState({
    name: "",
    price: 0,
    quantity: 1,
  });
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const addProduct = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${url}/products`, data);
    console.log(response);
    if (response.data.success === false) {
      setErrMsg(response.data.message);
    }
    setData({
      name: "",
      price: 0,
      quantity: 1,
    });
    setProducts([...products, response.data.data]);
  };

  const handleEdit = (product) => {
    setEditData({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
    setEditingProduct(product);
    setErrMsg("");
  };

  const updateProduct = async () => {
    try {
      const response = await axios.put(
        `${url}/products/${editingProduct._id}`,
        editData
      );
      console.log(response);
      if (response.data.success === false) {
        setErrMsg(response.data.message);
        return;
      }
      setProducts(
        products.map((product) =>
          product._id === editingProduct._id
            ? {
                ...product,
                name: editData.name,
                price: Number(editData.price),
                quantity: Number(editData.quantity),
              }
            : product
        )
      );
      setEditingProduct(null);
      setEditData({ name: "", price: "", quantity: "" });
      setErrMsg("");
    } catch (error) {
      setErrMsg(error.response?.data?.message || "Something went wrong.");
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(
        `${url}/products/${deleteTarget._id}`
      );
      console.log(response);
      if (response.data.success === false) {
        setErrMsg(response.data.message);
        setDeleteTarget(null);
        return;
      }
      setProducts(products.filter((product) => product._id !== deleteTarget._id));
      setDeleteTarget(null);
      setErrMsg("");
    } catch (error) {
      setErrMsg(error.response?.data?.message || "Something went wrong.");
    }
  };

  const getProduct = async () => {
    setLoading(true);
    const response = await axios.get(`${url}/products?filter=${filter}`);
    setProducts(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="bg-blue-400 min-h-screen text-center">
      <h1 className="font-bold uppercase text-white py-4">ADMIN DASHBOARD</h1>
      <div className="bg-blue-200 py-4">
        <input
          type="text"
          className="bg-blue-50 w-1/2"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
        <button
          onClick={() => getProduct()}
          className="border bg-amber-400 rounded-xl px-2 py-1 ml-1 font-semibold"
        >
          Search
        </button>
      </div>
      <div className="my-4">
        <h2>Add Product</h2>
        <form className="w-1/3 flex flex-col gap-2 mx-auto p-10 rounded-3xl bg-blue-200 text-start font-semibold">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            onChange={(e) => setData({ ...data, price: e.target.value })}
          />
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            onChange={(e) => setData({ ...data, quantity: e.target.value })}
          />
          {errMsg && <p className="text-red-700">*{errMsg}</p>}
          <button
            type="submit"
            onClick={addProduct}
            className="border border-black rounded-xl bg-blue-500 h-10 hover:bg-blue-600 text-white"
          >
            Add Product
          </button>
        </form>
      </div>
      <div>
        <h2>รายการสินค้า</h2>
        <ul className="w-1/3 flex flex-col gap-2 bg-blue-300 p-2 border rounded-2xl mx-auto">
          {!loading ? (
            products.map((item) => {
              return (
                <li
                  key={item._id}
                  className="h-20 bg-blue-200 border rounded-2xl flex items-center justify-between px-4"
                >
                  <p className="font-bold text-xl">{item.name}</p>
                  <div className="flex flex-col items-end">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="w-8 h-8 bg-blue-600 rounded-full"
                      >
                        🗑️
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="w-8 h-8 bg-blue-600 rounded-full"
                      >
                        ✏️
                      </button>
                    </div>
                    <div className="text-end text-sm">
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <p>loading...</p>
          )}
        </ul>
      </div>
      {editingProduct && (
        <div className="fixed z-10 rounded-xl bg-blue-100 w-1/2 h-80 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 shadow-lg shadow-blue-900/15">
          <h3 className="font-bold text-2xl my-4">EDIT PRODUCT</h3>
          <p
            onClick={() => setEditingProduct(null)}
            className="absolute right-4 top-2 font-black cursor-pointer"
          >
            x
          </p>
          {errMsg && <p>{errMsg}</p>}
          <div>
            <p>Name: </p>
            <input
              type="text"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
            <p>Price: </p>
            <input
              type="text"
              value={editData.price}
              onChange={(e) =>
                setEditData({ ...editData, price: e.target.value })
              }
            />
            <p>Quantity: </p>
            <input
              type="text"
              value={editData.quantity}
              onChange={(e) =>
                setEditData({ ...editData, quantity: e.target.value })
              }
            />
          </div>
          <button
            onClick={updateProduct}
            className="font-bold text-white bg-blue-400 border rounded-xl px-4 py-2 mt-4"
          >
            UPDATE
          </button>
          <button
            onClick={() => setEditingProduct(null)}
            className="font-bold text-white bg-blue-600 border rounded-xl px-4 py-2 mt-4 ml-2"
          >
            CANCEL
          </button>
        </div>
      )}
      {deleteTarget && (
        <div className="fixed z-10 rounded-xl bg-blue-100 w-1/2 h-56 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 shadow-lg shadow-blue-900/15">
          <h3 className="font-bold text-2xl my-4">DELETE PRODUCT</h3>
          <p
            onClick={() => setDeleteTarget(null)}
            className="absolute right-4 top-2 font-black cursor-pointer"
          >
            x
          </p>
          <p>Are you sure you want to delete {deleteTarget.name}?</p>
          <button
            onClick={deleteProduct}
            className="font-bold text-white bg-red-500 border rounded-xl px-4 py-2 mt-4"
          >
            DELETE
          </button>
          <button
            onClick={() => setDeleteTarget(null)}
            className="font-bold text-white bg-blue-600 border rounded-xl px-4 py-2 mt-4 ml-2"
          >
            CANCEL
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
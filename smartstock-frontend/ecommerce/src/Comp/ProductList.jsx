
import React, { useState, useEffect } from 'react';
import '../Styles/ProductList.css';

const ProductList = ({ setLogin }) => {

    const [products, setProducts] = useState([]);
    const [pname, setPname] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");

    const columns = [
        {
            header: 'Product Name',
            key: 'pname',
            id: '1'
        },
        {
            header: 'Price',
            key: 'price',
            id: '2'
        },
        {
            header: 'Quantity',
            key: 'quantity',
            id: '3'
        },
        {
            header: 'Actions',
            key: 'action',
            id: '4'
        }
    ];

    // Load products from the backend
    useEffect(() => {
        fetch("http://localhost:8080/api/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                return response.json();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.log(error);
                alert("Could not load products");
            });
    }, []);

    // Logout
    function clicked() {
        setLogin(false);
    }

    // Add or update product
    function handleProduct() {

         if (pname.trim() === "" || price === "" || quantity === "") {
            alert("Please fill all the fields");
            return;
        }

        if (Number(price) <= 0) {
            alert("Price must be greater than zero");
            return;
        }

        if (Number(quantity) <= 0 || !Number.isInteger(Number(quantity))) {
            alert("Quantity must be a positive whole number");
            return;
        }

        const productData = {
            pname: pname.trim(),
            price: Number(price),
            quantity: Number(quantity)
        };

        // Add product
        if (editId === null) {

            fetch("http://localhost:8080/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to add product");
                    }

                    return response.json();
                })
                .then((savedProduct) => {

                    console.log("Saved product:", savedProduct);

                    setProducts((prevProducts) => [
                        ...prevProducts,
                        savedProduct
                    ]);

                    clearFields();
                })
                .catch((error) => {
                    console.log(error);
                    alert("Could not add product");
                });

        } else {

            // Update product
            fetch(`http://localhost:8080/api/products/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to update product");
                    }

                    return response.json();
                })
                .then((updatedProduct) => {

                    setProducts((prevProducts) =>
                        prevProducts.map((p) =>
                            p.id === editId ? updatedProduct : p
                        )
                    );

                    clearFields();
                })
                .catch((error) => {
                    console.log(error);
                    alert("Could not update product");
                });
        }
    }

    // Clear input fields
    function clearFields() {
        setPname("");
        setPrice("");
        setQuantity("");
        setEditId(null);
    }

    // Delete product
    function handleDelete(id) {

        fetch(`http://localhost:8080/api/products/${id}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to delete product");
                }

                setProducts((prevProducts) =>
                    prevProducts.filter((p) => p.id !== id)
                );

                if (editId === id) {
                    clearFields();
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Could not delete product");
            });
    }

    // Load product details into the form
    function handleEdit(id) {

        const selectedProduct = products.find((p) => p.id === id);

        if (selectedProduct) {
            setPname(selectedProduct.pname);
            setPrice(String(selectedProduct.price));
            setQuantity(String(selectedProduct.quantity));
            setEditId(selectedProduct.id);
        }
    }

    // Search products
    const fp = products.filter((p) =>
        p.pname.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='products-page'>

            <h1>SmartStock Products</h1>

            <button onClick={clicked}>Logout</button>

            <p>Manage your inventory</p>

            <input
                type="text"
                placeholder="Enter Product name"
                value={pname}
                onChange={(e) => setPname(e.target.value)}
            />

            <input
                type="number"
                placeholder="Enter Product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <input
                type="number"
                placeholder="Enter Product quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />

            <button onClick={handleProduct}>
                {editId === null ? "Add Product" : "Update Product"}
            </button>

            <input
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className='t-table'>

                <thead className='t-head'>
                    <tr className='t-hrow'>
                        {columns.map((col) => (
                            <th key={col.id} className='table-cell'>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {fp.map((row) => (

                        <tr key={row.id} className='tbody-row'>

                            {columns.map((col) => (

                                <td key={col.id} className="tbody-cell">

                                    {col.key === 'action' ? (

                                        <div className="actionbtn">

                                            <button
                                                onClick={() => handleEdit(row.id)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(row.id)}
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    ) : (

                                        col.key === "price"
                                            ? `₹${row[col.key]}`
                                            : row[col.key]

                                    )}

                                </td>

                            ))}

                        </tr>

                    ))}
                </tbody>

            </table>

        </div>
    );
};

export default ProductList;

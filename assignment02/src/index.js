import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import data from "./data.json";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartView, setIsCartView] = useState(false);

  useEffect(() => {
    setProducts(data);
  }, []);

  const handleQuantityChange = (id, quantity) => {
    setCart((prevCart) => {
      return {
        ...prevCart,
        [id]: Math.max(quantity, 0),
      };
    });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    console.log("Submitted cart:", cart);
  };

  const handleCheckout = () => {
    setIsCartView(true);
  };

  const handleReturn = () => {
    setIsCartView(false);
  };

  return (
    <div className="container">
      {isCartView ? (
        <CartView cart={cart} onReturn={handleReturn} onSubmit={handleSubmit} />
      ) : (
        <>
          <div className="row">
            <div className="col">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={() => setSearchTerm("")}
                >
                  Clear
                </button>
              </form>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col">
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{
                      height: "250px",
                      width: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <span className="card-price">
                        ${product.price.toFixed(2)}
                      </span>
                  </div>
                  <div className="card-footer">
                    <div className="input-group">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() =>
                          handleQuantityChange(
                            product.id,
                            (cart[product.id] || 0) - 1)
                        }
                      >
                        -
                      </button>

                      <input
                        type="number"
                        className="form-control"
                        placeholder="Quantity"
                        value={cart[product.id] || 0}
                        min="0"
                        max={product.stock}
                        readOnly
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() =>
                          handleQuantityChange(
                            product.id,
                            (cart[product.id] || 0) + 1
                          )
                        }
                      >
                        +
                      </button>
                
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CartView({ cart, onReturn, onSubmit }) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    Object.keys(cart).forEach((id) => {
      const product = data.find((p) => p.id === parseInt(id));
      total += product.price * cart[id];
    });
    setTotalPrice(total);
  }, [cart]);

  return (
    <div className="container">
      <h2>Cart</h2>
      {Object.keys(cart).length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(cart).map((id) => {
                const product = data.find((p) => p.id === parseInt(id));
                return (
                  <tr key={id}>
                    <td>{product.name}</td>
                    <td>{cart[id]}</td>
                    <td>{product.price * cart[id]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={onReturn}>
              Return
            </button>
            <button className="btn btn-primary" onClick={onSubmit}>
              Order
            </button>
          </div>
          <p>Total price: ${totalPrice}</p>
        </>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

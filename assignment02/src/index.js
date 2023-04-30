/**
 * Images are in the public folder
 * Video is also in the public folder
 * If you are using vscode you will need to download the video to hear the audio
 */

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
                            (cart[product.id] || 0) - 1
                          )
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
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [formErrors, setFormErrors] = useState({
    fullName: false,
    email: false,
    cardNumber: false,
    address1: false,
    city: false,
    state: false,
    zip: false,
  });

  useEffect(() => {
    let total = 0;
    Object.keys(cart).forEach((id) => {
      const product = data.find((p) => p.id === parseInt(id));
      total += product.price * cart[id];
    });
    setTotalPrice(total);
  }, [cart]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = true;
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      errors.email = true;
    }
    if (
      !formData.cardNumber.trim() ||
      !validateCreditCard(formData.cardNumber)
    ) {
      errors.cardNumber = true;
    }
    if (!formData.address1.trim()) {
      errors.address1 = true;
    }
    if (!formData.city.trim()) {
      errors.city = true;
    }
    if (!formData.state.trim()) {
      errors.state = true;
    }
    if (!formData.zip.trim() || !validateZipCode(formData.zip)) {
      errors.zip = true;
    }
    setFormErrors(errors);

    function validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    function validateCreditCard(creditCardNumber) {
      // Check if the credit card number is a string of 16 digits
      if (/^\d{16}$/.test(creditCardNumber)) {
        return true;
      }
      return false;
    }

    function validateZipCode(zipCode) {
      // Check if the zip code is a string of 5 digits or 5 digits followed by a dash and 4 digits
      if (/^\d{5}(-\d{4})?$/.test(zipCode)) {
        return true;
      }
      return false;
    }

    if (Object.keys(errors).length === 0) {
      // Form data is valid
      onSubmit();
    }
  };

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
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{cart[id]}</td>
                    <td>${(product.price * cart[id]).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="row">
            <div className="col-md-6">
              <h4>Payment information</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.fullName ? "is-invalid" : ""
                    }`}
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                  {formErrors.fullName && (
                    <div className="invalid-feedback">
                      Please enter your full name
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      formErrors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback">
                      Please enter a valid email address
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">
                    Credit card number
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.cardNumber ? "is-invalid" : ""
                    }`}
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                  {formErrors.cardNumber && (
                    <div className="invalid-feedback">
                      Please enter a valid credit card number
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="address1" className="form-label">
                    Address 1
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.address1 ? "is-invalid" : ""
                    }`}
                    id="address1"
                    name="address1"
                    value={formData.address1}
                    onChange={handleInputChange}
                  />
                  {formErrors.address1 && (
                    <div className="invalid-feedback">
                      Please enter your address
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="address2" className="form-label">
                    Address 2 (optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.city ? "is-invalid" : ""
                    }`}
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  {formErrors.city && (
                    <div className="invalid-feedback">
                      Please enter your city
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select
                    className={`form-control ${
                      formErrors.state ? "is-invalid" : ""
                    }`}
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  >
                    <option value="">Select state</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                  {formErrors.state && (
                    <div className="invalid-feedback">
                      Please select your state
                    </div>
                  )}
                </div>
               
                <div className="mb-3">
                  <label htmlFor="zip" className="form-label">
                    Zip code
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.zip ? "is-invalid" : ""
                    }`}
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                  />
                  {formErrors.zip && (
                    <div className="invalid-feedback">
                      Please enter a valid zip code
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Order
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={onReturn}
                >
                  Return
                </button>
              </form>
            </div>
            <div className="col-md-6">
              <h4>Order summary</h4>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>${totalPrice.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Tax</td>
                    <td>${(totalPrice * 0.1).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>${(totalPrice * 1.1).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
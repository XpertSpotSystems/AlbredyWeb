import React, { useState, useEffect } from "react";
import * as MyConstants from "../../Constant/Config";
import swal from "sweetalert";
import { Spinner } from "react-bootstrap";

export default function AddTaggs({ closeModal, edit }) {
  const Outline = {
    boxShadow: "none",
    borderColor: "#398E8B",
    backgroundColor: "transparent",
  };

  // States
  const [product, setProduct] = useState("");
  const [popular, setPopular] = useState("");
  const [featured, setFeatured] = useState("");
  const [Products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(false);

  // Error States
  const [ProductsError, setProductsError] = useState("");
  const [CheckBoxError, setCheckBoxError] = useState("");

  useEffect(() => {
    let data = {
      email: Email,
      token: Token,
    };
    fetch(MyConstants.listProduct, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setProducts(response.products);
        }
      });
    });
  }, []);

  // LoginUserData
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  // checkedPopular
  const checkedPopular = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setPopular("Popular");
    } else {
      setPopular("");
    }
  };

  // checkedFeatured
  const checkedFeatured = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setFeatured("Featured");
    } else {
      setFeatured("");
    }
  };

  // AddData
  const AddData = (e) => {
    setLoading(true);
    if (product === "" || (popular === "" && featured === "")) {
      setLoading(false);
      setProductsError("Product is required!");
      setCheckBoxError("Check atleast one checkbox!");
    } else {
      let data = {
        product: product,
        popular: popular,
        featured: featured,
        email: Email,
        token: Token,
      };
      fetch(MyConstants.addTaggedProduct, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result.json().then((response) => {
          if (response.status == true) {
            setLoading(false);
            closeModal(true);
            edit();
            swal({
              title: "Success!",
              text: "New Tagg Product has been addedd successfully!",
              icon: "success",
              button: "Ok",
            });
          }
        });
      });
    }
  };

  return (
    <div>
      <div className="form-group">
        <label className="form-label" htmlFor="">
          Products
        </label>
        <span style={{ color: "red", marginLeft: "2px" }}>*</span>
        <select
          className="form-control custom-select"
          onChange={(e) => setProduct(e.target.value)}
        >
          <option>Select Product Name</option>
          {Products.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
        {product === "" && (
          <small className="text-danger">{ProductsError}</small>
        )}
      </div>

      <div className="row mb-3">
        <div className="col">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="popular"
              onChange={checkedPopular}
            />
            <label className="custom-control-label" htmlFor="popular">
              <h4>Popular</h4>
            </label>
          </div>
        </div>
        <div className="col">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="featured"
              onChange={checkedFeatured}
            />
            <label className="custom-control-label" htmlFor="featured">
              <h4>Featured</h4>
            </label>
          </div>
        </div>
      </div>
      {popular === "" &&
        (featured === "" ? (
          <small className="text-danger">{CheckBoxError}</small>
        ) : (
          ""
        ))}

      <div className="modal-footer bg-white"></div>
      <div className="form-group float-right">
        <button className="btn btn-sm btn-danger mr-2" onClick={closeModal}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary"
          style={{
            backgroundColor: "#398E8B",
            border: "#398E8B",
            outline: "none",
            boxShadow: "none",
          }}
          onClick={AddData}
        >
          {Loading ? (
            <>
              <Spinner
                animation="border"
                variant="light"
                size="sm"
                className="mr-2"
              />
              Loading...
            </>
          ) : (
            <>Add Tag Product</>
          )}
        </button>
      </div>
    </div>
  );
}

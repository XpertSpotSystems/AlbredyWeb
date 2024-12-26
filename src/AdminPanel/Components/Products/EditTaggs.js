import React, { useState, useEffect } from "react";
import * as MyConstants from "../../Constant/Config";
import axios from "axios";
import swal from "sweetalert";
import { Spinner } from "react-bootstrap";

export default function EditTaggs({
  closeModal,
  edit,
  id,
  product,
  popular,
  featured,
  discount,
}) {
  const Outline = {
    boxShadow: "none",
    borderColor: "#398E8B",
    backgroundColor: "transparent",
  };

  // Login User Data
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  // States
  const [EditTaggProducts, setTaggProducts] = useState({
    id: id,
    product: product,
    popular: popular,
    featured: featured,
    email: Email,
    token: Token,
  });
  const [Loading, setLoading] = useState(false);

  // onInputEditValue
  const onInputEditValue = (e) => {
    setTaggProducts({ ...EditTaggProducts, [e.target.name]: e.target.value });
  };

  // Get Products Data
  const [Products, setProducts] = useState([]);
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

  // checkedPopular
  const checkedPopular = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setTaggProducts({ ...EditTaggProducts, ["popular"]: "Popular" });
    } else {
      setTaggProducts({ ...EditTaggProducts, ["popular"]: "" });
    }
  };

  // checkedFeatured
  const checkedFeatured = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setTaggProducts({ ...EditTaggProducts, ["featured"]: "Featured" });
    } else {
      setTaggProducts({ ...EditTaggProducts, ["featured"]: "" });
    }
  };

  const UpdateData = () => {
    setLoading(true);
    if (
      EditTaggProducts.product === "" ||
      (EditTaggProducts.popular === "" && EditTaggProducts.featured === "")
    ) {
      setLoading(false);
      console.log("Error :: Please fill all fields!");
    } else {
      console.log(EditTaggProducts);
      const formData = new FormData();
      formData.append("id", EditTaggProducts.id);
      formData.append("product", EditTaggProducts.product);
      formData.append("popular", EditTaggProducts.popular);
      formData.append("featured", EditTaggProducts.featured);
      formData.append("email", Email);
      formData.append("token", Token);
      axios.post(MyConstants.updateTaggedProduct, formData).then((result) => {
        if (result.data.status == true) {
          console.log(result.data.message);
          setLoading(false);
          closeModal(true);
          edit();
          swal({
            title: "Success!",
            text: "Tag Product has been updated successfully!",
            icon: "success",
            button: "Ok",
          });
        }
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
          name="product"
          onChange={onInputEditValue}
        >
          {Products.map((item) =>
            EditTaggProducts.product === item.id ? (
              <option value={item.id} selected>
                {item.name}
              </option>
            ) : (
              <option value={item.id}>{item.name}</option>
            )
          )}
        </select>
        {EditTaggProducts.product === "" ? (
          <small className="text-danger">Product is required!</small>
        ) : (
          ""
        )}
      </div>

      <div className="row mb-3">
        <div className="col">
          <div className="custom-control custom-checkbox">
            {EditTaggProducts.popular == "Popular" ? (
              <input
                type="checkbox"
                className="custom-control-input"
                id="popular"
                onChange={checkedPopular}
                checked
              />
            ) : (
              <input
                type="checkbox"
                className="custom-control-input"
                id="popular"
                onChange={checkedPopular}
              />
            )}
            <label className="custom-control-label" htmlFor="popular">
              <h4>Popular</h4>
            </label>
          </div>
        </div>
        <div className="col">
          <div className="custom-control custom-checkbox">
            {EditTaggProducts.featured == "Featured" ? (
              <input
                type="checkbox"
                className="custom-control-input"
                id="featured"
                onChange={checkedFeatured}
                checked
              />
            ) : (
              <input
                type="checkbox"
                className="custom-control-input"
                id="featured"
                onChange={checkedFeatured}
              />
            )}
            <label className="custom-control-label" htmlFor="featured">
              <h4>Featured</h4>
            </label>
          </div>
        </div>
      </div>

      {EditTaggProducts.popular === "" &&
        (EditTaggProducts.featured === "" ? (
          <small className="text-danger">Check atleast one checkbox!</small>
        ) : (
          ""
        ))}

      <div className="modal-footer bg-white"></div>
      <div className="form-group float-right">
        <button
          type="button"
          className="btn btn-sm btn-danger mr-2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={UpdateData}
          style={{
            backgroundColor: "#398E8B",
            border: "#398E8B",
            outline: "none",
            boxShadow: "none",
          }}
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
            <>Update Tag Product</>
          )}
        </button>
      </div>
    </div>
  );
}

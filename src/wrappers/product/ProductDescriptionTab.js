import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ReactHtmlParser from "react-html-parser";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import swal from "sweetalert";
import { Spinner } from "react-bootstrap";

const ProductDescriptionTab = ({ spaceBottomClass, ProductDetail }) => {
  const [Reviews, setReviews] = useState([]);

  // States
  const [Name, setName] = useState("");
  const [EmailAddress, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [Loading, setLoading] = useState(false);

  // ErrorStates
  const [NameError, setNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [MessageError, setMessageError] = useState("");

  // isValidName
  const isValidName = /^[a-zA-Z_ ]+$/;

  // isValidEmail
  const isValidEmail =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

    const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
    const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
    const Email = LoginUser.email;
    const Token = LoginToken;
    const UserID = LoginUser.id;

  // GetReviewsData
  const GetReviewsData = () => {
    let data = {
      email: Email,
      token: Token,
    };

    fetch(MyConstants.listReview, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        if (response.status == true) {
          setReviews(response.reviews);
        }
      });
    });
  };

  useEffect(() => {
    GetReviewsData();
  }, []);

  // RESET FORM DATA
  const ResetFormData = () => {
    setName("");
    setNameError("");
    setEmail("");
    setEmailError("");
    setMessage("");
    setMessageError("");
  };

  // AddData
  const SubmitForm = (event) => {
    setLoading(true);
    if (
      EmailAddress === "" ||
      Name === "" ||
      Message === "" ||
      !Name.match(isValidName) ||
      !EmailAddress.match(isValidEmail)
    ) {
      setLoading(false);
      setNameError([
        "Name is required!",
        "Invalid name it containes minimum 3 characters!",
        "Invalid name it containes maximum 20 characters!",
        "Invalid name only letters are allowed!",
      ]);
      setEmailError([
        "Email Address is required!",
        "Invalid email address! Only letters (a-z), numbers (0-9) and period (.) are allowed!",
      ]);
      setMessageError("Message is required!");
    } else {
      let data = {
        name: Name,
        email: EmailAddress,
        message: Message,
        user_id: UserID,
      };
      fetch(MyConstants.addReview, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => {
          result.json().then((response) => {
            if (response.status == true) {
              console.log("Response ===", response);
              setLoading(false);
              GetReviewsData();
              event.preventDefault(); // 👈️ prevent page refresh
              swal({
                title: "Success!",
                text: "New review has been addedd successfully!",
                icon: "success",
                button: "Ok",
              });
            }
          });
        })
        .finally(ResetFormData());
    }
  };

  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link eventKey="productReviews">
                  Reviews({Reviews.length})
                </Nav.Link>
              </Nav.Item> */}
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="productDescription">
                {ReactHtmlParser(ProductDetail.detail)}
              </Tab.Pane>
              {/* <Tab.Pane eventKey="productReviews">
                <div className="row">
                  <div className="col-lg-7">
                    {Reviews.map((item, index) => (
                      <div className="review-wrapper" key={index}>
                        <div className="single-review">
                          <div className="review-img">
                            <img
                              src={MyConstants.SecondImageUrl + `${item.image}`}
                              className="rounded-circle"
                              style={{
                                height: "70px",
                                width: "70px",
                                borderRadius: "50%",
                              }}
                              alt=""
                            />
                          </div>
                          <div className="review-content">
                            <div className="review-top-wrap">
                              <div className="review-left">
                                <div className="review-name">
                                  <h4>{item.name}</h4>
                                </div>
                                <div className="review-rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                              </div>
                              </div>
                              <div className="review-left">
                                <button>Reply</button>
                              </div>
                            </div>
                            <div className="review-bottom">
                              <p>{item.message}</p>
                            </div>
                          </div>
                        </div>
                        <div className="single-review child-review">
                          <div className="review-img">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/img/testimonial/messageer.png"
                              }
                              alt=""
                            />
                          </div>
                          <div className="review-content">
                            <div className="review-top-wrap">
                              <div className="review-left">
                                <div className="review-name">
                                  <h4>White Lewis</h4>
                                </div>
                                <div className="review-rating">
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                </div>
                              </div>
                              <div className="review-left">
                                <button>Reply</button>
                              </div>
                            </div>
                            <div className="review-bottom">
                              <p>
                                Vestibulum ante ipsum primis aucibus orci
                                luctustrices posuere cubilia Curae Suspendisse
                                viverra ed viverra. Mauris ullarper euismod
                                vehicula. Phasellus quam nisi, congue id nulla.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="col-lg-5">
                    <div className="ratting-form-wrapper pl-50">
                      <h3>Add a Review</h3>
                      <div className="ratting-form">
                        <form>
                          <div className="star-box">
                            <span>Your rating:</span>
                            <div className="ratting-star">
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-md-6">
                              <div className="rating-form-style mb-10">
                                <input
                                  placeholder="Name"
                                  type="text"
                                  name="name"
                                  value={Name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                                {Name === "" ? (
                                  <small className="text-danger">
                                    {NameError[0]}
                                  </small>
                                ) : Name.length < 3 ? (
                                  <small className="text-danger">
                                    {NameError[1]}
                                  </small>
                                ) : Name.length > 20 ? (
                                  <small className="text-danger">
                                    {NameError[2]}
                                  </small>
                                ) : !Name.match(isValidName) ? (
                                  <small className="text-danger">
                                    {NameError[3]}
                                  </small>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="rating-form-style mb-10">
                                <input
                                  placeholder="Email"
                                  type="email"
                                  name="email"
                                  value={EmailAddress}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                {EmailAddress === "" ? (
                                  <small className="text-danger">
                                    {EmailError[0]}
                                  </small>
                                ) : !EmailAddress.match(isValidEmail) ? (
                                  <small className="text-danger">
                                    {EmailError[1]}
                                  </small>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="rating-form-style form-submit">
                                <textarea
                                  placeholder="Message"
                                  className="mb-0"
                                  value={Message}
                                  name="message"
                                  onChange={(e) => setMessage(e.target.value)}
                                />
                                {Message === "" ? (
                                  <small className="text-danger">
                                    {MessageError}
                                  </small>
                                ) : (
                                  ""
                                )}
                                <br />

                                <button
                                  type="button"
                                  className="mt-2"
                                  onClick={SubmitForm}
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
                                    <>Submit</>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane> */}
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductDescriptionTab;

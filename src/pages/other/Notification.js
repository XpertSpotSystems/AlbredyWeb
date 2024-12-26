import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Col, Row, Form, Button, Card } from "react-bootstrap";
import { FaCube } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdNotificationsOff } from "react-icons/md";

const NOTIFICATION_ARRAY = [
  {
    id: 1,
    sender_name: "Sender Name",
    notification_description: "Notification Description",
    icon: <IoMdNotificationsOutline className="Icon" />,
    time: "08:21 AM",
    date: "05 Sept, 2022",
  },
];

// Styling
const CustomStyle = makeStyles({
  SaveButton: {
    background: "#398E8B",
    color: "#fff",
    padding: "6px 30px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },
});

const Notification = ({ location }) => {
  const { pathname } = location;
  //   StylingClasses
  const StylingClasses = CustomStyle();

  return (
    <Fragment>
      <MetaTags>
        <title>Albredy || Notification</title>
        <meta
          name="description"
          content="Notification of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Notification
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="checkout-area pt-30 pb-100">
          <div className="container">
            {NOTIFICATION_ARRAY && NOTIFICATION_ARRAY.length >= 1 ? (
              <>
                {NOTIFICATION_ARRAY &&
                  NOTIFICATION_ARRAY.map((item, index) => (
                    <>
                      <div className=" d-flex justify-content-center">
                        <p className="bg-dark p-2 rounded shadow-sm mb-2 text-light">
                          {item.date}
                        </p>
                      </div>
                      <Card
                        className="border-0 shadow_lg p-3 w-100 mt-2"
                        key={index}
                      >
                        <div className="row">
                          <div className="col-8">
                            <div className="AddressView">
                              <div className="IconView">{item.icon}</div>
                              <div className="Address">
                                <h4 className="mb-0">{item.sender_name}</h4>
                                <h5 className="mb-0 text-muted">
                                  {item.notification_description}
                                </h5>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="d-flex justify-content-end mt-4 text-muted">
                              {item.time}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </>
                  ))}
              </>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center CheckoutEmptyColor">
                    <div className="item-empty-area__icon mb-30">
                      <MdNotificationsOff style={{ fontSize: "100px" }} />
                      <h3 className="text-muted mt-1">
                        There is no notificiation yet.
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* EMAIL LATER */}
        <div className="EmailSubscribe">
          <div className="container">
            <Row>
              <Col md={7} sm={12}>
                <FaCube className="mr-2 Emailicon float-left" />
                <h2 className="EmailHeading">Be the first to know</h2>
                <h5 className="ml-5">
                  Get all the latest information on Events, Sales and Offers.
                </h5>
              </Col>
              <Col className="col-md-5">
                <div className="d-inline-flex justify-content-end">
                  <Form.Control
                    placeholder="Enter Your Email Address"
                    className="EmailInput"
                  />
                  <Button variant="outline-secondary" className="Button">
                    Subscribe
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Notification.propTypes = {
  location: PropTypes.object,
};

export default Notification;

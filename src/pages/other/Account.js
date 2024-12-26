import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { FiUserPlus, FiSettings } from "react-icons/fi";
import { AiOutlineFileText } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Col, Nav, Row, Tab, Form, Button, Card } from "react-bootstrap";
import ProfileForm from "../../components/account/ProfileForm";
import Setting from "../../components/account/Setting";
import { FaCube } from "react-icons/fa";
import Notification from "../../components/account/Notification";
import OrderHistory from "../../components/account/OrderHistory";
import Vouchers from "../../components/account/Vouchers";

const Account = ({ location }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Pet Show || Account</title>
        <meta
          name="description"
          content="Account of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Account
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-60">
          <div className="container">
            <div className="row">
              <div className="col">
                <Card className="border-0 shadow-lg px-4 py-3">
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="profile"
                  >
                    <Row>
                        <Col sm={3} className="TabsSection">
                          <Nav variant="pills" className="flex-column mt-4">
                            <Nav.Item>
                              <Nav.Link eventKey="profile">
                                <FiUserPlus className="UserDropdownListIcon" />
                                <span className="UserDropdownListText">
                                  Profile
                                </span>
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="notifications">
                                <IoMdNotificationsOutline className="UserDropdownListIcon" />
                                <span className="UserDropdownListText">
                                  Notifications
                                </span>
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="order_history">
                                <AiOutlineFileText className="UserDropdownListIcon" />
                                <span className="UserDropdownListText">
                                  Order history
                                </span>
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="vouchers">
                                <BsBook className="UserDropdownListIcon" />
                                <span className="UserDropdownListText">
                                  Vouchers
                                </span>
                              </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                              <Nav.Link eventKey="setting">
                                <FiSettings className="UserDropdownListIcon" />
                                <span className="UserDropdownListText">
                                  Setting
                                </span>
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                      <Col sm={9}>
                        <Tab.Content className="ml-2">
                          <Tab.Pane eventKey="profile">
                            <ProfileForm />
                          </Tab.Pane>
                          <Tab.Pane eventKey="notifications">
                            <Notification />
                          </Tab.Pane>
                          <Tab.Pane eventKey="order_history">
                            <OrderHistory />
                          </Tab.Pane>
                          <Tab.Pane eventKey="vouchers">
                            <Vouchers />
                          </Tab.Pane>
                          <Tab.Pane eventKey="setting">
                            <Setting />
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* EMAIL LATER */}
        {/* <div className="EmailSubscribe">
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
        </div> */}
      </LayoutOne>
    </Fragment>
  );
};

Account.propTypes = {
  location: PropTypes.object,
};

export default Account;

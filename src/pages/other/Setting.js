import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Col, Row, Form, Button, Card } from "react-bootstrap";
import { FaCube } from "react-icons/fa";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const checkBoxStyles = (theme) => ({
  root: {
    "&$checked": {
      color: "#398E8B",
    },
  },
  checked: {},
});

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

const Setting = ({ location }) => {
  const { pathname } = location;
  const [Language, setLanguage] = React.useState("");
  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Albredy || Setting</title>
        <meta
          name="description"
          content="Setting of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Setting
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="container">
          <Card className="border-0 shadow_lg p-4 w-100 my-5 bg-light">
            <div className="row my-4">
              <div className="col-6">
                <div className="mb-20">
                  <FormControl fullWidth variant="standard">
                    <InputLabel id="demo-simple-select-label">
                      Language
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Language}
                      label="Language"
                      onChange={handleChange}
                    >
                      <MenuItem value="english">English</MenuItem>
                      <MenuItem value="arabic">Arabic</MenuItem>
                    </Select>
                  </FormControl>
                  <FormGroup>
                    <FormControlLabel
                      control={<CustomCheckbox size="small" />}
                      label={
                        <Typography style={{ color: "#8B8B8B" }}>
                          Receive push notifications
                        </Typography>
                      }
                      sx={{
                        color: "red",
                      }}
                    />
                  </FormGroup>

                  <div className="row mt-2">
                    <div className="col">
                      <Form.Text className="text-dark fw-500">
                        <h5>Receive latest offers & promotion by: </h5>
                      </Form.Text>
                      <FormGroup>
                        <FormControlLabel
                          control={<CustomCheckbox size="small" />}
                          label={
                            <Typography style={{ color: "#8B8B8B" }}>
                              Email Address
                            </Typography>
                          }
                          sx={{
                            color: "red",
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<CustomCheckbox size="small" />}
                          label={
                            <Typography style={{ color: "#8B8B8B" }}>
                              Mobile SMS
                            </Typography>
                          }
                          sx={{
                            color: "red",
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<CustomCheckbox size="small" />}
                          label={
                            <Typography style={{ color: "#8B8B8B" }}>
                              Receive push Whatsapp
                            </Typography>
                          }
                          sx={{
                            color: "red",
                          }}
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
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

Setting.propTypes = {
  location: PropTypes.object,
};

export default Setting;

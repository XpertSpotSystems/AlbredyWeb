import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Container, Row, Col } from "react-bootstrap";
// import Accordion from "react-bootstrap/Accordion";

const Faq = ({ location }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Albredy || FAQs</title>
        <meta
          name="description"
          content="404 page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        FAQs
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* Main */}
        <Container fluid className="py-5 px-5">
          <Row>
            <Col>
            </Col>
          </Row>
        </Container>
      </LayoutOne>
    </Fragment>
  );
};

Faq.propTypes = {
  location: PropTypes.object,
};

export default Faq;

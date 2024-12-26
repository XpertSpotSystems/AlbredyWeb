import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Container, Row, Col } from "react-bootstrap";

const HelpCenter = ({ location }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Albredy || Help Center</title>
        <meta
          name="description"
          content="404 page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Help Center
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* Main */}
        <Container fluid className="py-5 px-5">
          <Row>
            <Col>
              <h3 className="HelpCenterHeadings">
                Call our customer service team:
              </h3>
              <p className="HelpCenterSubHeadings">
                If you are new to the internet, or would like to discuss your
                order with us call us on 800-DELIGHT (3354448) We are online
                from 8 am - 9 pm Monday-Saturday and 9 am - 9 pm on Sunday and
                we'd be happy to help.
              </p>

              <h3 className="HelpCenterHeadings">Email:</h3>
              <p className="HelpCenterSubHeadings">
                If you're having difficulty placing a new order or you want to
                check the status of your pending order, you can e-mail us at
                info@albredy.com. Please remember that if you are emailing
                about an existing order, to mention the order number in the
                email subject box, as this will help us attend to your query
                much quicker! You will find your order number on the top
                right-hand side of the confirmation we sent you.
              </p>

              <h3 className="HelpCenterHeadings">Comments and feedback:</h3>
              <p className="HelpCenterSubHeadings">
                Opinions matter to us, particularly yours. So, if you think we
                can do something better or you have an idea that you think will
                help improve our product portfolio or services - let us know!
                info@albredy.com
              </p>

              <h3 className="HelpCenterHeadings">We undertake:</h3>
              <p className="HelpCenterSubHeadings">
                To deal with your feedback fairly, confidentially and
                effectively. To acknowledge your complaint within 48 hours and
                provide a likely timescale for resolving it. To keep you updated
                on progress made.
              </p>
            </Col>
          </Row>
        </Container>
      </LayoutOne>
    </Fragment>
  );
};

HelpCenter.propTypes = {
  location: PropTypes.object,
};

export default HelpCenter;

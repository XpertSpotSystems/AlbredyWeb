import React, { Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaTruck } from "react-icons/fa";

export default function HomeProducts() {
  return (
    <Fragment>
      <div className="ml-3">
        <Row className="my-5">
          <Col sm={4}>
            <Skeleton width={300} height={300} />
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}

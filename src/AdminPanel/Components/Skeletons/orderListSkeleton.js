import React, { Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaTruck } from "react-icons/fa";

export default function OrderListSkeleton(props) {
  //   if (!props.open) return null;
  //   else
  return (
    <Fragment>
      {/*<SkeletonTheme baseColor="#202020" highlightColor="#444">*/}
      <div className="container">
        <Row style={{ marginTop: "80px" }}>
          <Col>
            <Skeleton height={100} />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="col-4">
            <Skeleton height={40} />
          </Col>
          <Col className="col-4"></Col>
          <Col className="col-4">
            <Skeleton height={40} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Skeleton height={70} count={5} />
          </Col>
        </Row>
      </div>
      {/*</SkeletonTheme>*/}
      {/* <Col>
            <Skeleton count={1} />
            <Skeleton count={1} />
            <Skeleton count={1} />
            <Skeleton count={1} />

            <Skeleton duration={1} />
            <Skeleton count={1} />

            <hr />
            <Skeleton count={5} />
            <hr />

            <Skeleton count={1} />
            <Skeleton count={1} />
            <Skeleton count={1} />
            <Skeleton count={1} />

            <Skeleton count={1} />
            <Skeleton count={1} />
          </Col> */}
    </Fragment>
  );
}

import React, { Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaTruck } from "react-icons/fa";

export default function DashBoardSkeleton(props) {
  //   if (!props.open) return null;
  //   else
  return (
    <Fragment>
      {/*<SkeletonTheme baseColor="#202020" highlightColor="#444">*/}
      <div className="container">
        <Row className="my-2">
          <Col style={{ marginTop: "80px" }}>
            <Skeleton height={100} />
          </Col>
        </Row>
        <Row className="my-1">
          <Col>
            <Skeleton height={120} />
          </Col>
          <Col>
            <Skeleton height={120} />
          </Col>
        </Row>
        <Row className="my-1">
          <Col>
            <Skeleton height={120} />
          </Col>
          <Col>
            <Skeleton height={120} />
          </Col>
        </Row>
        <Row className="my-1">
          <Col>
            <Skeleton height={120} />
          </Col>
          <Col>
            <Skeleton height={120} />
          </Col>
        </Row>
        <Row className="my-2" style={{ marginBottom: "20px" }}>
          <Col>
            <Skeleton height={100} />
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

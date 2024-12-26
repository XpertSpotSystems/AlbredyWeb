import React, {Fragment} from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaTruck } from 'react-icons/fa'

export default function SkeletonProductDetail() {
    return (
        <Fragment>
    {/*<SkeletonTheme baseColor="#202020" highlightColor="#444">*/}
                <div className="container">
                    <Row className="my-5">
                        <Col>
                            <Skeleton height={300} />
                        </Col>
                        <Col>
                            <Skeleton  count={1} />
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
                        </Col>
                    </Row>
                </div>
    {/*</SkeletonTheme>*/}
        </Fragment>
    );
};
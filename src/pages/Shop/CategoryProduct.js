import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getSortedProducts } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import HomeProducts from "../../Skeletons/HomeProducts";
import { Col, Row, Spinner } from "react-bootstrap";
import Vector1 from "../../assets/img/Vector_1.png";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    justifyContent: "center",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const CategoryProducts = ({ location }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedProducts, setSortedProducts] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const pageLimit = 9;
  const { pathname } = location;
  const split = pathname.split("/");
  const Location = useLocation();

  const id = Location.state.category_id;
  const [CategoryProducts, setCategoryProducts] = useState([]);
  const [SearchInputValue, setSearchInputValue] = useState("");
  const [FilteredResults, setFilteredResults] = useState([]);
  // let ctgid = split[2];
  const [SelectedCategoryProducts, setSelectedCategoryProducts] = useState(0);
  const [FilteredData, setFilteredData] = useState([]);
  const [products, setProducts] = useState([]);
  const [ProductTitle, setProductTitle] = useState("");
  const [AllProducts, setAllProducts] = useState([]);

  // GetCurrencySymbol
  const general_set = JSON.parse(localStorage.getItem("general_set"));

  // GetProductsData
  const GetProductsData = () => {
    setOpen(true);

    fetch(MyConstants.listProductFront, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((response) => {
        if (response.status == true) {
          setOpen(false);
          setProducts(response.products);
        }
      });
    });
  };

  useEffect(() => {
    setSelectedCategoryProducts(id);
    GetProductsData();
  }, [id]);
  console.log("id 48 ::", SelectedCategoryProducts);

  /// SearchItems
  // const SearchItems = (searchValue) => {
  //   // console.log("SearchItems ::", searchValue);

  //   setSearchInput(searchValue);

  //   if (SearchInput !== "") {
  //     const FilteredData = CategoryProducts.filter((item) => {
  //       return Object.values(item).join("").toLowerCase().includes(SearchInput);
  //     });
  //     setFilteredResults(FilteredData);
  //   } else {
  //     setFilteredResults(CategoryProducts);
  //   }
  // };

  // console.log("FilteredResults ::", FilteredResults);

  const LoginUser = JSON.parse(sessionStorage.getItem("LOGIN_USER"));

  let Name = "";
  let Email = "";

  if (LoginUser) {
    Name = LoginUser.name;
    Email = LoginUser.email;
  } else {
    console.log("User Not Login!!!");
  }

  // useEffect(() => {
  //     // const FilteredData = products.filter((item) => {
  //     //   if (Object.values(item).includes(SelectedCategoryProducts)) {
  //     //     return item;
  //     //   }
  //     // });
  //     let FilteredData = [];
  //     // let bool = false;

  //     console.log("ccc ::::",CategoryProducts)
  //     console.log("iiiidddd",SelectedCategoryProducts);
  //     CategoryProducts.map((item) => {
  //         if (item.category == SelectedCategoryProducts) {
  //           FilteredData.push(item);
  //         }
  //       });
  //     console.log("FilteredData ::", FilteredData);
  //     setFilteredData(FilteredData)

  // }, [SelectedCategoryProducts]);

  useEffect(() => {
    // let data = {
    //   category_id: split[2],
    // };
    setOpen(true);
    fetch(MyConstants.listProductFront, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((response) => {
        if (response.status == true) {
          setCategoryProducts(response.products);
          setOpen(false);
        }
      });
    });
  }, []);

  // console.log("CategoryProducts 1 ==>", CategoryProducts);

  let CategoryName = "";
  for (let index = 0; index < CategoryProducts.length; index++) {
    if (id === CategoryProducts[index]["category"]) {
      const element = CategoryProducts[index]["ctgname"];
      CategoryName = element;
    }
  }

  console.log("CategoryNamCategoryPage ::", CategoryName);
  console.log("ProductTitleCategoryPage ::", ProductTitle);

  return (
    <Fragment>
      <MetaTags>
        <title>Albredy || Category Products</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        {/* {CategoryName ? CategoryName : ProductTitle ? ProductTitle : ""} Food Products */}
        {ProductTitle ? ProductTitle : CategoryName + " Food Products"}
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-50 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar
                  SelectedCategoryProducts={SelectedCategoryProducts}
                  setSearchInputValue={setSearchInputValue}
                  setSelectedCategoryProducts={setSelectedCategoryProducts}
                  sideSpaceClass="mr-30"
                  setAllProducts={setAllProducts}
                  setProductTitle={setProductTitle}
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {CategoryProducts ? (
                  <>
                    <Backdrop className={classes.backdrop} open={open}>
                      <CircularProgress color="inherit" />
                    </Backdrop>
                    <ShopProducts
                      Products={products}
                      SearchInputValue={SearchInputValue}
                      SelectedCategoryProducts={SelectedCategoryProducts}
                      AllProducts={AllProducts}
                      currency_symbol={general_set.currency_symbol}
                    />
                  </>
                ) : (
                  <Row>
                    <Col sm="12">
                      <img
                        src={Vector1}
                        alt="Vector1Image"
                        width={150}
                        className="mx-auto d-block"
                      />
                      <h4 className="NotFoundText">No Products Found!</h4>
                    </Col>
                  </Row>
                )}
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

CategoryProducts.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(CategoryProducts);

import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
// import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getSortedProducts } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import * as MyConstants from "../../AdminPanel/Constant/Config";
// import HomeProducts from "../../Skeletons/HomeProducts";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Vector1 from "../../assets/img/Vector_1.png";
import { Col, Row, Spinner } from "react-bootstrap";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "../../components/Portal/Modal";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    justifyContent: "center",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Shop = ({ location }) => {
  // const pageLimit = 9;
  const { pathname } = location;
  const [products, setProducts] = useState([]);
  const [AllProducts, setAllProducts] = useState([]);
  const [SelectedCategoryProducts, setSelectedCategoryProducts] = useState(0);
  const [FilteredData, setFilteredData] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [SearchInputValue, setSearchInputValue] = useState("");
  const [ProductTitle, setProductTitle] = useState("");
  const [FilteredResults, setFilteredResults] = useState([]);

  // GetCurrencySymbol
  const general_set = JSON.parse(localStorage.getItem("general_set"));

  // SearchItems
  // const SearchItems = (searchValue) => {

  //   SearchInput(searchValue);

  //   console.log('searchValue ::', searchValue)

  //   if (SearchInput !== "") {
  //     const FilteredData = products.filter((item) => {
  //       return Object.values(item).join("").toLowerCase().includes(SearchInput);
  //     });
  //     setFilteredData(FilteredData);
  //   } else {
  //     setFilteredData(products);
  //   }
  // };

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
          setProducts(response.products);
          setOpen(false);
        }
      });
    });
  };

  // useEffect(() => {
  // const FilteredData = products.filter((item) => {
  //   if (Object.values(item).includes(SelectedCategoryProducts)) {
  //     return item;
  //   }
  // });
  //     let FilteredData = [];

  //     products.map((item) => {
  //         if (item.category == SelectedCategoryProducts) {
  //           FilteredData.push(item);
  //         }
  //       });
  //     console.log("FilteredData ::", FilteredData);
  //     setFilteredData(FilteredData);
  // }, [SelectedCategoryProducts]);

  useEffect(() => {
    GetProductsData();
    // setProductTitle('Shop')
  }, [ProductTitle]);

  // let FilteredRecord = [];

  //   console.log('ddd', products)

  //   products.map((item) => {
  //     if(SelectedCategoryProducts == 0) {
  //       FilteredRecord.push(item);
  //     }
  //   });
  //   setFilteredData(FilteredRecord);

  console.log("ProductTitleShop ::", ProductTitle);

  return (
    <Fragment>
      <Modal open={false} />
      <MetaTags>
        <title>Albredy || Shop</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        {ProductTitle ? ProductTitle : "Shop"}
        {/* Shop */}
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
                  Products={products}
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
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
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Shop.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(Shop);

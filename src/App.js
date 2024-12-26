import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy, useState } from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "./helpers/scroll-top";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";

// UI PAGES ADMIN PANEL
import Dashview from "./AdminPanel/Components/Dashview";
import ListOrders from "./AdminPanel/Components/Orders/ListOrders";
import OrdersDetail from "./AdminPanel/Components/Orders/OrdersDetail";
import Accounts from "./AdminPanel/Components/Accounts";
import AddAccount from "./AdminPanel/Components/Accounts/AddAccount";
import EditAccount from "./AdminPanel/Components/Accounts/EditAccount";
import Return from "./AdminPanel/Components/Return/index";
import AddReturn from "./AdminPanel/Components/Return/AddReturn";
import EditReturn from "./AdminPanel/Components/Return/EditReturn";
import ListSellers from "./AdminPanel/Components/Users/ListSellers";
import AddRider from "./AdminPanel/Components/Riders/AddRider";
import ListRiders from "./AdminPanel/Components/Riders/ListRiders";
import EditRider from "./AdminPanel/Components/Riders/EditRider";
// import Rights from "./AdminPanel/Components/Rights";
// import Role from "./AdminPanel/Components/Role";
// import Permissions from "./AdminPanel/Components/Permissions";
import Categories from "./AdminPanel/Components/Categories/Categories";
import SubCategories from "./AdminPanel/Components/SubCategories/SubCategories";
import Brands from "./AdminPanel/Components/Brands/Brands";
import Units from "./AdminPanel/Components/Units/Units";
// import Variants from "./AdminPanel/Components/Variants/Variants";
import GeneralSettings from "./AdminPanel/Components/GeneralSettings/GeneralSettings";
import Currency from "./AdminPanel/Components/Currency/Currency";
// import TextRates from "./AdminPanel/Components/TextRates/TextRates";
// import Stores from "./AdminPanel/Components/Stores/Stores";
import ListProducts from "./AdminPanel/Components/Products/ListProducts";
import AddProducts from "./AdminPanel/Components/Products/AddProducts";
import EditProducts from "./AdminPanel/Components/Products/EditProducts";
import TaggedProducts from "./AdminPanel/Components/Products/TaggedProducts";
import ListUsers from "./AdminPanel/Components/Users/ListUsers";
import AddUsers from "./AdminPanel/Components/Users/AddUsers";
import EditUsers from "./AdminPanel/Components/Users/EditUsers";
import EditSellers from "./AdminPanel/Components/Users/EditSellers";
import ListCustomers from "./AdminPanel/Components/Customers/ListCustomers";
import AddCustomers from "./AdminPanel/Components/Customers/AddCustomers";
import EditCustomers from "./AdminPanel/Components/Customers/EditCustomers";
import ListSuppliers from "./AdminPanel/Components/Suppliers/ListSuppliers";
import EditSuppliers from "./AdminPanel/Components/Suppliers/EditSuppliers";
import AddSuppliers from "./AdminPanel/Components/Suppliers/AddSuppliers";
import ListSales from "./AdminPanel/Components/Sales/ListSales";
import AddSales from "./AdminPanel/Components/Sales/AddSales";
import EditSales from "./AdminPanel/Components/Sales/EditSales";
import ListPurchase from "./AdminPanel/Components/Purchase/ListPurchase";
import AddPurchase from "./AdminPanel/Components/Purchase/AddPurchase";
import EditPurchase from "./AdminPanel/Components/Purchase/EditPurchase";
import ListExpense from "./AdminPanel/Components/Expenses/ListExpense";
import AddExpense from "./AdminPanel/Components/Expenses/AddExpense";
import EditExpense from "./AdminPanel/Components/Expenses/EditExpense";
import Contact from "./AdminPanel/Components/Contact";
import ProtectedRoute from "./ProtectedRoute";
import PurchaseDetails from "./AdminPanel/Components/Purchase/PurchaseDetail";
import Reports from "./AdminPanel/Components/Reports/Reports";

// UI PAGES FRONTEND
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/shop-product/ProductDetail"));
const CategoryProduct = lazy(() => import("./pages/Shop/CategoryProduct"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Cart = lazy(() => import("./pages/other/Cart"));
const HelpCenter = lazy(() => import("./pages/other/HelpCenter"));
const Faq = lazy(() => import("./pages/other/Faq"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const PreviousAddress = lazy(() => import("./pages/PreviousAddress"));
const OrderSummary = lazy(() => import("./pages/other/OrderSummary"));
const Success = lazy(() => import("./pages/other/Success"));
const ContactUs = lazy(() => import("./pages/other/ContactUs"));
const Profile = lazy(() => import("./pages/other/Profile"));
const OrderHistory = lazy(() => import("./pages/other/OrderHistory"));
const OrderHistoryDetail = lazy(() =>
  import("./pages/other/OrderHistoryDetail")
);
const Setting = lazy(() => import("./pages/other/Setting"));
const Vouchers = lazy(() => import("./pages/other/Vouchers"));
const Notification = lazy(() => import("./pages/other/Notification"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetails = lazy(() => import("./pages/Blog/BlogDetailsStandard"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const CreateNewPassword = lazy(() => import("./pages/Auth/CreateNewPassword"));
const VerifyEmail = lazy(() => import("./pages/Auth/VerifyEmail"));
const NoInternet = lazy(() => import("./pages/other/NoInternet"));
const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = (props) => {
  // const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    // setOnline(navigator.onLine);

    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json"),
        },
      })
    );
  });

  // // event listeners to update the state
  // window.addEventListener("online", () => {
  //   setOnline(true);
  // });

  // window.addEventListener("offline", () => {
  //   setOnline(false);
  // });

  // const Navigate = useHistory();

  // // const NavigateToNoInternetScreen = () => Navigate.push("/no_internet");
  // const NavigateToNoInternetScreen = () => {
  //   console.log(":: NO_INTERNET_SCREEN ::");
  //   return Navigate.push("/no_internet");
  // };

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                {/* Home */}
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={Home}
                />

                {/* Shop */}
                <Route
                  path={process.env.PUBLIC_URL + "/shop"}
                  component={Shop}
                />

                {/* CategoryProduct */}
                <Route
                  // path={process.env.PUBLIC_URL + "/category_product/:id"}
                  path={process.env.PUBLIC_URL + "/category_product"}
                  component={CategoryProduct}
                />

                {/* Shop Detail */}
                {/* <Route
                  path={process.env.PUBLIC_URL + "/product_detail/:id"}
                  render={(routeProps) => (
                    <ProductDetail
                      {...routeProps}
                      key={routeProps.match.params.id}
                    />
                  )}
                /> */}

                {/* Wishlist */}
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                {/* Cart */}
                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />

                {/* HelpCenter */}
                <Route
                  path={process.env.PUBLIC_URL + "/help_center"}
                  component={HelpCenter}
                />

                {/* Faq */}
                <Route path={process.env.PUBLIC_URL + "/faq"} component={Faq} />

                {/* Checkout */}
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />

                {/* PreviousAddress */}
                <Route
                  path={process.env.PUBLIC_URL + "/previous_address"}
                  component={PreviousAddress}
                />

                {/* OrderSummary */}
                <Route
                  path={process.env.PUBLIC_URL + "/order_summary"}
                  component={OrderSummary}
                />

                {/* Success */}
                <Route
                  path={process.env.PUBLIC_URL + "/success"}
                  component={Success}
                />

                {/* ContactUs */}
                <Route
                  path={process.env.PUBLIC_URL + "/contact_us"}
                  component={ContactUs}
                />

                {/* Profile */}
                <Route
                  path={process.env.PUBLIC_URL + "/profile"}
                  component={Profile}
                />

                {/* OrderHistory */}
                <Route
                  path={process.env.PUBLIC_URL + "/order_history"}
                  component={OrderHistory}
                />

                {/* OrderHistoryDetail */}
                <Route
                  path={process.env.PUBLIC_URL + "/order_history_detail"}
                  component={OrderHistoryDetail}
                />

                {/* Setting */}
                <Route
                  path={process.env.PUBLIC_URL + "/setting"}
                  component={Setting}
                />

                {/* Vouchers */}
                <Route
                  path={process.env.PUBLIC_URL + "/vouchers"}
                  component={Vouchers}
                />

                {/* Notification */}
                <Route
                  path={process.env.PUBLIC_URL + "/notification"}
                  component={Notification}
                />

                {/* Login */}
                <Route
                  path={process.env.PUBLIC_URL + "/login"}
                  component={Login}
                />

                {/* Register */}
                <Route
                  path={process.env.PUBLIC_URL + "/register"}
                  component={Register}
                />

                {/* ForgotPassword */}
                <Route
                  path={process.env.PUBLIC_URL + "/forgot_password"}
                  component={ForgotPassword}
                />

                {/* CreateNewPassword */}
                <Route
                  path={process.env.PUBLIC_URL + "/create_new_password"}
                  component={CreateNewPassword}
                />

                {/* VerifyEmail */}
                <Route
                  path={process.env.PUBLIC_URL + "/verify_email"}
                  component={VerifyEmail}
                />

                {/* Blog */}
                <Route
                  path={process.env.PUBLIC_URL + "/blog"}
                  component={Blog}
                />

                {/* Blog Details */}
                <Route
                  path={process.env.PUBLIC_URL + "/blog_details"}
                  component={BlogDetails}
                />

                {/* Protected Routes */}

                {/* ADMIN PANEL */}
                <ProtectedRoute path="/dashboard" component={Dashview} />

                {/* Rights */}
                {/* <ProtectedRoute path="/rights" component={Rights} /> */}
                {/* Role */}
                {/* <ProtectedRoute path="/role" component={Role} /> */}
                {/* Permissions */}
                {/* <ProtectedRoute path="/permissions" component={Permissions} /> */}

                {/* Categories */}
                <ProtectedRoute
                  exact
                  path="/categories"
                  component={Categories}
                />

                {/* SubCategories */}
                <ProtectedRoute
                  exact
                  path="/sub-categories"
                  component={SubCategories}
                />

                {/* Brands */}
                <ProtectedRoute exact path="/brands" component={Brands} />

                {/* Units */}
                <ProtectedRoute exact path="/units" component={Units} />

                {/* Variants */}
                {/* <ProtectedRoute exact path="/variants" component={Variants} /> */}

                {/* GeneralSettings */}
                <ProtectedRoute
                  exact
                  path="/general-settings"
                  component={GeneralSettings}
                />

                {/* Currency */}
                <ProtectedRoute exact path="/currency" component={Currency} />

                {/* Contact */}
                <ProtectedRoute exact path="/contact" component={Contact} />

                {/* Stores */}
                {/* <ProtectedRoute exact path="/stores" component={Stores} /> */}

                {/* ListProducts */}
                <ProtectedRoute
                  exact
                  path="/list-products"
                  component={ListProducts}
                />

                {/* AddProducts */}
                <ProtectedRoute
                  exact
                  path="/add-product"
                  component={AddProducts}
                />

                {/* EditProducts */}
                <ProtectedRoute
                  exact
                  // path="/edit-product/:id"
                  path="/edit-product"
                  component={EditProducts}
                />

                {/* TaggedProducts */}
                <ProtectedRoute
                  exact
                  path="/tagg-product"
                  component={TaggedProducts}
                />

                {/* Add Rider */}
                <ProtectedRoute exact path="/add-rider" component={AddRider} />

                {/* List Rider */}
                <ProtectedRoute
                  exact
                  path="/list-riders"
                  component={ListRiders}
                />

                {/* Edit Rider */}
                <ProtectedRoute
                  exact
                  path="/edit-rider"
                  component={EditRider}
                />

                {/* Listusers */}
                <ProtectedRoute
                  exact
                  path="/list-users"
                  component={ListUsers}
                />

                {/* AddUsers */}
                <ProtectedRoute exact path="/add-users" component={AddUsers} />

                {/* EditUsers */}
                <ProtectedRoute
                  exact
                  path="/edit-users/:id"
                  component={EditUsers}
                />

                {/* EditSellers */}
                <ProtectedRoute
                  exact
                  path="/edit-sellers/:id"
                  component={EditSellers}
                />

                {/* ListCustomers */}
                <ProtectedRoute
                  exact
                  path="/list-customers"
                  component={ListCustomers}
                />

                {/* AddCustomers */}
                <ProtectedRoute
                  exact
                  path="/add-customers"
                  component={AddCustomers}
                />

                {/* EditCustomers */}
                <ProtectedRoute
                  exact
                  path="/edit-customers/:id"
                  component={EditCustomers}
                />

                {/* ListSuppliers */}
                <ProtectedRoute
                  exact
                  path="/list-suppliers"
                  component={ListSuppliers}
                />

                {/* AddCustomers */}
                <ProtectedRoute
                  exact
                  path="/add-suppliers"
                  component={AddSuppliers}
                />

                {/* EditSuppliers */}
                <ProtectedRoute
                  exact
                  // path="/edit-suppliers/:id"
                  path="/edit-suppliers"
                  component={EditSuppliers}
                />

                {/* ListSales */}
                <ProtectedRoute
                  exact
                  path="/list-sales/"
                  component={ListSales}
                />

                {/* AddSales */}
                <ProtectedRoute exact path="/add-sales/" component={AddSales} />

                {/* EditSales */}
                <ProtectedRoute
                  exact
                  path="/edit-sales/"
                  component={EditSales}
                />

                {/* ListPurchase */}
                <ProtectedRoute
                  exact
                  path="/list-purchase/"
                  component={ListPurchase}
                />

                {/* AddPurchase */}
                <ProtectedRoute
                  exact
                  path="/add-purchase/"
                  component={AddPurchase}
                />

                {/* EditPurchase */}
                <ProtectedRoute
                  exact
                  path="/edit-purchase/"
                  component={EditPurchase}
                />

                {/* PurchaseDetails */}
                <ProtectedRoute
                  exact
                  path="/purchase_detail/"
                  component={PurchaseDetails}
                />

                {/* ListExpense */}
                <ProtectedRoute
                  exact
                  path="/list-expense/"
                  component={ListExpense}
                />

                {/* AddExpense */}
                <ProtectedRoute
                  exact
                  path="/add-expense/"
                  component={AddExpense}
                />

                {/* EditExpense */}
                <ProtectedRoute
                  exact
                  // path="/edit-expense/:id"
                  path="/edit-expense"
                  component={EditExpense}
                />

                {/* ProductDetail */}
                <ProtectedRoute
                  // basename={window.location.protocol + window.location.host}
                  // path="/product-detail/:id"
                  path="/product-detail"
                  component={ProductDetail}
                />

                {/* ListOrders */}
                <ProtectedRoute
                  exact
                  path="/list-orders"
                  component={ListOrders}
                />

                {/* OrdersDetail */}
                <ProtectedRoute
                  exact
                  // path="/orders-detail/:id"
                  path="/orders-detail"
                  component={OrdersDetail}
                />

                {/* ListAccounts */}
                <ProtectedRoute
                  exact
                  path="/list-accounts"
                  component={Accounts}
                />

                {/* AddAccount */}
                <ProtectedRoute
                  exact
                  path="/add-account"
                  component={AddAccount}
                />

                {/* EditAccount */}
                <ProtectedRoute
                  exact
                  path="/edit-account"
                  component={EditAccount}
                />

                {/* ListPayments */}
                <ProtectedRoute
                  exact
                  path="/payment-reports"
                  component={Reports}
                />

                {/* ReturnList */}
                <ProtectedRoute exact path="/list-return" component={Return} />

                {/* AddReturn */}
                <ProtectedRoute
                  exact
                  path="/add-return"
                  component={AddReturn}
                />

                {/* EditReturn */}
                <ProtectedRoute
                  exact
                  path="/edit-return/:id"
                  component={EditReturn}
                />

                {/* Sellers */}
                <ProtectedRoute
                  exact
                  path="/list-sellers"
                  component={ListSellers}
                />

                {/* Not Found */}
                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));

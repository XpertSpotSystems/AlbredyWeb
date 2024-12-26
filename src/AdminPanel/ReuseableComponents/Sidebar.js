import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// Dashboard Css Files
import "../assets/css/dashlite.css";
import "../assets/css/additional_styling.css";
import "../assets/css/theme.css";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { AiOutlineSetting } from "react-icons/ai";
import {
	BsFillCartCheckFill,
	BsArrowDownRightSquare,
	BsBicycle,
} from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdDashboardCustomize, MdManageAccounts } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { CgShoppingBag } from "react-icons/cg";
import { RiFileUserLine } from "react-icons/ri";
import { HiOutlineDocumentText } from "react-icons/hi";
// import { FaCriticalRole } from "react-icons/fa";

import image from "./../images/albredy_logo.png";

function Sidebar() {
	const [is_header_menu_compact, setIsHeaderMenuCompact] = useState(true);

	// Location...
	const location = useLocation();

	// Current Path Name...
	const current_path_name = location.pathname;

	// UseEffect...
	useEffect(() => {
		// Is Header Menu Compact...
		localStorage.setItem("is_header_menu_compact", is_header_menu_compact);
		if (is_header_menu_compact === false) {
			document
				.querySelector("body .nk-sidebar")
				.classList.remove("nk-sidebar-active");
		} else {
			document
				.querySelector("body .nk-sidebar")
				.classList.add("nk-sidebar-active");
		}
	}, [is_header_menu_compact]);

	return (
		<>
			<ProSidebar className="w-100 SidebarBg">
				<Link to="/dashboard">
					<img
						src={image}
						alt=""
						className="m-3"
					/>
				</Link>

					<div className="nk-menu-trigger mr-n2">
					<Link
						to={`${current_path_name}`}
						className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
						data-target="sidebarMenu"
						onClick={() => setIsHeaderMenuCompact(!is_header_menu_compact)}>
						<em className="icon ni ni-arrow-left"></em>
					</Link>
				</div>

				{/* Dashboard */}
				<Menu iconShape="circle">
					<MenuItem icon={<MdDashboardCustomize />}>
						Dashboard
						<Link to="/dashboard" />
					</MenuItem>
					{/* Settings */}
					<Menu iconShape="circle">
						<SubMenu
							title="Settings"
							icon={<AiOutlineSetting />}>
							<MenuItem>
								Categories
								<Link to="/categories" />
							</MenuItem>
							<MenuItem>
								Sub Categories
								<Link to="/sub-categories" />
							</MenuItem>
							<MenuItem>
								Brands
								<Link to="/brands" />
							</MenuItem>
							<MenuItem>
								Units
								<Link to="/units" />
							</MenuItem>
							{/* <MenuItem>
								Variants
								<Link to="/variants" />
								</MenuItem> */}
							<MenuItem>
								General Settings
								<Link to="/general-settings" />
							</MenuItem>
							<MenuItem>
								Currency
								<Link to="/currency" />
							</MenuItem>
							{/* <MenuItem>
								Text Rates
								<Link to="/text-rates" />
								</MenuItem>
								<MenuItem>
									Stores
									<Link to="/stores" />
								</MenuItem> */}
						</SubMenu>
					</Menu>
					{/* products */}
					<Menu iconShape="circle">
						<SubMenu
							title="Products"
							icon={<BsFillCartCheckFill />}>
							<MenuItem>
								List Products
								<Link to="/list-products" />
							</MenuItem>
							<MenuItem>
								Add Products
								<Link to="/add-product" />
							</MenuItem>
							<MenuItem>
								Tagged Products
								<Link to="/tagg-product" />
							</MenuItem>
						</SubMenu>
					</Menu>
					{/* Rider */}
					<Menu iconShape="circle">
						<SubMenu
							title="Riders"
							icon={<BsBicycle />}>
							<MenuItem>
								Add Rider
								<Link to="/add-rider" />
							</MenuItem>
							<MenuItem>
								List Rider
								<Link to="/list-riders" />
							</MenuItem>
						</SubMenu>
					</Menu>
					{/* Sales */}
					{/* <Menu iconShape="circle">
						<SubMenu title="Sales" icon={<FcSalesPerformance />}>
							<MenuItem>
								List Sales
								<Link to="/list-sales" />
							</MenuItem>
							<MenuItem>
								Add Sales
								<Link to="/add-sales" />
							</MenuItem>
						</SubMenu>
						</Menu> */}
					{/* Purchases */}
					<Menu iconShape="circle">
						<SubMenu
							title="Purchases"
							icon={<BiPurchaseTagAlt />}>
							<MenuItem>
								List Purchases
								<Link to="/list-purchase" />
							</MenuItem>
							<MenuItem>
								Add Purchases
								<Link to="/add-purchase" />
							</MenuItem>
							{/* <MenuItem>
								List Expenses
								<Link to="/list-expense" />
								</MenuItem> */}
							{/* <MenuItem>
								Add Expenses
								<Link to="/add-expense" />
								</MenuItem> */}
						</SubMenu>
					</Menu>

					<Menu iconShape="circle">
						<SubMenu
							title="Expense"
							icon={<BiPurchaseTagAlt />}>
							<MenuItem>
								List Expense
								<Link to="/list-expense" />
							</MenuItem>
							<MenuItem>
								Add Expense
								<Link to="/add-expense" />
							</MenuItem>
							{/* <MenuItem>
								List Expenses
								<Link to="/list-expense" />
								</MenuItem> */}
							{/* <MenuItem>
								Add Expenses
								<Link to="/add-expense" />
								</MenuItem> */}
						</SubMenu>
					</Menu>

					{/* ACCOUNTS */}
					<Menu iconShape="circle">
						<SubMenu
							title="Accounts"
							icon={<RiFileUserLine />}>
							<MenuItem>
								Accounts
								<Link to="/list-accounts" />
							</MenuItem>
							<MenuItem>
								Add Accounts
								<Link to="/add-account" />
							</MenuItem>
						</SubMenu>
					</Menu>

					{/* Rights */}
					{/* <Menu iconShape="circle">
						<MenuItem icon={<BsArrowDownRightSquare />}>
							Rights
							<Link to="/rights" />
						</MenuItem>
						</Menu> */}
					{/* Role */}
					{/* <Menu iconShape="circle">
						<MenuItem icon={<FaCriticalRole />}>
							Role
							<Link to="/role" />
						</MenuItem>
						</Menu> */}
					{/* Permissions */}
					{/* <Menu iconShape="circle">
						<MenuItem icon={<FaCriticalRole />}>
							Permissions
							<Link to="/permissions" />
						</MenuItem>
						</Menu> */}
					{/* People */}
					<Menu iconShape="circle">
						<SubMenu
							title="People"
							icon={<FaUsers />}>
							<MenuItem>
								List Users
								<Link to="/list-users" />
							</MenuItem>
							{/* <MenuItem>
								List Sellers
								<Link to="/list-sellers" />
								</MenuItem> */}

							{/* <MenuItem>
								List Customers
								<Link to="/list-customers" />
								</MenuItem>
								<MenuItem>
									Add Customers
									<Link to="/add-customers" />
								</MenuItem> */}

							{/* Suppliers */}
							<MenuItem>
								List Suppliers
								<Link to="/list-suppliers" />
							</MenuItem>
							<MenuItem>
								Add Suppliers
								<Link to="/add-suppliers" />
							</MenuItem>
						</SubMenu>
					</Menu>
					{/* Orders */}
					{/* <Menu iconShape="circle" >
						<SubMenu title="Orders" icon={<CgShoppingBag/>}>
							<MenuItem>List Orders<Link to="/list-orders" /></MenuItem>
							<MenuItem>Add Orders<Link to="/add-orders" /></MenuItem>
						</SubMenu>
						</Menu> */}
					<Menu iconShape="circle">
						<MenuItem icon={<CgShoppingBag />}>
							Orders
							<Link to="/list-orders" />
						</MenuItem>
					</Menu>

					{/* Accounts */}
					{/* <Menu iconShape="circle">
						<SubMenu title="Accounts" icon={<MdManageAccounts />}>
							<MenuItem>
								List Accounts
								<Link to="/list-accounts" />
							</MenuItem>
							<MenuItem>
								Add Accounts
								<Link to="/add-account" />
							</MenuItem>
						</SubMenu>
						</Menu> */}
					{/* Return */}
					{/* <Menu iconShape="circle">
						<SubMenu title="Return" icon={<MdManageAccounts />}>
							<MenuItem>
								List Return
								<Link to="/list-return" />
							</MenuItem>
							<MenuItem>
								Add Return
								<Link to="/add-return" />
							</MenuItem>
						</SubMenu>
						</Menu> */}

					{/* PAYMENT REPORTS */}

					<Menu iconShape="circle">
						<MenuItem icon={<HiOutlineDocumentText />}>
							Reports
							<Link to="/payment-reports" />
						</MenuItem>
					</Menu>

					{/* Contact Us */}
					<MenuItem icon={<MdManageAccounts />}>
						Contact Us
						<Link to="/contact" />
					</MenuItem>

					{/* Rider */}
					{/* <MenuItem icon={<MdManageAccounts />}>
						Rider
						<Link to="/list-rider" />
						</MenuItem> */}
				</Menu>
			</ProSidebar>
		</>
	);
}

export default Sidebar;

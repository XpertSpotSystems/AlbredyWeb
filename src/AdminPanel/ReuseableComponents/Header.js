import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import swal from "sweetalert";
import { Modal } from "react-bootstrap";

// Styling
const CustomStyle = makeStyles({
  LogOutButton: {
    background: "#398E8B",
    color: "#fff",
    padding: "6px 30px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },
  SignOutButton: {
    background: "#398E8B",
    marginTop: "15px",
    color: "#fff",
    width: "50%",
    padding: "6px 30px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },

  CancelButton: {
    color: "#fff",
    marginTop: "5px",
    width: "50%",
    padding: "6px 30px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },
});

export default function Header() {
  //   StylingClasses
  const StylingClasses = CustomStyle();

  //   NAVIGATE
  const NAVIGATE = useHistory();
  const GoToLoginPage = () => NAVIGATE.push("/login");

  // Location...
	const location = useLocation();

	// Current Path Name...
	const current_path_name = location.pathname;

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));

  const Email = LoginUser.email;
  const Name = LoginUser.name;

  // Logout Modal
  const [LogOutModalShow, setLogOutModalShow] = useState(false);
  const [is_header_menu_compact, setIsHeaderMenuCompact] = useState(false);

  const LogOutModalClose = () => setLogOutModalShow(false);
  const LogOutModalOpen = () => setLogOutModalShow(true);

  // LogoutModal
  const LogoutModal = (e) => {
    return setLogOutModalShow(true);
  };

  // LogoutAccount
  const LogoutAccount = () => {
    localStorage.removeItem("LOGIN_USER");
    return GoToLoginPage();
  };

  // Search
  const [searchField, setSearchField] = useState("");

  const handleChange = (e) => {
    var lowerCase = e.target.value.toLowerCase();

    setSearchField(lowerCase);
  };

  // UseEffect...
	useEffect(() => {
		// Is Header Menu Compact...
		localStorage.setItem("is_header_menu_compact", is_header_menu_compact);
		if (is_header_menu_compact) {
			document
				.querySelector("body .nk-sidebar")
				.classList.add("nk-sidebar-active");
		} else {
			document
				.querySelector("body .nk-sidebar")
				.classList.remove("nk-sidebar-active");
		}
	}, [is_header_menu_compact]);

  return (
    <div>
      <div className="container-fluid">
        <div className="nk-header-wrap py-2">
        <div className="nk-menu-trigger d-xl-none ml-n1">
						<Link
							to={`${current_path_name}`}
							className="nk-nav-toggle nk-quick-nav-icon"
							data-target="sidebarMenu" onClick={() => setIsHeaderMenuCompact(!is_header_menu_compact)}>
							<em className="icon ni ni-menu"></em>
						</Link>
					</div>

          <Link
            to="/"
            target="_blank"
            className="btn btn-light text-light font-weight-bold btn-sm d-none d-md-inline-flex"
            style={{
              outline: "none",
              boxShadow: "none",
              background: "#398E8B",
            }}
          >
            <em className="icon ni ni-home" />
            <span>Go To Website</span>
          </Link>

          <div className="ml-auto d-inline-flex">
            <Button
              variant="contained"
              className={StylingClasses.LogOutButton}
              onClick={LogoutModal}
            >
              Sign Out
            </Button>

            <div className="ml-3 mt-2">
              <div className="user-info d-none d-xl-block">
                <div className="user-name">{Name}</div>
                <div className="user-status user-status-unverified">
                  {Email}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* .nk-header-wrap */}

        {/* LogOutModal */}
        {LogOutModalShow === true ? (
          <Modal
            className="fade zoom signout_modal"
            show={LogOutModalOpen}
            onHide={LogOutModalClose}
            backdrop="static"
            centered
          >
            <Modal.Body className="text-center px-5 py-4">
              <p className="SignoutModalHeading">
                Are you sure you want to Sign out?
              </p>
              <div className="d-flex flex-column mx-auto align-center">
                <Button
                  variant="contained"
                  onClick={LogoutAccount}
                  className={StylingClasses.SignOutButton}
                >
                  Sign Out
                </Button>
                <Button
                  variant="contained"
                  className={StylingClasses.CancelButton}
                  onClick={LogOutModalClose}
                >
                  Cancel
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        ) : (
          ""
        )}
      </div>
      {/* .container-fliud */}
    </div>
  );
}

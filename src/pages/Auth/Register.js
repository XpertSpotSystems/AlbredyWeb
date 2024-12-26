import React, { useState } from "react";
import {
	Col,
	Form,
	InputGroup,
	Row,
	Alert,
	DropdownButton,
	Dropdown,
	Spinner,
} from "react-bootstrap";
import {
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	makeStyles,
	Typography,
} from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { AiOutlineEye } from "react-icons/ai";
import { BiEnvelope } from "react-icons/bi";
import { ImMobile } from "react-icons/im";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineUser, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { withStyles } from "@material-ui/core/styles";
// import { useForm } from "react-hook-form";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import Axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";

const checkBoxStyles = (theme) => ({
	root: {
		"&$checked": {
			color: "#398E8B",
		},
	},
	checked: {},
});

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

// Styling
const CustomStyle = makeStyles({
	RegisterButton: {
		background: "#398E8B",
		color: "#fff",
		padding: "6px 30px",
		textTransform: "capitalize",
		width: "50%",
		transition: "all 0.3s ease-in-out",
		"&:hover": {
			background: "#333",
			color: "#fff",
		},
	},
	ModalContinueButton: {
		background: "#398E8B",
		color: "#fff",
		padding: "6px 30px",
		textTransform: "capitalize",
		borderRadius: "30px",
		// width: "50%",
		transition: "all 0.3s ease-in-out",
		"&:hover": {
			background: "#333",
			color: "#fff",
		},
	},
	CloseButton: {
		color: "#000",
		fontSize: "20px",
		cursor: "pointer",
		fontWeight: "bold",
		transition: "all 0.3s ease-in-out",
		"&:hover": {
			color: "#fff",
			background: "#398E8B",
			padding: "0",
			borderRadius: "30px",
		},
	},
});

const Register = () => {
	//   StylingClasses
	const StylingClasses = CustomStyle();

	const [name, setName] = useState("");
	const [name_error, setNameError] = useState("");

	const [contact_no, setContactNo] = useState("");
	const [contact_no_error, setContactNoError] = useState("");

	const [email_address, setEmailAddress] = useState("");
	const [email_address_error, setEmailAddressError] = useState("");

	const [passwordType, setPasswordType] = useState("password");
	const [password, setPassword] = useState("");
	const [password_error, setPasswordError] = useState("");

	const [confirmPasswordType, setConfirmPasswordType] = useState("password");
	const [confirm_password, setConfirmPassword] = useState("");
	const [confirm_password_error, setConfirmPasswordError] = useState("");
	const [isError, setIsError] = useState("");

	const [Loading, setLoading] = useState(false);

	const togglePassword = () => {
		if (passwordType === "password") {
			setPasswordType("text");
			return;
		}
		setPasswordType("password");
	};

	const toggleConfirmPassword = () => {
		if (confirmPasswordType === "password") {
			setConfirmPasswordType("text");
			return;
		}
		setConfirmPasswordType("password");
	};

	const isAuthenticated = sessionStorage.getItem("LOGIN_USER");

	//   NAVIGATE
	const NAVIGATE = useHistory();
	const NavigateToLoginPage = () => NAVIGATE.push("/login");
	const NavigateToDashboard = () => NAVIGATE.push("/dashboard");
	const NavigateToWebsite = () => NAVIGATE.push("/");

	if (isAuthenticated) {
		if (isAuthenticated.role === "user") {
			NavigateToWebsite();
		} else {
			NavigateToDashboard();
		}
	}

	const [success, setSuccess] = useState(false);
	const [emailAlready, setEmailAlready] = useState(false);

	// isValidName
	const isValidName = /^[a-zA-Z_ ]+$/;

	// isValidEmail
	// const isValidEmail =  /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
	const isValidEmail =
		/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

	// isValidPassword
	const isValidPassword =
		// /((?=.*\d)(?=.*[A-Z]).{8,15})/
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,15}$/;

	// /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

	// ContinueModal
	const [ContinueModal, setContinueModal] = useState(false);

	const ContinueModalClose = () => setContinueModal(false);
	const ContinueModalShow = () => setContinueModal(true);

	// ContinueButton
	const ContinueButton = () => {
		ContinueModalClose();
		NavigateToLoginPage();
	};

	// SubmitForm
	const SubmitForm = (event) => {
		setLoading(true);
		if (
			name === "" ||
			email_address === "" ||
			contact_no === "" ||
			password === "" ||
			confirm_password === "" ||
			confirm_password !== password ||
			!name.match(isValidName) ||
			!email_address.match(isValidEmail) ||
			!password.match(isValidPassword)
		) {
			setLoading(false);
			setNameError([
				"Name is required!",
				"Invalid name it containes minimum 3 characters!",
				"Invalid name it containes maximum 20 characters!",
				"Invalid first name only letters are allowed!",
			]);
			setEmailAddressError([
				"Email Address is required!",
				"Invalid email address! Only letters (a-z), numbers (0-9) and period (.) are allowed!",
			]);
			setContactNoError(["Phone No is required!"]);
			setPasswordError([
				"Password is required!",
				"Password must contain at least one uppercase, lowercase, a number or a special character,  minimum 8 characters and maximum 15 charecters",
			]);
			setConfirmPasswordError([
				"Confirm Password is required!",
				"Confrim Password not matched with password!",
			]);
		} else {
			const Parameters = new FormData();
			Parameters.append("name", name);
			Parameters.append("email", email_address);
			Parameters.append("phone", contact_no);

			Parameters.append("password", password);

			const API_URL = MyConstants.RegisterUser;

			Axios({
				method: "POST",
				url: API_URL,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "multipart/form-data",
					Accept: "application/json",
				},
				data: Parameters,
			}).then(function (JsonResponse) {
				console.log("JsonResponse ===", JsonResponse.data.message);
				if (JsonResponse.data.status) {
					setLoading(false);
					event.preventDefault(); // 👈️ prevent page refresh
					setName("");
					setNameError("");
					setEmailAddress("");
					setEmailAddressError("");
					setContactNo("");
					setContactNoError("");
					setPassword("");
					setPasswordError("");
					setConfirmPassword("");
					setConfirmPasswordError("");
					return ContinueModalShow();
				} else {
					setEmailAlready(true);
					setLoading(false);
				}
			});
		}
	};

	return (
		<>
			<div className="container shadow-lg AuthBg">
				<div className="row">
					{/* <div className="offset-1 col-md-7 col-11"> */}
					<div className="offset-lg-1 col-lg-6 col-sm-12">
						<h3 className="text-center fw-500 pt-4">Sign Up</h3>

						{/* {success === true ? (
              <Row className="mt-4 mb-2 px-md-5 px-3">
                <Col>
                  <Alert
                    variant="success"
                    onClose={() => setSuccess(false)}
                    dismissible
                    classname="border-0"
                  >
                    <p>
                      <strong>Success</strong>! "User Registered Successfully."
                    </p>
                  </Alert>
                </Col>
              </Row>
            ) : (
              ""
            )} */}

						{emailAlready === true ? (
							<Row className="mt-4 mb-2 px-md-5 px-3">
								<Col>
									<Alert
										variant="danger"
										onClose={() => setEmailAlready(false)}
										dismissible
										classname="border-0">
										<p>
											<strong>Failed</strong>:"Email
											already exists!"
										</p>
									</Alert>
								</Col>
							</Row>
						) : (
							""
						)}

						<Row className="mt-3">
							{/* Name */}
							<Col>
								<Form.Group>
									<InputGroup>
										<Form.Control
											type="text"
											placeholder="Enter Your Name"
											className="InputField"
											name="name"
											value={name}
											onChange={(e) =>
												setName(e.target.value)
											}
										/>
										<InputGroup.Text className="InputFieldGroup">
											<AiOutlineUser />
										</InputGroup.Text>
									</InputGroup>
									{name === "" ? (
										<small className="text-danger">
											{name_error[0]}
										</small>
									) : name.length < 3 ? (
										<small className="text-danger">
											{name_error[1]}
										</small>
									) : name.length > 20 ? (
										<small className="text-danger">
											{name_error[2]}
										</small>
									) : !name.match(isValidName) ? (
										<small className="text-danger">
											{name_error[3]}
										</small>
									) : (
										""
									)}
								</Form.Group>
							</Col>

							{/* Email Address */}
							<Col>
								<Form.Group>
									<InputGroup>
										<Form.Control
											type="text"
											placeholder="Enter Your Email"
											className="InputField"
											name="email"
											value={email_address}
											onChange={(e) =>
												setEmailAddress(e.target.value)
											}
										/>
										<InputGroup.Text className="InputFieldGroup">
											<BiEnvelope />
										</InputGroup.Text>
									</InputGroup>
									{email_address === "" ? (
										<small className="text-danger">
											{email_address_error[0]}
										</small>
									) : !email_address.match(isValidEmail) ? (
										<small className="text-danger">
											{email_address_error[1]}
										</small>
									) : (
										""
									)}
								</Form.Group>
							</Col>
						</Row>

						<Row className="mt-3">
							{/*Contact Number  */}
							<Col>
								<Form.Group>
									<PhoneInput
										country={"eg"}
										enableSearch={true}
										placeholder="Enter Your Phone Number"
										name="phone"
										value={contact_no}
										onChange={(e) => setContactNo(e)}
									/>
									{contact_no === "" ? (
										<small className="text-danger">
											{contact_no_error}
										</small>
									) : (
										""
									)}
								</Form.Group>
							</Col>
							{/* Password */}
							<Col>
								<Form.Group>
									<InputGroup>
										<Form.Control
											type={passwordType}
											placeholder="Enter Your Password"
											className="InputField"
											defaultValue={password}
											name="password"
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
										/>
										<InputGroup.Text
											className="InputFieldGroup"
											onClick={togglePassword}>
											{passwordType === "password" ? (
												<AiOutlineEyeInvisible />
											) : (
												<AiOutlineEye />
											)}
										</InputGroup.Text>
									</InputGroup>
									{password === "" ? (
										<small className="text-danger">
											{password_error[0]}
										</small>
									) : !password.match(isValidPassword) ? (
										<small className="text-danger">
											{password_error[1]}
										</small>
									) : (
										""
									)}
								</Form.Group>
							</Col>
						</Row>

						<Row className="mt-3">
							{/* Confirm Password */}
							<Col>
								<Form.Group>
									<InputGroup>
										<Form.Control
											type={confirmPasswordType}
											placeholder="Enter Your Confirm Password"
											className="InputField"
											defaultValue={confirm_password}
											name="confirm_password"
											value={confirm_password}
											onChange={(e) =>
												setConfirmPassword(
													e.target.value,
												)
											}
										/>
										<InputGroup.Text
											className="InputFieldGroup"
											onClick={toggleConfirmPassword}>
											{confirmPasswordType ===
											"password" ? (
												<AiOutlineEyeInvisible />
											) : (
												<AiOutlineEye />
											)}
										</InputGroup.Text>
									</InputGroup>
									{confirm_password === "" ? (
										<small className="text-danger">
											{confirm_password_error[0]}
										</small>
									) : confirm_password !== password ? (
										<small className="text-danger">
											{confirm_password_error[1]}
										</small>
									) : (
										""
									)}
								</Form.Group>
							</Col>
							<Col></Col>
						</Row>

						<div className="d-flex justify-content-center my-3">
							<Button
								type="submit"
								variant="contained"
								className={StylingClasses.RegisterButton}
								onClick={SubmitForm}>
								{Loading ? (
									<>
										<Spinner
											animation="border"
											variant="light"
											size="sm"
											className="mr-2"
										/>
										Loading...
									</>
								) : (
									<>Sign Up</>
								)}
							</Button>
						</div>

						<h6 className="text-muted my-2 text-center">
							Already have an account?
							<Link
								to="/login"
								className="ml-1">
								Sign in
							</Link>
						</h6>
					</div>
					<div className="offset-lg-1 col-lg-4 col-sm-12 p-0 d-none d-lg-block">
						<Link to="/">
							<img
								src={
									process.env.PUBLIC_URL +
									"/assets/img/auth_right_image.png"
								}
								alt="RightImage"
								className="float-right"
								height={400}
							/>
						</Link>
					</div>
				</div>
			</div>

			{/* ContinueModal */}
			{ContinueModal === true ? (
				<Modal
					className="fade zoom continue_modal"
					show={ContinueModalShow}
					onHide={ContinueModalClose}
					backdrop="static">
					<Modal.Header className="border-0 m-0 p-0 pt-3 pr-3 justify-content-end">
						<AiOutlineCloseCircle
							className={StylingClasses.CloseButton}
						/>
					</Modal.Header>
					<Modal.Body className="px-3 py-2 my-3">
						<h3 className="ContinueModalHeading">
							Congratulations!
						</h3>

						<img
							src={
								process.env.PUBLIC_URL + "/assets/img/check.png"
							}
							className="img-fluid UpdateProfileCheckImage"
						/>

						<p className="ContinueModalSubHeading">
							You have successfully created your <br /> account.
						</p>
					</Modal.Body>
					<Modal.Footer className="justify-content-center border-0">
						<Button
							variant="contained"
							onClick={ContinueButton}
							className={StylingClasses.ModalContinueButton}>
							Continue
						</Button>
					</Modal.Footer>
				</Modal>
			) : (
				""
			)}
		</>
	);
};

export default Register;

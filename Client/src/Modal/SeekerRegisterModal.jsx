import {} from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "@mui/material/Modal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router";

import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { registerSeeker } from "../Redux/seekerSlice/seekerSlice";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 10,
  p: 3,
};

const SeekerRegisterModal = ({ handleClose, open, handleLogin }) => {
  // const navigate =useNavigate()
  const dispatch = useDispatch();
  SeekerRegisterModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };
  const [error, setError] = useState("");
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { margin: "10px 0", width: "100%" };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      phoneNumber: Yup.string()
        .min(10, "Enter valid Phone Number")
        .max(10, "Enter valid Phone Number")
        .required("Required"),
      password: Yup.string()
        .min(8, "Must be atleast 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      const response = await dispatch(registerSeeker(values));
      console.log(response, "error");
      if (response?.payload?.data?.status == "success") {
        handleClose();
        console.log(response?.payload?.data?.status, "hey");
        toast.success("Registration Successfull Please login to Explore");
        handleLogin("Login");
      } else if (response?.payload?.data?.status == "error") {
        setError(response?.payload?.data?.message);
      }
      console.log(response);
    },
  });
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid sx={style}>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <AddCircleOutlineIcon />
              </Avatar>
              <h2 style={headerStyle}>Signup</h2>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                variant="standard"
                fullWidth
                name="firstName"
                value={formik?.values?.firstName}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                label="First Name"
                placeholder="Enter your First Name"
              />
              {formik?.touched?.firstName && formik?.errors?.firstName ? (
                <Typography variant="caption" color="error">
                  {formik.errors.firstName}
                </Typography>
              ) : null}
              <TextField
                variant="standard"
                fullWidth
                name="lastName"
                value={formik?.values?.lastName}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                label="Last Name"
                placeholder="Enter your Second Name"
              />
              {formik?.touched?.lastName && formik?.errors?.lastName ? (
                <Typography variant="caption" color="error">
                  {formik.errors.lastName}
                </Typography>
              ) : null}
              <TextField
                variant="standard"
                fullWidth
                name="email"
                value={formik?.values?.email}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                label="Email"
                placeholder="Enter your Email"
              />
              {formik?.touched?.email && formik?.errors?.email ? (
                <Typography variant="caption" color="error">
                  {formik.errors.email}
                </Typography>
              ) : null}
              <TextField
                variant="standard"
                fullWidth
                name="phoneNumber"
                value={formik?.values?.phoneNumber}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                label="Phone Number"
                placeholder="Enter your Phone Number"
              />
              {formik?.touched?.phoneNumber && formik?.errors?.phoneNumber ? (
                <Typography variant="caption" color="error">
                  {formik?.errors?.phoneNumber}
                </Typography>
              ) : null}
              <TextField
                variant="standard"
                fullWidth
                type="password"
                name="password"
                value={formik?.values?.password}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                label="Password"
                placeholder="Enter a secure password"
              />
              {formik?.touched?.password && formik?.errors?.password ? (
                <Typography variant="caption" color="error">
                  {formik?.errors?.password}
                </Typography>
              ) : null}
              <TextField
                variant="standard"
                type="password"
                fullWidth
                name="confirmPassword"
                value={formik?.values?.confirmPassword}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                label="Confirm Password"
                placeholder="Please confirm the password"
              />
              {formik?.touched?.confirmPassword &&
              formik?.errors?.confirmPassword ? (
                <Typography variant="caption" color="error">
                  {formik?.errors?.confirmPassword}
                </Typography>
              ) : null}

              <Button
                sx={buttonStyle}
                type="submit"
                variant="contained"
                color="primary"
                disabled={!formik.isValid}
              >
                Sign Up
              </Button>
              {error ? <Typography style={{color:'red',textAlign:'center'}}>{error}</Typography> : ""}
            </form>
          </Paper>
        </Grid>
      </Modal>
    </div>
  );
};

export default SeekerRegisterModal;

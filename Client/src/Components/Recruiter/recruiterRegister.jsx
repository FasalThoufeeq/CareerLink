import {} from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { RegisterRecruiter } from "../../Redux/recuiterSlice/recruiterSlice";
import { Link } from "react-router-dom";
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
  borderRadius: 5,
  p: 3,
};

const RecruiterRegister = () => {
  const [error, setError] = useState("");
  const space = " ";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  RecruiterRegister.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { margin: "10px 0", width: "100%",backgroundColor:'black' };
  const formik = useFormik({
    initialValues: {
      companyName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      companyName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      userName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "Must be atleast 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      const response = await dispatch(RegisterRecruiter(values));
      if (response?.payload?.data?.status == "success") {
        toast.success("Registration Successfull Please login to Explore");
        navigate("/recruiter");
      } else if (response?.payload?.data?.status == "error") {
        setError(response?.payload?.data?.message);
      }
    },
  });
  return (
    <div>
      <Grid sx={style}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineIcon />
            </Avatar>
            <h2 style={headerStyle}>Recruiter Signup</h2>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              variant="standard"
              fullWidth
              name="companyName"
              value={formik?.values?.firstName}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              label="Company Name"
              placeholder="Enter your Company Name"
            />
            {formik?.touched?.companyName && formik?.errors?.companyName ? (
              <Typography variant="caption" color="error">
                {formik.errors.companyName}
              </Typography>
            ) : null}
            <TextField
              variant="standard"
              fullWidth
              name="userName"
              value={formik?.values?.lastName}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              label="User Name"
              placeholder="Enter your User Name"
            />
            {formik?.touched?.userName && formik?.errors?.userName ? (
              <Typography variant="caption" color="error">
                {formik.errors.userName}
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
            style={{backgroundColor:"black"}}
              sx={buttonStyle}
              type="submit"
              variant="contained"
              color="primary"
              disabled={!formik.isValid}
            >
              Sign Up
            </Button>
            {error ? (
              <Typography style={{ color: "red", textAlign: "center" }}>
                {error}
              </Typography>
            ) : (
              ""
            )}
            <Typography style={{ textAlign: "center" }}>
              Do you have an account ?{space}
              <Link
                sx={{
                  marginLeft: 0.5,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                to="/recruiter/login"
              >
                Sign In
              </Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default RecruiterRegister;

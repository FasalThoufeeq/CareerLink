import { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import Modal from "@mui/material/Modal";
import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { googleLoginSeeker, loginSeeker } from "../Redux/seekerSlice/seekerSlice";
import { signInWithGoogle } from "../Common/Firebase";
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
const paperStyle = {
  padding: 20,
  height: "50vh",
  width: 300,
  margin: "15px auto",
};
const buttonStyle = { marginTop: "20px", marginBottom: "10px" };
const avatarStyle = { backgroundColor: "#1bbd7e" };
const space = " ";

const SeekerLoginModal = ({ handleClose, open, handleSignUp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('')
  SeekerLoginModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleSignUp: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };
  const handleGoogleSignIn = async () => {

    try {
      const userDetails = await signInWithGoogle();
      const response=await dispatch(googleLoginSeeker(userDetails))
      if(response?.payload?.data?.status == "success"){
        handleClose();
        toast.success("Google logged in successfully");
        navigate("/");
      }
      
    } catch (err) {
      console.log(err);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "Must be atleast 8 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const response = await dispatch(loginSeeker(values));
      if (response?.payload?.data?.status == "success") {
        handleClose();
        toast.success("logged in successfully");
        navigate("/");
      }else if(response?.payload?.data?.status == "error"){
        setError(response?.payload?.data?.message)
      }
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
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                variant="standard"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Email"
                placeholder="Please enter your email"
                fullWidth
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <Typography variant="caption" color="error">
                  {formik.errors.email}
                </Typography>
              ) : null}
              <TextField
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="standard"
                placeholder="Please enter your password"
                type="password"
                fullWidth
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <Typography variant="caption" color="error">
                  {formik.errors.password}
                </Typography>
              ) : null}
              <Button
                style={buttonStyle}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!formik.isValid}
              >
                Sign In
              </Button>
              {error ? <Typography style={{color:'red',textAlign:'center'}}>{error}</Typography> : ""}
              <Button
                sx={{
                  width: "100%",
                  color: "#ff5c01",
                  marginBottom: 1,
                  border: "1px solid #ff5c01",
                }}
                type="submit"
                variant="outlined"
                color="primary"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
              >
                Sign In with Google
              </Button>
            </form>
            <Typography>
              Do you have an account ?{space}
              <Link
                sx={{
                  marginLeft: 0.5,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onClick={handleSignUp}
              >
                Sign Up
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Modal>
    </div>
  );
};

export default SeekerLoginModal;

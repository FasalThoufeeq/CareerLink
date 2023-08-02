import { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import Modal from "@mui/material/Modal";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ForgotPassEmailSubmit } from "../Redux/seekerSlice/seekerSlice";
import { toast } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 10,
  p: 3,
};
const paperStyle = {
  padding: 20,
  height: "26vh",
  width: 400,
  margin: "15px auto",
};
const buttonStyle = { marginTop: "20px", marginBottom: "10px" };

const ForgotPassEmail = ({ handleClose, open }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('')
  ForgotPassEmail.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleSignUp: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required")
    }),
    onSubmit: async (values) => {
      const response = await dispatch(ForgotPassEmailSubmit(values));
      if (response?.payload?.data?.status == "success") {
        handleClose();
        navigate("/");
        toast.success('Password Reset Link send to your email')
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
              <h5>Please Enter Your Email Address</h5>
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
            
              <Button
                style={buttonStyle}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!formik.isValid}
              >
                Send Email
              </Button>
              {error ? <Typography style={{color:'red',textAlign:'center'}}>{error}</Typography> : ""}
            </form>
          </Paper>
        </Grid>
      </Modal>
    </div>
  );
};

export default ForgotPassEmail;

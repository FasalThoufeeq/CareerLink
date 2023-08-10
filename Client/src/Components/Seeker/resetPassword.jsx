import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import LockResetIcon from "@mui/icons-material/LockReset";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ResetingPassword } from "../../Redux/seekerSlice/seekerSlice";
import { useLocation, useNavigate } from "react-router";

const ResetPassword = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const resetToken = params.get("resetToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { margin: "10px 0", width: "100%" };
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Must be atleast 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      const payload = {
        password: values.password,
      };
      const response = await dispatch(
        ResetingPassword({ resetToken, payload })
      );
      if (response?.payload?.data?.status == "success") {
        navigate("/");
        toast.success("Password Reset Successfully");
      } else if (response?.payload?.data?.status == "error") {
        setError(response?.payload?.data?.message);
      }
    },
  });
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockResetIcon />
            </Avatar>
            <h2 style={headerStyle}>Reset Password</h2>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              variant="standard"
              fullWidth
              type="password"
              name="password"
              value={formik?.values?.password}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              label="New Password"
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
              RESET
            </Button>
            {error ? (
              <Typography style={{ color: "red", textAlign: "center" }}>
                {error}
              </Typography>
            ) : (
              ""
            )}
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default ResetPassword;

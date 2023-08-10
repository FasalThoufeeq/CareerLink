import { useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  GetRecruiterprofile,
  UpdateRecruiterProfileDetails,
  UpdatingCompanylogo,
} from "../../Redux/recuiterSlice/recruiterSlice";

const UpdateProfile = () => {
  const profileId = useSelector(
    (state) => state?.recruiters?.recruiters?.profile._id
  );
  const [imageUpdate, setImageUpdate] = useState(false);
  const [RecruiterProfile, setRecruiterProfile] = useState();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const GetProfile = async () => {
      setloading(true);
      const response = await dispatch(GetRecruiterprofile(profileId));
      if (response?.payload?.data?.status === "success") {
        setRecruiterProfile(response?.payload?.data?.profile);
        setloading(false);
      }
    };
    GetProfile();
  }, [imageUpdate]);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imageUpload = async (companylogo) => {
    setloading(true);
    const formdata = new FormData();
    formdata.append("companylogo", companylogo);
    const response = await dispatch(
      UpdatingCompanylogo({ payload: formdata, profileId })
    );

    if (response?.payload?.data?.status === "success") {
      toast.success(response?.payload?.data?.message);
      setloading(false);
      setImageUpdate(!imageUpdate)
    }
  };

  const formik = useFormik({
    initialValues: {
      companyName: "",
      userName: "",
      email: "",
      phoneNumber: "",
      companyAddress: "",
      companySize: "",
      industry: "",
      about: "",
      profilePic: null,
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required("Company Name is required"),
      userName: Yup.string().required("User Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string()
        .min(10, "Enter valid Phone Number")
        .max(10, "Enter valid Phone Number")
        .required("Contact Number is Required"),
      companyAddress: Yup.string().required("Address is required"),
      companySize: Yup.string().required("Give a Size"),
      industry: Yup.string().required("Address is required"),
      about: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values) => {
      try {
        setloading(true);
        const formData = new FormData();

        formData.append("companyName", values.companyName);
        formData.append("userName", values.userName);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("companyAddress", values.companyAddress);
        formData.append("companySize", values.companySize);
        formData.append("industry", values.industry);
        formData.append("about", values.about);

        const response = dispatch(
          UpdateRecruiterProfileDetails({ payload: formData, profileId })
        );
        if (response?.payload?.data?.status === "success") {
          navigate("/recruiter/update_profile");
          toast.success(response?.payload?.data?.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    },
  });
  useEffect(() => {
    if (RecruiterProfile) {
      formik.setFieldValue("companyName", RecruiterProfile?.companyName || "");
      formik.setFieldValue("userName", RecruiterProfile?.userName || "");
      formik.setFieldValue("email", RecruiterProfile?.email || "");
      formik.setFieldValue("phoneNumber", RecruiterProfile?.phoneNumber || "");
      formik.setFieldValue(
        "companyAddress",
        RecruiterProfile?.companyAddress || ""
      );
      formik.setFieldValue("companySize", RecruiterProfile?.companySize || "");
      formik.setFieldValue("industry", RecruiterProfile?.industry || "");
      formik.setFieldValue("about", RecruiterProfile?.about || "");
    }
  }, [RecruiterProfile, formik.setFieldValue]);

  if (!RecruiterProfile) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Grid>
      </Container>
    );
  }
  return (
    <Container maxWidth="md" style={{ textAlign: "center", marginTop: "40px" }}>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        UPDATE PROFILE
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid item xs={12}>
          <Grid item xs={12}>
            {!RecruiterProfile?.companylogo && (
              <AccountCircleIcon
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
            )}
            {RecruiterProfile?.companylogo && (
              <img
                src={RecruiterProfile?.companylogo}
                alt="Profile Pic"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="span"
              style={{
                borderRadius: "4px",
                backgroundColor: "#f50057",
                color: "white",
                cursor: "pointer",
                marginBottom: "2rem",
              }}
              onClick={() => fileInputRef.current.click()} // Trigger the file input click event
            >
              Change Logo
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              accept="companylogo"
              onChange={(event) => {
                imageUpload(event.target.files[0]);
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="companyName"
              name="companyName"
              label="Company Name"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              error={
                formik.touched.companyName && Boolean(formik.errors.companyName)
              }
              helperText={
                formik.touched.companyName && formik.errors.companyName
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="userName"
              name="userName"
              label="User Name"
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.errors.userName && formik.touched.userName}
              helperText={formik.touched.userName && formik.errors.userName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Contact Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="companyAddress"
              name="companyAddress"
              label="Company Address"
              value={formik.values.companyAddress}
              onChange={formik.handleChange}
              error={
                formik.touched.companyAddress &&
                Boolean(formik.errors.companyAddress)
              }
              helperText={
                formik.touched.companyAddress && formik.errors.companyAddress
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="companySize"
              name="companySize"
              label="Company Size"
              value={formik.values.companySize}
              onChange={formik.handleChange}
              error={
                formik.touched.companySize && Boolean(formik.errors.companySize)
              }
              helperText={
                formik.touched.companySize && formik.errors.companySize
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="industry"
              name="industry"
              label="Industry"
              value={formik.values.industry}
              onChange={formik.handleChange}
              error={formik.touched.industry && Boolean(formik.errors.industry)}
              helperText={formik.touched.industry && formik.errors.industry}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              multiline
              rows={5}
              id="about"
              name="about"
              label="About"
              value={formik.values.about}
              onChange={formik.handleChange}
              error={formik.touched.about && Boolean(formik.errors.about)}
              helperText={formik.touched.about && formik.errors.about}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              style={{ backgroundColor: "black", marginBottom: "70px" }}
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              //   className={classes.customButton}
            >
              {loading ? (
                <CircularProgress size={24} color="success" />
              ) : (
                "Submit"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateProfile;

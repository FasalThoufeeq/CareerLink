import { useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Chip,
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
import { useDropzone } from "react-dropzone";
import { GettingSeekerProfile } from "../../Redux/seekerSlice/seekerJobSlice";
import {
  UpdateProfileDetails,
  UpdateProfilePic,
} from "../../Redux/seekerSlice/seekerSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UpdateProfile = () => {
  const profileId = useSelector(
    (state) => state?.seekers?.seekers?.profile._id
  );
  const [imageUpdate, setImageUpdate] = useState(false);
  const [UserProfile, setUserProfile] = useState();
  const [loading, setloading] = useState(false);
  const onDrop = (acceptedFiles) => {
    formik.setFieldValue("resume", acceptedFiles[0]);
    setSelectedFile(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    const GetProfile = async () => {
      setloading(true);
      const response = await dispatch(GettingSeekerProfile(profileId));
      if (response?.payload?.data?.status === "success") {
        setUserProfile(response?.payload?.data?.profile);
        setloading(false);
      }
    };
    GetProfile();
  }, [imageUpdate]);
  console.log(UserProfile,'lllllll');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [languages, setLanguages] = useState([]);
  const [languageInput, setLanguageInput] = useState("");
  const handleLanguageInputChange = (event) => {
    setLanguageInput(event.target.value);
  };
  const handleAddLanguage = () => {
    if (languageInput.trim() !== "") {
      const updatedLanguages = [
        ...formik.values.languages,
        languageInput.trim(),
      ];
      formik.setFieldValue("languages", updatedLanguages);
      setLanguages(updatedLanguages);
      setLanguageInput("");
    }
  };

  const imageUpload = async (profilePic) => {
    setloading(true)
    const formdata = new FormData();
    formdata.append("profilePic", profilePic);
    const response = await dispatch(
      UpdateProfilePic({ payload: formdata, profileId })
    );

    if (response?.payload?.data?.status === "success") {
      toast.success(response?.payload?.data?.message);
      setloading(false)
      setImageUpdate(!imageUpdate)
      // navigate('/profile')
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      education: "",
      languages: [],
      resume: null,
      profilePic: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Fist Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string()
        .min(10, "Enter valid Phone Number")
        .max(10, "Enter valid Phone Number")
        .required("Contact Number is Required"),
      education: Yup.string().required("Education is required"),
    }),
    onSubmit: async (values) => {
      try {
        setloading(true);
        const formData = new FormData();
        console.log(values, "oooooop");
        if (values.resume) {
          // If a new resume file has been selected, append it to the form data
          formData.append("resume", values.resume);
        }

        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("education", values.education);
        formData.append("languages", values.languages);
        console.log(formData);
        const response = await dispatch(
          UpdateProfileDetails({ payload: formData, profileId })
        );
        if (response?.payload?.data?.status === "success") {
          navigate("/profile");
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
    if (UserProfile) {
      formik.setFieldValue("firstName", UserProfile?.firstName || "");
      formik.setFieldValue("lastName", UserProfile?.lastName || "");
      formik.setFieldValue("email", UserProfile?.email || "");
      formik.setFieldValue("phoneNumber", UserProfile?.phoneNumber || "");
      formik.setFieldValue("education", UserProfile?.education || "");
      formik.setFieldValue("languages", UserProfile?.languages || []);
      setLanguages(
        UserProfile?.languages?.length > 0 ? UserProfile?.languages : []
      );
    }
  }, [UserProfile, formik.setFieldValue]);
  const handleLanguageRemove = (index) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    formik.setFieldValue("languages", updatedLanguages);
    setLanguages(updatedLanguages);
  };
  if (!UserProfile) {
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
            {!UserProfile?.profilePicture && (
              <AccountCircleIcon
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
            ) }
            {UserProfile?.profilePicture && (
              <img
                src={UserProfile?.profilePicture}
                alt="Profile Pic"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            ) } 
              
            
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
              Change Profile Picture
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              accept="profile"
              onChange={(event) => {
                // const file = event.target.files[0];
                // setSelectedProfilePic(URL.createObjectURL(file));
                imageUpload(event.target.files[0]);
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.errors.lastName && formik.touched.lastName}
              helperText={formik.touched.lastName && formik.errors.lastName}
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
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="education"
              name="education"
              label="Education"
              value={formik.values.education}
              onChange={formik.handleChange}
              error={
                formik.touched.education && Boolean(formik.errors.education)
              }
              helperText={formik.touched.education && formik.errors.education}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              style={{ width: "30ch" }}
              id="languages"
              name="languages"
              label="Languages"
              value={languageInput}
              onChange={handleLanguageInputChange}
            />
            <Button
              style={{
                marginTop: "10px",
                marginLeft: "5px",
                backgroundColor: "black",
              }}
              variant="contained"
              color="primary"
              onClick={handleAddLanguage}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div
              style={{ height: "50px" }}
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} />
              <p>Drag and drop your resume here or click to browse</p>
            </div>
            {selectedFile && <Typography>{selectedFile.name}</Typography>}
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: "10px" }}>
            {languages.length > 0
              ? languages.map((language, index) => (
                  <Grid item key={index}>
                    <Chip
                      label={language}
                      onDelete={() => handleLanguageRemove(index)}
                      color="primary"
                      variant="outlined"
                    />
                  </Grid>
                ))
              : null}
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

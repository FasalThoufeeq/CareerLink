import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import {
  Autocomplete,
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
import {
  EditingJobDetails,
  GetJobDetails,
} from "../../Redux/recuiterSlice/recruiterjobSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import RecruiterHeader from "./recruiterHeader";
import Footer from "../Seeker/footer";

const EditPostedJobs = () => {
  const [loading, setloading] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const jobId = params.get("jobId");
  const [jobDetails, setJobDetails] = useState();
  useEffect(() => {
    const GetJob = async () => {
      setloading(true);
      const response = await dispatch(GetJobDetails(jobId));
      if (response?.payload?.data?.status === "success") {
        setJobDetails(response?.payload?.data?.jobDetails);
        setloading(false);
      }
    };
    GetJob();
  }, []);

  const recruiterId = useSelector(
    (state) => state?.recruiters?.recruiters?.profile._id
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const handleSkillsInputChange = (event) => {
    setSkillInput(event.target.value);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() !== "") {
      const updatedSkills = [...formik.values.skills, skillInput.trim()];
      formik.setFieldValue("skills", updatedSkills);
      setSkills(updatedSkills);
      setSkillInput("");
    }
  };

  const handleDateChange = (event) => {
    formik.setFieldValue("deadline", event.target.value);
  };
  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      jobLocation: "",
      jobType: "Full-time",
      qualification: "",
      jobVacancies: "",
      salary: "",
      jobTiming: "Flexible",
      experience: "",
      about: "",
      essentialKnowledge: "",
      skills: [],
      deadline: "",
    },
    validationSchema: Yup.object({
      jobTitle: Yup.string().required("Job title is required"),
      jobLocation: Yup.string().required("Job location is required"),
      jobType: Yup.string().required("Job type is required"),
      qualification: Yup.string().required("Qualification is required"),
      jobVacancies: Yup.number().required("Job level is required"),
      salary: Yup.number().required("Salary is required"),
      jobTiming: Yup.string().required("Job timing is required"),
      experience: Yup.string().required("Experience is required"),
      about: Yup.string().required("About is required"),
      essentialKnowledge: Yup.string().required(
        "Essential knowledge is required"
      ),
      deadline: Yup.string().required("Deadline is required"),
    }),
    onSubmit: async (values) => {
      try {
        setloading(true);
        const updatedValues = {
          ...values,
          recruiterId: recruiterId,
        };

        const response = await dispatch(
          EditingJobDetails({ jobId, payload: updatedValues })
        );
        if (response?.payload?.data?.status == "success") {
          toast.success(response?.payload?.data?.message);
          navigate("/recruiter");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    },
  });
  useEffect(() => {
    if (jobDetails) {
      formik.setFieldValue("jobTitle", jobDetails?.jobTitle || "");
      formik.setFieldValue("jobLocation", jobDetails?.jobLocation || "");
      formik.setFieldValue("jobType", jobDetails?.jobType || "");
      formik.setFieldValue("qualification", jobDetails?.qualification || "");
      formik.setFieldValue("jobVacancies", jobDetails?.jobVacancies || "");
      formik.setFieldValue("salary", jobDetails?.salary || "");
      formik.setFieldValue("jobTiming", jobDetails?.jobTiming || "");
      formik.setFieldValue("experience", jobDetails?.experience || "");
      formik.setFieldValue("about", jobDetails?.about || "");
      formik.setFieldValue(
        "essentialKnowledge",
        jobDetails?.essentialKnowledge || ""
      );
      formik.setFieldValue("deadline", jobDetails?.deadline || "");
      formik.setFieldValue("skills", jobDetails?.skills || []);
      setSkills(jobDetails?.skills);
    }
  }, [jobDetails, formik.setFieldValue]);
  const handleSkillRemove = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    formik.setFieldValue("skills", updatedSkills);
    setSkills(updatedSkills);
  };
  if (!jobDetails) {
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
    <>
      <RecruiterHeader />
      <Container
        maxWidth="md"
        style={{ textAlign: "center", marginTop: "40px" }}
      >
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          EDIT JOBS
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="jobTitle"
                name="jobTitle"
                label="Job Title"
                value={formik.values.jobTitle}
                onChange={formik.handleChange}
                error={
                  formik.touched.jobTitle && Boolean(formik.errors.jobTitle)
                }
                helperText={formik.touched.jobTitle && formik.errors.jobTitle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="jobLocation"
                name="jobLocation"
                label="Job Location"
                value={formik.values.jobLocation}
                onChange={formik.handleChange}
                error={formik.errors.jobLocation && formik.touched.jobLocation}
                helperText={
                  formik.touched.jobLocation && formik.errors.jobLocation
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="jobType"
                name="jobType"
                options={["Full-time", "Part-time", "Internship"]}
                value={formik.values.jobType || ""}
                onChange={(event, value) =>
                  formik.setFieldValue("jobType", value)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Job Type"
                    error={
                      formik.touched.jobType && Boolean(formik.errors.jobType)
                    }
                    helperText={formik.touched.jobType && formik.errors.jobType}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="qualification"
                name="qualification"
                label="Qualification"
                value={formik.values.qualification}
                onChange={formik.handleChange}
                error={
                  formik.touched.qualification &&
                  Boolean(formik.errors.qualification)
                }
                helperText={
                  formik.touched.qualification && formik.errors.qualification
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="jobVacancies"
                name="jobVacancies"
                label="Job Vacancies"
                value={formik.values.jobVacancies}
                onChange={formik.handleChange}
                error={
                  formik.touched.jobVacancies &&
                  Boolean(formik.errors.jobVacancies)
                }
                helperText={
                  formik.touched.jobVacancies && formik.errors.jobVacancies
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="salary"
                name="salary"
                label="Salary"
                value={formik.values.salary}
                onChange={formik.handleChange}
                error={formik.touched.salary && Boolean(formik.errors.salary)}
                helperText={formik.touched.salary && formik.errors.salary}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                id="jobTiming"
                name="jobTiming"
                options={["Flexible", "Morning Shift", "Night Shift"]}
                value={formik.values.jobTiming || ""}
                onChange={(event, value) =>
                  formik.setFieldValue("jobTiming", value)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Job Timing"
                    error={
                      formik.touched.jobTiming &&
                      Boolean(formik.errors.jobTiming)
                    }
                    helperText={
                      formik.touched.jobTiming && formik.errors.jobTiming
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="experience"
                name="experience"
                label="Experience"
                value={formik.values.experience}
                onChange={formik.handleChange}
                error={
                  formik.touched.experience && Boolean(formik.errors.experience)
                }
                helperText={
                  formik.touched.experience && formik.errors.experience
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                multiline
                rows={5}
                id="essentialKnowledge"
                name="essentialKnowledge"
                label="Essential Knowledge"
                value={formik.values.essentialKnowledge}
                onChange={formik.handleChange}
                error={
                  formik.touched.essentialKnowledge &&
                  Boolean(formik.errors.essentialKnowledge)
                }
                helperText={
                  formik.touched.essentialKnowledge &&
                  formik.errors.essentialKnowledge
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ width: "30ch" }}
                id="skillInput"
                name="skills"
                label="Skills"
                value={skillInput}
                onChange={handleSkillsInputChange}
              />
              <Button
                style={{
                  marginTop: "10px",
                  marginLeft: "5px",
                  backgroundColor: "black",
                }}
                variant="contained"
                color="primary"
                onClick={handleAddSkill}
              >
                Add Skill
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="deadline"
                name="deadline"
                // label="Deadline"
                type="date" // Use type="date" for default HTML5 date input
                value={formik.values.deadline}
                onChange={handleDateChange}
                error={
                  formik.touched.deadline && Boolean(formik.errors.deadline)
                }
                helperText={formik.touched.deadline && formik.errors.deadline}
              />
            </Grid>
            <Grid container spacing={1} sx={{ marginTop: "10px" }}>
              {skills.map((skill, index) => (
                <Grid item key={index}>
                  <Chip
                    label={skill}
                    onDelete={() => handleSkillRemove(index)}
                    color="primary"
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ backgroundColor: "black", marginBottom: "70px" }}
                type="submit"
                fullWidth
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
      <Footer />
    </>
  );
};

export default EditPostedJobs;

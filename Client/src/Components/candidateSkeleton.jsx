import { Container, Grid, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {} from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#fff",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "flex-start", // Align items to flex-start
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.3)",
    borderRadius: theme.spacing(3),
    width: "40rem",
    position: "relative",
  },
  logo: {
    marginRight: theme.spacing(2),
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderRadius: "50%",
  },
  jobTitleContainer: {
    display: "block",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  jobTitle: {
    fontWeight: "bold",
    color: "black",
    marginRight: theme.spacing(1),
  },
  location: {
    marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  skills: {
    display: "flex",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  chip: {
    display: "inline-block",
    borderRadius: theme.spacing(2), // Adjust the border radius to make it look like a chip
    // backgroundColor: theme.palette.primary.main, // Set primary blue color (change it according to your design)
    color: theme.palette.primary.contrastText, // Set the text color to contrast with the background color
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`, // Adjust the padding according to your design
    margin: theme.spacing(1), // Adjust the margin according to your design
  },
  salary: {
    marginLeft: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    color: theme.palette.success.main,
  },
  LocationOnIcon: {
    color: "gray",
    fontSize: "5px",
    marginRight: theme.spacing(1),
  },
  buttons: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  editButton: {
    color: "black",
    marginRight: theme.spacing(1),
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
  applicationButton: {
    color: "black",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  personIcon: {
    marginRight: theme.spacing(1),
  },
}));
const CandidateSkeleton = ({ cards }) => {
  const classes = useStyles();
  return Array(cards)
    .fill(0)
    .map((item, index) => {
      return (
        <Container
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "270px",
          }}
          maxWidth="md"
          className={classes.container}
        >
          <div>
            <div style={{ display: "flex" }}>
              <div>
                <Skeleton
                  height={80}
                  width={50}
                  style={{ borderRadius: "50%" }}
                  // className={classes.logo} // Apply your logo styles here
                />
              </div>
              <div>
                <Grid Container direction="column" spacing={2}>
                  <Grid
                    item
                    className={classes.jobTitleContainer}
                    style={{ marginLeft: "30px" }}
                  >
                    <Skeleton
                      height={45}
                      width="100%" // Adjust width according to your design
                      className={classes.jobTitle}
                      style={{ width: "200px" }}
                    />
                    <Skeleton
                      height={30}
                      width="50%" // Adjust width according to your design
                      className={classes.location}
                      style={{ width: "120px" }}
                    />
                  </Grid>
                  <Grid item>
                    <Skeleton
                      height={30}
                      width="100%" // Adjust width according to your design
                      className={classes.salary}
                      style={{ width: "120px", marginLeft: "38px" }}
                    />
                  </Grid>
                  <Grid
                    item
                    style={{
                      marginBottom: "10px",
                      marginTop: "10px",
                      marginLeft: "25px",
                    }}
                    className={classes.skills}
                  >
                    <Skeleton
                      width="100%" // Adjust width according to your design
                      height={50} // Adjust height according to your design
                      className={classes.chip}
                      style={{
                        width: "50px",
                        borderRadius: "20px",
                        marginTop: "-20px",
                      }}
                    />
                    <Skeleton
                      width="100%" // Adjust width according to your design
                      height={50} // Adjust height according to your design
                      className={classes.chip}
                      style={{
                        width: "50px",
                        borderRadius: "20px",
                        marginTop: "-20px",
                        marginLeft: "-10px",
                      }}
                    />
                    <Skeleton
                      width="100%" // Adjust width according to your design
                      height={50} // Adjust height according to your design
                      className={classes.chip}
                      style={{
                        width: "50px",
                        borderRadius: "20px",
                        marginTop: "-20px",
                        marginLeft: "-10px",
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Skeleton
                      height={30}
                      width="100%" // Adjust width according to your design
                      className={classes.salary}
                      style={{
                        width: "200px",
                        marginLeft: "38px",
                        marginTop: "-10px",
                      }}
                    />
                  </Grid>
                  <Grid item style={{display:'flex'}}>
                  <Skeleton
                      width="100%" // Adjust width according to your design
                      height={50} // Adjust height according to your design
                      className={classes.chip}
                      style={{
                        width: "100px",
                        borderRadius: "20px",
                        marginLeft:'35px',
                        marginTop: "-10px",
                      }}
                    />
                    <Skeleton
                      width="100%" // Adjust width according to your design
                      height={50} // Adjust height according to your design
                      className={classes.chip}
                      style={{
                        width: "30px",
                        borderRadius: "20px",
                        marginTop: "-10px",
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className={classes.buttons}>
              <Skeleton
                width={50} // Adjust width according to your design
                height={50} // Adjust height according to your design
                style={{ marginRight: "10px" }}
                className={classes.applicationButton}
              />
            </div>
          </div>
          <div style={{display:'flex'}}>
          <Skeleton
                width={50} // Adjust width according to your design
                height={55} // Adjust height according to your design
                style={{ marginRight: "10px" ,borderRadius:'20px'}}
                className={classes.applicationButton}
              />
              <Skeleton
                width={50} // Adjust width according to your design
                height={55} // Adjust height according to your design
                style={{ marginRight: "10px",borderRadius:'20px' }}
                className={classes.applicationButton}
              />
          </div>
        </Container>
      );
    });
};

export default CandidateSkeleton;

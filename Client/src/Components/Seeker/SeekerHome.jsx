import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import FindJobImg from "../../../public/5.jpg";
import PostJobImg from "../../../public/1.jpg";

const UserHome = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "16px" }}>
      <Typography
        variant="h4"
        component="h1"
        style={{
          marginBottom: "16px",
          textAlign: "center",
          animation: "slide-in 1s ease-out",
        }}
      >
        Welcome to CareerLink
      </Typography>

      <Grid container spacing={5} style={{ marginTop: "10px" }}>
        <Grid item xs={12} sm={6}>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "24px",
              marginBottom: "16px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardMedia
              style={{ height: "200px", width: "100%", objectFit: "cover" }}
              image={FindJobImg}
              title="Find Jobs"
            />
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                style={{
                  marginBottom: "16px",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  textAlign: "center",
                }}
              >
                Find Jobs
              </Typography>
              <Typography
                variant="body1"
                component="p"
                style={{ marginBottom: "16px", textAlign: "center" }}
              >
                Search and apply for job opportunities in various industries.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "24px",
              marginBottom: "16px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardMedia
              style={{ height: "200px", width: "100%", objectFit: "cover" }}
              // image="https://www.allworknow.com/full-time-freelancers-in-2021/"
              image={PostJobImg}
              title="Post Jobs"
            />
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                style={{
                  marginBottom: "16px",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  textAlign: "center",
                }}
              >
                Post Jobs
              </Typography>
              <Typography
                variant="body1"
                component="p"
                style={{ marginBottom: "16px", textAlign: "center" }}
              >
                Recruit the best talent for your organization by posting job
                openings.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserHome;

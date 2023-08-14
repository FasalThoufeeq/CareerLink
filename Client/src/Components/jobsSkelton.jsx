import { Container, Grid, Skeleton } from "@mui/material";
import {} from "react";

const JobsSkelton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, index) => {
      return (
        <Container
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "250px",
            backgroundColor: "#fff",
            padding: "16px",
            marginBottom: "16px",

            alignItems: "flex-start",
            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: "24px",
            width: "40rem",
            position: "relative",
          }}
          maxWidth="md"
        >
          <div>
            <div style={{ display: "flex" }}>
              <div>
                <Skeleton
                  height={80}
                  width={50}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div>
                <Grid Container direction="column" spacing={2}>
                  <Grid
                    item
                    style={{
                      marginLeft: "30px",
                      display: "block",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <Skeleton
                      height={45}
                      width="100%" // Adjust width according to your design
                      style={{
                        width: "300px",
                        fontWeight: "bold",
                        color: "black",
                        marginRight: "8px",
                      }}
                    />
                    <Skeleton
                      height={30}
                      width="50%" // Adjust width according to your design
                      style={{
                        width: "120px",
                        marginLeft: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Skeleton
                      height={30}
                      width="100%"
                      style={{
                        width: "120px",
                        marginLeft: "38px",
                        display: "flex",
                        alignItems: "center",
                        color: "your-success-color",
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    style={{
                      marginBottom: "10px",
                      marginTop: "10px",
                      marginLeft: "25px",
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    <Skeleton
                      width="100%"
                      height={50}
                      style={{
                        width: "50px",
                        borderRadius: "20px",
                        marginTop: "-20px",
                        display: "inline-block",

                        color: "your-contrast-text-color",
                        padding: "4px 8px",
                        margin: "8px",
                      }}
                    />
                    <Skeleton
                      width="100%"
                      height={50}
                      style={{
                        width: "50px",
                        borderRadius: "20px",
                        marginTop: "-20px",
                        marginLeft: "-10px",
                        display: "inline-block",

                        color: "your-contrast-text-color",
                        padding: "4px 8px",
                        margin: "8px",
                      }}
                    />
                    <Skeleton
                      width="100%"
                      height={50}
                      style={{
                        width: "50px",
                        borderRadius: "20px",
                        marginTop: "-20px",
                        marginLeft: "-10px",
                        display: "inline-block",

                        color: "your-contrast-text-color",
                        padding: "4px 8px",
                        margin: "8px",
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Skeleton
                      height={30}
                      width="100%"
                      style={{
                        width: "120px",
                        marginLeft: "38px",
                        marginTop: "-20px",

                        display: "flex",
                        alignItems: "center",
                        color: "your-success-color",
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Skeleton
                      height={30}
                      width="100%" // Adjust width according to your design
                      style={{
                        width: "120px",
                        marginLeft: "38px",

                        display: "flex",
                        alignItems: "center",
                        color: "your-success-color",
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div style={{ position: "absolute", bottom: "8px", right: "8px" }}>
              <Skeleton
                width={50}
                height={50}
                style={{
                  marginRight: "10px",
                  color: "black",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              />
            </div>
          </div>
          <div>
            <Skeleton style={{ borderRadius: "15px" }} width={30} height={40} />
          </div>
        </Container>
      );
    });
};

export default JobsSkelton;

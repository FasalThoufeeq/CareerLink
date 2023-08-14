import { Container, Grid, Skeleton } from "@mui/material";
import {} from "react";

const CandidateSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, index) => {
      return (
        <Container
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "290px",
            backgroundColor: "#fff",
            padding: "16px",
            marginBottom: "16px",
            alignItems: "flex-start",
            boxShadow: "0 6px 10px rgba(0, 0, 0, 0.3)",
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
                        width: "200px",
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
                      width="100%" // Adjust width according to your design
                      style={{
                        width: "120px",
                        marginLeft: "38px",

                        display: "flex",
                        alignItems: "center",
                        color: "#4caf50",
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
                      width="100%" // Adjust width according to your design
                      height={50} // Adjust height according to your design
                      style={{
                        width: "50px",
                        borderRadius: "20px",
                        marginTop: "-20px",
                        display: "inline-block",
                        color: "#ffffff",
                        padding: "4px 8px", // Adjust the padding according to your design
                        margin: "4px", //
                      }}
                    />
                    <Skeleton
                      width="100%" // Adjust width according to your design
                      height={50} // Adjust height according to your design
                      style={{
                        width: "50px",
                        borderRadius: "20px",
                        marginTop: "-20px",
                        marginLeft: "-10px",
                        display: "inline-block",
                        color: "#ffffff",
                        padding: "4px 8px", // Adjust the padding according to your design
                        margin: "4px", // Adjust the margin according to your design
                      }}
                    />
                    <Skeleton
                      width="100%" // Adjust width according to your design
                      height={50} // Adjust height according to your design
                      style={{
                        display: "inline-block",
                        color: "#ffffff",
                        padding: "4px 8px", // Adjust the padding according to your design
                        margin: "4px", // Adjust the margin according to your design
                        width: "50px",
                        borderRadius: "20px",
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Skeleton
                      height={30}
                      width="100%" // Adjust width according to your design
                      style={{
                        width: "200px",
                        marginLeft: "38px",
                        marginTop: "-10px",

                        display: "flex",
                        alignItems: "center",
                        color: "#4caf50", // Set your desired color
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    style={{
                      display: "flex",
                      marginLeft: "3rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <Skeleton
                      width="100%" // Adjust width according to your design
                      height={50} // Adjust height according to your design
                      style={{
                        width: "100px",
                        borderRadius: "20px",
                        marginLeft: "35px",
                        marginTop: "-10px",
                        display: "inline-block",

                        color: "#ffffff",

                        padding: "4px 8px", // Adjust the padding according to your design
                        margin: "4px", // Adjust the margin according to your design
                      }}
                    />
                    <Skeleton
                      width="100%" // Adjust width according to your design
                      height={50} // Adjust height according to your design
                      style={{
                        width: "30px",
                        borderRadius: "20px",
                        marginTop: "-10px",
                        display: "inline-block",

                        color: "#ffffff",

                        padding: "4px 8px", // Adjust the padding according to your design
                        margin: "4px", // Adjust the margin according to your design
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div style={{ position: "absolute", bottom: "8px", right: "8px" }}>
              <Skeleton
                width={50} // Adjust width according to your design
                height={50} // Adjust height according to your design
                style={{
                  marginRight: "10px",
                  color: "black",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <Skeleton
              width={50} // Adjust width according to your design
              height={55} // Adjust height according to your design
              style={{
                marginRight: "10px",
                borderRadius: "20px",
                color: "black",
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            />
            <Skeleton
              width={50} // Adjust width according to your design
              height={55} // Adjust height according to your design
              style={{
                marginRight: "10px",
                borderRadius: "20px",
                color: "black",
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            />
          </div>
        </Container>
      );
    });
};

export default CandidateSkeleton;

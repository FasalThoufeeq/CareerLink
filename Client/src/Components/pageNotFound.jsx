import {} from "react";
import { Box, Typography, Link } from "@mui/material";
import "./pageNotFound.css"

const PageNotFound = () => {

  return (
    <div id="notfound">
      <Box className="notfound">
        <div className="notfound-404"></div>
        <h1>404</h1>
        <h2>Oops! Page Not Be Found</h2>
        <Typography>
          Sorry, but the page you are looking for does not exist, has been
          removed, or is temporarily unavailable.
        </Typography>
        <Link href="/">Back to homepage</Link>
      </Box>
    </div>
  );
};

export default PageNotFound;

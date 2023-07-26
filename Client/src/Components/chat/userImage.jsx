import { Box } from "@mui/material";

// eslint-disable-next-line react/prop-types
const UserImage = ({image,  size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image ? `${image}` : "/150-1503945_transparent-user-png-default-user-image-png-png (1).png"}
       
      />
    </Box>
  );
};

export default UserImage;

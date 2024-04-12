import styled from "@emotion/styled";
import { Avatar, Box } from "@mui/material";

const CompanyAvatar = styled(Avatar)(({ theme }) => ({
  borderRadius: "8px",
  width: "36px",
  height: "36px",
  boxShadow:
    "rgba(17, 17, 26, 0.03) 0px 4px 16px, rgba(17, 17, 26, 0.03) 0px 8px 32px",
}));

function AvatarComponent(props) {
  const { url } = props;

  return (
    <Box>
      <CompanyAvatar alt="company Image" src={url} variant="square" />
    </Box>
  );
}

export default AvatarComponent;

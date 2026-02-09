import { Box, CircularProgress } from "@mui/material";
const Loading = () => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;

import { Alert, Box } from "@mui/material";

export const SuccessMessage = ({ message }: { message: string }) => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Alert severity="success">Sucesso: {message}</Alert>
    </Box>
  );
};

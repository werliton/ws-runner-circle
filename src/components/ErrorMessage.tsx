import { Alert, Box } from "@mui/material";

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Alert severity="error">Erro ao buscar dados: {message}</Alert>
    </Box>
  );
};

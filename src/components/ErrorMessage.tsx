import { Box, Typography } from "@mui/material";

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Typography color="error">Erro ao buscar dados: {message}</Typography>
    </Box>
  );
};

import { Box, Typography } from "@mui/material";

export const NoData = ({ message }: { message: string }) => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Typography>
        Nenhuma atividade encontrada para o tipo "{message}".
      </Typography>
    </Box>
  );
};

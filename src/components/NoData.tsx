import { Alert, Box } from "@mui/material";

export const NoData = ({ message }: { message: string }) => {
  return (
    <Box display="flex" mt={2}>
      <Alert severity="warning">
        Nenhuma atividade encontrada para o tipo "{message}".
      </Alert>
    </Box>
  );
};

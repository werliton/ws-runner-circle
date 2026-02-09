import { Box, CssBaseline, Grid, Typography } from "@mui/material";
import { SearchField, FeedContainer } from "./styles";
import { ActivityCard } from "../../components/ActivityCard";
import { useQuery } from "@apollo/client";
import {
  GET_ACTIVITIES,
  GET_ACTIVITY_BY_TYPE,
} from "../../services/graphql/queries/activities.graphql";
import { useState } from "react";
import { ErrorMessage } from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { NoData } from "../../components/NoData";

export function FeedGeral() {
  const [input, setInput] = useState("");
  const { loading, error, data } = useQuery(
    input.length === 0 ? GET_ACTIVITIES : GET_ACTIVITY_BY_TYPE,
    {
      variables: input.length > 0 ? { type: input } : {},
    },
  );

  const activities = data?.activities || data?.activitiesByType || [];

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInput(e.target.value);
  };

  return (
    <Box flex="1">
      <CssBaseline />
      <SearchField
        fullWidth
        placeholder="O que você procura?"
        variant="outlined"
        onChange={handleInput}
      />
      <ContentManager
        loading={loading}
        error={error}
        activities={activities}
        input={input}
      />
    </Box>
  );
}

interface ContentManagerProps {
  loading: boolean;
  error: any;
  activities: any[];
  input: string;
}

const ContentManager = ({
  loading,
  error,
  activities,
  input,
}: ContentManagerProps) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!loading && !error && activities?.length === 0) {
    return <NoData message={input || "todas as atividades"} />;
  }

  if (activities?.length > 0) {
    return (
      <>
        <Typography variant="h6" align="center" mt={2}>
          {activities.length} atividade(s) encontrada(s)
        </Typography>

        <FeedContainer maxWidth="lg">
          <Grid container spacing={3}>
            {activities.map((activity: any) => (
              <Grid item xs={12} sm={6} md={4} key={activity.id}>
                <ActivityCard activity={activity} />
              </Grid>
            ))}
          </Grid>
        </FeedContainer>
      </>
    );
  }

  return null;
};

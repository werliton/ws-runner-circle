import {
  Box,
  CssBaseline,
  Grid,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { SearchField, FeedContainer } from "./styles";
import { ActivityCard } from "../../components/ActivityCard";
import { useQuery } from "@apollo/client";
import {
  GET_ACTIVITIES,
  GET_ACTIVITY_BY_TYPE,
  GET_ACTIVITY_BY_USER,
} from "../../services/graphql/queries/activities.graphql";
import { useMemo, useState } from "react";
import { ErrorMessage } from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { NoData } from "../../components/NoData";
import { SelectField } from "../../components/Select";

export function FeedGeral() {
  const [userInput, setUserInput] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const { loading, error, data } = useQuery(
    userInput.length === 0
      ? selectedType.length === 0
        ? GET_ACTIVITIES
        : GET_ACTIVITY_BY_TYPE
      : GET_ACTIVITY_BY_USER,
    {
      variables:
        userInput.length > 0
          ? { user: userInput }
          : selectedType.length > 0
            ? { type: selectedType }
            : {},
    },
  );

  const activities = data?.activities || data?.activitiesByType || [];
  const categories = useMemo(() => {
    return activities.reduce((acc: any[], item: { type: string }) => {
      if (!acc.some((category) => category.value === item.type)) {
        acc.push({
          label: item.type,
          value: item.type,
        });
      }
      return acc;
    }, []);
  }, []);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUserInput(e.target.value);
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setSelectedType(e.target.value);
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

      <Box mt={2}>
        <SelectField
          name="Tipo de atividade"
          value={selectedType}
          options={[{ label: "Todas", value: "" }, ...categories]}
          handleChange={handleSelectChange}
        />
      </Box>

      <ContentManager
        loading={loading}
        error={error}
        activities={activities}
        input={userInput}
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

import {
  Box,
  CssBaseline,
  Grid,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { SearchField, FeedContainer } from "./styles";
import { Activity, ActivityCard } from "../../components/ActivityCard";
import { useQuery } from "@apollo/client/react";
import {
  GET_ACTIVITIES,
  GET_ACTIVITY_BY_TYPE,
  GET_ACTIVITY_BY_USER,
  GET_ALL_CATEGORIES,
} from "../../services/graphql/queries/activities.graphql";
import { useEffect, useMemo, useState } from "react";
import { ErrorMessage } from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { NoData } from "../../components/NoData";
import { SelectField } from "../../components/Select";

export function FeedGeral() {
  const [userInput, setUserInput] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);

  const getQuery = () => {
    if (userInput.length > 0) return GET_ACTIVITY_BY_USER;
    if (selectedType.length > 0) return GET_ACTIVITY_BY_TYPE;
    return GET_ACTIVITIES;
  };

  const getVariables = () => {
    if (userInput.length > 0) return { user: userInput };
    if (selectedType.length > 0) return { type: selectedType };
    return {};
  };

  const { loading, error, data } = useQuery<{
    activities: Activity[];
    activitiesByType: Activity[];
    activitiesByUser: Activity[];
  }>(getQuery(), {
    variables: getVariables(),
  });

  const { data: categoriesData } = useQuery<{ activities: Activity[] }>(
    GET_ALL_CATEGORIES,
  );

  useEffect(() => {
    if (data) {
      const fetchedActivities =
        data.activities || data.activitiesByType || data.activitiesByUser || [];
      setActivities(fetchedActivities);
    }
  }, [data]);

  const categories =
    useMemo(() => {
      return categoriesData?.activities?.reduce(
        (
          acc: Array<{ label: string; value: string }>,
          item: { type: string },
        ) => {
          if (!acc.some((category) => category.value === item.type)) {
            acc.push({ label: item.type, value: item.type });
          }
          return acc;
        },
        [],
      );
    }, [categoriesData?.activities]) || [];

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

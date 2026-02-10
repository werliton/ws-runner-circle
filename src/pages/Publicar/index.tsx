import { CssBaseline, TextField, Box } from "@mui/material";
import { Layout, StyledButton } from "./styles";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_ACTIVITY } from "../../services/graphql/mutations/activities.graphql";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Activity } from "../../components/ActivityCard";
import { useNavigate } from "react-router-dom";
import { GET_ACTIVITIES } from "../../services/graphql/queries/activities.graphql";
import { gql } from "@apollo/client";

export function Publicar() {
  const navigate = useNavigate();
  // GraphQL mutation to add activity
  const [formData, setFormData] = useState<Omit<Activity, "id">>({
    imageUrl: "",
    userImage: "",
    distance: "",
    calories: "",
    bpm: "",
    comments: 0,
    likes: 0,
    time: "",
    type: "",
    user: "Letox",
  });
  const [addActivity, { loading, error = "" }] = useMutation(CREATE_ACTIVITY, {
    update: (cache, { data: { addActivity } }) => {
      const existingPosts = cache.readQuery({ query: GET_ACTIVITIES });
      if (existingPosts) {
        cache.writeQuery({
          query: GET_ACTIVITIES,
          data: { activities: [...existingPosts.activities, addActivity] },
        });
      }
      // Atualiza o cache para refletir a adição do novo post
      cache.modify({
        fields: {
          activities(existingActivitiesRefs = [], { readField }) {
            const newActivityRef = cache.writeFragment({
              data: addActivity,
              fragment: gql`
                fragment NewActivity on Activity {
                  id
                  imageUrl
                  userImage
                  distance
                  calories
                  bpm
                  comments
                  likes
                  time
                  type
                }
              `,
            });
            if (
              existingActivitiesRefs.some(
                (ref) => readField("id", ref) === addActivity.id,
              )
            ) {
              return existingActivitiesRefs;
            }
            return [...existingActivitiesRefs, newActivityRef];
          },
        },
      });
      cache.evict({ fieldName: "activities" });
      cache.gc();
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("dados", formData);

    try {
      await addActivity({
        variables: {
          input: {
            ...formData,
            time: new Date().toISOString(), // Adiciona a data atual
            type: "Corrida", // Tipo fixo para teste, pode ser alterado para um campo de seleção
          },
        },
      });
      navigate("/feed");
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  return (
    <Layout>
      <CssBaseline />
      <form onSubmit={handleSubmit}>
        <h2>Publicar treino</h2>

        {error && <ErrorMessage message={error?.message} />}

        {/* {data && <SuccessMessage message="Atividade criada com sucesso!" />} */}

        <TextField
          fullWidth
          name="imageUrl"
          label="URL da Imagem da Atividade"
          variant="outlined"
          margin="normal"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="userImage"
          label="URL da Imagem do Usuário"
          variant="outlined"
          margin="normal"
          value={formData.userImage}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="distance"
          label="Distância (km)"
          variant="outlined"
          margin="normal"
          value={formData.distance}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="calories"
          label="Calorias (kcal)"
          variant="outlined"
          margin="normal"
          value={formData.calories}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="bpm"
          label="Batimentos (BPM)"
          variant="outlined"
          margin="normal"
          value={formData.bpm}
          onChange={handleChange}
        />
        <Box display="flex" justifyContent="center" mt={2}>
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Enviar
          </StyledButton>
          <StyledButton type="reset" variant="outlined" color="secondary">
            Limpar
          </StyledButton>
        </Box>
      </form>
    </Layout>
  );
}

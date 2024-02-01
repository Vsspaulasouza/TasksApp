import { Container, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api";
import { HeaderHome } from "../components";
import { OptionsBar } from "../components/optionsBar";
import { TasksList } from "../components/tasksList";
import { isCreatedUser, isCustomError, type CreatedUser } from "../types";
import { showToast } from "../utils";

export function Home() {
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<CreatedUser | null>(null);

  useEffect(() => {
    const requestUser = async () => {
      const response = await getUser();

      if (response != null && isCustomError(response.data)) {
        showToast(toast, "Please log in to your account", "info");
        navigate("/auth/login");
      }

      if (isCreatedUser(response)) setUser(response);
    };

    void requestUser();
  }, []);

  return (
    <Container
      maxW="100%"
      py={{ base: "12", md: "20" }}
      px={{ base: "0", sm: "20" }}
    >
      <HeaderHome user={user} />
      <OptionsBar />
      <TasksList />
    </Container>
  );
}

// TODO: corrigir erro de mostrar o toast e recarregar
// TODO: mostrar aviso quando não tiver categories
// TODO: filtrar tasks
// TODO: ordenar tasks
// TODO: deixar color pick mais bonito
// TODO: olhar como fica no light mode, se ficar bom adicionar a opção de trocar
// TODO: responsividade
// TODO: readme

import { Container, useToast } from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api";
import { HeaderHome } from "../components";
import { OptionsBar } from "../components/optionsBar";
import { TasksList } from "../components/tasksList";
import {
  isCreatedUser,
  isCustomError,
  type CreatedUser,
  type FilterTasksState,
} from "../types";
import { filterTasksReducer, showToast } from "../utils";

export function Home() {
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<CreatedUser | null>(null);

  const filterTasksInitialState: FilterTasksState = {
    TODO: false,
    DOING: false,
    DONE: false,
    LOW: false,
    MEDIUM: false,
    HIGH: false,
  };
  const [filterTasksState, filterTasksDispatch] = useReducer(
    filterTasksReducer,
    filterTasksInitialState
  );

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
      <OptionsBar filterTasksDispatch={filterTasksDispatch} />
      <TasksList filterTasksState={filterTasksState} />
    </Container>
  );
}

import { Container, useToast } from "@chakra-ui/react";
import { type AxiosError } from "axios";
import { useReducer } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { requestApi } from "../api";
import { HeaderHome } from "../components";
import { OptionsBar } from "../components/optionsBar";
import { TasksList } from "../components/tasksList";
import {
  isCustomError,
  type CreatedUser,
  type FilterTasksState,
} from "../types";
import { FIFTEEN_MINUTES, filterTasksReducer, showToast } from "../utils";

export function Home() {
  const toast = useToast();
  const navigate = useNavigate();

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

  const { data: user } = useQuery<CreatedUser, AxiosError>({
    queryKey: "user",
    queryFn: async () => {
      return await requestApi({ urlPath: "users/me" });
    },
    onError: (error) => {
      if (isCustomError(error.response?.data)) {
        showToast(toast, "Please log in to your account", "info");
        navigate("/auth/login");
      }
    },
    refetchInterval: FIFTEEN_MINUTES,
  });

  return (
    <Container
      maxW="100%"
      py={{ base: "6", md: "20" }}
      px={{ base: "3", sm: "10", md: "15", lg: "20" }}
    >
      <HeaderHome user={user ?? null} />
      <OptionsBar filterTasksDispatch={filterTasksDispatch} />
      <TasksList filterTasksState={filterTasksState} />
    </Container>
  );
}

import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api";
import { isCustomError } from "../types";
import { showToast } from "../utils";

export function Home() {
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const requestUser = async () => {
      const response = await getUser();

      if (response != null && isCustomError(response.data)) {
        showToast(toast, "Please log in to your account", "info");
        navigate("/auth/login");
      }
    };

    void requestUser();
  }, []);

  return <div>Home</div>;
}

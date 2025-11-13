import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
      if(!user.isAuthenticated) {
        navigate("/login");
      }

  }, [user.isAuthenticated, navigate]);

  return (
    <div style={{height: "auto" }}>
      <h1>Pagina home</h1>
    </div>
  );
};

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Dashboard = () => {
   const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <h3>Welcome, {user.name}.</h3>
    </div>
  );
}

export { Dashboard };
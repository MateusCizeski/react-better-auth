import { Outlet } from "react-router-dom";
import { Header } from "@/components/ui/header";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Footer } from "@/components/ui/footer";

export function PrivateLayout() {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

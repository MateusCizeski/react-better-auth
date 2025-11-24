import { Outlet } from "react-router-dom";
import { Header } from "@/components/ui/header";
// import { Footer } from "@/components/ui/footer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Sidebar } from "@/components/ui/sidebar";

export function PrivateLayout() {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo + header + footer */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Conteúdo dinâmico (cada página vai aqui) */}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}

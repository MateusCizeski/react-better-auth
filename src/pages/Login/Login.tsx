import * as yup from "yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/Schema/Login/SchemaLogin";
import { Link, useNavigate } from "react-router-dom";
import servUser from "@/services/user";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slice/user";
import { RootState } from "@/redux/store";

type FormData = yup.InferType<typeof loginSchema>;

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (user && user.isAuthenticated) {
      navigate("/");
    }
  }, [user]);

  const onSubmit = async (data: FormData) => {
    if (data.email.trim() === "" || data.password.trim() === "") return;

    try {
      setLoading(true);

      const response = await servUser.login(data.email, data.password);

      dispatch(login(response));

      setErrorMessage("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Erro desconhecido");
      }
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg bg-card p-8 shadow-md"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-foreground">
          Login
        </h1>
        <div className="mb-4">
          <Input type="email" placeholder="E-mail" {...register("email")} />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Input
            type="password"
            placeholder="Senha"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {errorMessage && (
          <p className="mb-4 text-center text-sm text-destructive">
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          variant="default"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Entrar"}
        </Button>

        <div className="mt-4 text-center">
          <Link
            to="/forgotpassword"
            className="text-sm text-primary hover:underline"
          >
            Esqueceu a senha?
          </Link>
          <Link to="/register" className="text-primary hover:underline">
            Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  );
};

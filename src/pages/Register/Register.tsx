import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErrorMessage("");
    try {
      console.log("Register data:", data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg bg-card p-8 shadow-md"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-foreground">
          Cadastro
        </h1>

        <div className="mb-4">
          <Input
            type="text"
            placeholder="Nome completo"
            {...register("name", { required: "Nome é obrigatório" })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Input
            type="email"
            placeholder="E-mail"
            {...register("email", {
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "E-mail inválido",
              },
            })}
          />
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
            {...register("password", {
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "Senha deve ter no mínimo 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Input
            type="password"
            placeholder="Confirmar senha"
            {...register("confirmPassword", {
              required: "Confirmação de senha é obrigatória",
              validate: (value) =>
                value === password || "As senhas não coincidem",
            })}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-destructive">
              {errors.confirmPassword.message}
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
          {loading ? "Carregando..." : "Cadastrar"}
        </Button>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

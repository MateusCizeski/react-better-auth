import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormData = {
  email: string;
};

const forgotPasswordSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
});

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      console.log("Password reset for:", data.email);
      setSuccessMessage("Link de recuperação enviado para seu e-mail!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Erro ao enviar e-mail");
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
        <h1 className="mb-2 text-center text-2xl font-bold text-foreground">
          Esqueceu a senha?
        </h1>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Digite seu e-mail para receber um link de recuperação
        </p>

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

        {successMessage && (
          <p className="mb-4 text-center text-sm text-green-600">
            {successMessage}
          </p>
        )}

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
          {loading ? "Enviando..." : "Enviar link de recuperação"}
        </Button>

        <div className="mt-4 text-center">
          <Link to="/login">Voltar para o login</Link>
        </div>
      </form>
    </div>
  );
};

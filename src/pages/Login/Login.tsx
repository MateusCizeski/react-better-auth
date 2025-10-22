import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("O e-mail deve ser válido")
    .required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
});

type FormData = yup.InferType<typeof schema>;

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErrorMessage("");
    try {
      console.log("Login data:", data);
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>

        <div className="mb-4">
          <Input
            type="email"
            placeholder="E-mail"
            {...register("email")}
            // error={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <Input
            type="password"
            placeholder="Senha"
            {...register("password")}
            // error={!!errors.password}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {errorMessage && (
          <p className="mb-4 text-center text-sm text-red-600">
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
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Esqueceu a senha?
          </a>
        </div>
      </form>
    </div>
  );
};

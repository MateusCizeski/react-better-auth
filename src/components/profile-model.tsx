import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/redux/slice/user";
import { toast } from "sonner";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("O nome não pode estar vazio.");
      return;
    }

    setLoading(true);

    try {
      // chamada real para API
      const response = await fetch(
        "http://localhost:5001/users/api/v1/users/update-self",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Device-Id": "web-app",
          },
          body: JSON.stringify({
            name: formData.name, // bate com UserUpdateSelfDto
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar perfil");
      }

      // Atualiza Redux localmente
      dispatch(updateUser({ name: formData.name }));

      toast.success("Perfil atualizado com sucesso!");
      onOpenChange(false);
    } catch (error) {
      toast.error("Não foi possível atualizar o perfil.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Atualize suas informações abaixo.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* FULL NAME */}
          <div className="grid gap-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              name="name"
              placeholder="Digite seu nome"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* EMAIL */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              disabled
              className="bg-muted"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

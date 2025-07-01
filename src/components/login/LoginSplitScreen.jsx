import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { authenticateUser } from "@/utils/authenticate-user";
import { useNavigate } from "react-router-dom";

export default function LoginSplitScreen() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    startTransition(async () => {
      const response = await authenticateUser(formData);
      setResult(response);
      if (response.success) {
        navigate("/proveedores");
      }
    });
  };

  const demoCredentials = [
    { user: "admin", pass: "123456", role: "Administrador" },
    { user: "demo", pass: "demo", role: "Usuario Demo" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Sistema de Gestión</h1>
                <p className="text-slate-300 text-sm">Versión 2.1.0</p>
              </div>
            </div>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Administra proveedores, facturas y reportes desde una sola
              plataforma integrada
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <div className="w-full max-w-md mt-16 lg:mt-0">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Bienvenido
            </h2>
            <p className="text-slate-600">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              Credenciales de Prueba:
            </h4>
            <div className="space-y-1 text-xs text-blue-800">
              {demoCredentials.map((cred, index) => (
                <div key={index} className="flex justify-between">
                  <span>
                    <strong>{cred.user}</strong> / {cred.pass}
                  </span>
                  <span className="text-blue-600">({cred.role})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="usuario"
                className="text-sm font-medium text-slate-700 mb-2 block"
              >
                Usuario
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="usuario"
                  name="usuario"
                  type="text"
                  placeholder="tu.usuario"
                  className="pl-12 h-12 border-slate-200 focus:border-slate-900 focus:ring-slate-900 text-base"
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-slate-700 mb-2 block"
              >
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-12 h-12 border-slate-200 focus:border-slate-900 focus:ring-slate-900 text-base"
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-slate-900 focus:ring-slate-900 border-slate-300 rounded"
                  disabled={isPending}
                />
                <span className="ml-2 text-sm text-slate-600">
                  Mantener sesión activa
                </span>
              </label>
              <button
                type="button"
                className="text-sm text-slate-900 hover:underline font-medium disabled:opacity-50"
                disabled={isPending}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verificando...
                </div>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>

          {/* Result Message */}
          {result && (
            <div
              className={`mt-4 p-4 rounded-lg flex items-center ${
                result.success
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              {result.success ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              <span className="text-sm font-medium">{result.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

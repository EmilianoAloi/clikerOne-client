import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Lock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react";
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
      if (response.token) {
        setResult({ success: true, message: "Inicio de sesión exitoso" });
        localStorage.setItem("token", response.token);
        navigate("/proveedores");
      } else {
        setResult({ success: false, message: "Credenciales incorrectas" });
      }
    });
  };

  const demoCredentials = [
    { user: "admin", pass: "123456", role: "Administrador" },
    { user: "demo", pass: "demo", role: "Usuario Demo" },
  ];

  return (
    <div className="min-h-screen flex ">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden pb-6">
        {/* Círculos decorativos */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 border border-white/20 rounded-full"></div>
        </div>

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/20  "></div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white h-full pt-16">
          {/* Logo y título */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <BarChart3 className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">ClikerOne</h1>
                <p className="text-slate-300 text-sm">v0.2</p>
              </div>
            </div>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Administra proveedores, facturas y reportes desde esta plataforma
              integrada.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-8 mb-12">
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Gestión de Proveedores
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Administra toda la información de tus proveedores de manera
                  simple.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Registro Integral.
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Llevá el registro y la gestión centralizada de todas las
                  operaciones de tus proveedores.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Estadísticas y Exportación
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Visualiza estadísticas, exportá datos de proveedores y
                  facturación a Excel.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">170+</div>
              <div className="text-slate-400 text-xs">Proveedores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">800+</div>
              <div className="text-slate-400 text-xs">
                Operaciones Mensuales
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">100%</div>
              <div className="text-slate-400 text-xs">Saldos Actualizados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo/Brand Section */}
          {/* <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Sistema de Gestión
            </h1>
            <p className="text-slate-600 mt-2 text-base">
              Accede a tu cuenta para continuar
            </p>
          </div> */}
          {/* Login Card */}
          <div className="bg-white shadow-2xl border-0 rounded-2xl px-8 pt-10 pb-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-center mb-1">
                Iniciar Sesión
              </h2>
              <p className="text-center text-slate-600 mb-4">
                Ingresa tus credenciales para acceder al sistema
              </p>
            </div>
            {/* Demo Credentials Info */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                Credenciales de Prueba:
              </h4>
              <div className="space-y-1 text-sm text-blue-900">
                <div className="flex justify-between">
                  <span>
                    <strong className="font-bold">admin</strong> / 123456
                  </span>
                  <span className="text-blue-600 text-xs">(Administrador)</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    <strong className="font-bold">demo</strong> / demo
                  </span>
                  <span className="text-blue-600 text-xs">(Usuario Demo)</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className=" ">
              <div>
                <Label
                  htmlFor="usuario"
                  className="text-sm font-medium text-slate-700"
                >
                  Usuario
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="usuario"
                    name="usuario"
                    type="text"
                    placeholder="Ingresa tu usuario"
                    className="pl-11 h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 text-base"
                    required
                    disabled={isPending}
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    className="pl-11 h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 text-base"
                    required
                    disabled={isPending}
                  />
                </div>
              </div>
              {/* <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
                    disabled={isPending}
                  />
                  <Label htmlFor="remember" className="text-sm text-slate-600">
                    Recordarme
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-slate-600 hover:text-slate-900 hover:underline font-medium disabled:opacity-50"
                  disabled={isPending}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div> */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base mt-6 rounded-xl shadow"
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
                className={`p-4 mt-4 rounded-lg flex items-center ${
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
          {/* Footer */}
          <div className="text-center mt-4 text-sm text-slate-500">
            © 2025 ClikerOne. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </div>
  );
}

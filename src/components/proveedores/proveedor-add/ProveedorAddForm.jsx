import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Phone,
  MapPin,
  Globe,
  Mail,
  UserCog,
  Landmark,
  Fingerprint,
  Info,
  Save,
  MapPinned,
  Percent,
  Loader2,
  StickyNote,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useProveedores } from "@/contexts/ProveedorContext";
import ProveedorAddArticles from "./ProveedorAddArticles";
import { useNavigate } from "react-router-dom";

const ProveedorAddForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const inputStyle = {
    className:
      "mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm",
  };

  const selectStyle = {
    className:
      "mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm",
  };

  const { createProveedorWithArticles } = useProveedores();

  // Artículo vacío inicial
  const createEmptyArticulo = () => ({
    id: crypto.randomUUID(),
    cantidad: 1,
    nombre: "",
    codigo_interno: "",
    precio_unitario: 0,
    unidad_de_medida: "unidad",
    descripcion: "",
    color: "",
  });

  const [articulos, setArticulos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    razon_social: "",
    contacto: "",
    telefono: "",
    email: "",
    direccion: "",
    web: "",
    cuit: "",
    iva_condicion: "",
    iva_predeterminado: "",
    observaciones: "",
    provincia: "",
    categoria: "",
    estado_logico: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cuit") {
      // Solo permitir números en CUIT
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddItem = () => {
    setArticulos((prev) => [...prev, createEmptyArticulo()]);
  };

  const handleRemoveItem = (id) => {
    setArticulos((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (id, key, value) => {
    setArticulos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formData.nombre || !formData.cuit) {
        toast.error("El nombre y el CUIT del proveedor son obligatorios.");
        return;
      }

      await createProveedorWithArticles(formData, articulos);

      toast.success(`Proveedor creado con éxito.`);
      navigate("/proveedores", { state: { refresh: true } });

      // Reset formulario proveedor
      setFormData({
        nombre: "",
        razon_social: "",
        contacto: "",
        telefono: "",
        email: "",
        direccion: "",
        web: "",
        cuit: "",
        iva_condicion: "",
        iva_predeterminado: "",
        observaciones: "",
        provincia: "",
        categoria: "",
        estado_logico: true,
      });

      // Reset artículos
      setArticulos([createEmptyArticulo()]);
    } catch (error) {
      toast.error(`Error al crear proveedor, ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mx-8 mb-6">
      <div className="w-full mx-auto px-2 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 4xl:grid-cols-6 gap-x-6 gap-y-6 py-4">
          {/* Nombre */}
          <div className="col-span-1">
            <Label
              htmlFor="nombre"
              className="flex items-center gap-2 font-semibold text-sm"
            >
              <UserCog className="h-4 w-4 text-slate-500" /> Nombre
            </Label>
            <Input
              {...inputStyle}
              id="nombre"
              name="nombre"
              placeholder="Ej: Proveedor Ejemplo"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          {/* Contacto */}
          <div className="col-span-1">
            <Label
              htmlFor="contacto"
              className="flex items-center gap-2 font-semibold text-sm"
            >
              <User className="h-4 w-4 text-slate-500" /> Contacto
            </Label>
            <Input
              {...inputStyle}
              id="contacto"
              name="contacto"
              placeholder="Ej: María Rodríguez"
              value={formData.contacto}
              onChange={handleChange}
            />
          </div>
          {/* Teléfono */}
          <div className="col-span-1">
            <Label
              htmlFor="telefono"
              className="flex items-center gap-2 font-semibold text-sm"
            >
              <Phone className="h-4 w-4 text-slate-500" /> Teléfono
            </Label>
            <Input
              {...inputStyle}
              id="telefono"
              name="telefono"
              placeholder="Ej: 1155551234"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>
          {/* Provincia */}
          <div className="col-span-1">
            <Label
              htmlFor="provincia"
              className="flex items-center gap-2 font-semibold text-sm"
            >
              <MapPinned className="h-4 w-4 text-slate-500" />
              Provincia
            </Label>
            <Select
              value={formData.provincia}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, provincia: value }))
              }
            >
              <SelectTrigger {...selectStyle}>
                <SelectValue placeholder="Seleccionar provincia" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Buenos Aires",
                  "Ciudad Autónoma de Buenos Aires",
                  "Catamarca",
                  "Chaco",
                  "Chubut",
                  "Córdoba",
                  "Corrientes",
                  "Entre Ríos",
                  "Formosa",
                  "Jujuy",
                  "La Pampa",
                  "La Rioja",
                  "Mendoza",
                  "Misiones",
                  "Neuquén",
                  "Río Negro",
                  "Salta",
                  "San Juan",
                  "San Luis",
                  "Santa Cruz",
                  "Santa Fe",
                  "Santiago del Estero",
                  "Tierra del Fuego",
                  "Tucumán",
                ].map((prov) => (
                  <SelectItem key={prov} value={prov}>
                    {prov}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Dirección */}
          <div className="col-span-1">
            <Label
              htmlFor="direccion"
              className="flex items-center gap-2 font-semibold text-sm"
            >
              <MapPin className="h-4 w-4 text-slate-500" /> Dirección
            </Label>
            <Input
              {...inputStyle}
              id="direccion"
              name="direccion"
              placeholder="Ej: Av. Siempre Viva 742"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>
          {/* Web */}
          <div className="col-span-1">
            <Label
              htmlFor="web"
              className="flex items-center gap-2 font-semibold text-sm"
            >
              <Globe className="h-4 w-4 text-slate-500" /> Sitio Web
            </Label>
            <Input
              {...inputStyle}
              id="web"
              name="web"
              placeholder="Ej:  https://proveedor.com.ar"
              value={formData.web}
              onChange={handleChange}
            />
          </div>
          {/* Email */}
          <div className="col-span-1">
            <Label
              htmlFor="email"
              className="flex items-center gap-2 font-semibold text-sm"
            >
              <Mail className="h-4 w-4 text-slate-500" /> Correo electrónico
            </Label>
            <Input
              {...inputStyle}
              id="email"
              name="email"
              type="email"
              placeholder="Ej: proveedor@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* Razón Social */}
          <div className="col-span-1">
            <Label
              htmlFor="razon_social"
              className="flex items-center gap-2 font-semibold text-sm"
            >
              <Landmark className="h-4 w-4 text-slate-500" /> Razón Social
            </Label>
            <Input
              {...inputStyle}
              id="razon_social"
              name="razon_social"
              placeholder="Ej: Proveedor Ejemplo S.A."
              value={formData.razon_social}
              onChange={handleChange}
            />
          </div>
          {/* CUIT */}
          <div className="col-span-1">
            <Label
              htmlFor="cuit"
              className="flex items-center gap-2 font-semibold text-sm"
            >
              <Fingerprint className="h-4 w-4 text-slate-500" /> CUIT
            </Label>
            <Input
              {...inputStyle}
              id="cuit"
              name="cuit"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Ej: 30112233445"
              value={formData.cuit}
              onChange={handleChange}
            />
          </div>
          {/* IVA */}
          <div className="col-span-1">
            <Label
              htmlFor="iva_condicion"
              className="flex items-center gap-2 font-semibold text-sm"
            >
              <Info className="h-4 w-4 text-slate-500" /> Condición IVA
            </Label>
            <Select
              value={formData.iva_condicion}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, iva_condicion: value }))
              }
            >
              <SelectTrigger {...selectStyle}>
                <SelectValue placeholder="Seleccionar condición" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Responsable Inscripto">
                  Responsable Inscripto
                </SelectItem>
                <SelectItem value="Monotributista">Monotributista</SelectItem>
                <SelectItem value="Exento">Exento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Iva predeterminado */}
          <div className="col-span-1">
            <Label
              htmlFor="iva_predeterminado"
              className="flex items-center gap-2 font-semibold text-sm"
            >
              <Percent className="h-4 w-4 text-slate-500" /> IVA predeterminado
            </Label>
            <Select
              value={formData.iva_predeterminado}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, iva_predeterminado: value }))
              }
            >
              <SelectTrigger {...selectStyle}>
                <SelectValue placeholder="Seleccionar IVA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="21">21%</SelectItem>
                <SelectItem value="10.5">10,5%</SelectItem>
                <SelectItem value="0">Exento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Observaciones */}
          <div className="sm:col-span-2 lg:col-span-4 4xl:col-span-6">
            <Label
              htmlFor="observaciones"
              className="flex items-center gap-2 font-semibold text-sm"
            >
              <StickyNote className="h-4 w-4 text-slate-500" />
              Observaciones
            </Label>
            <Textarea
              id="observaciones"
              name="observaciones"
              rows={4}
              placeholder="Ej: proveedor con entrega semanal"
              value={formData.observaciones}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400"
            />
          </div>
        </div>
      </div>
      <Separator className="mb-6" />

      <div>
        <ProveedorAddArticles
          items={articulos}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
          handleItemChange={handleItemChange}
        />
      </div>

      <div className="col-span-full flex justify-end gap-4 mt-6">
        <Button
          variant="outline"
          type="button"
          className="text-slate-700 cursor-pointer font-semibold py-5"
          onClick={() => navigate(-1)}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="text-white text-sm font-semibold rounded-sm cursor-pointer py-5"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Guardar Proveedor
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProveedorAddForm;

export default function OPviewObs({
  montoEnLetras,
  fechaCreacion,
  horaCreacion,
}) {
  return (
    <div className="bg-muted/20 mt-[-20px] md:mt-0 pt-8 px-6 md:space-y-6 md:mb-14 border-x border-b">
      {/* Monto en letras */}
      <div className="px-0 py-0 !md:p-4 !pb-6  rounded text-sm">
        <p className="text-2xl font-semibold ">Son: {montoEnLetras}</p>
      </div>

      {/* Firmas */}
      <div className="grid  grid-cols-2 gap-8 md:pt-8 text-sm text-muted-foreground">
        <div className="space-y-1 text-center border-t border-dashed pt-2">
          <p className="md:mb-6 text-lg">Visto Bueno Tesorería</p>
          <p className="text-lg">
            Fecha: <span className="tracking-widest">___ / ___ / ___</span>
          </p>
        </div>
        <div className="flex items-center flex-col text-center border-t border-dashed pt-2">
          <p className="text-lg">Retiró (Firma)</p>
          <hr className="border-t border-gray-400  w-54 mt-12" />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-2 mt-6 rounded text-sm text-muted-foreground flex justify-between">
        <span>Hoja 1 de 1</span>
        <span>
          Fecha: {fechaCreacion} | Hora: {horaCreacion}
        </span>
      </div>
    </div>
  );
}

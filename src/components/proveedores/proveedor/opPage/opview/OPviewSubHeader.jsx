export default function OPviewSubHeader() {
  return (
    <div className="p-6 border-x mt-[-40px] md:mt-0">
      <div className="md:space-y-2">
        <h4 className="font-semibold text-lg md:text-xl md:pb-6 !md:pb-0">
          Liquidación de Pago:
        </h4>
        <div className="grid grid-cols-1 grid-cols-2 md:gap-4 items-start justify-start">
          <div>
            <p className="text-sm text-muted-foreground font-semibold">
              Pagado a:
            </p>
            <p className="font-semibold"></p>
          </div>
          <div className="ps-30 md:ps-0 ">
            <p className="text-sm text-muted-foreground font-semibold">
              Nombre:
            </p>
            <p className="font-semibold text-sm md:text-medium">
              MUNDO PLASTIC SRL
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground font-semibold">
              Dirección:
            </p>
            <p className="font-semibold text-sm md:text-medium">
              MARGARIÑO CERVANTES 1754 (Paternal) C.A.B.A.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

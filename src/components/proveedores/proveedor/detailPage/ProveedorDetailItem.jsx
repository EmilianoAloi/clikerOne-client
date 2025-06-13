const SupplierDetailItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start space-x-3">
      {Icon && <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />}
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-muted-foreground">{value ?? "Sin datos"}</p>
      </div>
    </div>
  );
};

export default SupplierDetailItem;

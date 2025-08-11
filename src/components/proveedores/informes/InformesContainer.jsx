import InformesTitle from "./InformesTitle";
import InformesTabs from "./InformesTabs";

export default function InformesContainer() {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6 ">
      {/* Header Principal */}
      <InformesTitle />

      {/* Tabs Navigation */}
      <InformesTabs />
    </div>
  );
}

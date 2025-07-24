import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="link"
      size="sm"
      onClick={() => navigate(-1)}
      className="pl-0 text-muted-foreground flex items-center text-sm hover:text-primary !no-underline cursor-pointer pt-2 mr-1 "
    >
      <ArrowLeft className="h-4 w-4 mr-1" />
      Volver
    </Button>
  );
};

export default BackButton;

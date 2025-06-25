import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils"; // si usás shadcn

const colorMap = {
  blue: {
    border: "border-l-blue-500",
    text: "text-blue-600",
    bgHover: "hover:bg-blue-50",
    borderButton: "border-blue-200",
  },
  green: {
    border: "border-l-green-500",
    text: "text-green-600",
    bgHover: "hover:bg-green-50",
    borderButton: "border-green-200",
  },
  purple: {
    border: "border-l-purple-500",
    text: "text-purple-600",
    bgHover: "hover:bg-purple-50",
    borderButton: "border-purple-200",
  },
  orange: {
    border: "border-l-orange-500",
    text: "text-orange-600",
    bgHover: "hover:bg-orange-50",
    borderButton: "border-orange-200",
  },
};

const ResumenCard = ({
  icon,
  badge,
  title,
  value,
  subtitle,
  subvalue,
  progress,
  footer,
  buttonText,
  onClick,
  color = "blue",
}) => {
  const styles = colorMap[color] || colorMap.blue;

  return (
    <Card
      className={cn(
        "shadow-sm hover:shadow-md transition-all px-2 py-4 duration-200 border-l-4 gap-0",
        styles.border
      )}
    >
      <CardHeader className="">
        <div className="flex items-center justify-between">
          {icon}
          {badge}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 ">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 space-y-1">
        {subtitle && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{subtitle}</span>
            <span className={cn("font-medium", styles.text)}>{subvalue}</span>
          </div>
        )}
        {typeof progress === "number" && (
          <Progress value={progress} className="h-2" />
        )}
        {footer && (
          <div className="text-xs text-gray-500 text-center">{footer}</div>
        )}
        {buttonText && (
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "w-full mt-auto",
              styles.bgHover,
              styles.text,
              styles.borderButton
            )}
            onClick={onClick}
          >
            {buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumenCard;

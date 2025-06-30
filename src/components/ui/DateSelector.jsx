import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const inputStyle =
  "bg-white border border-gray-300 rounded-md shadow-sm !focus:outline-none !focus-visible:ring-1 !focus-visible:ring-gray-400";

export function DateSelector({ label, value, setValue }) {
  const [open, setOpen] = React.useState(false);
  const parsedDate = value ? new Date(`${value}T12:00:00`) : null;

  return (
    <div>
      <Label className="text-sm flex items-center gap-2 font-semibold">
        <CalendarIcon className="h-4 w-4 text-slate-500" />
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              inputStyle,
              "w-full justify-start text-left mt-1",
              !value && "text-muted-foreground"
            )}
          >
            {/* No muestres el icono dentro del input */}
            {parsedDate ? (
              format(parsedDate, "dd/MM/yyyy", { locale: es })
            ) : (
              <span>dd / mm / aaaa</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent avoidCollisions={false} className="w-auto p-0">
          <Calendar
            mode="single"
            locale={es}
            selected={parsedDate}
            onSelect={(date) => {
              const newValue = date ? format(date, "yyyy-MM-dd") : "";
              setValue(newValue);
              setOpen(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";

const ResumenBadgePopover = ({ label, items }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant="outline"
          onClick={(e) => e.stopPropagation()}
          className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors text-xs flex items-center gap-1 px-2 py-1"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{label}</span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent
        className="max-w-xs p-2 text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={i}>
              <strong>{item.label}</strong> – {item.value}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default ResumenBadgePopover;

// "use client";

// import { Paperclip, FileText, ExternalLink } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";

// export function AdjuntosBadgePopover({
//   adjuntos = [],
// }: {
//   adjuntos: { url: string; nombre: string }[];
// }) {
//   if (adjuntos.length === 0) {
//     return (
//       <span className="text-xs text-muted-foreground italic">Sin adjuntos</span>
//     );
//   }

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Badge
//           variant="outline"
//           className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors text-xs flex items-center gap-1 px-2 py-1"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <Paperclip className="h-3 w-3" />
//           <span>
//             {adjuntos.length} archivo{adjuntos.length > 1 ? "s" : ""} adjunto
//             {adjuntos.length > 1 ? "s" : ""}
//           </span>
//         </Badge>
//       </PopoverTrigger>
//       <PopoverContent className="w-80 p-0 overflow-hidden shadow-lg border rounded-lg">
//         <div className="bg-muted/40 px-4 py-2 border-b">
//           <h4 className="font-medium text-sm">Archivos adjuntos</h4>
//           <p className="text-xs text-muted-foreground">
//             {adjuntos.length} archivo{adjuntos.length > 1 ? "s" : ""} disponible
//             {adjuntos.length > 1 ? "s" : ""}
//           </p>
//         </div>
//         <div className="max-h-[250px] overflow-y-auto p-1">
//           {adjuntos.map((adj, idx) => (
//             <a
//               key={idx}
//               href={adj.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center justify-between gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors group"
//               title={adj.nombre}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex items-center gap-2 min-w-0">
//                 <div className="bg-primary/10 p-1.5 rounded text-primary">
//                   <FileText className="h-4 w-4" />
//                 </div>
//                 <span className="truncate text-sm font-medium">
//                   {adj.nombre}
//                 </span>
//               </div>
//               <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                 <button
//                   className="p-1 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
//                   title="Abrir en nueva pestaña"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     window.open(adj.url, "_blank");
//                   }}
//                 >
//                   <ExternalLink className="h-3.5 w-3.5" />
//                 </button>
//               </div>
//             </a>
//           ))}
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }

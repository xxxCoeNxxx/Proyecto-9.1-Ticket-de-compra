import "./style.css";
import { productos } from "./modelo/model";
import { generarTicketFinal} from "./motor/motor";
import { mostrarTicketFinal } from "./ui/ui";

document.addEventListener("DOMContentLoaded", () => {
    const TicketFinal = generarTicketFinal(productos);
    mostrarTicketFinal(TicketFinal);
});


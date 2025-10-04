import "./style.css";
import { productos } from "./modelo/model";
import { resulLineaTicket, resulTotalTicket, totalesPorTipoIva} from "./motor/motor";
import { muestraTicket, muestraTotales, muestraTicketIva } from "./ui/ui";

document.addEventListener("DOMContentLoaded", () => {
    const lineas = resulLineaTicket(productos);
    const totales = totalesPorTipoIva(lineas);
    muestraTicket(resulLineaTicket(productos));
    muestraTicketIva(totales, "desglose");
    muestraTotales(resulTotalTicket(resulLineaTicket(productos)));
});
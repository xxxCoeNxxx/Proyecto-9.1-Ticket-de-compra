import "./style.css";
import { productos } from "./modelo/model";
import { calculaTicket } from "./motor/motor";

document.addEventListener("DOMContentLoaded", () => {
    calculaTicket(productos);
});
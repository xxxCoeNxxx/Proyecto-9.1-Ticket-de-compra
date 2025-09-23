import { LineaTicket, TipoIva } from "../modelo/model.js";
import { muestraTicket } from "../ui/ui.js";

// Devuelve el valor base del IVA
const valorIVA = (tipoIva: TipoIva): number => {
    switch (tipoIva) {
        case "general": return 0.21;
        case "reducido": return 0.10;
        case "superreducidoA": return 0.05;
        case "superreducidoB": return 0.04;
        case "superreducidoC": return 0.00;
        case "sinIva": return 0.00;
    }
};

const precioConIVA = (precio: number, tipoIva: TipoIva): number => {
    return parseFloat((precio * (1 + valorIVA(tipoIva))).toFixed(2));
};

export const calculaTicket = (lineasTicket: LineaTicket[]) => {
    const ticketString = lineasTicket.reduce((acc, linea)  => {
        const precioSinIva = linea.producto.precio  * linea.cantidad;
        const precioFinal = precioConIVA(linea.producto.precio, linea.producto.tipoIva) * linea.cantidad;
        return ( acc + `${linea.producto.nombre} x ${linea.cantidad} - ${precioSinIva.toFixed(2)}€ - ${linea.producto.tipoIva} - ${precioFinal.toFixed(2)}€<br/>`);
    }, "");
    muestraTicket(ticketString);
}


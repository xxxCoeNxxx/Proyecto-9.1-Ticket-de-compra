import { ResultadoLineaTicket, ResultadoTotalTicket, TicketFinal, TipoIva } from "../modelo/model";

export const muestraTicket = (lineas: ResultadoLineaTicket[]) => {
  const divTicket = document.getElementById("contenido-ticket");
  if (divTicket) {
    divTicket.innerHTML = lineas
    .map((linea) =>
      `<div class="linea-ticket">
        <span>${linea.nombre} x ${linea.cantidad}</span>
        <span>${linea.precionSinIva}€</span>
        <span>${linea.tipoIva}</span>
        <span>${linea.precioConIva.toFixed(2)}€</span>
      </div>`
    ).join("");
  }
};

export const muestraTotales = (totales: ResultadoTotalTicket) => {
  const divTotales = document.getElementById("totales");
  if (divTotales) {
      divTotales.innerHTML = `IVA: ${totales.totalIva.toFixed(2)}€<br/>
                              Sin IVA: ${totales.totalSinIva.toFixed(2)}€<br/><hr/>
                              <strong>Total: ${totales.totalConIva.toFixed(2)}€</strong><br/>`;
  }
};

export const muestraTicketIva = (totales: Map<TipoIva, number>, contenedorId: string) => {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return
  contenedor.textContent = "";
  const lineaSeparadora = document.createElement("hr");
  contenedor.appendChild(lineaSeparadora);

  totales.forEach((importe, tipoIva) => {
    if (Math.abs(importe) < 0.01) return;
    const linea = document.createElement("div");
    linea.classList.add("linea-iva");

    const etiqueta = document.createElement("span");
    etiqueta.textContent = `${tipoIva}:`;
    etiqueta.classList.add("tipo-iva");

    const valor = document.createElement("span");
    valor.textContent = `${importe.toFixed(2)}€`;
    valor.classList.add("valor-iva");

    linea.appendChild(etiqueta);
    linea.appendChild(valor);
    contenedor.appendChild(linea);
  });

  const lineaFinal = document.createElement("hr");
  contenedor.appendChild(lineaFinal);
};

export const mostrarTicketFinal = (ticket: TicketFinal) => {
  muestraTicket(ticket.lineas);
  const mapaIvas = new Map(ticket.desgloseIva.map(d => [d.tipoIva, d.cuantia]));
  muestraTicketIva(mapaIvas, "desglose");

  muestraTotales(ticket.total);
}
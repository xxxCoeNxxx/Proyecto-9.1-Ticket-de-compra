import { LineaTicket, TipoIva, ResultadoLineaTicket, ResultadoTotalTicket,
          TicketFinal, TotalPorTipoIva } from "../modelo/model.js";

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

export const resulLineaTicket = (lineasTicket: LineaTicket[]): ResultadoLineaTicket[] => {
  return lineasTicket.map((linea): ResultadoLineaTicket => {
      const precioSinIva = linea.producto.precio * linea.cantidad;
      const precioFinal = precioConIVA(linea.producto.precio, linea.producto.tipoIva) * linea.cantidad;

      return{
          nombre: linea.producto.nombre,
          cantidad: linea.cantidad,
          precionSinIva: parseFloat(precioSinIva.toFixed(2)),
          tipoIva: linea.producto.tipoIva,
          precioConIva: parseFloat(precioFinal.toFixed(2))
      };
  });
};

export const resulTotalTicket = (resulLineaTicket: ResultadoLineaTicket[]): ResultadoTotalTicket => {
  const totalSinIva = resulLineaTicket.reduce((acc, linea) => acc + linea.precionSinIva, 0);
  const totalConIva = resulLineaTicket.reduce((acc, linea) => acc + linea.precioConIva, 0);
  const totalIva = totalConIva - totalSinIva;

  return{
      totalSinIva: parseFloat(totalSinIva.toFixed(2)),
      totalConIva: parseFloat(totalConIva.toFixed(2)),
      totalIva: parseFloat(totalIva.toFixed(2))
  };
}

export const totalesPorTipoIva = (lineas: ResultadoLineaTicket[]): Map<TipoIva, number> => {
  const mapa = new Map<TipoIva, number>();

  lineas.forEach((linea) => {
    const ivaLinea = linea.precioConIva - linea.precionSinIva;

    if (mapa.has(linea.tipoIva)) {
      mapa.set(linea.tipoIva, mapa.get(linea.tipoIva)! + ivaLinea);
    } else {
      mapa.set(linea.tipoIva, ivaLinea);
    }
  });

  return mapa;
};

export const generarTicketFinal = (productos: LineaTicket[]) :TicketFinal => {
  const lineas = resulLineaTicket(productos);
  const totales = resulTotalTicket(lineas);
  const mapaIvas = totalesPorTipoIva(lineas);

  const desgloseIva: TotalPorTipoIva[] = Array.from(mapaIvas, ([tipoIva, cuantia]) => ({ 
    tipoIva,
    cuantia: parseFloat(cuantia.toFixed(2))
  }));

  return {
    lineas,
    total: totales,
    desgloseIva
  };
}


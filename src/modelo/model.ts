
export type TipoIva =
| "general"
| "reducido"
| "superreducidoA"
| "superreducidoB"
| "superreducidoC"
| "sinIva";

// Interfaz general
export interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
};

// Interfaz para las líneas del ticket
export interface LineaTicket {
  producto: Producto;
  cantidad: number;
};

// Por cada producto se mostrarán estos datos
export interface ResultadoLineaTicket {
  nombre: string;
  cantidad: number;
  precionSinIva: number;
  tipoIva: TipoIva;
  precioConIva: number;
};

// Totales del ticket
interface ResultadoTotalTicket {
  totalSinIva: number;
  totalConIva: number;
  totalIva: number;
};

interface TotalPorTipoIva {
  tipoIva: TipoIva;
  cuantia : number;
};

export interface TicketFinal {
  lineas: ResultadoLineaTicket[];
  total: ResultadoTotalTicket;
  desgloseIva: TotalPorTipoIva[];
};

// Productos
export const productos: LineaTicket[] = [
  {
    producto: {
      nombre: "Legumbres",
      precio: 2,
      tipoIva: "general",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Perfume",
      precio: 20,
      tipoIva: "general",
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: "Leche",
      precio: 1,
      tipoIva: "superreducidoC",
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: "Lasaña",
      precio: 5,
      tipoIva: "superreducidoA",
    },
    cantidad: 1,
  },
];
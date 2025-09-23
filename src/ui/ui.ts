
export const muestraTicket = (ticket: string) => {
    const divTicket = document.getElementById("ticket");
    if (divTicket) {
        divTicket.innerHTML = ticket;
    }
};
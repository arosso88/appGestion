export class DetalleComprobantesDto{
  constructor(public dce_Id: number,
    public dce_cem_Id: number,
    public dce_art_Id: number,
    public dce_Descripcion: string,
    public dce_Cantidad: number,
    public dce_Precio: number,
    public dce_Importe: number,
    public dce_tmo_IdPrecio: number,
    public dce_ume_IdCantidad: number,
    public dce_ume_IdPrecio: number){
  }
}

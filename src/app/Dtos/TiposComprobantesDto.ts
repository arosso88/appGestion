export class TiposComprobantesDto{
  constructor(public tco_Id: number,
    public tco_Codigo: string,
    public tco_Descripcion: string,
    public tco_Tipo: string,
    public tco_DebitoCreditoVdor: string,
    public tco_DebitoCreditoCdor: string,
    public tco_tnu_Id: number,
    public tco_EmitidoRecibido: string,
    public descripcionTNU: string,
    public tco_MovimientoStock: string){}
}

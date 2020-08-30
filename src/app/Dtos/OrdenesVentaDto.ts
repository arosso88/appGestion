export class OrdenesVentaDto{
  constructor(public ove_Id: number,
    public ove_Codigo: string,
    public ove_cli_IdVendedor: number,
    public ove_cli_IdComprador: number,
    public ove_pdu_Id: string,
    public ove_pch_Id: string,
    public ove_Precio: number,
    public ove_tmo_IdPrecio: number,
    public ove_KgPactados: number,
    public ove_Observaciones: string,
    public ove_FechaNegocio: Date,
    public nombreComprador: string,
    public nombreVendedor: string,
    public moneda: string){}
}

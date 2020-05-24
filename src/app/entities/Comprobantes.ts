export class Comprobantes{
  constructor(
    public cem_Id: number,
    public cem_tco_Id: number,
    public cem_cli_IdVendedor: number,
    public cem_cli_IdComprador: number,
    public cem_FechaEmision: Date,
    public cem_ImporteSubtotal: number,
    public cem_ImporteIva: number,
    public cem_ImporteTotal: number,
    public cem_tmo_Id: number,
    public TcoCodigo: string,
    public CodigoComprador: number,
    public NombreComprador: string,
    public CodigoVendedor: number,
    public NombreVendedor: string,
    public SimboloMoneda: string,
    public cem_NroPuntoVenta: number,
    public cem_NroComprobante: number,
    public cem_Letra: string
  ){}
}

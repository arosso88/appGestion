import { DetalleComprobantesDto } from './DetalleComprobantesDto';

export class ComprobantesDto{
  constructor(public cem_Id: number,
    public cem_tco_Id: number,
    public cem_cli_IdVendedor: number,
    public cem_cli_IdComprador: number,
    public cem_FechaEmision: Date,
    public cem_ImporteSubtotal: number,
    public cem_ImporteIva: number,
    public cem_ImporteTotal: number,
    public cem_tmo_Id: number,
    public tcoCodigo: string,
    public codigoComprador: number,
    public nombreComprador: string,
    public codigoVendedor: number,
    public nombreVendedor: string,
    public simboloMoneda: string,
    public cem_NroPuntoVenta: number,
    public cem_NroComprobante: number,
    public cem_Letra: string,
    public detalle: Array<DetalleComprobantesDto>)
    {}


}

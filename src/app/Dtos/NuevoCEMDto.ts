import { DetalleCEMDto } from './DetalleCEMDto';

export class NuevoCEMDto{
  constructor(public tcoId: number,
    public ptoVenta: number,
    public nro: number,
    public letra: string,
    public fecha: Date,
    public cliIdComprador: number,
    public moneda: number,
    public Detalle: DetalleCEMDto[]){
  }
}

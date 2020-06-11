export class GrillaArticulosDto{
  constructor(public IdArticulo: number,
    public Nombre: string,
    public Cantidad: number,
    public Precio: number,
    public Importe: number){
  }
}

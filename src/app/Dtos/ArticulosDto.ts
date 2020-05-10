export class ArticulosDto {
  constructor(
    public art_Id: number,
    public art_Codigo: string,
    public art_Descripcion: string,
    public art_ume_Id: number,
    public art_cia_Id: number,
    public codigoUME: string,
    public descripcionUME: string,
    public descripcionCIA: string
  ) {}
}

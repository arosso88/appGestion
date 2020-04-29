export class SAUsuariosDto{
  constructor(
    public usu_Id: number,
    public usu_Nombre: string,
    public usu_Usuario: string,
    public usu_Clave: string,
    public usu_Token: string
  ) {}
}

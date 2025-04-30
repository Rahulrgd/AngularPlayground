export class Note {
  public readonly createdAt: Date;
  public updatedAt: Date;
  public id?: number;

  constructor(
    public title: string,
    public description: string,
    public noteListId: number
  ) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

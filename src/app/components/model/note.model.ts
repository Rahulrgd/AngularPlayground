export class Note {
  public readonly createdAt: Date;
  public updatedAt: Date;
  public id?: number;

  constructor(
    public title: string,
    public description: string | any  // allows HTML or Quill Delta
  ) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

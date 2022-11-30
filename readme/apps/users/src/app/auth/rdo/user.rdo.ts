import { Expose } from "class-transformer";


export class UserRDO {
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public posts: number;

  @Expose()
  public subscribers: number;

  @Expose()
  public createdAt: string;

  @Expose()
  public avatar!: string;
}

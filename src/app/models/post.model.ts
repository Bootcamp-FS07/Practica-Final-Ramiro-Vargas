import { User } from './user.model';

export class Post {
  public _id: string = '';
  public text: string = '';
  public author: User = new User(0, '');
  public createdAt: string = '';
  constructor() {}
}

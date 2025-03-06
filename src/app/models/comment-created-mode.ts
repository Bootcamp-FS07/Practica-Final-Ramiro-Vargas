import { User } from './user.model';

export class CommentCreated {
  public _id: string = '';
  public text: string = '';
  public author: string = '';
  public createdAt: string = '';
  public post: string = '';
  constructor() {}
}

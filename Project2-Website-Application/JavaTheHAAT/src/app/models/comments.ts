import { Posts } from 'src/app/models/posts';
import { Users } from './users';

export class Comments {
    cId?: number;
    pId?: number;
    uId?: number;
    user?: Users;
    commentText?: string;
    timeSubmission?: string;
}

import { Users } from './users';
import { Steps } from './steps';
import { Comments } from './comments';

export class Posts {
    pId?: number;
    uId?: number;
    user?: Users;
    title?: string;
    description?: string;
    video?: string;
    timeSubmission?: string;
    categoryId?: number;
    steps?: Array<Steps>;
    comments?: Array<Comments>;
}

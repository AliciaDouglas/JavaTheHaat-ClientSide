import { Users } from './users';
import { Steps } from './steps';
import { Comments } from './comments';
import { SafeResourceUrl } from '@angular/platform-browser';

export class Posts {
    id: number;
    pId?: number;
    uId?: number;
    user?: Users;
    title?: string;
    description?: string;
    video?: SafeResourceUrl;
    timeSubmission?: string;
    categoryId?: number;
    steps?: Array<Steps>;
    comments?: Array<Comments>;
}

import { Posts } from "src/app/models/posts";

export class Comments {
    cId?: number;
    post?: Posts;
    uId?: number;
    commentText?: string;
    timeSubmission?: string;
}
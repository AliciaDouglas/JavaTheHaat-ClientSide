import { AccountStatus } from './accountStatus';
import { AccountType } from './accountType';

export class Users {
    uId?: number;
    fname?: string;
    lname?: string;
    email?: string;
    username?: string;
    password?: string;
    profilePic?: string;
    accTypeId?: number;
    accType?: AccountType;
    accStatusId?: number;
    accStatus?: AccountStatus;
}

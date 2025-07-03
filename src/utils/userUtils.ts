import type { IUser } from '../shared/models/user';

export function filterOutUser(users: IUser[] | null, userToDelete: IUser): IUser[] | null {
    if (!users) return null;
    return users.filter(u => u.key !== userToDelete.key);
}

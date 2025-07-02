import type { IUser } from '../shared/models/user';

export function getDataSource(): IUser[] {
    const DataSource = localStorage.getItem('dataSource');
    return DataSource ? JSON.parse(DataSource) : null;
}
export function setDataSource(data: IUser[]): void {
    localStorage.setItem('dataSource', JSON.stringify(data));
}
export function deleteDataSource(): void {
    localStorage.removeItem('dataSource');
}

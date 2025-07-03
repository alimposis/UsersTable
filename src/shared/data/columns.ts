import { Button, Space, Table } from 'antd';

import type { IUser } from '../models/user';
import type { TableColumnsType } from 'antd';

export const columns: TableColumnsType<IUser> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: IUser, b: IUser) => a.name.localeCompare(b.name),
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        sorter: (a: IUser, b: IUser) => a.date.localeCompare(b.date),
    },
    {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
        sorter: (a: IUser, b: IUser) => a.number.localeCompare(b.number),
    },
];

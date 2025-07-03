import type { IUser } from '../../shared/models/user';

import { Button, Flex, Table } from 'antd';

import { columns } from '../../shared/data/columns';
import { getDataSource, setDataSource } from '../../services/dataSource.storage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PopupAddedNewUser } from '../../components/AddedNewUser/PopupAddedNewUser';
import { PopupEditUser } from '../../components/EditUser/PopupEditUser';
import { filterOutUser } from '../../utils/userUtils';
import { AddUserButton } from '../../components/AddUserButton/AddUserButton';

import AppStyle from './App.module.scss';

function App() {
    const [stateDataSource, setStateDataSource] = useState<null | IUser[]>(null);
    const [statePopup, setStatePopup] = useState(false);
    const [statePopupEditUser, setStatePopupEditUser] = useState(false);
    const [stateEditUser, setStateEditUser] = useState<null | IUser>(null);
    useEffect(() => {
        const dataSource = getDataSource();
        if (dataSource) {
            setStateDataSource(dataSource);
        }
    }, []);
    useEffect(() => {
        if (stateDataSource) {
            const newDataSource = stateDataSource.map((item, index) => ({
                ...item,
                key: `${index}`,
                number: `${item.number}`,
            }));
            setDataSource(newDataSource);
        }
        setStatePopup(false);
        setStatePopupEditUser(false);
    }, [stateDataSource]);

    const deleteUser = useCallback((userKey: IUser) => {
        setStateDataSource(prev => {
            return filterOutUser(prev, userKey);
        });
    }, []);

    const editUser = useCallback((user: IUser) => {
        setStatePopupEditUser(true);
        setStateEditUser(user);
    }, []);

    const actionColumn = useMemo(
        () => ({
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: unknown, user: IUser) => (
                <Flex gap={5}>
                    <Button onClick={() => editUser(user)}>Edit</Button>
                    <Button color="pink" variant="dashed" onClick={() => deleteUser(user)}>
                        Delete
                    </Button>
                </Flex>
            ),
        }),
        [editUser, deleteUser],
    );
    const allColumns = useMemo(() => [...columns, actionColumn], [columns, actionColumn]);
    return (
        <>
            <main className={AppStyle.main}>
                <Table
                    dataSource={stateDataSource ? stateDataSource : undefined}
                    columns={allColumns}
                />
                <AddUserButton setStatePopup={setStatePopup} />
                <PopupAddedNewUser
                    state={statePopup}
                    setState={setStatePopup}
                    stateUsers={stateDataSource}
                    setStateUsers={setStateDataSource}
                />
                <PopupEditUser
                    state={statePopupEditUser}
                    stateEditUser={stateEditUser}
                    setState={setStatePopupEditUser}
                    setStateEditUser={setStateEditUser}
                    setStateUsers={setStateDataSource}
                />
            </main>
        </>
    );
}

export default App;

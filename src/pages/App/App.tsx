import type { IUser } from '../../shared/models/user';

import { Button, Flex, Table } from 'antd';

import { columns } from '../../shared/data/columns';
import { getDataSource, setDataSource } from '../../services/dataSource.storage';

import AppStyle from './App.module.scss';
import { useEffect, useState } from 'react';
import { PopupAddedNewUser } from '../../components/AddedNewUser/PopupAddedNewUser';

function App() {
    const [stateDataSource, setStateDataSource] = useState<null | IUser[]>(null);
    const [statePopup, setStatePopup] = useState(false);
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
            }));
            setDataSource(newDataSource);
        }
        setStatePopup(false);
    }, [stateDataSource]);

    function deleteUser(userKey: IUser) {
        setStateDataSource(prev => {
            if (prev) {
                const newUsers = prev.filter(e => e.key !== userKey.key);
                return newUsers;
            }
        });
    }
    function deleteUser(userKey: IUser) {
        setStateDataSource(prev => {
            if (prev) {
                const newUsers = prev.filter(e => e.key !== userKey.key);
                return newUsers;
            }
        });
    }
    return (
        <>
            <main className={AppStyle.main}>
                <Table
                    dataSource={stateDataSource ? stateDataSource : undefined}
                    columns={[
                        ...columns,
                        {
                            title: 'Action',
                            dataIndex: 'action',
                            key: 'action',
                            render: (value, user, index) => {
                                return (
                                    <Flex gap={5}>
                                        <Button>Edit</Button>
                                        <Button
                                            color="pink"
                                            variant="dashed"
                                            onClick={() => deleteUser(user)}
                                        >
                                            Delete
                                        </Button>
                                    </Flex>
                                );
                            },
                        },
                    ]}
                />
                <Button onClick={() => setStatePopup(prev => !prev)}>Added new user</Button>
                <PopupAddedNewUser
                    state={statePopup}
                    setState={setStatePopup}
                    stateUsers={stateDataSource}
                    setStateUsers={setStateDataSource}
                />
            </main>
        </>
    );
}

export default App;

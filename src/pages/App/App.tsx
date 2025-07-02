import type { IUser } from '../../shared/models/user';

import { Button, Table } from 'antd';

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
        if (stateDataSource) setDataSource(stateDataSource);
        setStatePopup(false);
    }, [stateDataSource]);
    return (
        <>
            <main className={AppStyle.main}>
                <Table
                    dataSource={stateDataSource ? stateDataSource : undefined}
                    columns={columns}
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

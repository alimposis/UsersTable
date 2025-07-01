import { Table } from 'antd';

import { dataSource } from '../../shared/data/dataSource';
import { columns } from '../../shared/data/columns';
import { getDataSource } from '../../services/dataSource.storage';

import AppStyle from './App.module.scss';

function App() {
    console.log(getDataSource());
    return (
        <>
            <main className={AppStyle.main}>
                <Table dataSource={dataSource} columns={columns} />
            </main>
        </>
    );
}

export default App;

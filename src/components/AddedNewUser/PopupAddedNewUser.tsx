import type { FieldType, IUser } from '../../shared/models/user';

import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Modal } from 'antd';

interface Popup {
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    stateUsers: IUser[] | null;
    setStateUsers: React.Dispatch<React.SetStateAction<IUser[] | null>>;
}

export const PopupAddedNewUser = React.memo(
    ({ state, setState, stateUsers, setStateUsers }: Popup) => {
        const handleSubmit = useCallback(
            async (values: { username: string; date: string; number: string }) => {
                const date = values.date ? dayjs(values.date).format('YYYY-MM-DD') : '';
                const name = values.username;
                const number = values.number;
                const obj: IUser = {
                    key: `${stateUsers?.length ? stateUsers?.length + 1 : 1}`,
                    date,
                    name,
                    number,
                };
                setStateUsers(prev => [...(prev ?? []), obj]);
            },
            [stateUsers, setStateUsers],
        );
        return (
            <>
                <Modal
                    title="Added new user"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={state}
                    onCancel={() => setState(prev => !prev)}
                    footer={
                        <>
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600 }}
                                initialValues={{ remember: true }}
                                autoComplete="off"
                                onFinish={handleSubmit}
                            >
                                <Form.Item<FieldType> label="Username" name="username">
                                    <Input required />
                                </Form.Item>
                                <Form.Item<FieldType> label="Date" name="date">
                                    <DatePicker required />
                                </Form.Item>
                                <Form.Item<FieldType> label="Number" name="number">
                                    <InputNumber min={1} required />
                                </Form.Item>
                                <Form.Item label={null}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </>
                    }
                />
            </>
        );
    },
);

import type { FieldType, IUser } from '../../shared/models/user';

import { Button, DatePicker, Form, Input, InputNumber, Modal } from 'antd';

import dayjs from 'dayjs';
import React, { useCallback } from 'react';

interface IPopup {
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    stateEditUser: IUser | null;
    setStateUsers: React.Dispatch<React.SetStateAction<IUser[] | null>>;
    setStateEditUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const PopupEditUser = React.memo(
    ({ state, setState, stateEditUser, setStateEditUser, setStateUsers }: IPopup) => {
        const handleSubmit = useCallback(
            async (values: { username: string; date: string; number: string }) => {
                if (!stateEditUser) return;
                const date = values.date ? dayjs(values.date).format('YYYY-MM-DD') : '';
                const name = values.username;
                const number = values.number;
                const obj: IUser = {
                    key: stateEditUser.key,
                    date,
                    name,
                    number,
                };
                setStateUsers(prev => {
                    if (!prev) return null;
                    return prev.map(e => {
                        if (e.key === stateEditUser.key) {
                            return {
                                ...e,
                                date: obj.date,
                                name: obj.name,
                                number: obj.number,
                            };
                        }
                        return e;
                    });
                });
                setStateEditUser(null);
            },
            [stateEditUser, setStateEditUser],
        );
        return (
            <>
                <Modal
                    title="Edit user"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={state}
                    onCancel={() => {
                        setState(prev => !prev);
                    }}
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
                                        Edit
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

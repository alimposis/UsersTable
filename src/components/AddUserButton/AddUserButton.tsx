import React from 'react';
import { Button } from 'antd';

interface AddUserButtonProps {
    setStatePopup: (value: React.SetStateAction<boolean>) => void;
}

export const AddUserButton = React.memo(({ setStatePopup }: AddUserButtonProps) => {
    return <Button onClick={() => setStatePopup(prev => !prev)}>Added new user</Button>;
});

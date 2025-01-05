import React, {FC} from "react";

interface HandleInputChangeProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const HandleInputChangeComponent: FC<HandleInputChangeProps> = ({ name, value, onChange, placeholder }) => {
    return (
        <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} />
    );
};

export default HandleInputChangeComponent;

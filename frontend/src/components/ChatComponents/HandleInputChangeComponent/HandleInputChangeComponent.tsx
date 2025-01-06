import React, {FC} from "react";
import styles from './HandleInputChangeComponent.module.css';

interface HandleInputChangeProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const HandleInputChangeComponent: FC<HandleInputChangeProps> = ({ name, value, onChange, placeholder }) => {
    return (
        <input
            className={styles.input}
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

export default HandleInputChangeComponent;

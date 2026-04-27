import React from 'react';
import classnames from 'classnames';

import './input.scss';

export type InputType =
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'search'
    | 'tel'
    | 'url';

interface InputProps {
    id: string;
    label?: string;
    type?: InputType;
    value: string;
    placeholder?: string;
    helperText?: string;
    errorText?: string;
    loading?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    icon?: React.ReactNode;
    onChange: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
    id,
    label,
    type = 'text',
    value,
    placeholder,
    helperText,
    errorText,
    loading = false,
    disabled = false,
    clearable = false,
    icon,
    onChange
}) => {
    const hasError = Boolean(errorText);

    return (
        <div
            className={classnames('input', {
                'input--error': hasError,
                'input--loading': loading,
                'input--disabled': disabled,
                'input--clearable': clearable,
                'input--with-icon': icon
            })}
        >
            {label && (
                <label className="input__label" htmlFor={id}>
                    {label}
                </label>
            )}

            <div className="input__wrapper">
                {icon && <span className="input__icon">{icon}</span>}

                <input
                    id={id}
                    className="input__field"
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    disabled={loading || disabled}
                    aria-invalid={hasError}
                    aria-describedby={
                        helperText || errorText ? `${id}-help` : undefined
                    }
                    onChange={(e) => onChange(e.target.value)}
                />

                {clearable && value && !disabled && (
                    <button
                        type="button"
                        className="input__clear"
                        aria-label="Clear input"
                        onClick={() => onChange('')}
                    >
                        ×
                    </button>
                )}
            </div>

            {(helperText || errorText) && (
                <div
                    id={`${id}-help`}
                    className={classnames('input__helper', {
                        'input__helper--error': hasError
                    })}
                >
                    {errorText ?? helperText}
                </div>
            )}
        </div>
    );
};

export default Input;
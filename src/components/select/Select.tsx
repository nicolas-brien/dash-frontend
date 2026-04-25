import React from 'react';
import classnames from 'classnames';

import './select.scss';

export interface SelectOption {
    label: string;
    value: string;
    loading?: boolean;
    disabled?: boolean;
}

interface SelectProps {
    id: string;
    label?: string;
    value: string;
    options: SelectOption[];
    placeholder?: string;
    helperText?: string;
    errorText?: string;
    loading?: boolean;
    disabled?: boolean;
    onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
    id,
    label,
    value,
    options,
    placeholder = 'Select…',
    helperText,
    errorText,
    loading = false,
    disabled = false,
    onChange
}) => {
    const hasError = Boolean(errorText);

    return (
        <div
            className={classnames('select', {
                'select--error': hasError,
                'select--loading': loading,
                'select--disabled': disabled
            })}
        >
            {label && (
                <label className="select__label" htmlFor={id}>
                    {label}
                </label>
            )}

            <div className="select__wrapper">
                <select
                    id={id}
                    className="select__field"
                    value={value}
                    disabled={loading || disabled}
                    aria-invalid={hasError}
                    aria-describedby={
                        helperText || errorText ? `${id}-help` : undefined
                    }
                    onChange={(e) => onChange(e.target.value)}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}

                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <span className="select__arrow" aria-hidden="true">
                    ▾
                </span>
            </div>

            {(helperText || errorText) && (
                <div
                    id={`${id}-help`}
                    className={classnames('select__helper', {
                        'select__helper--error': hasError
                    })}
                >
                    {errorText ?? helperText}
                </div>
            )}
        </div>
    );
};

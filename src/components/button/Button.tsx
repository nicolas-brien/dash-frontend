import React from 'react';
import clsx from 'clsx';

import './button.scss';

type ButtonVariant = 'primary' | 'secondary' | 'link' | 'danger' | 'success';
type IconPosition = 'left' | 'right';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    loading?: boolean;
    submitting?: boolean;
    icon?: React.ReactNode;
    iconPosition?: IconPosition;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'secondary',
    loading = false,
    submitting = false,
    icon,
    iconPosition = 'left',
    children,
    disabled,
    ...props
}) => {
    const isDisabled = disabled || loading || submitting;

    return (
        <button
            className={clsx(
                'button',
                `button--${variant}`,
                {
                    'button--loading': loading,
                    'button--submitting': submitting,
                    'button--icon-left': icon && iconPosition === 'left',
                    'button--icon-right': icon && iconPosition === 'right',
                }
            )}
            disabled={isDisabled}
            {...props}
        >
            {submitting && <span className="button__spinner" />}

            {!submitting && icon && iconPosition === 'left' && (
                <span className="button__icon">{icon}</span>
            )}

            <span className="button__label">{children}</span>

            {!submitting && icon && iconPosition === 'right' && (
                <span className="button__icon">{icon}</span>
            )}
        </button>
    );
};

export default Button;

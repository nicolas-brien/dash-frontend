import React, { useState, useEffect } from 'react';

import type { DashSettings } from 'types/dash';

import Button from 'components/button/Button';
import Input from "components/input/Input";

import "./dash-settings-form.scss";

interface DashSettingsFormProps {
    settings: DashSettings;
    onUpdate: (settings: DashSettings) => void;
    onClose?: () => void;
}

export const DashSettingsForm: React.FC<DashSettingsFormProps> = ({ settings, onUpdate, onClose }) => {
    const [formState, setFormState] = useState<DashSettings>(settings);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setFormState(settings);
    }, [settings]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (formState.columns <= 0) {
            newErrors.columns = 'Columns must be greater than 0';
        }

        if (formState.rowHeight <= 0) {
            newErrors.rowHeight = 'Row height must be greater than 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleColsChange = (cols: string) => {
        const value = parseInt(cols, 10);
        setFormState(prev => ({ ...prev, columns: isNaN(value) ? 0 : value }));
    };

    const handleRowHeightChange = (rowHeight: string) => {
        const value = parseInt(rowHeight, 10);
        setFormState(prev => ({ ...prev, rowHeight: isNaN(value) ? 0 : value }));
    };

    const handleDisplayGridChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prev => ({ ...prev, displayGrid: e.target.checked }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onUpdate(formState);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="dash-settings-form">
            <div className="form-group">
                <Input id="cols" label="Columns" type="number" value={formState.columns.toString()} onChange={handleColsChange} errorText={errors.columns} />
                {/* <label htmlFor="cols">Columns</label>
        <input
          id="cols"
          type="number"
          min="1"
          value={formState.cols}
          onChange={handleColsChange}
          className={errors.cols ? 'input-error' : ''}
        />
        {errors.cols && <span className="error-message">{errors.cols}</span>} */}
            </div>

            <div className="form-group">
                <Input id="rowHeight" label="Row Height" type="number" value={formState.rowHeight.toString()} onChange={handleRowHeightChange} errorText={errors.rowHeight} />
                {/* <label htmlFor="rowHeight">Row Height</label>
        <input
          id="rowHeight"
          type="number"
          min="1"
          value={formState.rowHeight}
          onChange={handleRowHeightChange}
          className={errors.rowHeight ? 'input-error' : ''}
        />
        {errors.rowHeight && <span className="error-message">{errors.rowHeight}</span>}*/}
            </div>

            <div className="form-group checkbox">
                <label htmlFor="displayGrid">
                    <input
                        id="displayGrid"
                        type="checkbox"
                        checked={formState.displayGrid}
                        onChange={handleDisplayGridChange}
                    />
                    Display Grid
                </label>
            </div>

            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">Update Settings</Button>
        </form>
    );
};

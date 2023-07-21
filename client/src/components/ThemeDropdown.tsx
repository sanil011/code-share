import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist.json";
import { customStyles } from "../constants/customStyles";

interface Types {
    handleThemeChange: any;
    theme:any
}
const ThemeDropdown:React.FC<Types> = ({ handleThemeChange, theme }) => {
    return (
        <Select
            placeholder={`Select Theme`}
            // options={languageOptions}
            options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
                label: themeName,
                value: themeId,
                key: themeId,
            }))}
            value={theme}
            styles={customStyles}
            onChange={handleThemeChange}
        />
    );
};

export default ThemeDropdown;

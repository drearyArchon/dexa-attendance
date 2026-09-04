import { INPUT_SELECT_STYLE } from "./style";

const InputSelect = ({ fieldName, value, onChange, options, isRequired=true, isDisabled=false, label=null }) => {
    return (
        <div>
            {label && <label for={fieldName} class="block mb-1 text-sm font-semibold antialiased text-stone-800">{label}</label>}
            <select 
                id={fieldName} 
                required={isRequired} 
                disabled={isDisabled} 
                value={value} 
                onChange={onChange} 
                className={INPUT_SELECT_STYLE}
            >
                {options.map((option) => 
                    <option value={option.value}>{option.label}</option>
                )}
            </select>
        </div>
    );
};

export default InputSelect;
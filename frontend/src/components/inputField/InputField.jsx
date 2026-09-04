import { INPUT_FIELD_STYLE } from "./style";

const InputField = ({ fieldName, value, onChange, isRequired=true, isDisabled=false, type="text", label=null }) => {
    return (
        <div>
            {label && <label for={fieldName} class="block mb-1 text-sm font-semibold antialiased text-stone-800">{label}</label>}
            <input 
                id={fieldName} 
                type={type} 
                required={isRequired} 
                disabled={isDisabled} 
                value={value} 
                onChange={onChange} 
                className={INPUT_FIELD_STYLE}
            />
        </div>
    );
};

export default InputField;
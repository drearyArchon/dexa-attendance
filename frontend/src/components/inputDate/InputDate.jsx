import { INPUT_FIELD_STYLE } from "./style";

const InputDate = ({ fieldName, value, onChange, style="", isRequired=true, isDisabled=false, label=null }) => {
    return (
        <input 
            id={fieldName} 
            type="date"
            required={isRequired} 
            disabled={isDisabled} 
            value={value} 
            onChange={onChange} 
            className={`${INPUT_FIELD_STYLE} ${style}`}
        />
    );
};

export default InputDate;
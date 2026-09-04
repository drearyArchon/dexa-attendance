import { INPUT_IMAGE_STYLE } from "./style";

const InputImage = ({ fieldName, value, onChange, style="" }) => {
    return (
        <input 
            id={fieldName} 
            type="file"
            accept="image/png, image/jpeg"
            value={value} 
            onChange={onChange} 
            className={`${INPUT_IMAGE_STYLE} ${style}`}
        />
    );
};

export default InputImage;
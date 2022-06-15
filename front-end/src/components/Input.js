import '../styles/Main.css'


export default function Input({className, label, placeholder, defaultValue, type, required}) {
    return (
        <div className='input-container'>
            <label className='input-label'>{label}  {required? <span className='input-required'>*</span> : ""}</label>
            <input required={required} type={type? type : 'text'} placeholder={placeholder} defaultValue={defaultValue? defaultValue : ""} className={`Input ${className}`.trim()}/>
        </div>
    )
}

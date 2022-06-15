import '../styles/Main.css';

export default function Button({text, disabled}) {
    return (
        <div className={disabled? "btn btn-disabled" : "btn"}>
            {text}
        </div>
    )

}

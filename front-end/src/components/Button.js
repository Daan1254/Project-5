import '../styles/Main.css';

export default function Button({text, disabled, onClickHandler }) {
    return (
        <div onClick={onClickHandler} className={disabled? "btn btn-disabled" : "btn"}>
            {text}
        </div>
    )

}

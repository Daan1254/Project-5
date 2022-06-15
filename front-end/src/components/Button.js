import '../styles/Main.css';

export default function Button({text, disabled, onClickHandler }) {
    return (
        <div onClick={onclick} className={disabled? "btn btn-disabled" : "btn"}>
            {text}
        </div>
    )

}

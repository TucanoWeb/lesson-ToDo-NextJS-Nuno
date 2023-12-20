const ButtonComp = ({ title, onClick }) => {
    return (
        <button
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default ButtonComp
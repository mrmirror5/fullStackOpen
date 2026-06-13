const ErrorNotification = ({name}) => {

    const notifStyle = {
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderWidth: "4px",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px"
    }


    if (name === null) {
        return null
    }
    
    return (
        <div style={notifStyle} >
            {`Information of ${name} has already been removed from the server`}
        </div>
    )
}

export default ErrorNotification

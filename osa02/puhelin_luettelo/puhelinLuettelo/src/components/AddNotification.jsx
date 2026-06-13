const AddNotification = ({name}) => {

    const notifStyle = {
        color: "green",
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
            {`Added ${name}`}
        </div>
    )
}

export default AddNotification

import React from "react"

function Values(props) {
    const {text} = props;
    var splitText = text.split(';;');

    var textElements = splitText.map((part, index) => {
        if (part.includes(':')) {
            return <p key={index}>{part}</p>;
        } else {
            // If 'part' doesn't contain ':', return null (or you can return an empty string)
            return null;
        }
    });
     
    return (
        <div className="hint-div">
            <strong>Ability Values: </strong>
            {textElements}
        </div>
    )
    
}

export default Values;
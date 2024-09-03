import React from "react";

function Description(props) {
    const{description, heroName, abilityName} = props;
    var imgSource = heroName.replaceAll(" ", "-") + "-" + abilityName.replaceAll(" ", "-").replaceAll("(", "").replaceAll(")", "");


    return (
        <div className="hint-div">
            <strong>Ability Description: </strong>
            <br />
            <br />
            <div className="divider">
                <div><img alt="An image of the ability" src={"https://www.dotafire.com/images/skill/" + imgSource + ".png"} /></div>
                <br />
                <div >{description}</div>
                <br />
            </div>
        </div>
    )
}

export default Description;
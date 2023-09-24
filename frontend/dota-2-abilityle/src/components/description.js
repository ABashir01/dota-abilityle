import React from "react";

function Description(props) {
    const{description, heroName, abilityName} = props;
    var dashedName = abilityName.replaceAll(" ", "-");
    var imgSource = heroName.replaceAll(" ", "-") + "-" + abilityName.replaceAll(" ", "-").replaceAll("(", "").replaceAll(")", "");


    return (
        <div className="hint-div">
            <strong>Ability Description: </strong>
            <br />
            <br />
            <div className="divider">
                <div><img src={"https://www.dotafire.com/images/skill/" + imgSource + ".png"}></img></div>
                <br />
                <div >{description}</div>
                <br />
            </div>
        </div>
    )
}

export default Description;
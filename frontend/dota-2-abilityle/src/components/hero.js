import React from 'react'

function Hero(props) {
    const{heroName} = props;
    var dashedName = heroName.replaceAll(" ", "-")
   
    return(
        <div className="hint-div">
            <strong>Hero: </strong>
            <br />
            <br />
            <div className="divider">
                <div><img src={"https://www.dotafire.com/images/hero/icon/" + dashedName + ".png"}></img></div>
                <br />
                <div >{heroName}</div>
                <br />
            </div>
        </div>
    )
}

export default Hero;
import React from "react"

function Spot(props) {
    let styles = {
        width: props.tileSize,
        height: props.tileSize,
        backgroundColor: props.spotColor,
        userSelect: "none",
        zIndex: 1,
        position: "fixed",
        top: props.startY,
        left: props.startX,
    }

    return(
        <div style={styles}>
        </div>
    )
}

export default Spot
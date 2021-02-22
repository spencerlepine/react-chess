import React, {useState, useEffect} from "react"
import pieceImages from "./pieceImages"
import moveList from "./moveList"

function Piece(props) {
    const [coordinates, setCoordinates] = useState([0, 0]);
    const [offset, setOffset] = useState([0, 0]);
    const [selected, setSelected] = useState(false);
    const [lastMove, setLastMove] = useState();
    const [img, setImg] = useState()
    const [renderMe, setRenderMe] = useState(true)

    // Set the initial x, y variables
    useEffect(() => {
        setImg(pieceImages[props.pieceType][props.pieceColor])
        setLastMove([indexCoordinates(props.startX, 0), indexCoordinates(props.startY, 1)])
        setCoordinates([props.startX, props.startY])
    }, [])

    function indexCoordinates(coord, coordNum) {
        return Math.floor((coord - props.boardCoords[coordNum]) / props.tileSize);
    }

    // Pick up the piece, start following the mouse
    function clickDown({ target }) {
        const elem = target.getBoundingClientRect();
        if (!selected) {
            setOffset([elem.right - props.mouseX, elem.top - props.mouseY])
        }

        setLastMove([indexCoordinates(props.mouseX, 0), indexCoordinates(props.mouseY, 1)])

        setSelected(true)
    }

    // Drop the piece, or put in back in its valid spot
    function clickRelease() {
        setSelected(false)

        let col = indexCoordinates(props.mouseX, 0)
        let row = indexCoordinates(props.mouseY, 1)

        let thisMoveList = moveList[props.pieceType][props.pieceColor].map((move) => {
            let possibleCol = lastMove[0] + move[0]
            let possibleRow = lastMove[1] + move[1]

            if (possibleRow >= 0 && possibleRow <= 7 && possibleCol >= 0 && possibleCol <= 7) {
                return [possibleCol, possibleRow]
            } 
            return lastMove
        })

        console.log(thisMoveList)

        if (props.validMove(lastMove[0], lastMove[1], col, row, thisMoveList)) {
            // Put in new position
            setCoordinates([(col * props.tileSize) + props.boardCoords[0], (row * props.tileSize) + props.boardCoords[1]])
            setLastMove([col, row])
        } else {
            // Put in previous spot
            setCoordinates([props.boardCoords[0] + (lastMove[0] * props.tileSize), props.boardCoords[1] + (lastMove[1] * props.tileSize)])
        }
    }


    // Follow the mouse around
    function updatePosition() {
        if (selected) {
            setCoordinates((prevCoords) => {
                return [props.mouseX - offset[0], props.mouseY + offset[1]]
            })
        }
    }

    // Parent object tracks mouse movement, updating props  
    useEffect(() => {
        updatePosition()
    }, [props.mouseX, props.mouseY])

    // Check to see if this spot was overwritten (piece taken)
    useEffect(() => {
        if (lastMove) {
            if (lastMove[1] >= 0 && lastMove[1] <= 7 && lastMove[0] >= 0 && lastMove[0] <= 7) {
                let nextSpot = props.gameStateArray[lastMove[1]][lastMove[0]];

                if (nextSpot !== `${props.pieceColor}${props.pieceType}` && nextSpot !== ' ') {
                    setRenderMe(false)
                    return
                }
            }
        }
    }, [props.gameStateArray])

    const styles = {
        top: coordinates[1], 
        left: coordinates[0], 
        transform: selected && "scale(1.3)",
        zIndex: selected ? "10" : "9"
    }

    return (
        <>
        {renderMe && 
            <div
                onMouseDown={clickDown}
                onMouseUp={clickRelease}
                style={styles}
                className="piece">
                <img style={{width: props.tileSize}} src={img} alt="Chess Piece"></img>
            </div>}
        </>
    )
}

export default Piece
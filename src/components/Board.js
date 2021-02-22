import React, { useState, useEffect } from "react"
import Piece from "./Piece"
import Spot from "./Spot"
import useMousePosition from "./useMousePosition"
import piecesArray from "./piecesArray"
import gameArray from "./gameArray"

const TILE_SIZE = 80;
const BOARD_COORDS = [50, 50];

function Board() {
    const [gameStateArray, setGameStateArray] = useState(gameArray)

    const { x, y } = useMousePosition();

    function validMove(lastC, lastR, newC, newR, moveList) {
        if (lastC === newC && lastR === newR) {
            return false
        }

        let thisPiece = `${gameStateArray[lastR][lastC]}`
        for (let i = 0, l = moveList.length; i < l; i++) {
            if (moveList[i][0] === newC && moveList[i][1] === newR) {
                setGameStateArray((prevArray) => {
                    let newArray = [...prevArray]
                    newArray[newR][newC] = thisPiece
                    newArray[lastR][lastC] = ' '
                    return newArray
                })
                return true
            }
        }
    }

    //Initialize the pieces array
    const pieces = piecesArray.map((spot, i) => {
        return (
                <Piece 
                    key={i}
                    startX={BOARD_COORDS[0] + (spot[1] * TILE_SIZE)}
                    startY={BOARD_COORDS[1] + (spot[0] * TILE_SIZE)}
                    pieceType={spot[2][1]}
                    pieceColor={spot[2][0]}
                    mouseX={x}
                    mouseY={y}
                    tileSize={TILE_SIZE}
                    boardCoords={BOARD_COORDS}
                    validMove={validMove} 
                    gameStateArray={gameStateArray}
                />
        )
    })

    // Initialize the spots array
    const spots = gameArray.map((row, r) => {
        return (
            row.map((col, c) => {
                return (
                    <Spot
                        key={r+c}
                        startX={BOARD_COORDS[0] + (c * TILE_SIZE)}
                        startY={BOARD_COORDS[1] + (r * TILE_SIZE)} 
                        tileSize={TILE_SIZE} 
                        spotColor={(r + c) % 2 ? "#b48766" : "#f0d9b7"} />
                )
            })
        )
    })

    const styles = {
        width: TILE_SIZE * 8,
        height: TILE_SIZE * 8,
        top: BOARD_COORDS[1],
        left: BOARD_COORDS[0],
    }

    return (
        <div className="chessBoard" style={styles}>
            {pieces}
            {spots}
        </div>
    )
}

export default Board
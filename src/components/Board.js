import React, { useState, useEffect } from "react"
import Piece from "./Piece"
import Spot from "./Spot"
import useMousePosition from "./useMousePosition"
import piecesArray from "./piecesArray"
import gameArray from "./gameArray"
import moveList from "./moveList"

const TILE_SIZE = 80;
const BOARD_COORDS = [50, 50];

function Board() {
    const [gameStateArray, setGameStateArray] = useState(gameArray)
    const [possibleMoves, setPossibleMoves] = useState([])
    const [turn, setTurn] = useState('w')

    const { x, y } = useMousePosition();

    function validMove(lastC, lastR, newC, newR, pieceColor, pieceType) {
        if (lastC === newC && lastR === newR) {
            return false
        }

        let thisPiece = `${gameStateArray[lastR][lastC]}`
        for (let i = 0, l = possibleMoves.length; i < l; i++) {
            if (possibleMoves[i][0] === newC && possibleMoves[i][1] === newR) {

                // Is this a jump
                if (pieceType !== 'n') {
                    // Assume xDif and yDif are equal
                    let xDif = newC - lastC
                    let yDif = newR - lastR
                    let shiftX = lastC + (xDif < 0 ? -1: 1)
                    let shiftY = lastR + (yDif < 0 ? -1: 1)


                    if (Math.abs(xDif) > 1 && Math.abs(yDif) > 1) {
                        // get the spots inbetween and make sure they are all empty
                        for (let d = 1; d < Math.abs(xDif); d++) {
                            if (gameStateArray[shiftY][shiftX] !== ' ') {
                                return false
                            }
                        }
                    } else if (Math.abs(xDif) > 1 && yDif === 0) {
                        for (let d = 1; d < Math.abs(xDif); d++) {
                            if (gameStateArray[lastR][shiftX] !== ' ') {
                                return false
                            }
                        }
                    } else if (Math.abs(yDif) > 1 && xDif === 0) {
                        for (let d = 1; d < Math.abs(yDif); d++) {
                            if (gameStateArray[shiftY][lastC] !== ' ') {
                                return false
                            }
                        }
                    }
                }

            
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

    // Clear the possible moves when no pieces are selected
    function clearPossibleMoves() {
        setPossibleMoves([])
    }

    function changeTurn() {
        if (turn === 'w') {
            setTurn('b')
        } else {
            setTurn('w')
        }
    }
    function savePossibleMoves(currentC, currentR, pieceType, pieceColor) {
        // Filter out the obvious impossible moves
        let availableMoves = moveList[pieceType][pieceColor].map((move) => {
            let possibleCol = currentC + move[0]
            let possibleRow = currentR + move[1]
            

            // Only eat other pieces


            // If this move is within the board boundaries
            if (possibleRow >= 0 && possibleRow <= 7 && possibleCol >= 0 && possibleCol <= 7) {
                // If this move is the opposite color
                if (gameStateArray[possibleRow][possibleCol][0] !== turn) {
                    return [possibleCol, possibleRow]
                } 
            }
            return []
        })

        setPossibleMoves(availableMoves)
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
                    clearPossibleMoves={clearPossibleMoves}
                    savePossibleMoves={savePossibleMoves} 
                    changeTurn={changeTurn}
                    turn={turn} />
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
                        spotColor={(r + c) % 2 ? "#b48766" : "#f0d9b7"}
                        possibleMoves={possibleMoves}
                        col={c}
                        row={r} />
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
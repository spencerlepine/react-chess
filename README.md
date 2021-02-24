# Chess React App

Play chess in the browser by with drag and drop moves. This was created using the Javascript React framework.

![Game Screenshot](./screenshot.jpg)

### Overview:
```<Board />``` component tracks the game state with an 2D 8x8 ```array```.  
* ```<Piece />``` components are displayed based on coordinates.
  * Each will handle when the user ***clicks*** and ***drags***

* ```<Spot />``` components are rendered representing the checkers of the board
    * Each will display a ***highlight*** circle if a piece can move there

##### Other: 
>```moveList.js``` contains an object addressed by [```pieceType```] to return valid chess moves.

> Users drag and drop a piece each turn, and the ```gameStateArray``` will save that move.

***
#### Todo:
- add sound?
- flip board?
- Better sprites: [PNG to SVG](https://www.pngtosvg.com/)
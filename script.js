//CREATE BOARD
let numbertr = 1;
let lettertr = ["A","B","C","D","E","F","G","H"];
let i = 0;
lettertr[0] = lettertr[i];

for (let row = 1; row < 9; row++) {
  let sqr = "";
  for (let column = 0; column < 8; column++) {
    var divID = row + lettertr[column];
    sqr += "<div id="+ divID +" class='dimensions td' onmouseover='getID(this.id)' onclick='getIDSelected(this.id,this)'></div>";
  }
  $("#chess").append("<div id="+ numbertr +" class='dimesions tr'>"+ sqr +"</div>");
  numbertr++;
}

let whitesPlaying = true;

function getID(id) {
  document.getElementById("demo").innerHTML = id;
};

function getIDSelected(id, elm) {
  document.getElementById("selectedp").innerHTML = id;

  if(movage.shouldMove != null){
    let xCord = parseInt(id[0]);
    let yCord = letters.indexOf(id[1]) + 1;

    let allowed = movage.shouldMove(movage.fromX, movage.fromY, xCord, yCord);

    if(xCord == movage.fromX && yCord == movage.fromY) allowed = false;

    let pieceName = movage.movingPiece.split("/")[movage.movingPiece.split("/").length-1].split(".")[0];

    if(pieceName.startsWith("b") && whitesPlaying){
      console.log("Play in your own turn!");
      allowed = false;
    }

    if(pieceName.startsWith("w") && !whitesPlaying){
      console.log("Play in your own turn!");
      allowed = false;
    }

    if(allowed){
      whitesPlaying = !whitesPlaying;

      let chessPiece = document.getElementById(movage.fromX + letters[movage.fromY-1]);
      chessPiece.removeChild(chessPiece.childNodes[0]);

      if(elm.childNodes.length < 1) {

      }else{
        let targetChessPiece = elm.removeChild(elm.childNodes[0]);
      }

      let wPawn = new Pieza(movage.movingPiece, xCord + letters[yCord-1]);

      chessPiece.classList.remove("blue");
      lastPieceSelected = null;

      movage = {
        fromX: -1,
        fromY: -1,
        shouldMove: null,
        movingPiece: "",
      };
    }
  }
};

let numbers = 1;
let letters = ["A","B","C","D","E","F","G","H"];

for (let j = 0; j < 8 ; j++) {
  $("#ui").append("<div class='p'><p class='p-p'>"+ letters[j] +"</p></div>");
}

for (let k = 0; k < 8; k++) {
  $("#ui-n").append("<div class='p2'><p class='p2-p'>"+ numbers +"</p></div>");
  numbers++;
}

let lastPieceSelected = null;

let movage = {
  fromX: -1,
  fromY: -1,
  shouldMove: null,
  movingPiece: "",
};

//APPEND PIECES WITH CONSTRUCTOR
function Pieza(src, container) {
  this.src = src || "";
  this.container = document.getElementById(container) || "";

  let img = document.createElement("img"); /* Create a image container tag */
  img.src = this.src; /* Sate that the src from the function is the same for the image */
  img.style.zindex = '2'; /* Make image be on top of the board so it can be seen */
  img.style.margin = '0 auto'; /* Centre Image in the container asigned*/
  img.style.display = 'block'; /* Display block so center works */
  this.container.appendChild(img); /* Append the img to the container */

  img.onclick = function() {
    let id = this.parentNode.id;
    if(lastPieceSelected != null) document.getElementById(lastPieceSelected).classList.toggle("blue");

    let piece = this.src.split("/")[this.src.split("/").length-1].split(".")[0];

    function turnSwitchToW() {
      document.getElementById("turnHero").innerHTML = "White's Turn";
    }

    function turnSwitchToB() {
      document.getElementById("turnHero").innerHTML = "Black's Turn";
    }

    if(piece.startsWith("b") && whitesPlaying){
      console.log("It's Whites Turn");
      alert("It's Whites Turn");
      return;
    }

    if(piece.startsWith("w") && !whitesPlaying){
      console.log("It's Blacks Turn");
      alert("It's Blacks Turn");
      return;
    }

    if(piece == "wpawn"){
      let allowMove = function(fromX, fromY, toX, toY) {
        if (fromX < toX) {
          return false;
        }

        if(toY == fromY && Math.abs(fromX - toX) == 1) {
          return true;
        }

        if (Math.abs(fromY - toY) == 1 && Math.abs(fromX - toX) == 1) {
          return false;
        }
        return false;
      }

      let xCord = parseInt(this.parentNode.id[0]);
      let yCord = letters.indexOf(this.parentNode.id[1]) + 1;

      movage.shouldMove = allowMove;
      movage.fromX = xCord;
      movage.fromY = yCord;
      movage.movingPiece = this.src;

      turnSwitchToB();
    }


    if(piece == "wrook"){
      let allowMove = function(fromX, fromY, toX, toY) {
        if(toY == fromY && Math.abs(fromX - toX) >= 1) {
          return true;
        }

        if(toX == fromX && Math.abs(fromY - toY) >= 1) {
          return true;
        }
        return false;
      }

      let xCord = parseInt(this.parentNode.id[0]);
      let yCord = letters.indexOf(this.parentNode.id[1]) + 1;

      movage.shouldMove = allowMove;
      movage.fromX = xCord;
      movage.fromY = yCord;
      movage.movingPiece = this.src;

      turnSwitchToB();
    }

    if(piece == "wbishop"){
      let allowMove = function(fromX, fromY, toX, toY) {
        return Math.abs(toY - fromY) == Math.abs(toX - fromX);
      }

      let xCord = parseInt(this.parentNode.id[0]);
      let yCord = letters.indexOf(this.parentNode.id[1]) + 1;

      movage.shouldMove = allowMove;
      movage.fromX = xCord;
      movage.fromY = yCord;
      movage.movingPiece = this.src;

      turnSwitchToB();
    }

    if(piece == "wknight"){
      let allowMove = function(fromX, fromY, toX, toY) {
        if (Math.abs(toY - fromY) == 2 && Math.abs(toX - fromX) == 1) {
          return true;
        }

        if (Math.abs(toX - fromX) == 2 && Math.abs(toY - fromY) == 1) {
          return true;
        }
        return false;
      }

      let xCord = parseInt(this.parentNode.id[0]);
      let yCord = letters.indexOf(this.parentNode.id[1]) + 1;

      movage.shouldMove = allowMove;
      movage.fromX = xCord;
      movage.fromY = yCord;
      movage.movingPiece = this.src;

      turnSwitchToB();
    }

    if(piece == "wking"){ //KING
      let allowMove = function(fromX, fromY, toX, toY) {
        if (Math.abs(fromY - toY) == 1 && Math.abs(fromX - toX) == 1) {
          return true;
        }

        if(toY == fromY && Math.abs(fromX - toX) == 1) {
          return true;
        }

        if (toX == fromX && Math.abs(fromY - toY) == 1) {
          return true;
        }
        return false;
      }

      let xCord = parseInt(this.parentNode.id[0]);
      let yCord = letters.indexOf(this.parentNode.id[1]) + 1;

      movage.shouldMove = allowMove;
      movage.fromX = xCord;
      movage.fromY = yCord;
      movage.movingPiece = this.src;

      turnSwitchToB();
    }

    if(piece == "wqueen"){
      let allowMove = function(fromX, fromY, toX, toY) {
        if(toY == fromY && Math.abs(fromX - toX) >= 1) {
          return true;
        }

        if (toX == fromX && Math.abs(fromY - toY) >= 1) {
          return true;
        }

        if (Math.abs(toY - fromY) == Math.abs(toX - fromX)) {
          return true;
        } else {
          return false;
        }

        if(toY > fromY && Math.abs(fromX - toX) >= 1) {
          return true;
        }

        if(toY < fromY && Math.abs(fromX - toX) >= 1) {
          return true;
        }
        return false;
      }

      let xCord = parseInt(this.parentNode.id[0]);
      let yCord = letters.indexOf(this.parentNode.id[1]) + 1;

      movage.shouldMove = allowMove;
      movage.fromX = xCord;
      movage.fromY = yCord;
      movage.movingPiece = this.src;

      turnSwitchToB();
    }

    /*                                                                                  BLACK Pieces
    */

    if(piece == "bpawn"){
      let allowMove = function(fromX, fromY, toX, toY) {
        if (fromX > toX) {
          return false;
        }

        if(toY == fromY && Math.abs(fromX - toX) == 1) {
          return true;
        }

        if (Math.abs(fromY - toY) == 1 && Math.abs(fromX - toX) == 1) {
          return false;
        }
        return false;
      }

      let xCord = parseInt(this.parentNode.id[0]);
      let yCord = letters.indexOf(this.parentNode.id[1]) + 1;

      movage.shouldMove = allowMove;
      movage.fromX = xCord;
      movage.fromY = yCord;
      movage.movingPiece = this.src;

      turnSwitchToW();
    }

    if(piece == "brook"){
      let allowMove = function(fromX, fromY, toX, toY) {
        if(toY == fromY && Math.abs(fromX - toX) >= 1) {
          return true;
        }
        if(toX == fromX && Math.abs(fromY - toY) >= 1) {
          return true;
        }
        return false;
      }

      let xCord = parseInt(this.parentNode.id[0]);
      let yCord = letters.indexOf(this.parentNode.id[1]) + 1;

      movage.shouldMove = allowMove;
      movage.fromX = xCord;
      movage.fromY = yCord;
      movage.movingPiece = this.src;

      turnSwitchToW();
    }

    if(piece == "bbishop"){
      let allowMove = function(fromX, fromY, toX, toY) {
        if (Math.abs(toY - fromY) == Math.abs(toX - fromX)) {
          return true;
        } else {
          return false;
        }
        return false;
      }

      let xCord = parseInt(this.parentNode.id[0]);
      let yCord = letters.indexOf(this.parentNode.id[1]) + 1;

      movage.shouldMove = allowMove;
      movage.fromX = xCord;
      movage.fromY = yCord;
      movage.movingPiece = this.src;

      turnSwitchToW();
    }

    if(piece == "bknight"){
      let allowMove = function(fromX, fromY, toX, toY) {
        if (Math.abs(toY - fromY) == 2 && Math.abs(toX - fromX) == 1) {
          return true;
        }

        if (Math.abs(toX - fromX) == 2 && Math.abs(toY - fromY) == 1) {
          return true;
        }
        return false;
      }

      let xCord = parseInt(this.parentNode.id[0]);
      let yCord = letters.indexOf(this.parentNode.id[1]) + 1;

      movage.shouldMove = allowMove;
      movage.fromX = xCord;
      movage.fromY = yCord;
      movage.movingPiece = this.src;

      turnSwitchToW();
    }

    if(piece == "bking"){ //KING
      let allowMove = function(fromX, fromY, toX, toY) {
        if (Math.abs(fromY - toY) == 1 && Math.abs(fromX - toX) == 1) {
          return true;
        }

        if(toY == fromY && Math.abs(fromX - toX) == 1) {
          return true;
        }

        if (toX == fromX && Math.abs(fromY - toY) == 1) {
          return true;
        }
        return false;
      }

      let xCord = parseInt(this.parentNode.id[0]);
      let yCord = letters.indexOf(this.parentNode.id[1]) + 1;

      movage.shouldMove = allowMove;
      movage.fromX = xCord;
      movage.fromY = yCord;
      movage.movingPiece = this.src;

      turnSwitchToW();
    }

    if(piece == "bqueen"){
      let allowMove = function(fromX, fromY, toX, toY) {
        if(toY == fromY && Math.abs(fromX - toX) >= 1) {
          return true;
        }

        if (toX == fromX && Math.abs(fromY - toY) >= 1) {
          return true;
        }

        if (Math.abs(toY - fromY) == Math.abs(toX - fromX)) {
          return true;
        } else {
          return false;
        }

        if(toY > fromY && Math.abs(fromX - toX) >= 1) {
          return true;
        }

        if(toY < fromY && Math.abs(fromX - toX) >= 1) {
          return true;
        }
        return false;
      }

      let xCord = parseInt(this.parentNode.id[0]);
      let yCord = letters.indexOf(this.parentNode.id[1]) + 1;

      movage.shouldMove = allowMove;
      movage.fromX = xCord;
      movage.fromY = yCord;
      movage.movingPiece = this.src;

      turnSwitchToW();
    }

    document.getElementById(id).classList.toggle("blue");

    lastPieceSelected = id;
  }
}


//BLACK PIECES
var bRook = new Pieza("img/brook.png", "1A");
var bKnight = new Pieza("img/bknight.png", "1B");
var bBishop = new Pieza("img/bbishop.png", "1C");
var bQueen = new Pieza("img/bqueen.png", "1D");
var bKing = new Pieza("img/bking.png", "1E");
var bBishop = new Pieza("img/bbishop.png", "1F");
var bKnight = new Pieza("img/bknight.png", "1G");
var bRook = new Pieza("img/brook.png", "1H");

var bPawn = new Pieza("img/bpawn.png", "2A");
var bPawn = new Pieza("img/bpawn.png", "2B");
var bPawn = new Pieza("img/bpawn.png", "2C");
var bPawn = new Pieza("img/bpawn.png", "2D");
var bPawn = new Pieza("img/bpawn.png", "2E");
var bPawn = new Pieza("img/bpawn.png", "2F");
var bPawn = new Pieza("img/bpawn.png", "2G");
var bPawn = new Pieza("img/bpawn.png", "2H");


//WHITE PIECES
var wRook = new Pieza("img/wrook.png", "8A");
var wKnight = new Pieza("img/wknight.png", "8B");
var wBishop = new Pieza("img/wbishop.png", "8C");
var wQueen = new Pieza("img/wqueen.png", "8D")
var wKing = new Pieza("img/wking.png", "8E");
var wBishop = new Pieza("img/wbishop.png", "8F");
var wKnight = new Pieza("img/wknight.png", "8G");
var wRook = new Pieza("img/wrook.png", "8H");

var wPawn = new Pieza("img/wpawn.png", "7A");
var wPawn = new Pieza("img/wpawn.png", "7B");
var wPawn = new Pieza("img/wpawn.png", "7C");
var wPawn = new Pieza("img/wpawn.png", "7D");
var wPawn = new Pieza("img/wpawn.png", "7E");
var wPawn = new Pieza("img/wpawn.png", "7F");
var wPawn = new Pieza("img/wpawn.png", "7G");
var wPawn = new Pieza("img/wpawn.png", "7H");

$(window).load(function() {
  $(".se-pre-con").fadeOut("slow");
});

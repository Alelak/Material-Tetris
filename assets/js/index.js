// Déclaration des variables utiles
var canvas = null;
var ctx = null;
var direction = {
    LEFT: 0,
    RIGHT: 1,
    DOWN: 2,
    UP: 3
};

document.addEventListener("DOMContentLoaded", function (event) {
    "use strict";


    $("#second").hide();
    $("#unmute").hide();
    $("#play").hide();
    canvas = document.getElementById('cnv1');
    ctx = canvas.getContext('2d');
    var heightCnv = canvas.height,
        widthCnv = canvas.width,
        piece = null,
        dir = null,
        bool = false,
        grid = [],
        gridColor = [],
        currentColor = "none",
        myVar,
        music = document.getElementById('music'),
        mainBtn = document.getElementById("mainbtn")
    var timer = $.timer(function () {
        game();
    }, 200);

    function initGrid() {
            // on cree les tableaux qui contiennent les colonnes de chaque ligne	
            for (var i = 0; i < 20; i++)
                grid[i] = [];

            // On initialise chaque case de la grille à false puisque au début, elle est vide
            for (var i = 0; i < 20; i++)
                for (var j = 0; j < 14; j++)
                    grid[i][j] = false;
            for (var i = 0; i < 20; i++)
                gridColor[i] = [];

            // On initialise chaque case de la grille des coleur à "none"
            for (var i = 0; i < 20; i++)
                for (var j = 0; j < 14; j++)
                    gridColor[i][j] = "none";

        }
        // randomiser le type type de piece
    function randomType() {
        var rnd = Math.floor((Math.random() * 7) + 1);
        switch (rnd) {
        case 1:
            piece = new TetriminosI(ctx, direction, canvas);
            currentColor = "#03A9F4";
            break;
        case 2:
            piece = new TetriminosO(ctx, direction, canvas);
            currentColor = "#FFEB3B";
            break;
        case 3:
            piece = new TetriminosZ(ctx, direction, canvas);
            currentColor = "#F44336";
            break;
        case 4:
            piece = new TetriminosL(ctx, direction, canvas);
            currentColor = "#FF9800";
            break;
        case 5:
            piece = new TetriminosS(ctx, direction, canvas);
            currentColor = "#4CAF50";
            break;
        case 6:
            piece = new TetriminosJ(ctx, direction, canvas);
            currentColor = "#3F51B5";
            break;
        case 7:
            piece = new TetriminosT(ctx, direction, canvas);
            currentColor = "#9C27B0";
            break;
        }
    }
    randomType();
    //gere les touches
    document.onkeydown = function (e) {
        switch (e.keyCode) {
        case 37:
            dir = direction.LEFT;
            break;
        case 39:
            dir = direction.RIGHT;
            break;
        case 40:
            dir = direction.DOWN;
            break;
        case 38:
            dir = direction.UP;
            break;
        }
    };
    randomType();
    initGrid();

    // Mettre les cases de la brique à true
    for (var k = 0; k < piece.squares.length; k++) {
        grid[piece.squares[k].i][piece.squares[k].j] = true;
    }




    function game() {
        var lines = 0;
        piece.animateSquare(dir, grid);
        for (var k = 0; k < piece.squares.length; k++) {
            grid[piece.squares[k].i][piece.squares[k].j] = true;
        }
        if (piece.stop) {
            var linesToDestroy = [];
            for (var k = 0; k < piece.squares.length; k++) {
                gridColor[piece.squares[k].i][piece.squares[k].j] = currentColor;
            }

            for (var k = 0; k < grid.length; k++) {
                if (checkFullLine(k)) {
                    for (var j = 0; j < grid[k].length; j++) {
                        grid[k][j] = false;
                    }
                    ctx.clearRect(0, k * 25, widthCnv, 25);
                    linesToDestroy.push(k);
                    lines++;
                    var line = parseInt($("#lines").text(), 10) + 1;
                    $("#lines").text(line);
                    if (lines > 1) {
                        var score = parseInt($("#score").text(), 10) + (lines * 100) + 25;
                    } else
                        var score = parseInt($("#score").text(), 10) + (lines * 100);
                    $("#score").text(score);
                }
            }
            lines = 0;
            for (var k = linesToDestroy[0] - 1; k > 0; k--) {
                var cmpt = k;
                while (cmpt + 1 <= 19 && !checkLine(cmpt + 1)) {
                    for (var l = 0; l < grid[cmpt].length; l++) {
                        if (cmpt + 1 <= 19) {
                            grid[cmpt + 1][l] = grid[cmpt][l];
                            gridColor[cmpt + 1][l] = gridColor[cmpt][l];
                            grid[cmpt][l] = false;
                        }
                    }
                    cmpt++;
                }

            }
            refresh();
            randomType();
            if (piece.isOver(grid)) {
                timer.stop();

                swal({
                    title: "You Lost!",
                    text: "Do you want to restart the game?",
                    imageUrl: "assets/img/sad.png",
                    showCancelButton: true,
                    confirmButtonColor: "#4CAF50",
                    confirmButtonText: "Yes",
                    closeOnConfirm: true,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        score = 0;
                        line = 0;
                        $("#score").text(0);
                        $("#lines").text(0);
                        ctx.clearRect(0, 0, widthCnv, heightCnv);
                        initGrid();
                        timer.play();
                    } else {
                        score = 0;
                        line = 0;
                        $("#score").text(0);
                        $("#lines").text(0);
                        ctx.clearRect(0, 0, widthCnv, heightCnv);
                        initGrid();
                        $('#second').hide();
                        $("#main").show();
                        music.pause();
                        music.currentTime = 0;
                    }

                });


            }

        }
        dir = null;
    }

    function checkFullLine(lineNumber) {
        var fullLines = true;

        for (var j = 0; j < grid[lineNumber].length; j++) {
            if (grid[lineNumber][j] == false)
                fullLines = false;
        }
        return fullLines;
    }

    function checkLine(lineNumber) {
        var squarefilled = false;

        for (var j = 0; j < grid[lineNumber].length; j++) {
            if (grid[lineNumber][j] == true)
                squarefilled = true;
        }
        return squarefilled;
    }

    function refresh() {
        ctx.clearRect(0, 0, widthCnv, heightCnv);
        for (var i = 0; i < grid.length; i++)
            for (var j = 0; j < grid[i].length; j++)
                if (grid[i][j] == true) {
                    ctx.fillStyle = gridColor[i][j];
                    ctx.lineWidth = 1.5;
                    ctx.fillRect(j * 25, i * 25, 25, 25);
                    ctx.strokeRect((j * 25) + 1, (i * 25) + 1, 22, 22);
                }
    }

    $("#mute").click(function () {
        music.pause();
        $("#mute").hide();
        $("#unmute").show();
    });
    $("#unmute").click(function () {
        music.play();
        $("#unmute").hide();
        $("#mute").show();

    });
    $("#pause").click(function () {

        timer.pause();
        music.pause();
        $("#pause").hide();
        $("#play").show();

    });
    $("#play").click(function () {
        timer.play();
        music.play();
        $("#play").hide();
        $("#pause").show();
    });
    //    $("#restart").click(function () {
    //        var timer = $.timer(function () {
    //            game();
    //        }, 200, true);
    //    })
    mainBtn.addEventListener("click", function () {
        $('#main').hide(500);
        $("#second").show();
        music.play();
        music.loop = "true";
        timer.play();
    });


});
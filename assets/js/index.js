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

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Déclarations des variables
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
        play();
    }, 200);

    game();

    // Fonction de la partie
    function game() {
        ctx.clearRect(0, 0, widthCnv, heightCnv);
        // On initialise la grille
        initGrid();
        // On génère une brique
        randomType();

        // On met les cases de la brique à true
        for (var k = 0; k < piece.squares.length; k++) {
            grid[piece.squares[k].i][piece.squares[k].j] = true;
        }
    }

    // Fonction du jeu
    function play() {
        var lines = 0;

        // On anime la brique
        piece.animateSquare(dir, grid);

        // On met les cases de la brique à false
        for (var k = 0; k < piece.squares.length; k++) {
            grid[piece.squares[k].i][piece.squares[k].j] = true;
        }

        // si la brique a été bien déposé
        if (piece.stop) {
            var linesToDestroy = []; //Lignes à détruire

            // On garde la couleur des cases de la briques
            for (var k = 0; k < piece.squares.length; k++) {
                gridColor[piece.squares[k].i][piece.squares[k].j] = currentColor;
            }


            for (var k = 0; k < grid.length; k++) {
                if (checkFullLine(k)) {
                    // On met la lignes à false
                    for (var j = 0; j < grid[k].length; j++) {
                        grid[k][j] = false;
                    }
                    // on supprime la ligne
                    ctx.clearRect(0, k * 25, widthCnv, 25);
                    // On garde le numéro de la ligne
                    linesToDestroy.push(k);
                    lines++;

                    var line = parseInt($("#lines").text(), 10) + 1;
                    $("#lines").text(line);

                    //On augmente le score
                    if (lines > 1) {
                        var score = parseInt($("#score").text(), 10) + (lines * 25) / 100;
                    } else
                        var score = parseInt($("#score").text(), 10) + (lines * 100);
                    $("#score").text(score);
                }
            }

            lines = 0;

            // On fait décendre le reste des lignes
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

            // Game Over
            if (piece.isOver(grid)) {
                timer.stop();

                for (var k = 0; k < piece.squares.length; k++) {
                    if (!grid[piece.squares[k].i][piece.squares[k].j]) {
                        ctx.fillStyle = currentColor;
                        ctx.fillRect((piece.squares[k].j * 25), piece.squares[k].i * 25, 25, 25);
                        ctx.strokeRect((piece.squares[k].j * 25) + 1, piece.squares[k].i * 25 + 1, 22, 22);
                    }
                }


                swal({
                    title: "Game Over!",
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

        // On anulle la touche courante
        dir = null;
    }



    // Initialise la grille
    function initGrid() {
        // On cree les cases de chaque grille
        for (var i = 0; i < 20; i++) {
            grid[i] = [];
            gridColor[i] = [];
        }

        // On initialise chaque case des grilles
        for (var i = 0; i < 20; i++)
            for (var j = 0; j < 14; j++) {
                grid[i][j] = false;
                gridColor[i][j] = "none";
            }
    }

    // Génération aléatoire des briques
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

    //Gestion des touches
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
                    ctx.strokeRect((j * 25) + 1, (i * 25) + 1, 23, 23);
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
    $("#restart").click(function () {
        if ($("play").is(':hidden')) {
            $("#pause").hide();
            $("#play").show();

        } else {
            music.play();
            $("#play").hide();
            $("#pause").show();
        }

        $("#score").text(0);
        $("#lines").text(0);
        game();
        timer.reset();

    });
    mainBtn.addEventListener("click", function () {
        $('#main').hide(500);
        $("#second").show();
        music.play();
        music.loop = "true";
        timer.play();
    });
});
// Définit un point
function Point(x, y) {
    this.x = x;
    this.y = y;
    return this;
}

// Définit une largeur hauteur
function Dim(w, h) {
    this.w = w;
    this.h = h;
    return this;
}

// Définit une case
function Square(i, j) {
    this.i = i;
    this.j = j;
    return this;
}
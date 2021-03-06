console.log("script loaded");
var num = ((new Array(9)).fill(0)).map(ele => (new Array(9)).fill(0));
var char = [];
var stopper = true;
var id_array = [];
var checker = false;
var cell;
var current_value = 1;
var temp_index;
var x = 1;
var next_one = false;
var height = window.innerHeight / 9.5;
for (let j = 0; j < 9; j++) {
    for (let i = 0; i < 9; i++) {
        num[j][i] = document.createElement('input');
        num[j][i].type = 'text';
        num[j][i].maxLength = "1";
        num[j][i].style.width = height + 'px';
        num[j][i].style.height = height + 'px';
        num[j][i].style.borderColor = '#848484';
        num[j][i].style.borderWidth = height / 10 + 'px';
        num[j][i].style.borderStyle = 'solid';
        num[j][i].style.position = 'absolute';
        num[j][i].style.fontSize = height * 3 / 4 + 'pt';
        num[j][i].style.textAlign = 'center';
        num[j][i].style.left = window.innerWidth * 3 / 10 + (i + 1) * height + 'px';
        num[j][i].style.top = window.innerHeight / 100 + j * height + 'px';
        num[j][i].id = `${j}${i}`;
        if (i == 3 || i == 0 || i == 6) {
            num[j][i].style.borderLeftColor = "black";
        }

        if (j == 3 || j == 0 || j == 6) {
            num[j][i].style.borderTopColor = "black";
        }

        if (i == 8 || i == 5 || i == 2) {
            num[j][i].style.borderRightColor = "black";
        }

        if (j == 8 || j == 5 || j == 2) {
            num[j][i].style.borderBottomColor = "black";
        }
        document.getElementById('Sudokugrid').appendChild(num[j][i]);
    }
}





document.getElementById('Submit').addEventListener('click', function () {
    document.getElementById('Submit').style.display = "none";
    var counter = 81;
    for (let j = 0; j < 9; j++) {
        for (let i = 0; i < 9; i++) {
            if ((num[j][i].value).search(/[0-9]/) == -1 || num[j][i].value == "0") {
                num[j][i].value = "";
                counter--;
                id_array.push(String(j * 9 + i));
            }
            num[j][i].readOnly = true;
            char.push(num[j][i].value);
        }
    }

    if (counter < 17) {
        alert("A sudoku needs at least 17 clues to be solvable");
        console.log('Reloaded');
        stopper = false;
        window.location.reload();
    } else {
        check(true, false, 0, 0);
        start();
    }

});

function start() {
    var interval = setInterval(function () {
        if (char.indexOf("") != -1 && stopper && !checker) {
            x++;
            if (current_value == 1 || next_one) {
                next_one = false;
                temp_index = char.indexOf("");
                cell = num[Math.floor(temp_index / 9)][temp_index % 9];
                cell.style.color = 'red';
            }
            cell.value = String(current_value);
            char[temp_index] = String(current_value);
            check(false, true, Math.floor(temp_index / 9), (temp_index % 9));
            if (checker) {
                if (current_value >= 9) {
                    current_value = char[id_array[id_array.indexOf(String(temp_index)) - 1]];
                    current_value++;
                    console.log(current_value, char[id_array[id_array.indexOf(String(temp_index)) - 1]]);
                    cell.value = "";
                    char[temp_index] = "";
                    char[id_array[id_array.indexOf(String(temp_index)) - 1]] = "";
                    next_one = true;
                } else {
                    char[temp_index] = "";
                    current_value++;
                    cell.value = "";
                }
                checker = false;
            } else {
                current_value = 1;
            }
            if (char.includes("undefined") || char.includes()) {
                not_real();
                clearInterval(interval);
            }
            if (x > 10000000000) {
                not_real();
                clearInterval(interval);
            }
        }
    }, 0.1);


}

function not_real() {
    alert("This sudoku's clues don't align with the rules");
    console.log('Reloaded');
    stopper = false;
    window.location.reload();
}


function check(first_time, constraints, J, I) {
    var vertical = [];
    var horizontal = [];
    var tempv;
    var temph;
    var temps;
    var square = [];


    for (let i = 0; i < 9 && stopper; i++) {
        if (i == I || constraints) {
            vertical = [];
            for (let m = 0; m < 9 && stopper; m++) {
                vertical.push(char[(m * 9) + i]);
            }
            tempv = vertical.join("");
            vertical = tempv.split("");
            for (let l = 0; l < 9 && stopper; l++) {
                if (vertical.includes(String(l + 1))) vertical.splice(vertical.indexOf(String(l + 1)), 1);
            }

            if (vertical.length != 0) {
                if (first_time) {
                    not_real();
                } else {
                    checker = true;
                }
            }
        }
    }


    for (let j = 0; j < 9 && stopper; j++) {
        if (j == J || constraints) {
            horizontal = [];
            for (let m = 0; m < 9 && stopper; m++) {
                horizontal.push(char[(j * 9) + m]);
            }
            temph = horizontal.join("");
            horizontal = temph.split("");
            for (let l = 0; l < 9 && stopper; l++) {
                if (horizontal.includes(String(l + 1))) horizontal.splice(horizontal.indexOf(String(l + 1)), 1);
            }

            if (horizontal.length != 0) {
                if (first_time) {
                    not_real();
                } else {
                    checker = true;
                }
            }

        }
    }


    for (let j = 0; j < 3 && stopper; j++) {
        for (let i = 0; i < 3 && stopper; i++) {
            if (((Math.floor(J / 3) == j) && (Math.floor(I / 3) == i)) || constraints) {
                square = [char[(j * 3) * 9 + (i * 3)], char[(j * 3) * 9 + (i * 3 + 1)], char[(j * 3) * 9 + (i * 3 + 2)], char[(j * 3 + 1) * 9 + (i * 3)], char[(j * 3 + 1) * 9 + (i * 3 + 1)], char[(j * 3 + 1) * 9 + (i * 3 + 2)], char[(j * 3 + 2) * 9 + (i * 3)], char[(j * 3 + 2) * 9 + (i * 3 + 1)], char[(j * 3 + 2) * 9 + (i * 3 + 2)]];
                temps = square.join("");
                square = temps.split("");
                for (let l = 0; l < 9; l++) {
                    if (square.includes(String(l + 1))) square.splice(square.indexOf(String(l + 1)), 1);
                }
                if (square.length != 0) {
                    if (first_time) {
                        not_real();
                    } else {
                        checker = true;
                    }
                }
            }
        }
    }
}
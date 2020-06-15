/**
board 16 16
B N N N N B N N N N B N N N N N
W C C C C C C C C C C C N W C C
W C C C C C C W C C W C C C C C
B C C C C C N C C B C C C C C C
W C N W C C C C C C C C C C C C
W C C N C C C C C C C C C C C C
W C C C C B C C C C C W C C C N
W C C C C C C B B W C N C C C C
W C C C C C C B B W B C C C C C
W C W C C C C N N C C C C C C N
W C N W C C C C C C C C C C B C
W C C C C C C B C C C C C C C C
W C C C C C C C C C C C N W C C
B C C C C C C C C C W C C N C C
W C C C C C W C C N C C C C C C
W C C C C N C W C C C W C C C C
mirrors 8
4 1 \ 4
6 3 \ 3
14 4 \ 2
8 5 / 3
4 8 / 1
12 9 \ 2
1 13 \ 4
13 14 \ 1
robots 5
0 12
4 0
6 2
2 10
***/

g_map_rendered = [
                    ['B', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
                    ['W', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                    ['W', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                    ['W', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                    ['W', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                    ['W', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                    ['W', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                    ['W', 'C', 'C', 'C', 'C', 'C', 'C', 'B', 'B', 'W', 'C', 'C', 'C', 'C', 'C', 'C'],
                    ['W', 'C', 'C', 'C', 'C', 'C', 'C', 'B', 'B', 'W', 'C', 'C', 'C', 'C', 'C', 'C'],
                    ['W', 'C', 'C', 'C', 'C', 'C', 'C', 'N', 'N', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                    ['W', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                    ['W', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                    ['W', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                    ['W', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                    ['W', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
                    ['W', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
];

function arrayToStr(pArray) {
    ret_str = '';
    line = '';
    for (let i = 0; i < pArray.length; i++) {
        line = pArray[i].join(' ');
        ret_str += line + '\n';
    }

    return (ret_str)
}

function setBackgrounds() {
    background_image = '';
    for (let y = 0; y < g_map_rendered.length; y++) {
        for (let x = 0; x < g_map_rendered[y].length; x++) {
            letter = g_map_rendered[y][x];
            setBackground(x, y, letter);
        }
    }
}

function setBackground(pX, pY, pLetter) {
    background_image = getBackgroundImage(pX, pY, pLetter);
    $('#' + pX + '_' + pY + '').css('background-image', 'url("./' + background_image + '")');
}

function getBackgroundImage(pX, pY, pLetter) {
    ret_background_image = '';
    if (pLetter == 'W') {
        if (pX == 0 && pY == 15) {
            ret_background_image = './imgs/bottom-left.png';
        } else if (pX == 15) {
            ret_background_image = './imgs/left-right.png';
        } else {
            ret_background_image = './imgs/left.png';
        }
    } else if (pLetter == 'N') {
        if (pX == 15) {
            ret_background_image = './imgs/top-right.png';
        } else {
                ret_background_image = './imgs/top.png';
        }
    } else if (pLetter == 'B') {
        ret_background_image = './imgs/top-left.png';
    } else {
        if (pY == 15 && pX != 0 && pX != 15) {
            ret_background_image = './imgs/bottom.png';
        } else if (pY == 15 && pX == 15) {
            ret_background_image = './imgs/bottom-right.png';
        } else if (pX == 15 && pY != 0 && pY != 15) {
            ret_background_image = './imgs/right.png';
        } else {
            ret_background_image = './imgs/blank.png';
        }
    }

    return (ret_background_image);
}

function mod_map_rendered(pX, pY, p_input) {
    assigned_value = ''
    switch (p_input) {
        case 'blank':
            assigned_value = 'C';
            break;
        case 'north_wall':
            assigned_value = 'N';
            break;
        case 'west_wall':
            assigned_value = 'W';
            break;
        case 'both_wall':
            assigned_value = 'B';
            break;
    }
    g_map_rendered[pY][pX] = assigned_value;
    setBackground(pX, pY, assigned_value);
}

function getCoordsFromId(pId) {
    ret = pId.split('_')
    return {x: ret[0], y: ret[1]};
}

$(function () {
    checkerboard = $('#cherckerboard');
    setBackgrounds(checkerboard)
    $('.box').click(function (e) {
        $('#form_box').hide(200);
        $('#form_box input[type=hidden]').val(e.currentTarget.id)
        $('#form_box').show(200);
        $('#form_box select').focus();
    });

    $('button#validate').click(function () {
        coords = getCoordsFromId($('#form_box input[type=hidden]').val());
        mod_map_rendered(coords.x, coords.y, $('#form_box select').val())
        $('#form_box').hide(200);
    });

    $('button#generate_code').click(function() {
        generated_code = arrayToStr(g_map_rendered);
        $('#form_box').fadeOut(200);
        $('#see_generated_code textarea').val(generated_code);
        $('#see_generated_code').fadeIn(200);
        $('#see_generated_code textarea').select();

    });

    $('#form_box select').keydown(function (e) {
        if (e.which === 13) {
            $('#validate').click();
        } else if (e.which == 27) {
            $('#form_box').hide(200);
        }
    });

    $('#see_generated_code').keydown(function (e) {
        if (e.which == 27) {
            $('#see_generated_code').hide(200);
        }
    });
});

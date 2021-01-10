var cart = {};
function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart();
    }
    else {
        $('.main-cart').html('Корзина пуста!');
    }
}

function showCart() {
    //вывод корзины
    if (!isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста!');
    }
    else {
        $.getJSON('goods.json', function (data) {
            var goods = data;
            var out = '';
            for (var id in cart) {
                out += '<br>';
                out += `<button data-id="${id}" class="del-goods">x</button>`;
                out += `<img src="img\\${goods[id].img}">`;
                out += ` ${goods[id].name}`;
                out += `  <button data-id="${id}" class="minus-goods">-</button>  `;
                out += ` ${cart[id]}` + ' шт. ';
                out += `  <button data-id="${id}" class="plus-goods">+</button>  `;
                out += cart[id] * goods[id].cost + '  руб.';
                out += '<br>';
                out += '<br>';
                out += `<hr size=3px width=500px align="left" class = "strip"> `;
            }
            $('.main-cart').html(out);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);

            out += '<br>';




        });
    }
}

function delGoods() {
    //удаляем товар из корзины
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}
function plusGoods() {
    //добавляет товар в корзине
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}
function minusGoods() {
    //уменьшаем товар в корзине
    var id = $(this).attr('data-id');
    if (cart[id] == 1) {
        delete cart[id];
    }
    else {
        cart[id]--;
    }
    saveCart();
    showCart();
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function isEmpty(object) {
    //проверка корзины на пустоту
    for (var key in object)
        if (object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail() {
    var name = $('#name').val();
    var phone = $('#phone').val();
    var street = $('#street').val();
    var house = $('#house').val();
    var corps = $('#corps').val();
    var apartment = $('#apartment').val();
    var floor = $('#floor').val();
    var entrance = $('#entrance').val();

    if (name != '' && phone != '' && street != '' && house != '' && corps != '' && apartment != '' && floor != '' && entrance != '' && comment != '') {
        if (isEmpty(cart)) {
            $.post(
                "core/mail.php",
                {
                    "name": name,
                    "phone": phone,
                    "street": street,
                    "house": house,
                    "corps": corps,
                    "apartment": apartment,
                    "floor": floor,
                    "entrance": entrance,
                    "comment": comment
                },
                function (data) {
                    console.log(dat);
                }
            );
        }
        else {
            alert('Корзина пуста');
        }
    }
    else {
        alert('Заполните поля');
    }

}


$(document).ready(function () {
    loadCart();
    $('.send-email').on('click', sendEmail); // отправить письмо с заказом
});
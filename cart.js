let cart = {
    'number_of_items': 0,
    'delivery': -2,
    'pack_to_go': false,
    'items': {

    }
}

function increase_number_of_items_in_cart() {
    cart['number_of_items']++;

    if (cart['number_of_items'] == 1) {
        document.getElementsByClassName('sticky_objects')[0].style.display = 'block';
    }
    document.getElementsByClassName('number_of_items_in_cart')[0].textContent = cart['number_of_items'];
    console.log(cart);
}

function decrease_number_of_items_in_cart() {
    if (cart['number_of_items'] > 0) {
        cart['number_of_items']--;

        if (cart['number_of_items'] == 0) {
            document.getElementsByClassName('sticky_objects')[0].style.display = 'none';
        }
        document.getElementsByClassName('number_of_items_in_cart')[0].textContent = cart['number_of_items'];
        console.log(cart);
        document.getElementById('number_of_items_in_cart')[0].textContent = cart['number_of_items'];

    }
}

function add_item_to_cart(item, additional) {
    let item_to_add = { ...item };

    let search_result;
    let number_of_same_items = 0;
    let cart_item_id_without_additions;
    for (const cart_item_id in cart['items']) {
        console.log('test cart item');
        console.log(cart_item_id);
        search_result = cart_item_id.search(' ');
        if (search_result == -1) {
            cart_item_id_without_additions = parseInt(cart_item_id);
        } else {
            cart_item_id_without_additions = parseInt(cart_item_id.substring(0, search_result));
        }
        if (item_to_add['id'] == cart_item_id_without_additions) {
            number_of_same_items += cart['items'][cart_item_id]['count'];
        }
    }

    if (number_of_same_items >= parseInt(item_to_add['in_stock'])) {
        // выкинуть ошибку
        console.log('in stock error');
        return -1;
    }

    if (additional != 0) {
        let price_correction = 0;
        for (const additional_ids of Object.keys(additional)) {
            for (const choice_item of additional[additional_ids]['choice']) {
                if (choice_item != 0) {
                    item_to_add['id'] += " " + choice_item['id'];
                    price_correction += choice_item['price'];
                }
            }
        }
        item_to_add['price'] += price_correction;
    }

    if (item_to_add['id'] in cart['items']) {
        console.log('in items')
        cart['items'][item_to_add['id']]['count']++;
        //cart['items'][element['id']] = {price: element['price'], count: cart['items'][element['id']]['count'] + }
    } else {
        cart['items'][item_to_add['id']] = {price: item_to_add['price'], count: 1, additional: additional}
    }
    return 0;
}

function show_cart() {
    disableScroll();

    show_cart_items();

    show_cart_result();

    //replace element horizontally
    let cart_fullscreen = document.getElementsByClassName("cart_fullscreen")[0];
    cart_fullscreen.style.top = window.scrollY + 'px';
    cart_fullscreen.style.display = 'block';

    let btn_close_item_card_fullscreen = document.getElementsByClassName("btn_close_item_card_fullscreen")[0];
    btn_close_item_card_fullscreen.style.top = window.scrollY + 'px';
    btn_close_item_card_fullscreen.style.display = 'block';
}

function show_cart_items() {
    let cart_fullscreen = document.getElementsByClassName("cart_fullscreen")[0];
    for (const cart_item_key of Object.keys(cart['items'])) {
        //когда в корзине лежит товар с допами, сначала в его айди лежит айди основного товара, а далее через пробел айди допов
        //достанем айди основного товара
        let search_result = cart_item_key.search(' ');
        if (search_result == -1) {
            //если в строке не найден пробел, значит в этой позиции нет допов
            search_result = cart_item_key;
        } else {
            //нашёлся пробел, значит есть допы. Чтобы достать айди основного товара, берём подстроку
            search_result = parseInt(cart_item_key.substring(0, search_result));
        }

        for (const item of food_items) {

            if (search_result == item['id']) {
                show_cart_item(item, cart['items'][cart_item_key], cart_item_key);
                break;
            }
        }
    }
}


function show_cart_result() {
    let cart_price = calculate_cart_price();
    document.getElementsByClassName("cart_price_value")[0].textContent = cart_price + ' Р';
}

function calculate_cart_price() {
    let cart_price = 0;
    for (const cart_item_key of Object.keys(cart['items'])) {
        cart_price += cart['items'][cart_item_key]['price'] * cart['items'][cart_item_key]['count'];
    }
    return cart_price;
}

function show_cart_item(item, cart_item, cart_item_key) {
    let parent_element = document.getElementsByClassName("cart_fullscreen_items")[0];

    let article_element = document.createElement("article");
    let picture_element = document.createElement("picture");
    let image_element = document.createElement("img");
    let main_element = document.createElement("main");
    let div_element = document.createElement("div");
    //let button_element = document.createElement("button");

    div_element.classList.add("product_title")
    let text = document.createTextNode(item['name']);
    div_element.appendChild(text);
    div_element.addEventListener('click', _ => { // к элементу добавляете обработчик события click
        clickProductTitleToOpenItemCard(item);
    })
    main_element.appendChild(div_element);

    if (cart_item['additional'] != 0) {
        let additions = "Дополнительно:\n";

        for (const addition_key of Object.keys(cart_item['additional'])) {
            for (const choice of cart_item['additional'][addition_key]['choice']) {
                additions += "\n" + choice['name'] + " " + choice['weight'];
            }
        }
        console.log(additions);
        let product_description = document.createTextNode(additions);

        main_element.appendChild(product_description);
    }
    main_element.classList.add("product_main");


    let price_and_edit_count = document.createElement("div");
    price_and_edit_count.style.display = 'flex';
    price_and_edit_count.style.justifyContent = 'space-between';
    price_and_edit_count.style.marginTop = '16px';

    let product_total_price_cart_fullscreen = document.createElement("product_total_price_cart_fullscreen");
    product_total_price_cart_fullscreen.textContent = cart_item['price'] * cart_item['count'] + " Р";
    //product_total_price_cart_fullscreen.style.textAlign = 'left';
    product_total_price_cart_fullscreen.classList.add("product_total_price_cart_fullscreen");

    let main_edit_count = document.createElement("div");
    main_edit_count.style.display = 'flex';

    let edit_count_minus = document.createElement("button");
    edit_count_minus.textContent = '-';
    let edit_count = document.createElement("div");
    edit_count.textContent = cart_item['count'];
    edit_count.style.padding = '0px 10px';
    let edit_count_plus = document.createElement("button");
    edit_count_plus.textContent = '+';

    edit_count_minus.addEventListener('click', _ => { // к элементу добавляете обработчик события click
        if (cart_item['count'] > 1) {
            cart_item['count']--;
            edit_count.textContent = cart_item['count'];
            product_total_price_cart_fullscreen.textContent = cart_item['price'] * cart_item['count'] + " Р";
        } else {
            //delete from cart
            if (cart['items'].hasOwnProperty(cart_item_key)) {
                delete cart['items'][cart_item_key];
                article_element.remove();
            }
        }
        decrease_number_of_items_in_cart();
        show_cart_result();
        if (cart['number_of_items'] == 0) {
            hide_cart();
            document.getElementsByClassName("btn_close_item_card_fullscreen")[0].style.display = 'none';
        }
    })

    edit_count_plus.addEventListener('click', _ => { // к элементу добавляете обработчик события click
        let search_result;
        let number_of_same_items = 0;
        let cart_item_id_without_additions;

        let cart_item_to_add_id_without_additions;
        console.log(item);
        search_result = item['id'].toString().search(' ');
        if (search_result == -1) {
            cart_item_to_add_id_without_additions = parseInt(item['id']);
        } else {
            cart_item_to_add_id_without_additions = parseInt(item['id'].toString().substring(0, search_result));
        }

        for (const cart_item_id in cart['items']) {
            console.log('test cart item');
            console.log(cart_item_id);
            search_result = cart_item_id.search(' ');
            if (search_result == -1) {
                cart_item_id_without_additions = parseInt(cart_item_id);
            } else {
                cart_item_id_without_additions = parseInt(cart_item_id.substring(0, search_result));
            }
            if (cart_item_to_add_id_without_additions == cart_item_id_without_additions) {
                number_of_same_items += cart['items'][cart_item_id]['count'];
            }
        }

        if (number_of_same_items >= parseInt(item['in_stock'])) {
            // выкинуть ошибку
            // TODO добавить надпись о нехватки наличия
            console.log('in stock error');
            return -1;
        }

        cart_item['count']++;
        increase_number_of_items_in_cart();
        show_cart_result();
        edit_count.textContent = cart_item['count'];
        product_total_price_cart_fullscreen.textContent = cart_item['price'] * cart_item['count'] + " Р";
    })

    main_edit_count.appendChild(edit_count_minus);
    main_edit_count.appendChild(edit_count);
    main_edit_count.appendChild(edit_count_plus);
    main_edit_count.style.float = 'right';

    price_and_edit_count.appendChild(product_total_price_cart_fullscreen);

    price_and_edit_count.appendChild(main_edit_count);

    main_element.appendChild(price_and_edit_count);



    //button_element.classList.add("btn")
    // let price_on_button = document.createTextNode(cart_item['price'] + " Р");
    // button_element.appendChild(price_on_button);
    // button_element.addEventListener('click', _ => { // к элементу добавляете обработчик события click
    //     if (item['additional'] != 0) {
    //         //if there are additional options, open item card
    //         clickProductTitleToOpenItemCard(item);
    //     } else {
    //         //if there are no additional options, just add to cart
    //         add_item_to_cart(item, 0);
    //         increase_number_of_items_in_cart();
    //     }
    // })

    //main_element.appendChild(button_element);

    image_element.className = "product_img";
    image_element.src = "images/" + item['id'] + ".jpg";
    image_element.addEventListener('click', _ => { // к элементу добавляете обработчик события click
        clickProductTitleToOpenItemCard(item);
    })
    picture_element.appendChild(image_element);
    picture_element.classList.add("product_picture");

    article_element.appendChild(picture_element);
    article_element.appendChild(main_element);

    article_element.classList.add("product_article");
    article_element.style.minHeight = '150px';

    parent_element.appendChild(article_element);
}

function hide_cart() {
    let cart_fullscreen = document.getElementsByClassName('cart_fullscreen')[0];
    cart_fullscreen.style.display = 'none';

    //очистить отображаемые продукты корзины
    document.getElementsByClassName('cart_fullscreen_items')[0].innerHTML = '';

    enableScroll();
}

function pack_to_go() {
    cart['pack_to_go'] = !cart['pack_to_go'];
    console.log(cart);
}


function order() {
    console.log(cart);
    if (cart['delivery'] != -2) {
        if (document.getElementById('select_table').value == "0") {
            console.log('select table please');
            return 0;
        } else {
            cart['delivery'] = document.getElementById('select_table').value;
        }
    }

    tg.sendData(JSON.stringify(cart));

    return true;
}
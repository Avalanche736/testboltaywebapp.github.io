
function clickProductTitleToOpenItemCard(item_clicked) {
    disableScroll();

    let cart_element = document.getElementsByClassName('sticky_objects')[0];
    cart_element.style.top = '10px';
    cart_element.style.bottom = '';

    // img
    let product_img_fullscreen = document.getElementsByClassName("product_img_fullscreen")[0];
    product_img_fullscreen.src = "images/" + item_clicked['id'] + ".jpg";
    //title
    let product_title_fullscreen = document.getElementsByClassName("product_title_fullscreen")[0];
    product_title_fullscreen.textContent = item_clicked['name'];
    //weight
    let product_weight_fullscreen = document.getElementsByClassName("product_weight_fullscreen")[0];
    product_weight_fullscreen.textContent = item_clicked['weight'];
    //description
    let product_description_fullscreen = document.getElementsByClassName("product_description_fullscreen")[0];
    product_description_fullscreen.textContent = item_clicked['description'];

    let additional_choice_info;
    if (item_clicked['additional'] != 0) {
        additional_choice_info = {};
    } else {
        additional_choice_info = 0;
    }

    //additional (optional)
    if (item_clicked['additional'] != 0) {
        let search_result = 0;
        // в колонке additional через запятую перечислены айди списков дополнений (add_list_id)
        let add_string = item_clicked['additional'];
        let item_additions_lists_array = [];
        let counter = 0;
        while (search_result != -1) {
            search_result = add_string.search(', ');
            if (search_result == -1) {
                console.log('end');
                console.log(parseInt(add_string));
                item_additions_lists_array[counter] = parseInt(add_string);
            } else {
                console.log('not end');
                console.log(parseInt(add_string.substring(0, search_result)));
                item_additions_lists_array[counter] = parseInt(add_string.substring(0, search_result));
                add_string = add_string.substring(search_result + 2)
            }
            counter++;
        }

        // item_additions_lists_array - массив айди списков дополнений. Берём айди списка дополнений, находим его
        console.log(item_additions_lists_array);

        let product_additions_fullscreen = document.getElementsByClassName("product_additions_fullscreen")[0];
        product_additions_fullscreen.style.display = 'block';

        // проходимся по всем спискам дополнений данного товара
        for (const additional_list of item_additions_lists_array) {
            // находим в additions_lists_items совпадение с нашим айди списка дополнений
            for (const additional_list_item of additions_lists_items) {
                if (additional_list == additional_list_item['add_list_id']) {
                    console.log(additional_list_item['add_list_id']);
                    console.log(additional_list_item);
                    //create additions element
                    let div_element = document.createElement("div");
                    div_element.classList.add("additionals_list");
                    div_element.id = "add_list_id" + additional_list_item['add_list_id'];

                    let additional_list_title = document.createElement("div");
                    additional_list_title.classList.add("additional_list_title");
                    let text = document.createTextNode(additional_list_item['add_list_name']);
                    additional_list_title.appendChild(text);

                    div_element.appendChild(additional_list_title);

                    additional_choice_info[additional_list_item['add_list_id']] = {type: additional_list_item['type'], choice: [0]};

                    if (additional_list_item['type'] == 0) {
                        for (let i = 1; i < 11; i++) {
                            if (additional_list_item['id_add' + i] == 0) {
                                break;
                            } else {
                                let addition_title = document.createElement('div');
                                addition_title.style = "margin: 5px 0 0 5%;";
                                let text = document.createTextNode(additional_list_item['name' + i] + ' ' + additional_list_item['price' + i] + "₽");
                                addition_title.appendChild(text);

                                let radio_box = document.createElement('input');
                                radio_box.type = 'radio';
                                radio_box.name = additional_list_item['add_list_id'];
                                radio_box.value = 'id_add' + i;

                                radio_box.addEventListener('click', _ => { // к элементу добавляете обработчик события click
                                    additional_choice_info[additional_list_item['add_list_id']]['choice'][0] = {
                                        id: additional_list_item['id_add' + i],
                                        name: additional_list_item['name' + i],
                                        weight: additional_list_item['weight' + i],
                                        price: additional_list_item['price' + i]
                                    };

                                    let price_correction = 0;
                                    for (const additional_ids of Object.keys(additional_choice_info)) {
                                        for (const choice_item of additional_choice_info[additional_ids]['choice']) {
                                            if (choice_item != 0) {
                                                price_correction += choice_item['price'];
                                            }
                                        }
                                    }
                                    let btn_fullscreen_correct = document.getElementsByClassName("btn_fullscreen")[0];
                                    let corrected_price = item_clicked['price'] + price_correction;
                                    btn_fullscreen_correct.textContent = "Добавить в корзину за " + corrected_price + "₽";

                                    let product_add_to_cart_error_fullscreen = document.getElementsByClassName("product_add_to_cart_error_fullscreen")[0];
                                    if (product_add_to_cart_error_fullscreen.textContent == "Пожалуйста, выберите обязательное дополнение") {
                                        product_add_to_cart_error_fullscreen.style.display = "none";
                                    }
                                })

                                addition_title.appendChild(radio_box)
                                div_element.appendChild(addition_title)
                            }
                        }
                    } else {
                        for (let i = 1; i < 11; i++) {
                            if (additional_list_item['id_add' + i] == 0) {
                                break;
                            } else {
                                let addition_title = document.createElement('div');
                                addition_title.style = "margin: 5px 0 0 5%;";
                                let text = document.createTextNode(additional_list_item['name' + i] + ' ' + additional_list_item['price' + i] + "₽");
                                addition_title.appendChild(text);

                                let radio_box = document.createElement('input');
                                radio_box.type = 'checkbox';
                                radio_box.name = additional_list_item['add_list_id'];
                                radio_box.value = 'id_add' + i;

                                radio_box.addEventListener('click', _ => { // к элементу добавляете обработчик события click
                                    let element_to_push = {
                                        id: additional_list_item['id_add' + i],
                                        name: additional_list_item['name' + i],
                                        weight: additional_list_item['weight' + i],
                                        price: additional_list_item['price' + i]
                                    };
                                    if (additional_choice_info[additional_list_item['add_list_id']]['choice'][0] == 0) {
                                        additional_choice_info[additional_list_item['add_list_id']]['choice'][0] = element_to_push;
                                    } else {
                                        let delete_from_array = 0;
                                        let index = 0;
                                        for (const choice_item of additional_choice_info[additional_list_item['add_list_id']]['choice']) {
                                            if (choice_item['id'] == additional_list_item['id_add' + i]) {
                                                delete_from_array = 1;
                                                break;
                                            }
                                            index++;
                                        }

                                        if (delete_from_array == 1) {
                                             // 2nd parameter means remove one item only
                                            additional_choice_info[additional_list_item['add_list_id']]['choice'].splice(index, 1);
                                        } else {
                                            additional_choice_info[additional_list_item['add_list_id']]['choice'].push(element_to_push);
                                        }
                                    }

                                    let price_correction = 0;
                                    for (const additional_ids of Object.keys(additional_choice_info)) {
                                        for (const choice_item of additional_choice_info[additional_ids]['choice']) {
                                            if (choice_item != 0) {
                                                price_correction += choice_item['price'];
                                            }
                                        }
                                    }
                                    let btn_fullscreen_correct = document.getElementsByClassName("btn_fullscreen")[0];
                                    let corrected_price = item_clicked['price'] + price_correction;
                                    btn_fullscreen_correct.textContent = "Добавить в корзину за " + corrected_price + "₽";
                                })

                                addition_title.appendChild(radio_box)
                                div_element.appendChild(addition_title)
                            }
                        }
                    }

                    product_additions_fullscreen.appendChild(div_element);
                }
            }
        }
    }

    //add to cart button
    let btn_fullscreen = document.getElementsByClassName("btn_fullscreen")[0];
    btn_fullscreen.textContent = "Добавить в корзину за " + item_clicked['price'] + "₽";
    btn_fullscreen.addEventListener('click', _ => { // к элементу добавляете обработчик события click

        if (item_clicked['additional'] != 0) {
            //if there are additional options, open item card
            for (const additional_ids of Object.keys(additional_choice_info)) {
                if (additional_choice_info[additional_ids]['type'] == 0 && additional_choice_info[additional_ids]['choice'] == 0) {
                     //не был сделан требуемый выбор дополнения
                    let product_add_to_cart_error_fullscreen = document.getElementsByClassName("product_add_to_cart_error_fullscreen")[0];
                    product_add_to_cart_error_fullscreen.textContent = "Пожалуйста, выберите обязательное дополнение";
                    product_add_to_cart_error_fullscreen.style.display = "block";
                    return 0;
                }
            }

            if (add_item_to_cart(item_clicked, additional_choice_info) == -1) {
                btn_fullscreen.textContent = "В наличии " + item['in_stock'] + "шт";
            } else {
                increase_number_of_items_in_cart();
            }
        } else {
            //if there are no additional options, just add to cart
            add_item_to_cart(item_clicked, 0);
            increase_number_of_items_in_cart();
        }

        //hide item card to prevent bugs connected with additions
        hideItemCard();
    });
    //replace element horizontally
    let item_card_fullscreen = document.getElementsByClassName("item_card_fullscreen")[0];
    item_card_fullscreen.style.top = window.scrollY + 'px';
    item_card_fullscreen.style.display = 'block';

    let btn_close_item_card_fullscreen = document.getElementsByClassName("btn_close_item_card_fullscreen")[0];
    btn_close_item_card_fullscreen.style.top = window.scrollY + 'px';
    btn_close_item_card_fullscreen.style.display = 'block';
}

function hideItemCard() {
    hide_cart();

    let item_card_fullscreen = document.getElementsByClassName("item_card_fullscreen")[0];
    item_card_fullscreen.style.display = 'none';

    document.getElementsByClassName("btn_close_item_card_fullscreen")[0].style.display = 'none';

    //delete listener
    let btn_fullscreen = document.getElementsByClassName("btn_fullscreen")[0];
    btn_fullscreen.replaceWith(btn_fullscreen.cloneNode(true));

    document.getElementsByClassName('product_additions_fullscreen')[0].innerHTML = '';

    enableScroll()

    let cart_element = document.getElementsByClassName('sticky_objects')[0];
    cart_element.style.top = '';
    cart_element.style.bottom = '20px';

    let product_add_to_cart_error_fullscreen = document.getElementsByClassName("product_add_to_cart_error_fullscreen")[0];
    product_add_to_cart_error_fullscreen.style.display = "none";
}

function disableScroll() {
    document.body.classList.add("stop-scrolling");
}

function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}
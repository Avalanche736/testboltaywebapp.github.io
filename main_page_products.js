function copyItemToMainPageProductsList(item, category) {
    let parent_element = document.getElementById(category);
    let article_element = document.createElement("article");
    let picture_element = document.createElement("picture");
    let image_element = document.createElement("img");
    let main_element = document.createElement("main");
    let div_element = document.createElement("div");
    let button_element = document.createElement("button");

    div_element.classList.add("product_title")
    let text = document.createTextNode(item['name']);
    div_element.appendChild(text);
    div_element.addEventListener('click', _ => { // к элементу добавляете обработчик события click
        clickProductTitleToOpenItemCard(item);
    })

    main_element.appendChild(div_element)
    let product_description = document.createTextNode(item['description']);
    main_element.appendChild(product_description);
    main_element.classList.add("product_main")

    button_element.classList.add("btn")
    let price_on_button = document.createTextNode(item['price'] + " Р");
    button_element.appendChild(price_on_button);
    button_element.addEventListener('click', _ => { // к элементу добавляете обработчик события click
        if (item['additional'] != 0) {
            //if there are additional options, open item card
            clickProductTitleToOpenItemCard(item);
        } else {
            //if there are no additional options, just add to cart
            if (add_item_to_cart(item, 0) == -1) {
                button_element.textContent = "В наличии " + item['in_stock'] + "шт";
            } else {
                increase_number_of_items_in_cart();
            }
        }
    })

    main_element.appendChild(button_element);

    /* TODO add button */

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

    if (parent_element != null) {
        parent_element.appendChild(article_element);
    } else {
        console.log('Problems with item');
        console.log(item);
    }
}

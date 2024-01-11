let tg = window.Telegram.WebApp;

tg.expand();

//TODO disable double tap zoom


const Http = new XMLHttpRequest();
const url = 'https://94.250.252.189:12345/';
Http.open("GET", url);
Http.send();

Http.onload = () => {
    if (Http.readyState == 4 && Http.status == 200) {
        console.log(Http.response);
        //document.write(Http.responseText);
    } else {
        console.log(`Error: ${Http.status}`);
    }
};

let food_items
let additions_items
let additions_lists_items
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://94.250.252.189:12345/getdata/");
xhr.send();
xhr.responseType = "json";
xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        food_items = xhr.response['food'];
        additions_items = xhr.response['additions']
        additions_lists_items = xhr.response['additions_lists'];
        for (const item of food_items) {
            if (item['in_stock'] < 1) {
                continue;
            }
            let item_copy = item;
            //Добавить в список товаров на главной странице
            copyItemToMainPageProductsList(item_copy, item['category']);
            //Добавить в популярное
            if (item['is_popular'] == 1) {
                copyItemToMainPageProductsList(item_copy, "Популярное");
            }
        }
    } else {
        console.log(`Error: ${xhr.status}`);
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ПЕРЕКЛЮЧЕНИЕ КАТЕГОРИЙ
document.querySelectorAll('.category').forEach(elem => { // К массиву элементов с селектором .button применяете метод forEach, в котором выполняется стрелочная функция, принимающая в качестве аргумента elem, который является элементом
    elem.addEventListener('click', _ => { // к элементу добавляете обработчик события click
        console.log("category switched");
        document.querySelectorAll('.active_category').forEach(elem2 => { // также ищите все элементы с селектором .block и к каждому применяете classList.toggle, то есть, если у элемента нет класса qwe, то он его добавляет, иначе удаляет
            elem2.classList.remove("active_category");
        })
        elem.classList.add("active_category");
    })
})

let tg = window.Telegram.WebApp;

tg.expand();

//tg.sendData('тест')

const Http = new XMLHttpRequest();
const url='http://127.0.0.1:12345/';
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

const xhr = new XMLHttpRequest();
xhr.open("GET", "http://127.0.0.1:12345/getdata");
xhr.send();
xhr.responseType = "json";
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    for(const item of xhr.response){
      console.log(item);
    }
    //console.log(xhr.response);
    //document.write(xhr.response['name'] + xhr.response['price']);
  } else {
    console.log(`Error: ${xhr.status}`);
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ПЕРЕКЛЮЧЕНИЕ КАТЕГОРИЙ
document.querySelectorAll('.category').forEach(elem => { // К массиву элементов с селектором .button применяете метод forEach, в котором выполняется стрелочная функция, принимающая в качестве аргумента elem, который является элементом
  elem.addEventListener('click', _=> { // к элементу добавляете обработчик события click
    console.log("category switched");
    document.querySelectorAll('.active_category').forEach(elem2 => { // также ищите все элементы с селектором .block и к каждому применяете classList.toggle, то есть, если у элемента нет класса qwe, то он его добавляет, иначе удаляет
      elem2.classList.remove("active_category");
    })
    elem.classList.add("active_category");
  })
})

/*let inactive_categories = document.getElementsByClassName("inactive_category");
[].forEach.call(inactive_categories,function(el){
    el.addEventListener('click', function () {
        console.log("fuck");
        let active_category = document.getElementsByClassName("active_category");
        active_category[0].classList.add("inactive_category")
        active_category[0].classList.remove("active_category")
        this.classList.add("active_category");
        this.classList.remove("inactive_category");

    })
});*/


// const xhr1 = new XMLHttpRequest();
// xhr1.open("GET", "http://127.0.0.1:12345/new", headers={'servertoken': '57606025-dc39-4be1-8375-6b29ef74245e'});
// xhr1.send();
// xhr1.responseType = "json";
// xhr1.onload = () => {
//   if (xhr1.readyState == 4 && xhr1.status == 200) {
//     console.log(xhr1.response);
//     document.write(xhr1.response);
//   } else {
//     console.log(`Error: ${xhr1.status}`);
//   }
// };

// Http.onreadystatechange = (e) => {
//   console.log(Http.responseText)
//   document.write(Http.responseText);
// }


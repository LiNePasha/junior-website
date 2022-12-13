
/*=============== clickable menu ===============*/
let menu = document.querySelector(".nav_menu")
menu.addEventListener("click", clickMenu)

function clickMenu(){
  let navbarLinks = document.querySelector(".nav_links")
  navbarLinks.classList.toggle("active")
}

/*=============== CHANGE BACKGROUND HEADER ===============*/


/*=============== Filter ===============*/
$(document).on('click','.filteration-links li',function(){
  $(this).addClass('filteration-links-active').siblings().removeClass('filteration-links-active')
});

$(document).ready(function(){
  $('.list').click(function(){
    const value = $(this).attr('data-filter')
    if( value == 'all' ){
      $('.filteration-box').show('1000');
    } else {
      $('.filteration-box').not('.'+value).hide('1000');
      $('.filteration-box').filter('.'+value).show('1000');
    }
  })
})

/* Link active work */ 


/*=============== SWIPER TESTIMONIAL ===============*/
var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 50,
  loop: true,
  centerSlider: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints:{
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  }
});

/*=============== Crud System ===============*/
// create - read - update - delete - validation 

// Get Important Elements...
let place = document.getElementById('place')
let price = document.getElementById('price')
let details = document.getElementById('details')
let image1 = document.getElementById('image1')
let image2 = document.getElementById('image2')
let placeLocation = document.getElementById('location')
let submit = document.getElementById('submit')

// not in first
let controlCrud = "create"
let tmp;


submit.addEventListener('click', createPlace)

let arr;

  if( localStorage.places != null ){
    arr = JSON.parse(localStorage.places)
  }else {
    arr = []
  }



// createPlace(): add Details Place In Opject afte in array after in localstorage 
function createPlace(){
  let obj = {
    place: place.value,
    price: price.value,
    details: details.value,
    image1: image1.value,
    image2: image2.value,
    placeLocation: placeLocation.value,
  }
  if(place.value != '' && price.value != '' && details.value != '' && image1.value != ''){
    if(controlCrud === "create"){
      arr.push(obj);
    }else {
      arr[tmp] = obj;
      controlCrud = 'create'
      submit.innerHTML = "أضافة"
    }
  }else {
    return null
  }
    localStorage.setItem("places", JSON.stringify(arr))

    clearValues()
    showData()
}

function clearValues(){
      place.value = '';
      price.value = '';
      details.value = '';
      image1.value = '';
      image2.value = '';
      placeLocation.value = '';
}

function showData(){

  let table = '';
  arr.map((placee, id) => {
    table += `
      <tr data-index="${id}" class="draggable" draggable="true">
        <th  >${id}</th>
            <div>
            <td>${placee.place}</td>
            <td>${placee.price}</td>
        <td>
            <button id="delete" onclick=" deleteItem( ${id} ) ">حذف</button>
            <button id="edit" onclick=" editItem( ${id} ) ">تعديل</button>
        </td>
            </div>
      </tr>
    `
  })

  // assets/img/slider/deal2.jpg
  let swiperWrapper  = ''
  arr.map((card,id) => {
    swiperWrapper += `
        <div class="card swiper-slide">
          <div class="card-content">
              <img src="${card.image1}" alt="">
              <a href=""><h2>${card.place} <i class='bx bx-link'></i> </h2></a>
              <p>${card.details}</p>
              <a href="" class="btn">أقرء المزيد </a>
          </div>
        </div>
    `
  })
  document.getElementById('swiper-wrapper').innerHTML = swiperWrapper;
  document.getElementById('tbody').innerHTML = table;
}
showData()

let dragStartIndex;

function dragStart(){
  // console.log('dragstart');
  dragStartIndex = +this.getAttribute('data-index');
  // console.log(arr[dragStartIndex]);
}
function dragOver(e){
  // console.log('dragover');
  e.preventDefault();
}
function dragDrop(){
  // console.log('dragdrop');
  dragEndIndex = +this.getAttribute('data-index')
  swapItems(dragStartIndex, dragEndIndex)
}


let arrOh; // not now
function swapItems(fromIndex,toIndex){
  
  const itemOne = arr[fromIndex]
  const itemTwo = arr[toIndex]


  
  let text = `هل انت متأكد انك تريد تبديل مكان رحلة ${itemOne.place} برحلة ${itemTwo.place}`
  if (confirm(text) == true) {
    arrOh = arr[fromIndex];
    arr[fromIndex] = arr[toIndex];
    arr[toIndex] = arrOh;
    localStorage.setItem("places", JSON.stringify(arr))
    showData()
    location.reload()
  } else {
    return null;
  }
}


function dragEnter(){
  // console.log('dragEnter');
  
}
function dragLeave(){
  // console.log('dragLeav');
}

function addEventListeners(){
  const draggables = document.querySelectorAll('.draggable');

  draggables.forEach(drag => {
    drag.addEventListener('dragstart', dragStart);
    drag.addEventListener('dragover', dragOver);
    drag.addEventListener('drop', dragDrop);
    drag.addEventListener('dragenter', dragEnter);
    drag.addEventListener('dragleave', dragLeave);
  })
}
addEventListeners()

function deleteItem ( item ){
  arr.splice(item,1);
  localStorage.places = JSON.stringify(arr);
  showData()
}

function editItem ( item ){
  place.value = arr[item].place;
  price.value = arr[item].price;
  details.value = arr[item].details;
  image1.value = arr[item].image1;
  image2.value = arr[item].image2;
  placeLocation.value = arr[item].placeLocation;
  submit.innerHTML = "تعديل";
  controlCrud = "edit";
  tmp = item;
  document.querySelector(".work").scrollIntoView({behavior: 'smooth'}, true);
  place.focus()
}


/*=============== contact form with speech ===============*/ 
let recording = document.getElementById("recording")

recording.addEventListener("click", function(){
  var speech = true;
  window.SpeechRecognition = window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "ar-AR"
  recognition.interimResults = true; 

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)

    document.getElementById('textarea').innerText += transcript
  })

  if(speech){
    recognition.start();
  }
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

//test
// if (selectedTheme === 'dark'){
//   document.body.classList.add('light-theme')
//   document.querySelector('.home_handle').classList.add('light-bg')
// } else {
//   document.body.classList.remove('light-theme')
//   document.querySelector('.home_handle').classList.remove('light-bg')
// }
// console.log(document.body.classList['contains']('light-theme'));

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
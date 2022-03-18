
const countryList = document.querySelector('#countries');
const countryDetail = document.getElementById('country-detail');
window.addEventListener('load', getCountries);



// calling the API
function getCountries() {

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://restcountries.com/v2/all', true);


  xhr.onload = function () {
    if (this.status === 200) {
      const res = JSON.parse(this.responseText);
      console.log(res)
      res.forEach(function (element) {
        loadCountries(element);
      })

    } 
  }

  xhr.send();
}
getCountries();

const firstPage = document.querySelector('.first-page')

function loadCountries(country) {
  
  firstPage.classList.toggle('show')
  const singleCountry = document.createElement('div');
  singleCountry.classList.add('col-md-3')
  singleCountry.innerHTML = `<div class="card country">
  <img src="${country.flag}" class="card-img-top country-image" alt="">
  <div class="card-body">
    <h4 class="card-text name py-2">${country.name}</h4>
    <div class="paragraph">
      <p><b>population</b>: ${country.population}</p>
      <p class ="region-name"><b>Region</b>: ${country.region}</p>
      <p><b> Capital</b>:${country.capital}</p>
      
    </div>
    
  </div>
</div>`


  countryList.appendChild(singleCountry);

  singleCountry.addEventListener('click', () => {
    displayDetail(country);
  })

};
// function for the detailed page
const detailPage = document.querySelector('.detail-page')

function displayDetail(country) {
  detailPage.classList.toggle('show-page')
  detailPage.innerHTML = `
  <header>
  <div id="head-section" class="">
    <div class="container d-flex justify-content-between  p-3">
      <div class="intro">
        <h3>Where in the world?</h3>
      </div>
      <div id="mode">
        <button class="switch "><i class="far fa-moon pe-2 moon"></i><span class="theme-change">Dark Mode</span>
        </button>
      </div>
    </div>

  </div>

</header>
 <section class="py-5">
  <div class="container">
    <div class="row ">
      <div class="col-md-3 ">
        <button class="btn back-button back"><i class="fas fa-long-arrow-alt-left back"></i><span class=""> Back</span>
          </button> 
      </div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="row" id="country-detail">
      <div class="col-md-4 col-sm-12">
        <img src="${country.flag}" class="detail-img img-fluid" alt="">
       
      </div>
      <div class="col-md-8 col-sm-12" >
        <div class="row  justify-content-around mt-4">
          <div class="col-md-4 col-sm-12">
            <h4 class="card-text country-name py-2">${country.name}</h4>
            <div class="detail-paragraph">
              <p><b>Native Name</b>:${country.nativeName}</p>
              <p><b>population</b>: ${country.population}</p>
              <p class ="region-name"><b>Region</b>:${country.region}</p>
              <p><b>Sub Region</b>:${country.subregion}</p>
              <p><b> Capital</b>:${country.capital}</p>
              
            </div>
          </div>
          <div class="col-md-4 col-sm-12 mt-5">
            <p><b>Top Level Domain</b>:${country.topLevelDomain}</p>
            <p><b>Currencies</b>:${country.currencies.map(elem=>elem.name)}</p>
            <p><b>Languages</b>:${country.languages.map(elem =>elem.name)}</p>
          </div>
          <div class ="w-100"></div>
          <div class="col-md-10 col-sm-12">
            <p class="py-3"><b class="pe-2">Border Countries</b>:
              <button class="btn country-button">${country.borders}</button>
              <button class="btn country-button">${country.borders}</button>
              <button class="btn country-button">${country.borders}</button>
              
            </p>
          </div>
        </div>
      </div>
      
    </div>
     
  </div>
</section>`

  const back = document.querySelector('.back')
  back.addEventListener('click', () => {
    detailPage.classList.toggle('show-page')
  })
}


// function for toggling the filter drop down

function displayMenu() {
  let showMenu = document.getElementById("drop-menu")
  if (showMenu.style.display === "block") {
    showMenu.style.display = "none";
  } else {
    showMenu.style.display = "block";
  }
};

const regionName = document.getElementsByClassName('region-name');
const regionFilter = document.querySelectorAll('.region');
console.log(regionFilter);

regionFilter.forEach(element => {
  element.addEventListener('click', function() {
   Array.from(regionName).forEach(function(elem){
    if(elem.innerText.includes(element.innerText) || element.innerText =='All'){
      elem.parentElement.parentElement.parentElement.parentElement.style.display = 'grid'
    }else{
      elem.parentElement.parentElement.parentElement.parentElement.style.display = 'none'
    }
    console.log(elem.innerText)
   })

  })
});

// function for searching countries in the input

const countryName = document.getElementsByClassName('name');
const searchBar = document.getElementById('search');

searchBar.addEventListener('input', () => {
  Array.from(countryName).forEach(elem => {
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.parentElement.style.display = 'grid'
    } else {
      elem.parentElement.parentElement.parentElement.style.display = 'none'
    }

  })
});

// for changing to dark or light Mode
let themeChange = document.getElementById('mode');
let colorChanger = document.querySelector('body')

themeChange.addEventListener('click', toggleColor)
function toggleColor() {

  if (colorChanger.classList.contains('none')) {
    colorChanger.classList.toggle('dark-mode')
  }

};

// for changing to dark or light Mode on modal

let  iconChange = document.getElementById('mode');
let modalColor = document.querySelector('.detail-page')
iconChange.addEventListener('click', changeColor)
  function changeColor(){
    if (modalColor.classList.contains('none')) {
      modalColor.classList.toggle('dark-mode')
    }
  }





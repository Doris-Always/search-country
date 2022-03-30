//initialize jquery
$(document).ready(function () {
  console.log("jqeury working");
  getCountries();
});
let listOfCountries = "";
// calling the API
function getCountries() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://restcountries.com/v2/all", true);

  xhr.onload = function () {
    let countries = "";
    if (this.status === 200) {
      const res = JSON.parse(this.responseText);
      console.log(res);
      listOfCountries = res;

      res.map((country) => {
        countries += `<div class="col-md-3"><div class="card country" onclick="renderDetails('${country.name}')">
            <img src="${country.flag}" class="card-img-top country-image" alt="">
            <div class="card-body">
                <h4 class="card-text name py-2">${country.name}</h4>
                <div class="paragraph">
                <p><b>population</b>: ${country.population}</p>
                <p class ="region-name"><b>Region</b>: ${country.region}</p>
                <p><b> Capital</b>:${country.capital}</p>                
                </div>                
            </div>
            </div></div>`;
      });
      $("#countries").html(countries);
    }
  };

  xhr.send();
}

function renderDetails(countyName) {
  //   let selectedCountry = filterCountriesByname(countyName);
  //   console.log(selectedCountry);
  //   displayDetail(selectedCountry);
  $("#countryDetailsModal").modal("show");
  $.get(
    "https://restcountries.com/v2/name/" + countyName + "?fullText=true",
    function (response) {
      $("#countryDetailsModal .modal-body").html(displayDetail(response));
      $("#countryDetailsModal .modal-title").html(response[0].name);
    }
  );
}

function filterCountriesByname(countryName) {
  return listOfCountries.filter((data) => {
    return data.name == countryName;
  });
}
function displayDetail(country) {
  //   console.log(country);
  country = country[0];
  let countDetails = `
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
            <p><b>Currencies</b>:${country.currencies.map(
              (elem) => elem.name
            )}</p>
            <p><b>Languages</b>:${country.languages.map(
              (elem) => elem.name
            )}</p>
          </div>
          <div class ="w-100"></div>
          <div class="col-md-10 col-sm-12">
          ${
            typeof country.borders === "object"
              ? `<p class="py-3">
                <b class="pe-2">Border Countries</b>:
                ${country.borders.map((elem, key) =>
                  key <= 2
                    ? `<button class="btn country-button">${elem}</button>`
                    : null
                )}
              </p>`
              : ""
          }
          </div>
        </div>
      </div>
      
    </div>
     
  </div>
</section>`;

  //   $("#country-detail").html(countDetails);
  //   $("#countryDetailsModal").modal("show");
  //   $("#countryDetailsModal .modal-body").html(countDetails);
  //   $("#countryDetailsModal .modal-title").html(country.name);
  return countDetails;
}

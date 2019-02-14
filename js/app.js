'use-strict';

function HornFam(obj){
  this.title = obj.title;
  this.image_url = obj.image_url;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
}

//Object array
HornFam.allHornyThings = [];

// Keyword array
HornFam.keywordArray = [];

//Renders the object to the page
HornFam.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let hornClone = $('div[class="clone"]');

  let hornHtml = $('#photo-template').html();

  hornClone.html(hornHtml);

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('p').text(this.description);

  hornClone.removeClass('clone');
  hornClone.attr('class', this.keyword);
}

HornFam.prototype.dropDown = function() {
  if (!HornFam.keywordArray.includes(this.keyword)) {
    HornFam.keywordArray.push(this.keyword);
    $('select').append(`<option value="${this.keyword}">${this.keyword}</option>`);
  } 
}

// Reads and creates the objects from the json file and pushes objects into array
HornFam.readJson = () => {
  $.get('/data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        HornFam.allHornyThings.push(new HornFam(obj));
      })
    })

    //Renders to the page
    .then(HornFam.loadHornyThings);
}

// Renders each object from the object array
HornFam.loadHornyThings = () => {
  HornFam.allHornyThings.forEach(obj => {
    return obj.render();
  });
  HornFam.allHornyThings.forEach(obj => {
    return obj.dropDown();
  })
}

$('select').on('change', function() {
  // Create JQ variable that = this.val
  let $selection = $(this).val();
  console.log($selection);
  $('div').hide();
  $(`div[class="${$selection}"]`).show();
})

//On page load, read json file
$(() => HornFam.readJson());

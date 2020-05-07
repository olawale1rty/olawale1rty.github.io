/* 1. Grab the input value */
document.querySelector(".js-go").addEventListener('click',function(){
    var userInput = getUserInput();
    search(userInput);
});

document.querySelector(".js-userinput").addEventListener('keyup',function(e){
    // if the key ENTER is pressed...
    if(e.which === 13) {
        var userInput = getUserInput();
        search(userInput);
    }
});

function getUserInput() {
	var inputValue = document.querySelector('.js-userinput').value;
	return inputValue;
}

/* 2. do the data stuff with the API */
search = (get) => {
var url = `http://api.giphy.com/v1/gifs/search?q=${get}&api_key=dc6zaTOxFJmzC`;
 // console.log(url)

// AJAX Request
var GiphyAJAXCall = new XMLHttpRequest();
GiphyAJAXCall.open( 'GET', url );
GiphyAJAXCall.send();

GiphyAJAXCall.addEventListener('load',function(e){
    var data = e.target.response;
    pushToDOM(data);
});
}

// var url = `http://api.giphy.com/v1/gifs/search?q=boy&api_key=dc6zaTOxFJmzC`;
//  console.log(url)

// // AJAX Request
// var GiphyAJAXCall = new XMLHttpRequest();
// GiphyAJAXCall.open( 'GET', url );
// GiphyAJAXCall.send();

// GiphyAJAXCall.addEventListener('load',function(e){
//     var data = e.target.response;
//     pushToDOM(data);
// });

/* 3. Show me the GIFs */

function pushToDOM(input) {

  var response = JSON.parse(input);

  var imageUrls = response.data;
  var container = document.querySelector(".js-container");
  container.innerHTML = "";
  try {
    imageUrls.forEach(function(image){

        var src = image.images.fixed_height.url;
    
        container.innerHTML += "<img src=\"" + src + "\" class=\"container-image\">";
    
      });
      
  } catch (error) {
    container.innerHTML = error;
      
  }

  

}


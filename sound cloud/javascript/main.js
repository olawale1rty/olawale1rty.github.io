/* 1. Search  */

var Ui = {};

Ui.handleSubmitClick = () => {
    document.querySelector(".js-submit").addEventListener('click',function(){
        var userInput = document.querySelector('.js-search').value;
        SoundCloudApi.getTrack(userInput);
    });

};

Ui.handleEnterClick = () => {
    document.querySelector(".js-search").addEventListener('keypress',function(e){
        // if the key ENTER is pressed...
        if(e.which === 13) {
            var userInput = document.querySelector('.js-search').value;
            SoundCloudApi.getTrack(userInput);
        }
    });

};

Ui.handleSubmitClick();
Ui.handleEnterClick();






/* 2. Query Sound Cloud Api  */
var SoundCloudApi = {};

SoundCloudApi.init = () => {
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
      });
      
};
SoundCloudApi.init();

SoundCloudApi.getTrack = (inputValue) => {
    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
        q: inputValue, 
    }).then(function(tracks) {
        var searchResult = document.querySelector('.js-search-results');
        searchResult.innerHTML = "";
        
        SoundCloudApi.renderTracks(tracks, searchResult);

    });
};




/* 3. Display The  Cards*/


SoundCloudApi.renderTracks = ( tracks, searchResult ) => {

    tracks.forEach( (track) => {
    
    //card
    var card = document.createElement('div');
    card.classList.add('card');

    //image
    var imageDiv = document.createElement('div');
    imageDiv.classList.add('image');

    var image_img = document.createElement('img');
    image_img.classList.add('image_img');
    image_img.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract/';

    //content
    var content = document.createElement('div');
    content.classList.add('content');

    var header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = '<a href=' + track.permalink_url + ' target="_blank">' + track.title + '</a>'

    //button

    var button = document.createElement('div');
        button.setAttribute('data-id', track.id) /////THIS COMES DURING PLAY() !!
    button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

    var icon = document.createElement('i');
    icon.classList.add('add', 'icon');

    var buttonText = document.createElement('span');
    buttonText.innerHTML = 'Add to playlist'
    
    //appendChild
    content.appendChild(header);

    button.appendChild(icon);
    button.appendChild(buttonText);

    button.addEventListener('click', () => {
        SoundCloudApi.getEmbed(track.uri)


    });

    imageDiv.appendChild(image_img);

    card.appendChild(imageDiv);
    card.appendChild(content);
    card.appendChild(button);

    
    searchResult.appendChild(card);
   
    });

};



/* 4. Add To Playlist And Play  */

SoundCloudApi.getEmbed = (trackUrl) => {
    SC.oEmbed(trackUrl, {
        auto_play: true
    }).then(function(embed){
        
        var sideBar = document.querySelector('.js-playlist');
        var box = document.createElement('div')
        box.innerHTML = embed.html;
        sideBar.insertBefore(box, sideBar.firstChild);
        localStorage.setItem('key', sideBar.innerHTML);

        // grab the widget object
        
        
        var SCWdiget = SoundCloudApi.getWidget( embed.childNodes[ 0 ] );
        
        // bind the finish event to init
        SCWdiget.bind('finish', function() {
            alert("FINISHED");
            // Playlist.next();

            // var nextEmbed = sidebar.childNodes[ Playlist.currentTrack ];
            // var nextWidget = SoundCloudAPI.getWidget( nextEmbed.childNodes[ 0 ] );

            // nextWidget.play();
        });
        SCWdiget.bind('play', function() {
            var widgetIndex = Array.from( sideBar.childNodes ).indexOf( embed );
             // OLDer JAVASCRIPT: [].slice.call( sidebar.childNodes ).indexOf( embed ).
            Playlist.currentTrack = widgetIndex;
        });


    });

};

 

SoundCloudApi.getWidget = function( embedElement ) {
return SC.Widget( embedElement );
}

playlistButton = document.querySelector('button');
playlistButton.addEventListener('click', () => {
    localStorage.clear();
    
});


var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem('key');

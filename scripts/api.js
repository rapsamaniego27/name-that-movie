class Data{
 constructor(){
  this.playlist = document.querySelector('#playlist');
  this.images = document.querySelector('#images');
  this.movieImage = document.querySelector('#movie-image');
 }

 //Methods
 async fetchTracks(){
    let api = "../data/soundtracks.json";
    let response = await fetch(api);
    let data = await response.json();

    return data;
  }

 /* Populates playlist with the soundtracks */
 populatePlaylist(){
  this.fetchTracks()
   .then(data => {
    let playlistUI = '';

    /* Makes a track list */
    data.forEach(track => {
     
     playlistUI += `
      <li><a href="${track.path}">${track.title}</a></li>
     `;

    });

    this.playlist.innerHTML = playlistUI;


   })
   .catch(err => console.log(err));
 }

/* Populates images with the Image sources */
 populateImages(){
  this.fetchTracks()
   .then(data => {
     let imagesUI = '';

     data.forEach(track => {
      imagesUI += `
       <li><img src="${track.image}"></li>
      `;
     });
     
    this.images.innerHTML = imagesUI;
   })
   .catch(err => console.log(err));
 }

 /* Initiates the first image upon window loading */
 firstImage(){
  this.fetchTracks()
   .then(data => {
    this.movieImage.src = `${data[0].image}`;
   })
   .catch(err => console.log(err));

 }

  
}

/* Instantiate */

const data = new Data();


window.addEventListener('DOMContentLoaded', ()=> {

   data.populatePlaylist();
   data.populateImages();
   data.firstImage();

});

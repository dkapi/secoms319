const header = document.createElement('header');
header.innerHTML = `
  <div class="collapse bg-dark" id="navbarHeader">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 col-md-7 py-4">
          <h2 class="text-white">An Assortment of Movies</h2>
          <h4 class="text-white">We hope you enjoy!</h4>
        </div>
        <div class="col-sm-4 offset-md-1 py-4">
          <h4 class="text-white">Image Sources</h4>
          <ul>
          <li><a href="https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg">
            Avengers Movie Poster</a>
          </li>
          <li><a href="https://c4.wallpaperflare.com/wallpaper/764/590/391/inception-leonardo-dicaprio-movie-posters-2400x3500-entertainment-movies-hd-art-wallpaper-preview.jpg">
            Inception Movie Poster</a>
          </li>
          <li><a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp6Py6zIThAfLViyfCFHT-yfMZ7gFY0imj8WBddOUQfZzAWDYh">
            Scarface Movie Poster</a>
          </li>
        </div>
      </div>
    </div>
  </div>
  <div class="navbar navbar-dark bg-dark shadow-sm">
    <div class="container">
      <a href="#" class="navbar-brand d-flex align-items-center">
        <form action="./index.html"><input type="submit" value="Movies" class="formnavbar"></form>
        <form action="./index2.html"><input type="submit" value="Reviews" class="formnavbar"></form>
        <form action="./about.html"><input type="submit" value="About Us" class="formnavbar"></form>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </div>
`
const headerContainer = document.getElementById('header-container');
headerContainer.appendChild(header);;

const moviesContainer = document.getElementById('movies');


// Fetch the data from the JSON file
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    // Generate HTML content for each movie
    data.forEach(movie => {
      const movieCard = `
        <div class="col">
          <div class="card shadow-sm">
            <img src="${movie.imageSrc}" alt="${movie.movieId}">
            <div class="card-body">
              <p class="card-text">${movie.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                </div>
                <small class="text-muted">${movie.runTime}</small>
                <small class="text-muted">${movie.rating}</small>
                <small class ="text-muted">${movie.year}</small>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Add the movie card to the movies container
      moviesContainer.insertAdjacentHTML('beforeend', movieCard);

      // Add event listener to image element
      const image = moviesContainer.querySelector(`img[alt="${movie.movieId}"]`);
      image.addEventListener('mouseenter', () => {
        // Change cursor to hand
        image.style.cursor = 'pointer';
      });
      image.addEventListener('mouseleave', () => {
        // Change cursor back to default
        image.style.cursor = 'default';
      });
      image.addEventListener('click', () => {
        // Redirect to review page
        window.location.href = `./index2.html`;
      });
    });
  });


const moviesReviewContainer = document.getElementById('reviews');

// function to display larger image
function showLargerImage(event) {
  // create larger image element
  const largerImage = document.createElement('img');
  largerImage.src = event.target.src;
  largerImage.style.maxHeight = '80%';

  // create overlay element
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.appendChild(largerImage);

  // append overlay to body
  document.body.appendChild(overlay);

  // add click event listener to overlay to remove it when clicked
  overlay.addEventListener('click', () => {
    document.body.removeChild(overlay);
  });
}

fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(review => {
      const reviewCard = `
        <div class="col">
          <div class="card shadow-sm">
            <img src="${review.imageSrc}" alt="${review.movieId}">
            <div class="card-body">
            <div class = "review-text">
              <p class="card-text">${review.review} ${review.reviewAuthor}</p>
              <p class="card-text">${review.review2} ${review.review2Author}</p>
              </div>
              <div class="d-flex justify-content-between align-items-center">
              </div>
                <div class="btn-group">
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      moviesReviewContainer.insertAdjacentHTML('beforeend', reviewCard);
      const image = moviesReviewContainer.querySelector(`img[alt="${review.movieId}"]`);
      image.addEventListener('click', showLargerImage);

      const reviewTextElements = moviesReviewContainer.querySelectorAll('.review-text');

      reviewTextElements.forEach(reviewText => {
        reviewText.addEventListener('click', () => {
          reviewText.classList.toggle('expanded');
          reviewText.classList.toggle('bold');
        });
      });

    });
  });




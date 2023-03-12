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

fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(review => {
      const reviewCard = `
        <div class="col">
          <div class="card shadow-sm">
            <img src="${review.imageSrc}" alt="${review.movieId}">
            <div class="card-body">
              <p class="card-text">${review.review} ${review.reviewAuthor}</p>
              <p class="card-text">${review.review2} ${review.review2Author}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      moviesReviewContainer.insertAdjacentHTML('beforeend', reviewCard);
      const image = moviesReviewContainer.querySelector(`img[alt="${review.movieId}"]`);
    }); 
  });
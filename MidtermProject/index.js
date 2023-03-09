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
    });
  });
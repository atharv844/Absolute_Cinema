document.getElementById("recommendBtn").addEventListener("click", () => {
  const mood = document.getElementById("mood").value.trim().toLowerCase();
  const genre = document.getElementById("genre").value.trim().toLowerCase();
  const company = document.getElementById("company").value.trim().toLowerCase();
  const resultsDiv = document.getElementById("results");

  // strict filtering — must match all 3 if entered
  let filtered = movies.filter(m =>
    (!mood || m.mood.toLowerCase() === mood) &&
    (!genre || m.genre.toLowerCase() === genre) &&
    (!company || m.company.toLowerCase() === company)
  );

  // fallback if nothing hits
  if (filtered.length === 0) {
    filtered = [...movies].sort(() => 0.5 - Math.random()).slice(0, 5);
  }

  resultsDiv.innerHTML = "";

  filtered.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const img = document.createElement("img");
    img.src = movie.poster;
    img.alt = movie.title;
    img.loading = "lazy";

    // if image fails
    img.onerror = () => {
      img.remove();
      const placeholder = document.createElement("div");
      placeholder.classList.add("poster-unavailable");
      placeholder.textContent = "Poster unavailable 🎞️";
      card.appendChild(placeholder);
    };

    const title = document.createElement("h3");
    title.textContent = movie.title;

    const info = document.createElement("p");
    info.textContent = `${movie.genre} | ${movie.mood} | ${movie.company}`;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(info);

    resultsDiv.appendChild(card);
  });
});
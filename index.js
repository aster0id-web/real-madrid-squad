// ─── PLAYER DATA ───────────────────────────────────────────────────────────
const players = [
  {
    id: 1,
    name: "Thibaut Courtois",
    imgSrc: "img_11.png",
    position: "GK",
    posCategory: "GK",
    jersey: 1,
    nationality: "🇧🇪 Belgium",
    age: 32,
    stats: { apps: 32, goals: 0, assists: 0 },
    foot: "Left",
    height: "199 cm",
  },
  {
    id: 2,
    name: "Trent Alexander-Arnold",
    imgSrc: "img_10.png",
    position: "RB",
    posCategory: "DEF",
    jersey: 12,
    nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",
    age: 27,
    stats: { apps: 12, goals: 1, assists: 2 },
    foot: "Right",
    height: "178 cm",
  },
  {
    id: 3,
    name: "Eder Militao",
    imgSrc: "img_9.png",
    position: "CB",
    posCategory: "DEF",
    jersey: 3,
    nationality: "🇧🇷 Brazil",
    age: 26,
    stats: { apps: 22, goals: 1, assists: 0 },
    foot: "Right",
    height: "186 cm",
  },
  {
    id: 4,
    name: "Huijsin",
    imgSrc: "img_8.png",
    position: "CB",
    posCategory: "DEF",
    jersey: 24,
    nationality: "🇪🇸 Spain",
    age: 21,
    stats: { apps: 8, goals: 0, assists: 1 },
    foot: "Both",
    height: "195 cm",
  },
  {
    id: 5,
    name: "Valverde",
    imgSrc: "img_6.png",
    position: "CM",
    posCategory: "MID",
    jersey: 8,
    nationality: "🇺🇾 Uruguay",
    age: 27,
    stats: { apps: 38, goals: 10, assists: 8 },
    foot: "Right",
    height: "186 cm",
  },
  {
    id: 6,
    name: "Carreras",
    imgSrc: "img_7.png",
    position: "LB",
    posCategory: "DEF",
    jersey: 18,
    nationality: "🇪🇸 Spain",
    age: 23,
    stats: { apps: 18, goals: 2, assists: 0 },
    foot: "Left",
    height: "186 cm",
  },
  {
    id: 7,
    name: "Vinicius Jr",
    imgSrc: "img_3.png",
    position: "LW",
    posCategory: "FWD",
    jersey: 7,
    nationality: "🇧🇷 Brazil",
    age: 24,
    stats: { apps: 38, goals: 24, assists: 11 },
    foot: "Right",
    height: "176 cm",
  },
  {
    id: 8,
    name: "Tchouameni",
    imgSrc: "img_5.png",
    position: "CDM",
    posCategory: "MID",
    jersey: 14,
    nationality: "🇫🇷 France",
    age: 26,
    stats: { apps: 35, goals: 4, assists: 9 },
    foot: "Right",
    height: "188 cm",
  },
  {
    id: 9,
    name: "Kylian Mbappé",
    imgSrc: "img_2.png",
    position: "CF",
    posCategory: "FWD",
    jersey: 9,
    nationality: "🇫🇷 France",
    age: 26,
    stats: { apps: 38, goals: 33, assists: 9 },
    foot: "Left",
    height: "178 cm",
  },
  {
    id: 10,
    name: "Brahim Diaz",
    imgSrc: "img_1.png",
    position: "RW",
    posCategory: "MID",
    jersey: 21,
    nationality: "🇲🇦 Morocco",
    age: 26,
    stats: { apps: 26, goals: 2, assists: 4 },
    foot: "Both",
    height: "170 cm",
  },
  {
    id: 14,
    name: "Arda Gular",
    imgSrc: "img_4.png",
    position: "CAM",
    posCategory: "MID",
    jersey: 15,
    nationality: "Turkey",
    age: 21,
    stats: { apps: 30, goals: 16, assists: 4 },
    foot: "Left",
    height: "176 cm",
  },
];

// ─── STATE ──────────────────────────────────────────────────────────────────
let activeFilter  = "all";
let searchQuery   = "";
let showFavs      = false;
let favorites     = JSON.parse(localStorage.getItem("rm_favorites") || "[]");
let sortBy        = null; // null | "goals" | "assists" | "apps" | "age"
let sortOrder     = "desc"; // "asc" | "desc"
let scrollPos     = 0;
let selectedPlayers = [];
let searchTimeout = null;

// ─── DOM REFS ────────────────────────────────────────────────────────────────
const cardsContainer = document.getElementById("cardsContainer");
const searchInput    = document.getElementById("searchInput");
const favToggle      = document.getElementById("favToggle");
const favCount       = document.getElementById("favCount");
const filterBtns     = document.querySelectorAll(".filter-btn");
const sectionTitle   = document.getElementById("sectionTitle");
const playerCount    = document.getElementById("playerCount");
const notFound       = document.getElementById("notFound");
const modalOverlay   = document.getElementById("modalOverlay");
const modalContent   = document.getElementById("modalContent");
const modalClose     = document.getElementById("modalClose");
const sortContainer  = document.getElementById("sortContainer");
const exportFavBtn   = document.getElementById("exportFavBtn");
const comparisonPanel = document.getElementById("comparisonPanel");
const compareBtns    = document.querySelectorAll(".compare-btn");

// ─── FILTER + SEARCH + SORT ─────────────────────────────────────────────────
/**
 * Gets filtered and sorted players based on current criteria
 * @returns {Array} Filtered and sorted player objects
 */
function getFiltered() {
  let data = players.filter(p => {
    const matchFilter =
      activeFilter === "all" ||
      p.posCategory === activeFilter ||
      p.position === activeFilter;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFav    = !showFavs || favorites.includes(p.id);
    return matchFilter && matchSearch && matchFav;
  });

  // Apply sorting
  if (sortBy) {
    data.sort((a, b) => {
      let valA, valB;
      
      if (sortBy === "goals") {
        valA = a.stats.goals;
        valB = b.stats.goals;
      } else if (sortBy === "assists") {
        valA = a.stats.assists;
        valB = b.stats.assists;
      } else if (sortBy === "apps") {
        valA = a.stats.apps;
        valB = b.stats.apps;
      } else if (sortBy === "age") {
        valA = a.age;
        valB = b.age;
      }
      
      return sortOrder === "desc" ? valB - valA : valA - valB;
    });
  }

  return data;
}

/**
 * Toggles sort order and applies sorting
 * @param {string} sortType - The field to sort by
 */
function toggleSort(sortType) {
  if (sortBy === sortType) {
    sortOrder = sortOrder === "desc" ? "asc" : "desc";
  } else {
    sortBy = sortType;
    sortOrder = "desc";
  }
  updateSortUI();
  render();
}

/**
 * Updates the sort button UI to show current sort state
 */
function updateSortUI() {
  document.querySelectorAll(".sort-btn").forEach(btn => {
    btn.classList.remove("active", "asc");
    if (btn.dataset.sort === sortBy) {
      btn.classList.add("active");
      if (sortOrder === "asc") btn.classList.add("asc");
    }
  });
}

// ─── RENDER CARDS ───────────────────────────────────────────────────────────
/**
 * Renders the player cards and updates UI
 */
function render() {
  const data = getFiltered();

  // Update header counts
  if (favCount) favCount.textContent = favorites.length;
  if (playerCount) playerCount.textContent = `${data.length} player${data.length !== 1 ? "s" : ""}`;

  if (data.length === 0) {
    if (cardsContainer) cardsContainer.innerHTML = "";
    if (notFound) {
      notFound.style.display   = "flex";
      notFound.style.flexDirection = "column";
      notFound.style.alignItems = "center";
    }
    return;
  }
  if (notFound) notFound.style.display = "none";

  if (cardsContainer) {
    cardsContainer.innerHTML = data.map(p => buildCard(p)).join("");

    // Attach card click → modal
    cardsContainer.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", e => {
        if (e.target.closest(".fav-btn") || e.target.closest(".copy-btn")) return;
        const id = Number(card.dataset.id);
        scrollPos = window.scrollY;
        openModal(id);
      });
    });

    // Attach fav button clicks
    cardsContainer.querySelectorAll(".fav-btn").forEach(btn => {
      btn.addEventListener("click", () => toggleFav(Number(btn.dataset.id)));
    });

    // Attach copy buttons
    cardsContainer.querySelectorAll(".copy-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        copyPlayerInfo(Number(btn.dataset.id));
      });
    });
  }
}

/**
 * Builds a single player card HTML
 * @param {Object} p - Player object
 * @returns {string} Card HTML
 */
function buildCard(p) {
  const isFav = favorites.includes(p.id);
  const isSelected = selectedPlayers.includes(p.id);
  return `
    <div class="card ${isSelected ? "selected" : ""}" data-id="${p.id}" role="article" aria-label="${p.name}, ${p.position}">
      <div class="card-jersey">${p.jersey}</div>
      <button class="fav-btn ${isFav ? "active" : ""}" data-id="${p.id}" title="Add to favorites" aria-label="Favorite ${p.name}">
        <i class="fa-${isFav ? "solid" : "regular"} fa-heart"></i>
      </button>
      <button class="copy-btn" data-id="${p.id}" title="Copy info" aria-label="Copy ${p.name} info">
        <i class="fa-regular fa-copy"></i>
      </button>
      <div class="card-img">
        <img src="${p.imgSrc}" alt="${p.name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-size=%2220%22%3ENo Image%3C/text%3E%3C/svg%3E'" />
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="pos-badge">${p.position}</span>
          <span class="card-nation" title="${p.nationality}">${p.nationality.split(" ")[0]}</span>
        </div>
        <div class="card-name">${p.name}</div>
        <div class="card-stats">
          <div class="stat-item" title="Appearances">
            <div class="stat-val">${p.stats.apps}</div>
            <div class="stat-lbl">Apps</div>
          </div>
          <div class="stat-item" title="Goals">
            <div class="stat-val">${p.stats.goals}</div>
            <div class="stat-lbl">Goals</div>
          </div>
          <div class="stat-item" title="Assists">
            <div class="stat-val">${p.stats.assists}</div>
            <div class="stat-lbl">Assists</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── FAVORITES ───────────────────────────────────────────────────────────────
/**
 * Toggles a player's favorite status
 * @param {number} id - Player ID
 */
function toggleFav(id) {
  const idx = favorites.indexOf(id);
  if (idx === -1) favorites.push(id);
  else favorites.splice(idx, 1);
  localStorage.setItem("rm_favorites", JSON.stringify(favorites));
  render();
}

/**
 * Exports favorites list as JSON file
 */
function exportFavorites() {
  const favPlayers = players.filter(p => favorites.includes(p.id));
  const data = JSON.stringify(favPlayers, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `rm-favorites-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Copies player info to clipboard
 * @param {number} id - Player ID
 */
function copyPlayerInfo(id) {
  const p = players.find(pl => pl.id === id);
  if (!p) return;
  
  const info = `${p.name}\n${p.nationality}\n${p.position} #${p.jersey}\nAge: ${p.age}\nHeight: ${p.height}\nApps: ${p.stats.apps} | Goals: ${p.stats.goals} | Assists: ${p.stats.assists}`;
  navigator.clipboard.writeText(info).then(() => {
    showNotification(`Copied ${p.name}'s info!`);
  });
}

/**
 * Shows a temporary notification
 * @param {string} message - Message to display
 */
function showNotification(message) {
  const notif = document.createElement("div");
  notif.className = "notification";
  notif.textContent = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 2000);
}

// ─── MODAL ───────────────────────────────────────────────────────────────────
/**
 * Opens the player detail modal
 * @param {number} id - Player ID
 */
function openModal(id) {
  const p = players.find(pl => pl.id === id);
  if (!p) return;

  if (modalContent) {
    modalContent.innerHTML = `
      <div class="modal-hero">
        <img src="${p.imgSrc}" alt="${p.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-size=%2220%22%3ENo Image%3C/text%3E%3C/svg%3E'" />
        <div class="modal-jersey-bg">${p.jersey}</div>
      </div>
      <div class="modal-info">
        <div class="modal-top">
          <div>
            <div class="modal-name">${p.name}</div>
            <div class="modal-nation">${p.nationality}</div>
          </div>
          <span class="pos-badge">${p.position}</span>
        </div>
        <div class="modal-actions">
          <button class="modal-action-btn" onclick="copyPlayerInfo(${p.id})" title="Copy info">
            <i class="fa-regular fa-copy"></i> Copy
          </button>
          <button class="modal-action-btn" onclick="toggleFav(${p.id})" title="Add to favorites">
            <i class="fa-${favorites.includes(p.id) ? "solid" : "regular"} fa-heart"></i> ${favorites.includes(p.id) ? "Favorited" : "Favorite"}
          </button>
        </div>
        <div class="modal-stats">
          <div class="modal-stat" title="Appearances">
            <div class="modal-stat-val">${p.stats.apps}</div>
            <div class="modal-stat-lbl">Apps</div>
          </div>
          <div class="modal-stat" title="Goals">
            <div class="modal-stat-val">${p.stats.goals}</div>
            <div class="modal-stat-lbl">Goals</div>
          </div>
          <div class="modal-stat" title="Assists">
            <div class="modal-stat-val">${p.stats.assists}</div>
            <div class="modal-stat-lbl">Assists</div>
          </div>
        </div>
        <div class="modal-details">
          <div class="detail-row">
            <span class="detail-label">Jersey</span>
            <span class="detail-val">#${p.jersey}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Age</span>
            <span class="detail-val">${p.age} years old</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Height</span>
            <span class="detail-val">${p.height}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Preferred Foot</span>
            <span class="detail-val">${p.foot}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Position</span>
            <span class="detail-val">${p.position}</span>
          </div>
        </div>
      </div>
    `;
  }

  if (modalOverlay) {
    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

/**
 * Closes the player detail modal
 */
function closeModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
    window.scrollTo(0, scrollPos);
  }
}

// ─── SECTION TITLE ───────────────────────────────────────────────────────────
/**
 * Updates the section title based on active filter
 */
function updateTitle() {
  if (showFavs) { 
    if (sectionTitle) sectionTitle.textContent = "Favorites"; 
    return; 
  }
  const titles = {
    all: "Full Squad", GK: "Goalkeepers", DEF: "Defenders",
    MID: "Midfielders", FWD: "Forwards", Coach: "Coaching Staff",
  };
  if (sectionTitle) sectionTitle.textContent = titles[activeFilter] || "Full Squad";
}

// ─── EVENTS ──────────────────────────────────────────────────────────────────
// Debounced search input
if (searchInput) {
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchQuery = searchInput.value;
      render();
    }, 200);
  });
}

// Filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    showFavs = false;
    if (favToggle) favToggle.classList.remove("active");
    updateTitle();
    sortBy = null; // Reset sort
    updateSortUI();
    render();
  });
});

// Favorites toggle
if (favToggle) {
  favToggle.addEventListener("click", () => {
    showFavs = !showFavs;
    favToggle.classList.toggle("active", showFavs);
    filterBtns.forEach(b => b.classList.remove("active"));
    if (!showFavs) {
      filterBtns[0].classList.add("active");
      activeFilter = "all";
    }
    updateTitle();
    sortBy = null; // Reset sort
    updateSortUI();
    render();
  });
}

// Sort buttons
document.querySelectorAll(".sort-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    toggleSort(btn.dataset.sort);
  });
});

// Export favorites button
if (exportFavBtn) {
  exportFavBtn.addEventListener("click", () => {
    if (favorites.length === 0) {
      showNotification("No favorites to export!");
      return;
    }
    exportFavorites();
  });
}

// Modal close button
if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

// Modal overlay click
if (modalOverlay) {
  modalOverlay.addEventListener("click", e => {
    if (e.target === modalOverlay) closeModal();
  });
}

// Keyboard navigation
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
  
  // Arrow key navigation
  if (!modalOverlay.classList.contains("open")) {
    const cards = Array.from(cardsContainer.querySelectorAll(".card"));
    if (cards.length === 0) return;
    
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const current = document.activeElement;
      const idx = cards.indexOf(current);
      if (idx > 0) cards[idx - 1].focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const current = document.activeElement;
      const idx = cards.indexOf(current);
      if (idx < cards.length - 1) cards[idx + 1].focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = document.activeElement;
      if (cards.includes(current)) {
        openModal(Number(current.dataset.id));
      }
    }
  }
});

// ─── INIT ─────────────────────────────────────────────────────────────────────
/**
 * Initializes the application on page load
 */
window.addEventListener("load", () => {
  updateTitle();
  updateSortUI();
  render();
});

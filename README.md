# Real Madrid Squad ⚽️👑

A responsive, feature-rich web application that showcases the official Real Madrid squad. Built with standard web technologies, this project allows users to browse players, filter by position, sort by statistics, and manage a personalized list of favorite players.

## 🌟 Features

* **Smart Search & Filtering:** Instantly search for players by name or filter the squad by position (Goalkeepers, Defenders, Midfielders, Forwards, and Coaching Staff).
* **Advanced Sorting:** Sort the squad dynamically based on Goals, Appearances, Assists, or Age (Ascending/Descending).
* **Favorites System:** Add or remove players to a custom "Favorites" list. Data is persistently saved in the browser's `localStorage`.
* **Export Data:** Export your customized list of favorite players into a downloadable `.json` file.
* **Detailed Player Modals:** Click on any player card to view an in-depth modal featuring their jersey number, nationality, physical attributes (height, preferred foot), and detailed season statistics.
* **Quick Copy:** One-click copy functionality to easily copy a player's core information and statistics to the clipboard.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop screens with fluid grid layouts and smooth animations.

## 🛠️ Technologies Used

* **HTML5:** Semantic structure and accessibility.
* **CSS3:** Custom variables, CSS Grid, Flexbox, glassmorphism effects, and smooth CSS animations.
* **Vanilla JavaScript (ES6+):** DOM manipulation, array filtering/sorting methods, and LocalStorage management (No external frameworks used).
* **FontAwesome 7:** For clean, scalable UI icons.
* **Google Fonts:** Utilizing 'Bebas Neue' for sporty headers and 'Outfit' for readable body text.

## 🚀 How to Run Locally

Since this project is built entirely with frontend web technologies, no build step or package manager is required.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/aster0id-web/real-madrid-squad.git](https://github.com/aster0id-web/real-madrid-squad.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd real-madrid-squad
    ```
3.  **Open the project:**
    Simply open the `index.html` file in your preferred web browser, or use the **Live Server** extension in VS Code for a better development experience.

## 📂 Project Structure

```text
├── index.html       # Main HTML structure
├── index.css        # Stylesheets (Reset, Layout, Components, Animations)
├── index.js         # Core logic (Data, Filtering, Sorting, DOM manipulation)
├── README.md        # Project documentation
└── img/             # Folder containing player and logo images

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

📝 License
This project is open-source and available under the MIT License.
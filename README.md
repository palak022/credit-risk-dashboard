# Credit Risk & Loan Default Analytics Dashboard

Interactive credit risk dashboard: approval cut-off simulator, default-rate analytics and decision policy.
Analysis built with SQL, Python, Excel and Power BI; this repo is the dashboard front end.

## Run
Open `index.html` in a browser (needs internet for Chart.js and Google Fonts), or serve the folder:
`python -m http.server 8000` then visit http://localhost:8000

## Structure
- `index.html` page markup
- `css/styles.css` design tokens and styles
- `js/data.js` all figures (simulation table, tiers, drivers)
- `js/sim.js` cut-off simulator and number tweening
- `js/charts.js` Chart.js charts with entry animations
- `js/app.js` rendering, scroll reveals, nav indicator

Static site, no build step. Works on GitHub Pages.

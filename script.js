const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));

const filters=[...document.querySelectorAll('.filter')];
const cards=[...document.querySelectorAll('.project-card')];
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>item.classList.remove('active'));button.classList.add('active');const selected=button.dataset.filter;cards.forEach(card=>{card.hidden=selected!=='all'&&card.dataset.category!==selected;});}));

const projectInfo = {
  inalpha: {
    kicker: "OPEN-SOURCE COLLABORATION / QUANTITATIVE ANALYTICS",
    title: "Inalpha — Backtest Validation & Analytics",
    description: "Developed an analytical validation and traceability prototype for an AI-driven quantitative trading framework. The work covers data checks across strategy candidates, backtest runs and simulated fills.",
    focus: "Approximately 30 SQL validation queries · SQLite · Power BI · DAX · Power Query · Python synthetic data generation · Interactive treemap and drill-through reporting",
    note: 'Built the validation queries, dashboard design, measures and synthetic-data testing workflow. Integration into the wider platform is handled separately by the maintainer. <br><br><a href="https://github.com/mirror29/inalpha/issues/165" target="_blank" rel="noreferrer">VIEW ISSUE #165 ↗</a> &nbsp; | &nbsp; <a href="https://github.com/mirror29/inalpha/pull/176" target="_blank" rel="noreferrer">VIEW DRAFT PR #176 ↗</a>'
  },

  titan: {
    kicker: "EQUITY RESEARCH / FINANCIAL VALUATION",
    title: "Titan Company",
    description: "An ongoing fundamental equity research project examining Titan's business segments, operating economics and financial performance to develop a reasoned valuation.",
    focus: "Segment-level analysis · Historical financial statements · Operating-driver forecasts · FCFF · Cost of capital · Scenario and sensitivity analysis",
    note: "This research and valuation model is in progress. Forecasts and valuation conclusions will be published with their assumptions and supporting sources once reviewed."
  },

  ultra: {
    kicker: "DCF / FINANCIAL MODELLING",
    title: "UltraTech Cement",
    description: "Built an FCFF-based discounted cash flow model using five years of historical financial information, five-year weekly beta regression against the NIFTY 50, CAPM, WACC and forecast cash flows. The base-case model estimated an intrinsic value of approximately ₹7,383 per share.",
    focus: "Historical financial analysis · Weekly beta regression · CAPM · WACC · FCFF forecasting · DCF · Terminal value",
    note: "The ₹7,383 figure is an output of the model under its base-case assumptions, not a live price target or investment recommendation. The model's assumptions and valuation date should accompany any published result."
  },

  crm: {
    kicker: "POWER BI / BUSINESS ANALYTICS",
    title: "B2B Sales Pipeline CRM",
    description: "Built a Power BI operational dashboard using time-intelligence DAX to evaluate sales-stage progression, agent performance, deal movement and pipeline bottlenecks.",
    focus: "Power BI · DAX · Time intelligence · Sales funnel analysis · KPI design · Data modelling",
    note: "An independent dashboard project. Historical deal patterns are descriptive findings from the dataset and should not be interpreted as guaranteed predictions."
  },

  hr: {
    kicker: "POWER BI / WORKFORCE ANALYTICS",
    title: "HR Attrition & Workforce Analysis",
    description: "Developed an interactive workforce analysis dashboard to investigate employee attrition patterns across tenure, department, job satisfaction and other workforce dimensions.",
    focus: "Power BI · Power Query · Custom DAX measures · Dynamic tenure-bucket parameters · Workforce analytics",
    note: "An independent dashboard project built using a sample employee dataset. The analysis describes patterns in the dataset, not conclusions about a real employer."
  },

  pizza: {
    kicker: "POWER BI / DATA VISUALISATION",
    title: "Pizza Sales Dashboard",
    description: "Structured transactional sales data into a relational model and developed an interactive dashboard to explore revenue, order patterns, product categories and operational trends.",
    focus: "Data cleaning · Relational modelling · Power BI · Measures · Interactive reporting",
    note: "An independent analytics project. The dashboard is intended to demonstrate data preparation, modelling and business reporting."
  },

  stocks: {
    kicker: "PYTHON / SQL / DATA PIPELINE",
    title: "Indian Stocks Data Pipeline",
    description: "Built a small market-data workflow using Python and yfinance to collect OHLCV data for five Indian stocks, store it in SQLite and make it available for Power BI analysis.",
    focus: "Python · yfinance · SQLite · Data collection · Data storage · Power BI",
    note: "A learning project using an external data source. It is not a real-time market-data service, and data availability depends on the upstream provider."
  }
};
const dialog=document.querySelector('#projectDialog');
document.querySelectorAll('.details-btn').forEach(button=>button.addEventListener('click',()=>{const item=projectInfo[button.dataset.project];document.querySelector('#dialogKicker').textContent=item.kicker;document.querySelector('#dialogTitle').textContent=item.title;document.querySelector('#dialogDescription').textContent=item.description;document.querySelector('#dialogFocus').textContent=item.focus;document.querySelector('#dialogNote').innerHTML = item.note;;dialog.showModal();}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
// DARK / LIGHT THEME
const themeToggle = document.querySelector("#themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.dataset.theme = theme;

  if (themeToggle) {
    themeToggle.textContent =
      theme === "dark" ? "☼ LIGHT" : "☾ DARK";

    themeToggle.setAttribute(
      "aria-label",
      theme === "dark"
        ? "Switch to light theme"
        : "Switch to dark theme"
    );

    themeToggle.setAttribute(
      "aria-pressed",
      String(theme === "light")
    );
  }

  const themeColor = theme === "dark" ? "#24272B" : "#F4F0E8";
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeColor);
}

const savedTheme = localStorage.getItem("portfolio-theme");

const preferredTheme = window.matchMedia(
  "(prefers-color-scheme: light)"
).matches ? "light" : "dark";

applyTheme(savedTheme || preferredTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme =
    root.dataset.theme === "dark" ? "light" : "dark";

  localStorage.setItem("portfolio-theme", nextTheme);
  applyTheme(nextTheme);
});

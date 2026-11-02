const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));

const filters=[...document.querySelectorAll('.filter')];
const cards=[...document.querySelectorAll('.project-card')];
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>item.classList.remove('active'));button.classList.add('active');const selected=button.dataset.filter;cards.forEach(card=>{card.hidden=selected!=='all'&&card.dataset.category!==selected;});}));

const projectInfo={
 titan:{kicker:'VALUATION / FINANCIAL ANALYSIS',title:'Titan Company',description:'A company valuation study built around understanding the business, organising historical financial information, identifying operating drivers and developing forecast assumptions.',focus:'Financial statement analysis · Forecasting · Cost of capital · Valuation methodology',note:'This is an ongoing study. The detailed model, source references, assumptions and final conclusions will be published only after the case study has been reviewed.'},
 ultra:{kicker:'DCF / FINANCIAL MODELLING',title:'UltraTech Cement',description:'A discounted cash flow exercise using historical financial information to build a view of future cash flows and estimate a continuing value.',focus:'Historical financials · Forecast cash flows · Terminal value · DCF mechanics',note:'This is a learning model, not investment advice or a published recommendation. Supporting assumptions and model outputs will be added with the full case study.'},
 crm:{kicker:'POWER BI / BUSINESS ANALYTICS',title:'CRM Sales Analysis',description:'A Power BI dashboard project examining sales performance and exploring a decline in CRM sales through metrics and visual breakdowns.',focus:'KPI design · Power Query · Data modelling · Dashboard communication',note:'Dashboard screenshots, data context and the specific observations will be added once the project materials are selected for publication.'},
 pizza:{kicker:'POWER BI / DATA VISUALISATION',title:'Pizza Sales Dashboard',description:'A dashboard exercise that turns transactional sales data into an organised set of business views for exploring performance.',focus:'Data preparation · Measures · Visual hierarchy · Interactive reporting',note:'This portfolio overview describes the project scope. Specific findings will be documented alongside the dashboard.'},
 stocks:{kicker:'PYTHON / SQL / DATA PIPELINE',title:'Indian Stocks Data Pipeline',description:'A small data workflow using Python and yfinance to collect market data for a set of Indian stocks, store it in SQLite and make it available for analysis.',focus:'Python · yfinance · SQLite · Data storage · Power BI connection',note:'This is a learning project. It is not a real-time market data service, and data availability depends on the upstream source.'}
};
const dialog=document.querySelector('#projectDialog');
document.querySelectorAll('.details-btn').forEach(button=>button.addEventListener('click',()=>{const item=projectInfo[button.dataset.project];document.querySelector('#dialogKicker').textContent=item.kicker;document.querySelector('#dialogTitle').textContent=item.title;document.querySelector('#dialogDescription').textContent=item.description;document.querySelector('#dialogFocus').textContent=item.focus;document.querySelector('#dialogNote').textContent=item.note;dialog.showModal();}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));

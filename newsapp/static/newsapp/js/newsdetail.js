
const newsContainer = document.getElementById("news-container");
const url = window.location.href;
const newsId = url.split('/').slice(-2, -1)[0];
    console.log('newsId:', newsId);
    
const getRandomColor = () => {
    const h = Math.floor(Math.random() * 360);
    return `hsl(${h}deg, 90%, 85%)`;
};

const createNews = (data) => {
    const news = document.createElement("div");
    news.className = "news";
    news.style.backgroundColor = getRandomColor();
    news.innerHTML += '<h1 style= "display: block;">' + data.title + '</h1>' 
                   +  '<p style= "display: block;">' + data.text + '</p>'
                   +  '<img src=' + data.image + ' class="card-img-top">';
    newsContainer.appendChild(news);
  }

const getNews = async (id) => {
    const response = await fetch('http://127.0.0.1:8000/api/news/'+id);
    const data = await response.json();
    return data
  }
  
const initialize = async () => {
    const newsDetails = await getNews(newsId);
    createNews(newsDetails);
};

initialize();

const cardContainer = document.getElementById("card-container");
const cardCountElem = document.getElementById("card-count");
const cardTotalElem = document.getElementById("card-total");
const loader = document.getElementById("loader");

const cardIncrease = 3;

let currentPage = 1;

const getRandomColor = () => {
    const h = Math.floor(Math.random() * 360);
    return `hsl(${h}deg, 90%, 85%)`;
};

const createCard = (index, data) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.backgroundColor = getRandomColor();
    card.innerHTML += '<h1 style= "display: block;">' + data.title + '</h1>' 
                   +  '<p style= "display: block;">' + data.text + '</p>'
                   +  '<img src=' + data.image + ' class="card-img-top">'
                   +  '<p style= "display: inline-block;">' + 'tags:' + '</p>';
                  
    for (let i = 0; i < data.tags.length; i++) {
      const tagElem = document.createElement('a');
      tagElem.href = 'http://127.0.0.1:8000/news/';
      tagElem.classList.add('tag');
      tagElem.textContent = data.tags[i];
      card.appendChild(tagElem);
    }                   
    
    cardContainer.appendChild(card);
    
    card.addEventListener("click", () => {
      window.location.href = data.id; // Set the URL of the new HTML page here
    });
};

const handleTagClick = (event) => {
  event.preventDefault();
  const label = event.target.textContent;
  addCards(currentPage, label);
};

const getCount = async () => {
  const response = await fetch('http://127.0.0.1:8000/api/news/?limit=3');
  const data = await response.json();
  return data.count;
};

const handleCards = async (cardLimit) => {
  cardTotalElem.innerHTML = cardLimit
  const pageCount = Math.ceil(cardLimit / cardIncrease);

  const addCards = (pageIndex, label) => {
      currentPage = pageIndex;
      const startRange = (pageIndex - 1) * cardIncrease;
      const endRange = currentPage == pageCount ? cardLimit : pageIndex * cardIncrease;
      
      if (label == null){
        label = ''
      }
      console.log(label)
      fetch('http://127.0.0.1:8000/api/news/?limit=3&offset='+startRange+'&tags='+label)
        .then(function (response) {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          cardCountElem.innerHTML = endRange;
          for (let i = startRange + 1; i <= endRange; i++) {
            createCard(i, data.results[((i-1)-endRange+cardIncrease)]);
          }
          const tags = document.getElementsByTagName('a');
          for (let i = 0; i < tags.length; i++){
            tags[i].addEventListener('click', handleTagClick);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
  };

  addCards(currentPage);

  const handleInfiniteScroll = () => {
      throttle(() => {
        const endOfPage =
          window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
        if (endOfPage) {
          addCards(currentPage + 1);
          console.log(currentPage, pageCount);
        }
        if (currentPage === pageCount) {
          removeInfiniteScroll();
        }
      }, 1000);
  };

  window.addEventListener("scroll", handleInfiniteScroll);

  var throttleTimer;
  const throttle = (callback, time) => {
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
      callback();
      throttleTimer = false;
    }, time);
  };

  const removeInfiniteScroll = () => {
      loader.remove();
      window.removeEventListener("scroll", handleInfiniteScroll);
  };
  
}
const initialize = async () => {
    const cardLimit = await getCount();
    handleCards(cardLimit);
};

initialize();
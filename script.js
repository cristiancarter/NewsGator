const apiKey = "016357be89a345aa9fb1d1ad3173252f";

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        fetchNews(query);
    }
});

function fetchNews(query) {
    fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            const newsContainer = document.querySelector('#news-container');
            if (!newsContainer) {
                console.error('Error: news-container element not found.');
                return;
            }

            newsContainer.innerHTML = '';

            if (data.articles && data.articles.length > 0) {
                data.articles.forEach((article) => {



                    const newsItem = document.createElement('div');
                    newsContainer.appendChild(newsItem);

                    const newsTitle = document.createElement('h2');
                    newsTitle.innerText = article.title;
                    newsItem.appendChild(newsTitle);

                    const newsDescription = document.createElement('p');
                    newsDescription.innerText = article.description;
                    newsItem.appendChild(newsDescription);

                    if (article.urlToImage) {
                        const newsImage = document.createElement('img');
                        newsImage.setAttribute('src', article.urlToImage);
                        newsItem.appendChild(newsImage);
                    }
                    

                    const newsLink = document.createElement('a');
                    newsLink.setAttribute('href', article.url);
                    newsLink.innerText = 'Read More';
                    newsItem.appendChild(newsLink);
                });
            } else {
                newsContainer.innerText = 'No results found';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


document.getElementById('search-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('search-input').value;
        if (query) {
            fetchNews(query);
        }
    }
});
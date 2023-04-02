// Put code of task B here

const main = document.querySelector('main');
const newArticle = document.createElement('article');
const newHeader = document.createElement('header');
const newHeading = document.createElement('h2');

newHeading.textContent = 'Article header';
newHeader.appendChild(newHeading);

const newFigure = document.createElement('figure');
const newImage = document.createElement('img');

newImage.setAttribute('src', 'http://placekitten.com/320/160');
newImage.setAttribute('alt', 'title 2');

const newCaption = document.createElement('figcaption');
newCaption.textContent = 'Caption';

newFigure.appendChild(newImage);
newFigure.appendChild(newCaption);

const newParagraph = document.createElement('p');
newParagraph.textContent = 'Here is some text. Here is some text. Here is some text. Here is some text.';

newArticle.appendChild(newHeader);
newArticle.appendChild(newFigure);
newArticle.appendChild(newParagraph);

main.appendChild(newArticle);

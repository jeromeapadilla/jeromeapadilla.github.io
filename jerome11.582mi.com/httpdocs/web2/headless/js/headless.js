const baseURL = "https://jerome11.582mi.com/Philippines/wp-json/wp/v2/";
let url = `${baseURL}posts/`;

async function fetchPosts(url){
    const repsonse = await fetch(url);
    const data = await repsonse.json();
    console.log(data);
    displayPost(data);
}

fetchPosts(url);

const contentSection = document.querySelector('#content');
function displayPost(data){
    console.log(data [0].content.rendered);

    let article = document.createElement('article');
    article.innerHTML = data[0].content.rendered;
    contentSection.appendChild(article);
}
  
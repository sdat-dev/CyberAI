let requestURL = "data/newsarticles.json";
let request = new XMLHttpRequest();
//getting content Element to append grants information
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    const newartilesjson = request.response;  
    //condition for checking if browser is Internet Explorer
    let newartiles =  ((false || !!document.documentMode))? JSON.parse(newartilesjson): newartilesjson;  
    newartiles.sort(function(a ,b){
        let date1 = new Date(a.puslishedDate);
        let date2 = new Date( b.puslishedDate);
        return date1 >= date2;
    });
    let content = createArticles(newartiles);
    //Appending grants to main content Element  
    let contentElement = document.createElement('div');
    contentElement.innerHTML = content.trim();
    maincontentContainer.appendChild(contentElement);
}

let createArticles = function(newartiles){
    let content = '';
    newartiles.forEach(function(article){
        content += '<div class="article-container">';
        content +=  '<a href="'+ article.link+'" target = "_blank"><h4>' + article.title + '</h4></a>' +
                    '<i class="fas fa-calendar-day"></i> <b>Published Date: </b>' + article.publishedDate +
                    '<br>';
        if(article.faculty.length > 0){
            content += '<b>Faculty: </b>';
            var i =0;
            for(i = 0; i < article.faculty.length-1; i++ ){
                content += article.faculty[i] + ', ';
            }
            content += article.faculty[article.faculty.length-1];
            content += '<br>';
        } 
        if(article.image != '')
        {
            content +='<img class = "article-image" src = "assets/images/news-images/'+ article.image +'.jpg"/>';
        }
        content +='</div>';
    });
    return content;
}
let requestURL = "data/grants.json";
let request = new XMLHttpRequest();
//getting content Element to append grants information
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    const grants = request.response;  
    //condition for checking if browser is Internet Explorer
    let grant =  ((false || !!document.documentMode))? JSON.parse(grants): grants;  
    let content = buildgrantContent(grant);
    //Appending grants to main content Element  
    let contentElement = document.createElement('div');
    contentElement.innerHTML = content.trim();
    maincontentContainer.appendChild(contentElement);
}

//function for generating HTML for grant object
let buildgrantContent = function(grants){
    let content = '';
    grants.forEach(function(grant) {
        let imageElement =  '<div class = "col-xl-2 col-lg-3"><img class = "agency-logo" src = "'+ grant.image +'" /></div>';
        content = content + '<div class = "display-flex opportunity-container search-container">'+ imageElement + '<div class = "col-xl-10 col-lg-9"><h4 class = "opp-header black-content-header-no-margin">'+ grant.title +'</h4>'+
                   '<div class = "opp-details display-flex">'+
                        '<div class = "col-sm-12 col-md-12 col-lg-12 col-xl-6">'+
                            '<i class="fas fa-flag"></i> <strong>Agency Name: </strong>' + grant.agency +
                            '<br>' +
                            '<i class="fas fa-dollar-sign"></i> <strong>Estimated Funding: </strong>' + grant.funding +
                            '<br>' +
                        '</div><div class = "col-sm-12 col-md-12 col-lg-12 col-xl-6">' +
                            '<i class="fas fa-calendar-day"></i> <strong>Posted Date: </strong>' + grant.postDate +
                            '<br><i class="fas fa-calendar-day"></i> <strong>Close Date: </strong>' + grant.closeDate +
                            '<br></div></div></div>' +
                   '<p class = "opp-description">' + grant.description + '</p>' +
                   '<button type = "button" class = "details-button" onclick = "location.href = \'' + grant.link + '\'">View Details</button></div>';
    });
    return content;
}
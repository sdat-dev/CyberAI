let getDistinctAttributes = function(objects, attribute){
    let mappedAttributes = objects.map(function(object){
        return object[attribute];
    });
    let distinctAttributes = mappedAttributes.filter(function(v, i, a){
        return a.indexOf(v) === i;
     });

    distinctAttributes.sort();
    return distinctAttributes;
}

let generateSubAccordionContent = function(attributes, filterAttribute, objects, generateObjectContent){
    let accordionContent = '';

    attributes.forEach(function(attribute){
        //filtering objects based on each subaccordion grouping
        objects = objects.filter(function(object){ 	
            return object[filterAttribute] == attribute;
        });

        let objectContent = '';
        objects.forEach(function(object){
            objectContent = objectContent + generateObjectContent(object);
        });

        accordionContent += '<div class = "accordion-container"><div class = "accordion-header"><h3 class = "content-header-no-margin">'+ attribute + '</h3></div><div class = "accordion-content">'+ objectContent +'</div></div>';
    });
    return accordionContent;
}

let generateAccordionElem = function(divId, bootlabelId, accordionHeader, accordionContent, theme){
    let buttontheme = (!theme.includes('gold'))? '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#':
    '<button class="btn btn-link gold-button-theme" type="button" data-toggle="collapse" data-target="#';
    let accordionElem =  '<div class = "card"><div class="card-header" id="'+ bootlabelId + '">' +
                          buttontheme + divId + '" aria-expanded="true" aria-controls="' + divId + '">'+
                            '<h2 class = "content-header-no-margin">' + accordionHeader + '<i class="fas fa-chevron-down"></i></h2></button></div>'
                        + '<div id="'+ divId + '" class = "collapse" aria-labelledby= "'+ bootlabelId + '"> <div class = "card-body">'
                        + accordionContent +'</div></div></div>';  
    return accordionElem;
}

let appendMainContent = function(maincontentContainer, content){
    let mainContentElement = document.createElement('div');
    mainContentElement.classList.add('accordion');
    mainContentElement.id = 'accordionExample';
    mainContentElement.innerHTML = content.trim();
    maincontentContainer.appendChild(mainContentElement);
}
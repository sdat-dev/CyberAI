let requestURL = "data/programs.json";
let request = new XMLHttpRequest();
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    let programlist = request.response;  
    let programCategories = ['Undergraduate Programs', 'Graduate Programs'];
    let distinctprogramTypes = [['Bachelor',
        'Combined BA-BS or BS-MS',
        'Honors Program',
        'Transfer-oriented Program'],
        ['Masters',
        'Doctorate',
        'Graduate Certificate']];
    const programs =  ((false || !!document.documentMode))? JSON.parse(programlist): programlist;  
    let content = '';
    //programType-counter for unique id generation
    let programTypecounter = 1;
    //Iterating over list of programTypes
    for(let i = 0; i< programCategories.length; i++)
    {
        //content = content + '<h2 class = "content-header-top-bottom-margin">'+ programCategories[i]+'</h2>'
        distinctprogramTypes[i].forEach(function(programType){
        //filtering on programType
        programTypeDegrees = programs.filter(function(program){ 	
            return program.programLevel == programType;
                });

        //getting list of distint degrees within school
        programDegrees = programTypeDegrees.map(function(program){ 
                    return program.degree});
                
        let accordioncontent = '';
        //iterating over list of degrees to generate sub-accordion
        
        programDegrees.forEach(function(degree){
        //filtering programs on degrees
            degreeDetails = programTypeDegrees.filter(function(programTypeDegree){ 	
                return programTypeDegree.degree == degree;
            });
            accordioncontent = accordioncontent + generateProgramContent(degreeDetails); 
        });
        //generating Id for bootstrap accordion
        let programTypeId = "collapse" + programTypecounter;
        let headingId = "heading" + programTypecounter;
        let accordionElem =   generateAccordionElem(programTypeId, headingId, programType, accordioncontent, '');
        content = content + accordionElem;
        programTypecounter++;
        });
    }
            //Appending content to DOM
        appendMainContent(maincontentContainer, content);
}

    //generate HTML content for each Academic Program
    let generateProgramContent = function(degreeDetails){
        let content = '';
        degreeDetails.forEach(function(degree){
            let departmentElement = (degree.department != 'N/A')? '<strong>Department: </strong>' + degree.department : '';
            let degreeRequirementElem = (degree.description != 'N/A')? '<h4 class = "content-header-no-margin">Degree Requirements</h4>'+
            '<p>' + degree.description + '</p>' : '';
            let programLink = (typeof degree.link != 'undefined')? '<br><strong>Program Link: </strong><a href = "' + degree.link +'">'+ degree.link +'</a>':'';
            let degreeContent = '<p>'+ departmentElement + '<br><strong>School: </strong>' + degree.college + 
             '<br><strong>Credits Hours: </strong>' + degree.credits +  programLink +'</p>'+      
            '<h4 class = "content-header-no-margin">Core Courses </h4>'+
                     degree.coreCourses +
                        degreeRequirementElem;
            content = content +  '<div class = "accordion-container"><div class = "accordion-header"><h3 class = "content-header-no-margin">'+ degree.degree + '</h3></div><div class = "accordion-content">'+ degreeContent +'</div></div>';
            
        });
       return content;
    }
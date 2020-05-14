let requestURL = "data/courses.json";
let request = new XMLHttpRequest();
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
let courselist = request.response;  
//console.log(courses);
    let courses =  ((false || !!document.documentMode))? JSON.parse(courselist): courselist; 
            
    let content = '';
    //Department-counter for unique id generation
    let deptcounter = 1;
    //finding list of distinct departments
    let distinctDepartments = getDistinctAttributes(courses, "department");

    //Iterating over list of departments
    distinctDepartments.forEach(function(department){
        
        let departmentCourses = courses.filter(function(course){ 	
                    return course.department == department
        });
        //getting list of distint degrees within department
        let degrees = getDistinctAttributes(departmentCourses, "degree");
        let accordionContent = generateSubAccordionContent(degrees, "degree", departmentCourses, generateDegreeContent);
                
        //generating Id for bootstrap accordion
        let deptId = "collapse" + deptcounter;
        let headingId = "heading" + deptcounter;
        let accordionElem =  generateAccordionElem(deptId, headingId, department, accordionContent, 'purple');
        content = content + accordionElem;
        deptcounter++;
    });
    //Appending content to DOM
    appendMainContent(maincontentContainer, content);
}

    //function to generate HTML for degree content
    let generateDegreeContent = function(course){
        let degreeContent =  '<div class = "search-container course-container"><strong><span class = "course-code">' + course.courseCode + '</span> &nbsp; &nbsp;<span class = "course-title">' + course.title + '</span>'+
        '<span class = "credits">'+ course.courseCredits + '</span></strong>' +
        '<br><span><strong>Department: </strong></span><span class = "department">' + course.department + '</span><br><span><strong>School: </strong></span><span class = "school">'
        + course.school + '</span><br><span><strong>Degree: </strong></span><span class = "degree">' + course.degree + '</span><br><p class= "description">' + course.description
        +'</p></div>'; 
        return degreeContent;
    }
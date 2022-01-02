// AngularJS-kod som vi går igenom mer i detalj i sektion 2 - Angular. 
// Fokusera på $scope i funktionen successCallBack i den här laborationen.

// Skapar modulen myCoursesApp
angular.module('myCoursesApp', []) // Läs 1 nedan
    .controller('MyCoursesController', function MyCourseController($scope, $http) { // Läs 2 nedan 
        // Lägger till variabeln studentId som nu kan nås/användas i html-koden
        $scope.studentId = 'rabi2000';

        $http.get("miun-db.json") // Läs 3 nedan
            .then(function successCallback(response) { // Läs 4 nedan
                // this callback will be called asynchronously when the response is available

                // För att underlätta användningen av data i response lagrar vi det i en variabel
                const data = response.data;
                
                // Läs 5 nedan
                $scope.pages = data.pages;
                $scope.courses = data.courses;
                $scope.myCourses = data.myCourses;
            },
                function errorCallback(response) { // Läs 6 nedan
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("Error reading courses.json! response=" + JSON.stringify(response));
                } 
            );
        
        // Funktion som utifrån namnet på en html-fil returnerar den rubrik den sidan ska använda.
        $scope.getPageHeading = function(page) {
            // Returnera en tom sträng om inte data från json-filen eller page finns
            if (!$scope.pages || !page) {
                return '';
            }
            
            // Leta efter sidan och returnera dess rubrik
            for (let i = 0; i < $scope.pages.length; i++) {
                if ($scope.pages[i].page == page) {
                    return $scope.pages[i].heading;
                }
            }

            // Returnera en tom sträng om sidan inte finns
            return '';
        };


        // Funktion som utifrån namnet på en html-fil returnerar sidans ingress.
        $scope.getPageText = function(page) {
            // Returnera en tom sträng om inte data från json-filen eller page finns
            if (!$scope.pages || !page) {
                return '';
            }

            // Leta efter sidan och returnera dess ingress
            for (let i = 0; i < $scope.pages.length; i++) {
                if ($scope.pages[i].page == page) {
                    return $scope.pages[i].text;
                }
            }

            // Returnera en tom sträng om sidan inte finns
            return '';
        };

        

    }
    );

/*
1.
    Från dokumentationen av AngularJS finner vi att:

    "You can think of a module as a container for the different parts of your app – controllers, services, filters,
    directives, etc."

    I det här läget av kursen kan vi se det som startpunkten för vår app med namnet myCoursesApp.

2.
    Från AngularJS läser vi att: "Controllers are the behavior behind the DOM elements".

    Här skapar vi en ny controller med namnet MyCoursesController. AngularJS kommer att skicka ett $scope-objekt
    när vår controller skapas. Från dokumentationen av AngularJS finner vi att:

    "The $scope in an AngularJS is a built-in object, which contains application data and methods. You can create
    properties to a $scope object inside a controller function and assign a value or function to it. The $scope is
    glue between a controller and view (HTML)."

    Utöver $scope väljer vi att inkludera $http i vår MyCoursesController. Från dokumentationen av AngularJS finner vi att:

    "The $http service is a core AngularJS service that facilitates communication with the remote HTTP servers via
    the browser's XMLHttpRequest object or via JSONP."

3.
    Via $http och dess metod get (utför en GET-begäran) kan vi läsa resurer via den url som anges som första argument.
    I det här fallet är resursen filen miun-db.json (som nu ligger i samma katalog som denna fil, men url kan lika gärna
    vara till en publik webbserver där json-filen ligger).

    Metoden get är en så kallad asynkron metod som returnerar sitt värde "någon gång i framtiden" som en Promise. När en
    Promise returneras av en metod har den antingen tillståndet "fulfilled" (med ett värde) eller "rejected" (med ett error).

    (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

4.
    På ett Promise kan vi anropa metoden "then" och som argument skickar vi två "callback functions" för de två tillstånd
    Promise kan ha. Den första callback anropas vid tillståndet "fulfilled/success" och den andra callback anropas vid
    tillståndet "rejected/failure ".

5.
    Som nämnts ovan i punkt 2 används $scope som klistret mellan appens logik och vyn (html-sidan). Till $scope kan du addera
    egna egenskaper (värden/variabler) och beteenden (funktioner). I detta exempel lägger vi värdet (value) från information
    (key) i miun-db.json till $scope.information. All kursdata från miun-db.json lägger vi i $scope.courses. Variablerna information
    och courses blir nu åtkomliga från t.ex. index.html.

6.
    Normalt ska vi hantera alla typer av errors i en app och meddela användaren på lämpligt sätt om dessa. Nu loggar vi bara
    till konsolen att det inte gick att läsa från filen.
*/
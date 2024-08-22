// Write your JavaScript code here!

window.addEventListener("load", function() {
    console.log("page loaded")
    
    // Declaring & Initializing Form element from DOM
    const form = document.querySelector("form");

    
    // Using Event Listener to listen for a 'submit' event
    form.addEventListener("submit", function(event) {
        
        // Declaring & Initializing Form elements from DOM
        let list = document.getElementById("faultyItems");
        let pilot = document.querySelector("input[name=pilotName]");
        let copilot = document.querySelector("input[name=copilotName]");
        let fuelLevel = document.querySelector("input[name=fuelLevel]");
        let cargoLevel = document.querySelector("input[name=cargoMass]");
 
        // CT NOTE: make sure formSubmission (do "fuelLevel.value") when calling the variables
        formSubmission(document, list, pilot.value, copilot.value, fuelLevel.value, cargoLevel.value);
        
        // Prevent Form Submission
        event.preventDefault();
    });
    

    let listedPlanets;

    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);

    }).then(function () {
        console.log(listedPlanets);

        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planetSelected = pickPlanet(listedPlanets);
        console.log(planetSelected);

        // Displays the Mission Destination
        addDestinationInfo(document, planetSelected.name, planetSelected.diameter, planetSelected.star, planetSelected.distance, planetSelected.moons, planetSelected.image);
    });


    // For fun - I added a Reset button
    const buttonReset = document.getElementById("formReset");
    buttonReset.addEventListener("click", function() {
        console.log("Reset Button clicked");

        let resetResponse = window.confirm("Are you sure you want to Start Over?");

        if (resetResponse) {
            resetButton();
        }
    });

 });
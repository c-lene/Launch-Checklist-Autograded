// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    
    // Here is the HTML formatting for our mission target div.
    /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */

    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
 }
 




 function validateInput(testInput) {
    let numCheck = Number(testInput);
    
    if (testInput === '') {
        return "Empty";

    } else if (isNaN(numCheck)) {
        return "Not a Number";

    } else {
        return "Is a Number";
    }
 }
 



 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    // Declaring & Assigning Variables for Updating Status Elements
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");


    // Adding Alerts - Verifying Valid User Input
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        
        // Tests to see if the If statement works
        // console.log("All fields are required!");                                                    
        
        // Alerts user to fill all fields
        window.alert("All fields are required!");
        
    } else if (validateInput(pilot) !== "Not a Number" || validateInput(copilot) !== "Not a Number" || validateInput(fuelLevel) !== "Is a Number" || validateInput(cargoLevel) !== "Is a Number") {
        
        // Tests to see if the If statement works
        // console.log("Make sure to enter valid information for each field");                         
        
        // Alerts user to input valid information
        window.alert("Make sure to enter valid information for each field")

    } else {
        
        // Updates Pilot & Co-Pilot Status
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;


        // Updates fuel status & launchStatus
        if (Number(fuelLevel) < 10000) {
            list.style.visibility = "visible";
            launchStatus.style.color = "red";
            launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            fuelStatus.innerHTML = `Fuel level too low for launch`;

        } else {
            fuelStatus.innerHTML = `Fuel level high enough for launch`;
        }
        

        // Updates cargo status & launchStatus
        if (Number(cargoLevel) > 10000) {
            list.style.visibility = "visible";
            launchStatus.style.color = "red";
            launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            cargoStatus.innerHTML = `Cargo mass too heavy for launch`;

        } else {
            cargoStatus.innerHTML = `Cargo mass low enough for launch`;
        }
        

        // Updates launchStatus
        if (Number(fuelLevel) >= 10000 && Number(cargoLevel) < 10000) {
            list.style.visibility = "visible";
            launchStatus.style.color = "green";
            launchStatus.innerHTML = `Shuttle is Ready for Launch`;
        }
    }
 } 




 async function myFetch() {
    let planetsReturned;
 
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        return response.json()
    });
 
    return planetsReturned;
 }
 



 function pickPlanet(planets) {
    
    // Selecting an Random Index number to select Random Planet
    let randomPlanetIndex = Math.floor(planets.length * Math.random());
    // let randomPlanetIndex = planets.length * Math.random();
    return planets[randomPlanetIndex];
 }
 

// For Fun - Added a Reset button
function resetButton() {
    let listedPlanets;

    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);

    }).then(function () {
        console.log(listedPlanets);

        
        let planetSelected = pickPlanet(listedPlanets);
        console.log(planetSelected);

        // Displays the Mission Destination
        addDestinationInfo(document, planetSelected.name, planetSelected.diameter, planetSelected.star, planetSelected.distance, planetSelected.moons, planetSelected.image);
    });


    
    

}





/* Testing if validateInput() works */
// console.log(validateInput(""));
// console.log(validateInput("asdf"));
// console.log(validateInput("9"));
// console.log(validateInput("0"));

// console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")


/* Testing the Logic of the If Statements */
// console.log(formSubmission("Chris", "Bob", 0, 5));
// console.log(formSubmission("Chris", "Bob", 10000, 100000));
// console.log(formSubmission("Chris", "Bob", 0, 100000));
// console.log(formSubmission("Chris", "Bob", 10000, 1));


// console.log(myFetch());




 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;
 
 module.exports.resetButton = resetButton;
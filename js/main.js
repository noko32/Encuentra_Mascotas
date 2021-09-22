const key = 'uVk3ijP8FbYvHj2tnltLIgnujlMy5FNblmwxCPBKgm8YCgtRN4';
const secretKey = 'M0S8Fy1Cxp5ZRkPhoCiq4sPtIOXBnaJpqgeeR9v1';
import { isValidZip, showAlert } from "./validate";

// Get Form
const petForm = document.querySelector('#pet-form');
let token;
petForm.addEventListener('submit', fetchAnimals);

// Get Token 
fetch("https://api.petfinder.com/v2/oauth2/token", {
        body: `grant_type=client_credentials&client_id=${key}&client_secret=${secretKey}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
    })
    .then(res => res.json())
    .then(data => {
        token = data.access_token;
    });

// fetch animals from API
function fetchAnimals(e) {
    e.preventDefault();

    // Get user input 
    const animal = document.querySelector('#animal').value;
    const zip = document.querySelector('#zip').value;
    // Validate zip
    if (!isValidZip(zip)) {
        showAlert("Invalid zip", 'danger');
        return;
    }
    // Fetch pets
    fetch(`https://api.petfinder.com/v2/animals/?type=${animal}&contact.address.postcode=${zip}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => ShowAnimals(data.animals))
        .catch(err => console.log(err));
}

// Show Searched Pets
function ShowAnimals(animals) {
    const results = document.querySelector('#results');

    // clear first
    results.innerHTML = '';

    // Loop through pets
    animals.forEach(animal => {
        let image;
        // console.log(animal); properties check
        if (animal.photos.length > 0) {
            image = animal.photos[0].medium;
        } else {
            image = `https://i.pinimg.com/originals/27/3d/b2/273db2bdbe21b9bbdfb5bb89db27c6a8.png`
        }
        const div = document.createElement('div');
        div.classList.add('card', 'card-body', 'mb-3');
        div.innerHTML += `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${image}" class="img-fluid rounded-start h-100" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${animal.name}</h5>
                        <h5 class="card-text text-center">Ciudad: ${animal.contact.address.city}</h5>
                        <h6 class="card-text text-center">Estado: ${animal.contact.address.state}</h6>
                        <ul class="list-group">
                            <li class="list-group-item">Edad: ${animal.age}</li>
                            <li class="list-group-item">Sexo: ${animal.gender}</li>
                            <li class="list-group-item">Tamano: ${animal.size}</li>
                            <li class="list-group-item">Email: ${animal.contact.email}</li>
                            <li class="list-group-item">Telefono: ${animal.contact.phone}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;
        results.appendChild(div);
    });

}
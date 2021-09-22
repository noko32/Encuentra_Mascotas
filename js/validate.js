export function isValidZip(zip) {
    return /^\d{5}$/.test(zip);
}


// Display alert Message
export function showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes 
    div.className = `alert alert-${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // Get container
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#pet-form');
    //insert alert
    container.insertBefore(div, form);
    // vanish after 3 secs
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}
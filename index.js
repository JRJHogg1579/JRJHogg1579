
// reset the form when returning to the website
window.onload = function () {
    // Reset the form fields when the page loads
    document.getElementById("form").reset();
};

function clearTabs() {
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("subTabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("subTablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
}


// Function for project tabs
function openSubTab(evt, tab) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("subTabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("subTablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";
}


// Function for opening the projects tab and the first project in the tab
function openProjectTab() {

    clearTabs()

    // Open the projects tab
    document.getElementById("projectTabID").className += " active";
    document.getElementById("Projects").style.display = "block";

    // Open the project 1 tab
    document.getElementById("project1TabID").className += " active";
    document.getElementById("p1").style.display = "block";

}

// Function for opening the about me tab
function openAboutMeTab() {

    clearTabs();

    // Open the about me tab
    document.getElementById("aboutMeTabID").className += " active";
    document.getElementById("About me").style.display = "block";

}

function openContactMeTab() {

    clearTabs();

    // Open the contact me tab
    document.getElementById("contactMeTabID").className += " active";
    document.getElementById("Contact me").style.display = "block";
}






(function () {
    "use strict";
    /*
     * Form Validation
     */

    // Fetch all the forms we want to apply custom validation styles to
    const forms = document.querySelectorAll(".needs-validation");
    const result = document.getElementById("result");
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
            "submit",
            function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();

                    form.querySelectorAll(":invalid")[0].focus();
                } else {
                    /*
                     * Form Submission using fetch()
                     */
                    event.preventDefault();
                    event.stopPropagation();

                    const formData = new FormData(form);
                    const object = Object.fromEntries(formData);
                    const json = JSON.stringify(object);
                    result.innerHTML = "Please wait...";

                    fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: json,
                    })
                        .then(async (response) => {
                            let json = await response.json();
                            if (response.status == 200) {
                                result.innerHTML = json.message;
                                result.classList.remove("text-gray-500");
                                result.classList.add("text-green-500");
                            } else {
                                console.log(response);
                                result.innerHTML = json.message;
                                result.classList.remove("text-gray-500");
                                result.classList.add("text-red-500");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            result.innerHTML = "Something went wrong!";
                        })
                        .then(function () {
                            form.reset();
                            form.classList.remove("was-validated");
                            setTimeout(() => {
                                result.style.display = "none";
                            }, 5000);
                        });
                }
                form.classList.add("was-validated");
            },
            false
        );
    });

    openProjectTab();

})();
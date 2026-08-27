// ===============================
// SETU LOGIN & DASHBOARD
// ===============================


// Selected login role
let selectedRole = "official";


// ===============================
// ROLE SELECTION
// ===============================

function selectRole(role) {

    selectedRole = role;

    const officialButton =
        document.getElementById("officialBtn");

    const subsidiaryButton =
        document.getElementById("subsidiaryBtn");

    const roleInfo =
        document.getElementById("roleInfo");

    const loginButton =
        document.querySelector(".login-button");


    if (role === "official") {

        officialButton.classList.add("active");

        subsidiaryButton.classList.remove("active");


        roleInfo.innerHTML = `
            <strong>Official Officer</strong>

            <span>
                Administrator access • All documents & reports
            </span>
        `;


        loginButton.textContent =
            "Login as Official Officer";

    }

    else {

        subsidiaryButton.classList.add("active");

        officialButton.classList.remove("active");


        roleInfo.innerHTML = `
            <strong>Subsidiary</strong>

            <span>
                Restricted access • Only authorized subsidiary files
            </span>
        `;


        loginButton.textContent =
            "Login as Subsidiary";

    }

}



// ===============================
// LOGIN
// ===============================

function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    const errorMessage =
        document.getElementById("errorMessage");


    let loginSuccessful = false;


    // Official Officer

    if (
        selectedRole === "official" &&
        username === "admin" &&
        password === "admin123"
    ) {

        loginSuccessful = true;

    }


    // Subsidiary

    if (
        selectedRole === "subsidiary" &&
        username === "subsidiary" &&
        password === "sub123"
    ) {

        loginSuccessful = true;

    }


    // Wrong credentials

    if (!loginSuccessful) {

        errorMessage.style.color =
            "#d93025";

        errorMessage.textContent =
            "Invalid username or password.";

        return;

    }


    // Successful login

    errorMessage.textContent = "";


    openDashboard(username);

}



// ===============================
// OPEN DASHBOARD
// ===============================

function openDashboard(username) {

    const loginContainer =
        document.querySelector(".login-container");

    const dashboard =
        document.getElementById("dashboardPage");


    // Hide login

    loginContainer.style.display =
        "none";


    // Show dashboard

    dashboard.style.display =
        "block";


    // Show username

    document.getElementById(
        "loggedUser"
    ).textContent = username;


    // Show role

    const roleBadge =
        document.getElementById("userRole");


    if (selectedRole === "official") {

        roleBadge.textContent =
            "OFFICIAL / ADMIN";

    }

    else {

        roleBadge.textContent =
            "SUBSIDIARY";

    }
configureAccess();

    // Open dashboard home

    showSection(
        "home",
        document.querySelector(".menu-button")
    );

}



// ===============================
// SIDEBAR NAVIGATION
// ===============================

function showSection(sectionId, button) {

    const sections =
        document.querySelectorAll(
            ".dashboard-section"
        );


    const buttons =
        document.querySelectorAll(
            ".menu-button"
        );


    // Hide all sections

    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    // Remove active button

    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    // Show selected section

    document.getElementById(
        sectionId
    ).classList.add(
        "active-section"
    );


    // Highlight selected menu

    if (button) {

        button.classList.add("active");

    }

}



// ===============================
// AI QUERY
// ===============================

function askQuestion() {

    const question =
        document.getElementById(
            "question"
        ).value.toLowerCase();


    const answer =
        document.getElementById(
            "answer"
        );

    const source =
        document.getElementById(
            "source"
        );


    if (
        question.includes("production")
    ) {

        answer.textContent =
            "45.2 MT";


        source.textContent =
            "Annual Production Report 2024 → Chapter 2 → Page 22";


        return;

    }


    if (
        question.includes("geology") ||
        question.includes("geological")
    ) {

        answer.textContent =
            "The geological structure information is available in the verified Geological Report 2024.";


        source.textContent =
            "Geological Report 2024 → Chapter 2 → Page 15";


        return;

    }


    if (
        question.includes("safety")
    ) {

        answer.textContent =
            "Safety measures are documented in the verified Safety Report 2024.";


        source.textContent =
            "Safety Report 2024 → Chapter 6 → Page 42";


        return;

    }


    // No guessing

    answer.textContent =
        "No verified record found.";


    source.textContent =
        "No verified source available in the current document repository.";

}



// ===============================
// REPORT GENERATION
// ===============================

let selectedReport = "Production";


function selectReport(type) {

    selectedReport = type;

}


function generateReport() {

    const preview =
        document.getElementById(
            "reportPreview"
        );


    let source =
        "Annual Production Report 2024 → Chapter 2 → Page 22";


    if (selectedReport === "Geology") {

        source =
            "Geological Report 2024 → Chapter 2 → Page 15";

    }


    if (selectedReport === "Safety") {

        source =
            "Safety Report 2024 → Chapter 6 → Page 42";

    }


    if (selectedReport === "Custom") {

        source =
            "Verified documents selected by the user";

    }


    preview.innerHTML = `

        <small>
            SETU GENERATED REPORT
        </small>

        <h3>
            ${selectedReport} Report
        </h3>

        <hr>

        <p>
            Verified information retrieved from
            authorized documents.
        </p>

        <p>

            <strong>
                Source:
            </strong>

            <br>

            ${source}

        </p>


        <div class="accuracy">

            Accuracy / Trust Score

            <strong>
                97%
            </strong>

        </div>

    `;

}



// ===============================
// LOGOUT
// ===============================

function logout() {

    const loginContainer =
        document.querySelector(
            ".login-container"
        );

    const dashboard =
        document.getElementById(
            "dashboardPage"
        );


    dashboard.style.display =
        "none";


    loginContainer.style.display =
        "flex";


    document.getElementById(
        "username"
    ).value = "";


    document.getElementById(
        "password"
    ).value = "";


    document.getElementById(
        "errorMessage"
    ).textContent = "";

}
// ===============================
// ROLE-BASED ACCESS CONTROL
// ===============================

function configureAccess() {

    const accessTitle =
        document.getElementById("accessTitle");

    const accessDescription =
        document.getElementById("accessDescription");

    const accessBadge =
        document.getElementById("accessBadge");

    const welcomeRole =
        document.getElementById("welcomeRole");

    const accessMessage =
        document.getElementById("accessMessage");


    if (selectedRole === "official") {

        accessTitle.textContent =
            "Official Officer Access";

        accessDescription.textContent =
            "Administrator access to all documents, reports, validation records and system information.";

        accessBadge.textContent =
            "FULL ACCESS";

        accessBadge.className =
            "access-badge full-access";

        welcomeRole.textContent =
            "OFFICIAL OFFICER • ADMINISTRATOR";

        accessMessage.textContent =
            "You have complete access to CMPDI/CIL reporting data, documents, validation records and reports.";

    }

    else {

        accessTitle.textContent =
            "Subsidiary Access";

        accessDescription.textContent =
            "Access is limited to documents and reports authorized for this subsidiary.";

        accessBadge.textContent =
            "LIMITED ACCESS";

        accessBadge.className =
            "access-badge limited-access";

        welcomeRole.textContent =
            "SUBSIDIARY USER";

        accessMessage.textContent =
            "You can access only authorized documents and reports assigned to your subsidiary.";

    }

}
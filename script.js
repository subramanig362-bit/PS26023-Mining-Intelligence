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

    // Replay the role-info entrance animation
    // whenever the person switches roles
    roleInfo.classList.remove("role-info-pulse");
    void roleInfo.offsetWidth;
    roleInfo.classList.add("role-info-pulse");


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
let loggedInRole = "";
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

        // Quick shake animation on the card to
        // give clear visual feedback on failure
        const card =
            document.querySelector(".login-card");

        if (card) {

            card.classList.remove("shake");
            void card.offsetWidth;
            card.classList.add("shake");

        }

        return;

    }


    // Successful login

    errorMessage.textContent = "";


    loggedInRole = selectedRole;
    updateDocumentAccess();

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


    if (loggedInRole === "official") {

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

    const targetSection =
        document.getElementById(sectionId);

    // Force reflow so the entrance animation
    // replays every time this section is opened,
    // not just the first time.
    void targetSection.offsetWidth;

    targetSection.classList.add(
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

// ===============================
// AI QUERY & RESPONSE
// ===============================

function askQuestion() {

    const question =
        document.getElementById("question").value.trim();

    const answerBox =
        document.getElementById("answerBox");

    const answer =
        document.getElementById("answer");

    const source =
        document.getElementById("source");

    const askButton =
        document.getElementById("askButton");


    // ===============================
    // EMPTY QUESTION
    // ===============================

    if (!question) {

        answerBox.style.display = "block";

        answer.textContent =
            "Please enter a question.";

        source.textContent =
            "No query submitted.";

        return;

    }


    // ===============================
    // SHOW ANSWER BOX
    // ===============================

    answerBox.style.display = "block";


    // ===============================
    // DISABLE BUTTON
    // ===============================

    if (askButton) {

        askButton.disabled = true;

        askButton.textContent =
            "⟳ Processing...";

    }


    // ===============================
    // PROCESSING STATE
    // ===============================

    answer.textContent =
        "SETU is searching verified documents...";

    source.textContent =
        "Retrieving supporting evidence...";


    // ===============================
    // SIMULATE RETRIEVAL
    // ===============================

    setTimeout(function() {

        answer.textContent =
            "SETU is validating retrieved information...";

        source.textContent =
            "Checking source, chapter and page...";

    }, 700);


    // ===============================
    // GENERATE ANSWER
    // ===============================

    setTimeout(function() {

        processAIQuestion(
            question,
            answer,
            source
        );

        // Replay a short highlight animation on the
        // answer card now that the response has landed
        answerBox.classList.remove("answer-updated");
        void answerBox.offsetWidth;
        answerBox.classList.add("answer-updated");


        // Re-enable button

        if (askButton) {

            askButton.disabled = false;

            askButton.textContent =
                "Ask SETU";

        }

    }, 1500);

}
// ===============================
// PROCESS AI QUESTION
// ===============================
// ===============================
// PROCESS AI QUESTION
// ===============================

function processAIQuestion(
    question,
    answer,
    source
) {

    const q =
        question.toLowerCase().trim();


    // ===========================
    // MULTIPLE QUESTIONS
    // ===========================

    const lines =
        question
            .split("\n")
            .map(line => line.trim())
            .filter(line => line.length > 0);

    if (lines.length > 1) {

        answer.textContent =
            "Please ask one question at a time.";

        source.innerHTML =
            "<strong>Status:</strong> Multiple questions detected.<br>" +
            "Please enter a single question so SETU can provide a traceable answer.";

        return;
    }


    // ===========================
    // NO RECORD
    // ===========================

    if (
        q.includes("2035") ||
        q.includes("2030") ||
        q.includes("2040")
    ) {

        answer.textContent =
            "No verified record found for this query.";

        source.innerHTML =
            "<strong>Status:</strong> No verified source found.<br>" +
            "SETU will not guess or generate unsupported information.";

        return;
    }


    // ===========================
    // PRODUCTION — 2024
    // ===========================

    if (
        q.includes("production") &&
        q.includes("2024")
    ) {

        answer.textContent =
            "45.2 MT";

        source.innerHTML =
            "<strong>Source:</strong> Annual Production Report 2024<br>" +
            "<strong>Chapter:</strong> Chapter 3 – Production<br>" +
            "<strong>Page:</strong> 18";

        return;
    }


    // ===========================
    // GEOLOGICAL QUESTION
    // ===========================

    if (
        q.includes("geological") ||
        q.includes("geology")
    ) {

        answer.textContent =
            "Geological information is available in the geological reports.";

        source.innerHTML =
            "<strong>Source:</strong> Geological Report 2024<br>" +
            "<strong>Chapter:</strong> Chapter 2 – Geological Information<br>" +
            "<strong>Page:</strong> 12";

        return;
    }
// ===========================
// MONTHLY PRODUCTION
// ===========================

if (
    q.includes("monthly production") ||
    q.includes("monthly output")
) {

    answer.textContent =
        "The monthly production recorded for 2024 was 3.76 MT.";

    source.innerHTML =
        "<strong>Source:</strong> Monthly Production Summary 2024<br>" +
        "<strong>Chapter:</strong> Chapter 3 – Monthly Production<br>" +
        "<strong>Page:</strong> 18";

    return;
}


// ===========================
// COAL QUALITY
// ===========================

if (
    q.includes("coal quality") ||
    q.includes("ash content")
) {

    answer.textContent =
        "The reported average ash content was 18.4%.";

    source.innerHTML =
        "<strong>Source:</strong> Coal Quality Analysis 2024<br>" +
        "<strong>Chapter:</strong> Chapter 4 – Coal Quality<br>" +
        "<strong>Page:</strong> 27";

    return;
}


// ===========================
// EXPLORATION
// ===========================

if (
    q.includes("exploration") ||
    q.includes("exploration progress")
) {

    answer.textContent =
        "Exploration activities covered 12 identified blocks during 2024.";

    source.innerHTML =
        "<strong>Source:</strong> Exploration Progress Report 2024<br>" +
        "<strong>Chapter:</strong> Chapter 5 – Exploration<br>" +
        "<strong>Page:</strong> 31";

    return;
}


// ===========================
// MINING OPERATIONS
// ===========================

if (
    q.includes("mining operations") ||
    q.includes("mining results")
) {

    if (loggedInRole === "subsidiary") {

        answer.textContent =
            "Access restricted. This information is available only to Official Officers.";

        source.innerHTML =
            "<strong>Status:</strong> Restricted Document<br>" +
            "You do not have permission to access Mining Operations Report 2024.";

        return;
    }

    answer.textContent =
        "Mining operations achieved a reported productivity of 5.8 tonnes per employee shift.";

    source.innerHTML =
        "<strong>Source:</strong> Mining Operations Report 2024<br>" +
        "<strong>Chapter:</strong> Chapter 5 – Mining Operations<br>" +
        "<strong>Page:</strong> 36";

    return;
}


// ===========================
// SAFETY
// ===========================

if (
    q.includes("safety") ||
    q.includes("safety incidents")
) {

    if (loggedInRole === "subsidiary") {

        answer.textContent =
            "Access restricted. Safety information is available only to Official Officers.";

        source.innerHTML =
            "<strong>Status:</strong> Restricted Document<br>" +
            "You do not have permission to access Safety Report 2024.";

        return;
    }

    answer.textContent =
        "The Safety Report recorded 4 reportable incidents during 2024.";

    source.innerHTML =
        "<strong>Source:</strong> Safety Report 2024<br>" +
        "<strong>Chapter:</strong> Chapter 6 – Safety<br>" +
        "<strong>Page:</strong> 42";

    return;
}


// ===========================
// ENVIRONMENT
// ===========================

if (
    q.includes("environment") ||
    q.includes("environmental compliance")
) {

    if (loggedInRole === "subsidiary") {

        answer.textContent =
            "Access restricted. Environmental compliance information is available only to Official Officers.";

        source.innerHTML =
            "<strong>Status:</strong> Restricted Document<br>" +
            "You do not have permission to access Environmental Compliance Report 2024.";

        return;
    }

    answer.textContent =
        "The Environmental Compliance Report recorded an overall compliance score of 94%.";

    source.innerHTML =
        "<strong>Source:</strong> Environmental Compliance Report 2024<br>" +
        "<strong>Chapter:</strong> Chapter 7 – Environment<br>" +
        "<strong>Page:</strong> 48";

    return;
}


// ===========================
// MINE CLOSURE
// ===========================

if (
    q.includes("mine closure") ||
    q.includes("reclamation")
) {

    if (loggedInRole === "subsidiary") {

        answer.textContent =
            "Access restricted. Mine closure information is available only to Official Officers.";

        source.innerHTML =
            "<strong>Status:</strong> Restricted Document<br>" +
            "You do not have permission to access Mine Closure & Reclamation Report 2024.";

        return;
    }

    answer.textContent =
        "The mine closure programme reported 68% completion of planned reclamation activities.";

    source.innerHTML =
        "<strong>Source:</strong> Mine Closure & Reclamation Report 2024<br>" +
        "<strong>Chapter:</strong> Chapter 8 – Mine Closure<br>" +
        "<strong>Page:</strong> 55";

    return;
}


// ===========================
// EQUIPMENT
// ===========================

if (
    q.includes("equipment") ||
    q.includes("equipment availability") ||
    q.includes("productivity")
) {

    if (loggedInRole === "subsidiary") {

        answer.textContent =
            "Access restricted. Equipment and productivity information is available only to Official Officers.";

        source.innerHTML =
            "<strong>Status:</strong> Restricted Document<br>" +
            "You do not have permission to access Equipment & Productivity Report 2024.";

        return;
    }

    answer.textContent =
        "The reported average equipment availability was 87% during 2024.";

    source.innerHTML =
        "<strong>Source:</strong> Equipment & Productivity Report 2024<br>" +
        "<strong>Chapter:</strong> Chapter 9 – Equipment<br>" +
        "<strong>Page:</strong> 61";

    return;
}

    // ===========================
    // DEFAULT — NO VERIFIED RECORD
    // ===========================

    answer.textContent =
        "No verified record found for this query.";

    source.innerHTML =
        "<strong>Status:</strong> No verified source found.<br>" +
        "SETU will not guess or generate unsupported information.";

}





// ===============================
// REPORT GENERATION
// ===============================

let selectedReport = "Production";

function selectReport(type) {

    // ===============================
    // CHECK REPORT ACCESS
    // ===============================

    if (
        type === "Safety" &&
        loggedInRole === "subsidiary"
    ) {

        alert(
            "Access Restricted\n\n" +
            "Safety Reports are available only to Official Officers."
        );

        return;

    }


    // ===============================
    // SELECT REPORT
    // ===============================

    selectedReport = type;


    const selectedText =
        document.getElementById(
            "selectedReportText"
        );


    if (selectedText) {

        selectedText.textContent =
            "Selected: " +
            type +
            " Report";

    }

}

function generateReport() {

    const preview =
        document.getElementById(
            "reportPreview"
        );

    const exportButtons =
        document.getElementById(
            "exportButtons"
        );


    let source =
        "Annual Production Report 2024";

    let chapter =
        "Chapter 2 – Production";

    let page =
        "Page 22";

    let description =
        "Verified production information retrieved from authorized documents.";


    // ===========================
    // PRODUCTION REPORT
    // ===========================

    if (selectedReport === "Production") {

        source =
            "Annual Production Report 2024";

        chapter =
            "Chapter 2 – Production";

        page =
            "Page 22";

        description =
            "Verified production information retrieved from authorized documents.";

    }


    // ===========================
    // GEOLOGY REPORT
    // ===========================

    if (selectedReport === "Geology") {

        source =
            "Geological Report 2024";

        chapter =
            "Chapter 2 – Geological Information";

        page =
            "Page 15";

        description =
            "Verified geological information retrieved from authorized documents.";

    }


    // ===========================
    // SAFETY REPORT
    // ===========================

    if (selectedReport === "Safety") {

        source =
            "Safety Report 2024";

        chapter =
            "Chapter 6 – Safety";

        page =
            "Page 42";

        description =
            "Verified safety information retrieved from authorized documents.";

    }


    // ===========================
    // CUSTOM INQUIRY
    // ===========================

    if (selectedReport === "Custom") {

        source =
            "Verified documents selected by the user";

        chapter =
            "Relevant verified sections";

        page =
            "Source pages";

        description =
            "Custom report generated using verified information selected according to the user's inquiry.";

    }


    // ===========================
    // DISPLAY REPORT
    // ===========================

    // Replay the preview's entrance animation
    // each time a new report is generated
    preview.classList.remove("report-refresh");
    void preview.offsetWidth;
    preview.classList.add("report-refresh");

    preview.innerHTML = `

        <small>
            SETU GENERATED REPORT
        </small>

        <h3>
            ${selectedReport} Report
        </h3>

        <hr>

        <p>
            ${description}
        </p>


        <div class="report-evidence">

            <strong>
                Source Evidence
            </strong>

            <p>
                <strong>Document:</strong>
                ${source}
            </p>

            <p>
                <strong>Chapter:</strong>
                ${chapter}
            </p>

            <p>
                <strong>Page:</strong>
                ${page}
            </p>

        </div>


        <div class="validation-status">

            ✓ Information verified<br>
            ✓ Source traceable<br>
            ✓ No unsupported data used

        </div>


        <div class="accuracy">

            Accuracy / Trust Score

            <strong>
                97%
            </strong>

        </div>

    `;


    // ===========================
    // SHOW EXPORT BUTTONS
    // ===========================

    if (exportButtons) {

        exportButtons.style.display =
            "flex";

    }

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


    if (loggedInRole === "official") {

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
        // ===============================
    // DOCUMENT ACCESS CONTROL
    // ===============================

    const restrictedDocuments =
        document.querySelectorAll(
            ".restricted-document"
        );


    restrictedDocuments.forEach(
        function(row) {

            if (loggedInRole === "official") {

                row.style.display = "";

            }

            else {

                row.style.display = "none";

            }

        }
    );
        // ===============================
    // REPORT ACCESS CONTROL
    // ===============================

    const safetyReport =
        document.getElementById(
            "safetyReportOption"
        );


    if (safetyReport) {

        if (loggedInRole === "official") {

            safetyReport.style.display =
                "block";

        }

        else {

            safetyReport.style.display =
                "block";

            safetyReport.textContent =
                "⚠ Safety Report 🔒 Restricted";
            
        }

    }
}
// ===============================
// DOCUMENT UPLOAD TEST
// ===============================
// ===============================
// DOCUMENT PROCESSING
// ===============================

function uploadDocument() {

    const input =
        document.getElementById("documentInput");

    const file = input.files[0];

    if (!file) {
        return;
    }


    const status =
        document.getElementById(
            "uploadStatus"
        );

    const title =
        document.getElementById(
            "processingTitle"
        );

    const message =
        document.getElementById(
            "processingMessage"
        );


    // Show processing panel

    status.style.display = "flex";

    title.textContent =
        "Analyzing document...";

    message.textContent =
        "SETU is extracting document content and metadata.";


    // Stage 2

    setTimeout(function() {

        title.textContent =
            "Extracting information...";

        message.textContent =
            "Reading tables, text and document structure.";

    }, 1200);


    // Stage 3

    setTimeout(function() {

        title.textContent =
            "Checking duplicate content...";

        message.textContent =
            "Comparing extracted content with existing documents.";

    }, 2400);


    // Stage 4

    setTimeout(function() {

        processUploadedDocument(file);

    }, 3600);
    
}
// ===============================
// PROCESS UPLOADED DOCUMENT
// ===============================

function processUploadedDocument(file) {

    const title =
        document.getElementById("processingTitle");

    const message =
        document.getElementById("processingMessage");

    const row =
        document.getElementById("uploadedDocumentRow");

    const name =
        document.getElementById("uploadedDocumentName");

    const type =
        document.getElementById("uploadedDocumentType");

    const status =
        document.getElementById("uploadedDocumentStatus");


    // Get file information

    name.textContent = file.name;

    type.textContent =
        file.name
            .split(".")
            .pop()
            .toUpperCase();


    // Show uploaded document

    row.style.display = "table-row";


    // Prototype duplicate simulation
    // If filename contains "duplicate",
    // SETU marks it as a duplicate.

    const isDuplicate =
        file.name
            .toLowerCase()
            .includes("duplicate");


    if (isDuplicate) {

        title.textContent =
            "⚠ Duplicate content detected";

        message.textContent =
            "Similar content was found in an existing document. SETU has flagged this document for review.";

        status.textContent =
            "⚠ Duplicate";

        status.className =
            "review";

    }

    else {

        title.textContent =
            "✓ Document verified";

        message.textContent =
            "No duplicate content detected. Document is ready for indexing.";

        status.textContent =
            "✓ Verified";

        status.className =
            "verified";

    }

}
// ===============================
// REPORT EXPORT
// ===============================

function exportReport(format) {

    alert(
        "SETU Report Export\n\n" +
        selectedReport +
        " Report is ready to export as " +
        format +
        "."
    );

}
// ===============================
// ROLE-BASED DOCUMENT VISIBILITY
// ===============================

function updateDocumentAccess() {

    const documents =
        document.querySelectorAll(".document-row");

    documents.forEach(function (doc) {

        if (loggedInRole === "subsidiary") {

            if (doc.classList.contains("restricted-document")) {
                doc.style.display = "none";
            } else {
                doc.style.display = "table-row";
            }

        } else {

            doc.style.display = "table-row";
        }

    });
}
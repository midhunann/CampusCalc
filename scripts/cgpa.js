const gradePoints = {
    'A+': 10,
    'A': 9,
    'B+': 8,
    'B': 7,
    'C+': 6,
    'C': 5,
    'D': 4,
    'E': 3,
    'F': 0
};

function removeSubject(element) {
    const subjectEntry = element.closest('.subject-entry');
    if (document.querySelectorAll('.subject-entry').length > 1) {
        subjectEntry.remove();
    } else {
        alert("You cannot remove the only subject entry.");
    }
}

function addSubject() {
    const subjectEntryTemplate = document.getElementById('subject-entry-template');
    const newEntry = subjectEntryTemplate.cloneNode(true);

    newEntry.classList.remove('hidden');
    newEntry.classList.remove('subject-entry-template'); 

    const inputs = newEntry.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.value = ''; 
    });

    document.getElementById('subjectEntriesContainer').appendChild(newEntry);
}



function calculateCGPA() {
    const form = document.getElementById('cgpaForm');
    const formData = new FormData(form);

    let totalCredits = 0;
    let totalPoints = 0;

    const subjects = formData.getAll('subject[]');
    const creditsArray = formData.getAll('credits[]');
    const gradesArray = formData.getAll('grade[]');

    for (let i = 0; i < subjects.length; i++) {
        const credits = parseFloat(creditsArray[i]);
        const grade = gradesArray[i].toUpperCase();

        if (!isNaN(credits) && gradePoints.hasOwnProperty(grade)) {
            totalCredits += credits;
            totalPoints += credits * gradePoints[grade];
        }
    }

    const cgpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
    document.getElementById('cgpaOutput').innerText = cgpa;
}

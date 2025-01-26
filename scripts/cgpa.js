const gradePoints = {
    'O': 10.0,
    'A+': 9.5,
    'A': 9.0,
    'B+': 8.0,
    'B': 7.0,
    'C': 6.0,
    'P': 5.0,
    'F': 0.0
};

function animateNumber(element, start, end, duration = 1000) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            clearInterval(timer);
            current = end;
        }
        element.textContent = current.toFixed(2);
        updateCGPAMeter(current);
    }, 16);
}

function updateCGPAMeter(cgpa) {
    const pointer = document.getElementById('cgpa-pointer');
    const percentage = (cgpa / 10) * 100;
    const rotation = (percentage * 1.8) - 90; // Convert to degrees (-90 to 90)
    pointer.style.transform = `rotate(${rotation}deg)`;

    // Update color based on CGPA
    let color;
    if (cgpa >= 9.0) color = '#00c853';
    else if (cgpa >= 8.0) color = '#2997ff';
    else if (cgpa >= 7.0) color = '#ffd600';
    else if (cgpa >= 6.0) color = '#ff9100';
    else color = '#ff3d00';
    
    pointer.style.backgroundColor = color;
}

function addSubject() {
    const container = document.getElementById('subjectEntriesContainer');
    const entries = container.getElementsByClassName('subject-entry');
    const newEntry = entries[0].cloneNode(true);
    
    // Clear input values
    const inputs = newEntry.querySelectorAll('input, select');
    inputs.forEach(input => input.value = '');
    
    // Add remove button if it's not the first entry
    const removeBtnContainer = newEntry.querySelector('.remove-btn-container');
    removeBtnContainer.innerHTML = `
        <button type="button" class="remove-btn" onclick="removeSubject(this)">
            ×
        </button>
    `;
    
    // Add entry with animation
    newEntry.style.opacity = '0';
    newEntry.style.transform = 'translateY(20px)';
    container.appendChild(newEntry);
    
    // Trigger animation
    setTimeout(() => {
        newEntry.style.opacity = '1';
        newEntry.style.transform = 'translateY(0)';
    }, 10);
}

function removeSubject(button) {
    const entry = button.closest('.subject-entry');
    const container = document.getElementById('subjectEntriesContainer');
    
    if (container.children.length > 1) {
        entry.style.opacity = '0';
        entry.style.transform = 'translateY(20px)';
        setTimeout(() => entry.remove(), 300);
    } else {
        showToast('You must have at least one subject');
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }, 100);
}

function calculateCGPA() {
    const form = document.getElementById('cgpaForm');
    const formData = new FormData(form);
    
    let totalCredits = 0;
    let totalPoints = 0;
    let isValid = true;
    let errorMessage = '';

    const subjects = formData.getAll('subject[]');
    const credits = formData.getAll('credits[]');
    const grades = formData.getAll('grade[]');

    for (let i = 0; i < subjects.length; i++) {
        if (!subjects[i] || !credits[i] || !grades[i]) {
            isValid = false;
            errorMessage = 'Please fill in all fields';
            break;
        }

        const credit = parseFloat(credits[i]);
        if (isNaN(credit) || credit < 1 || credit > 5) {
            isValid = false;
            errorMessage = 'Credits must be between 1 and 5';
            break;
        }

        totalCredits += credit;
        totalPoints += credit * gradePoints[grades[i]];
    }

    const resultElement = document.getElementById('cgpaOutput');
    
    if (!isValid) {
        showToast(errorMessage);
        return;
    }

    const cgpa = totalPoints / totalCredits;
    
    // Animate the result
    resultElement.style.opacity = '0';
    resultElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultElement.innerHTML = `
            <div class="cgpa-value">${cgpa.toFixed(2)}</div>
            <div class="cgpa-label">CGPA</div>
            <div class="credits-info">Total Credits: ${totalCredits}</div>
        `;
        
        resultElement.style.opacity = '1';
        resultElement.style.transform = 'translateY(0)';
        
        // Animate CGPA value and meter
        animateNumber(resultElement.querySelector('.cgpa-value'), 0, cgpa);
    }, 100);
}
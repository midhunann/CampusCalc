document.addEventListener('DOMContentLoaded', function() {
    const attendanceForm = document.getElementById('attendanceForm');
    const progressBar = document.getElementById('attendance-progress');

    function updateProgressBar(percentage) {
        const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
        progressBar.style.width = `${clampedPercentage}%`;
        
        // Update color based on attendance percentage
        if (percentage >= 75) {
            progressBar.style.backgroundColor = '#00c853'; // Green for good attendance
        } else if (percentage >= 65) {
            progressBar.style.backgroundColor = '#ffd600'; // Yellow for warning
        } else {
            progressBar.style.backgroundColor = '#ff3d00'; // Red for critical
        }
    }

    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                clearInterval(timer);
                current = end;
            }
            updateProgressBar(current);
        }, 16);
    }

    if (attendanceForm) {
        attendanceForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let attended = parseInt(document.getElementById('classesAttended').value, 10);
            let total = parseInt(document.getElementById('totalClasses').value, 10);
            let result = document.getElementById('result');

            if (total === 0) {
                result.textContent = "Total number of classes cannot be zero.";
                result.className = 'result-content error';
                updateProgressBar(0);
                return;
            }

            let percentage = (attended / total) * 100;
            animateValue(progressBar, 0, percentage, 1000); // Animate progress bar

            if (percentage > 75) {
                let missable = Math.floor(((4 * attended) / 3 - total) - 1);
                if (missable >= 1) {
                    result.innerHTML = `
                        <div class="status good">Good Standing</div>
                        <div class="detail">You can miss ${missable} more class${missable > 1 ? 'es' : ''}</div>
                        <div class="percentage">${percentage.toFixed(1)}% Attendance</div>
                    `;
                } else {
                    result.innerHTML = `
                        <div class="status warning">Caution</div>
                        <div class="detail">You're at the attendance threshold</div>
                        <div class="percentage">${percentage.toFixed(1)}% Attendance</div>
                    `;
                }
            } else {
                let required = Math.ceil((3 * total - 4 * attended) + 1);
                result.innerHTML = `
                    <div class="status critical">Action Required</div>
                    <div class="detail">You must attend ${required} more class${required > 1 ? 'es' : ''}</div>
                    <div class="percentage">${percentage.toFixed(1)}% Attendance</div>
                `;
            }

            // Animate the result display
            result.style.opacity = 0;
            result.style.transform = 'translateY(20px)';
            setTimeout(() => {
                result.style.opacity = 1;
                result.style.transform = 'translateY(0)';
            }, 100);
        });
    }
});
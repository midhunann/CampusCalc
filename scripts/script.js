document.addEventListener('DOMContentLoaded', function() {
    const attendanceForm = document.getElementById('attendanceForm');
    if (attendanceForm) {
        attendanceForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let A = parseInt(document.getElementById('classesAttended').value, 10);
            let B = parseInt(document.getElementById('totalClasses').value, 10);
            let result = document.getElementById('result');

            if (B === 0) {
                result.textContent = "Total number of classes cannot be zero.";
                result.style.color = "red";
                return;
            }

            let per = (A / B) * 100;

            if (per > 75) {
                let x = ((4 * A) / 3 - B) - 1;
                if (x >= 1) {
                    result.textContent = `You can miss ${Math.floor(x)} more class${Math.floor(x) > 1 ? 'es' : ''}.`;
                } else {
                    result.textContent = "You are already below 75% attendance.";
                }
            } else {
                let x = (3 * B - 4 * A) + 1;
                if (x >= 1) {
                    result.textContent = `You cannot miss any class, you must attend ${Math.floor(x)} more class${Math.floor(x) > 1 ? 'es' : ''}.`;
                } else {
                    result.textContent = "You are already above 75% attendance.";
                }
            }
            result.style.color = per > 75 ? "green" : "orange";
        });
    }
});

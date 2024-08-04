document.addEventListener('DOMContentLoaded', function() {
    const attendanceForm = document.getElementById('attendanceForm');
    if (attendanceForm) {
        attendanceForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let A = parseInt(document.getElementById('classesAttended').value);
            let B = parseInt(document.getElementById('totalClasses').value);
            let result = document.getElementById('result');

            if (B === 0) {
                result.textContent = "Total classes attended (B) cannot be zero.";
                return;
            }

            let per = (A / B) * 100;

            if (per > 75) {
                let x = ((4 * A) / 3 - B) - 1;
                if (x === 1) {
                    result.textContent = `You can miss ${Math.floor(x)} more class.`;
                } else if (x > 1) {
                    result.textContent = `You can miss ${Math.floor(x)} more classes.`;
                } else {
                    result.textContent = "You are already below 75% attendance.";
                }
            } else {
                let x = (3 * B - 4 * A) + 1;
                if (x === 1) {
                    result.textContent = `You cannot miss any class, you must attend ${Math.floor(x)} more class.`;
                } else if (x > 1) {
                    result.textContent = `You cannot miss any class, you must attend ${Math.floor(x)} more classes.`;
                } else {
                    result.textContent = "You are already above 75% attendance.";
                }
            }
        });
    }
});

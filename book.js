// Event listener for form submission
document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const studentName = document.getElementById('student-name').value;
    const teacherName = document.getElementById('teacher-name').value;
    const appointmentDate = document.getElementById('appointment-date').value;
    const appointmentTime = document.getElementById('appointment-time').value;

    // Create appointment object
    const appointment = {
        studentName,
        teacherName,
        appointmentDate,
        appointmentTime
    };

    // Save appointment to local storage
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Reset form
    document.getElementById('appointment-form').reset();
    alert('Appointment booked successfully!');
});

// Initialize Firebase app and auth
const firebaseConfig = {
    // Your Firebase config here
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to book appointment
document.getElementById('book-appointment-button').addEventListener('click', async () => {
    const email = document.getElementById('appointment-email').value;
    const date = document.getElementById('appointment-date').value;
    const time = document.getElementById('appointment-time').value;
    const teacherName = document.getElementById('teacher-name').value;
    const studentName = document.getElementById('student-name').value;

    try {
        // Add appointment to Firestore
        await db.collection('appointments').add({
            email: email,
            appointmentDate: date,
            appointmentTime: time,
            teacherName: teacherName,
            studentName: studentName,
            status: 'Pending' // Add status if needed
        });

        // Display success message
        document.getElementById('booking-message').innerText = 'Appointment booked successfully!';
    } catch (error) {
        console.error('Error booking appointment:', error);
        // Display error message
        document.getElementById('booking-message').innerText = `Error: ${error.message}`;
    }
});

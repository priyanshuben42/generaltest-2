let timeLeft = 60 * 60; // 60 minutes in seconds
const timerElement = document.getElementById("timer");
const quizContainer = document.getElementById("quizContainer");
const resultContainer = document.getElementById("resultContainer");
const resultText = document.getElementById("resultText");
const retryButton = document.getElementById("retryButton");
const studentForm = document.getElementById("studentForm");
const studentFormContainer = document.getElementById("studentFormContainer");
const studentDetails = document.getElementById("studentDetails");

// Handle Student Form Submission
studentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const studentName = document.getElementById("studentName").value;
  const studentEmail = document.getElementById("studentEmail").value;

  localStorage.setItem("studentName", studentName);
  localStorage.setItem("studentEmail", studentEmail);

  studentFormContainer.style.display = "none";
  quizContainer.style.display = "block";
  updateTimer();
});

// Timer Function
function updateTimer() {
  if (timeLeft <= 0 || quizContainer.style.display === "none") return; // Stop timer when quiz ends
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerElement.textContent = `Time Left: ${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;

  if (timeLeft > 0) {
    timeLeft--;
    setTimeout(updateTimer, 1000);
  } else {
    alert("Time's up! Submitting your quiz.");
    submitQuiz();
  }
}

// Submit Quiz Function
document.getElementById("submit").addEventListener("click", function () {
  console.log("Submit button clicked"); // Debugging line
  submitQuiz();
});

function submitQuiz() {
  let score = 0;
  let answers = {
    q1: "A",
    q2: "C",
    q3: "B",
    q4: "C",
    q5: "A",
    q6: "B",
    q7: "B",
    q8: "C",
    q9: "A",
    q10: "A",
    q11: "A",
    q12: "C",
    q13: "A",
    q14: "A",
    q15: "D",
    q16: "A",
    q17: "A",
    q18: "B",
    q19: "B",
    q20: "D",
    q21: "C",
    q22: "A",
    q23: "A",
    q24: "A",
    q25: "C",
    q26: "B",
    q27: "B",
    q28: "C",
    q29: "A",
    q30: "A",
    q31: "A",
    q32: "C",
    q33: "A",
    q34: "C",
    q35: "B",
    q36: "A",
    q37: "C",
    q38: "A",
    q39: "C",
    q40: "A",
    q41: "A",
    q42: "A",
    q43: "A",
    q44: "A",
    q45: "B",
    q46: "C",
    q47: "A",
    q48: "D",
    q49: "A",
    q50: "A",
  };
  let total = Object.keys(answers).length;

  for (let key in answers) {
    let selected = document.querySelector(`input[name="${key}"]:checked`);
    if (selected && selected.value === answers[key]) {
      score++;
    }
  }

  // Display result with student details
  const storedName = localStorage.getItem("studentName");
  const storedEmail = localStorage.getItem("studentEmail");
  studentDetails.innerHTML = `<strong>Name:</strong> ${storedName} <br> <strong>Email:</strong> ${storedEmail}`;

  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  resultText.textContent = `Your score: ${score}/${total}`;
}

retryButton.addEventListener("click", function () {
  location.reload(); // Reload the page to retry the quiz
});

// Add an event listener to change the background image
document.addEventListener("DOMContentLoaded", function () {
  const backgroundInput = document.createElement("input");
  backgroundInput.type = "file";
  backgroundInput.accept = "image/*";
  backgroundInput.id = "backgroundInput";

  const label = document.createElement("label");
  label.textContent = "Choose Background Image";
  label.setAttribute("for", "backgroundInput");
  label.style.display = "block";
  label.style.margin = "10px 0";
  label.style.cursor = "pointer";

  document.body.prepend(label);
  document.body.prepend(backgroundInput);

  backgroundInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.body.style.backgroundImage = `url('${e.target.result}')`;
      };
      reader.readAsDataURL(file);
    }
  });
});

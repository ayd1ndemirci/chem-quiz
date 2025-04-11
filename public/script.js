const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("next");

async function loadQuestion() {
  resultEl.textContent = "";
  nextBtn.style.display = "none";
  const res = await fetch("/generate-question");
  const data = await res.json();

  questionEl.innerHTML = data.question;
  answersEl.innerHTML = "";

  data.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerHTML = answer; 
    btn.onclick = () => {
      if (answer === data.correctAnswer) {
        resultEl.textContent = "✅ Doğru!";
      } else {
        resultEl.textContent = `❌ Yanlış! Doğru cevap: ${data.correctAnswer}`;
      }
      nextBtn.style.display = "inline-block";
    };
    answersEl.appendChild(btn);
  });
}

nextBtn.onclick = loadQuestion;

loadQuestion();

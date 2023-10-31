import React, { useState } from "react";

function QuestionForm({ handleQuestions }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "answers") {
      const updatedAnswers = [...formData.answers];
      updatedAnswers[parseInt(event.target.getAttribute("data-index"))] = value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleQuestions(formData);
  };

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        {formData.answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              name="answers"
              value={answer}
              onChange={handleChange}
              data-index={index}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {formData.answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;

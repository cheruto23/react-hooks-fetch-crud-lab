import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from your API and set the questions state
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.log(err));
  }, []);

  const handleQuestions = (question) => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions([...questions, data]);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteQuestions = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuestions(questions.filter((question) => question.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateCorrectAnswer = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then(() => {
        setQuestions((questions) =>
          questions.map((question) =>
            question.id === id ? { ...question, correctIndex } : question
          )
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm handleQuestions={handleQuestions} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={handleDeleteQuestions}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;

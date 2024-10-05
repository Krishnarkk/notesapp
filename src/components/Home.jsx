// import React, { useState, useEffect } from "react";
// import { firestore } from "../firebase"; // Correct import of firestore
// import {
//   collection,
//   getDocs,
//   orderBy,
//   query,
//   doc,
//   updateDoc,
//   deleteDoc,
//   Timestamp,
// } from "firebase/firestore"; // Import Firestore functions
// import { Accordion, Card, Button, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
// import "./Home.css"; // Import custom CSS for additional styles

// function Home() {
//   const [questions, setQuestions] = useState([]);
//   const [editQuestionId, setEditQuestionId] = useState(null);
//   const [editedQuestion, setEditedQuestion] = useState({
//     title: "",
//     chapter: "",
//     description: "",
//   });

//   // Fetch all questions from Firestore
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       const questionsQuery = query(
//         collection(firestore, "questions"),
//         orderBy("createdAt", "desc")
//       );
//       const questionsSnapshot = await getDocs(questionsQuery);

//       const questionsData = questionsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setQuestions(questionsData); // Set the questions state with fetched data
//     };

//     fetchQuestions();
//   }, []);

//   // Handle editing a question
//   const handleEditQuestion = (question) => {
//     setEditQuestionId(question.id);
//     setEditedQuestion({
//       title: question.title,
//       chapter: question.chapter,
//       description: question.description,
//     });
//   };

//   const handleUpdateQuestion = async () => {
//     const questionRef = doc(firestore, "questions", editQuestionId);
//     await updateDoc(questionRef, {
//       title: editedQuestion.title,
//       chapter: editedQuestion.chapter,
//       description: editedQuestion.description,
//       updatedAt: Timestamp.now(), // Update timestamp
//     });

//     // Reset the state
//     setEditQuestionId(null);
//     setEditedQuestion({ title: "", chapter: "", description: "" });

//     // Fetch updated questions
//     const questionsQuery = query(
//       collection(firestore, "questions"),
//       orderBy("createdAt", "desc")
//     );
//     const questionsSnapshot = await getDocs(questionsQuery);
//     const questionsData = questionsSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setQuestions(questionsData);
//   };

//   // Handle deleting a question
//   const handleDeleteQuestion = async (id) => {
//     const questionRef = doc(firestore, "questions", id);
//     await deleteDoc(questionRef);

//     // Fetch updated questions
//     const questionsQuery = query(
//       collection(firestore, "questions"),
//       orderBy("createdAt", "desc")
//     );
//     const questionsSnapshot = await getDocs(questionsQuery);
//     const questionsData = questionsSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setQuestions(questionsData);
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4 title-heading">Explore Questions</h2>
//       <Accordion>
//         {questions.map((question) => (
//           <Card key={question.id} className="mb-3 question-card">
//             <Accordion.Item eventKey={question.id}>
//               <Accordion.Header>{question.title}</Accordion.Header>
//               <Accordion.Body>
//                 {editQuestionId === question.id ? (
//                   <>
//                     <Form.Group controlId={`editQuestionTitle-${question.id}`}>
//                       <Form.Control
//                         type="text"
//                         value={editedQuestion.title}
//                         onChange={(e) =>
//                           setEditedQuestion({
//                             ...editedQuestion,
//                             title: e.target.value,
//                           })
//                         }
//                       />
//                     </Form.Group>
//                     <Form.Group controlId={`editChapterName-${question.id}`}>
//                       <Form.Control
//                         type="text"
//                         value={editedQuestion.chapter}
//                         onChange={(e) =>
//                           setEditedQuestion({
//                             ...editedQuestion,
//                             chapter: e.target.value,
//                           })
//                         }
//                       />
//                     </Form.Group>
//                     <Form.Group controlId={`editDescription-${question.id}`}>
//                       <Form.Control
//                         as="textarea"
//                         rows={3}
//                         value={editedQuestion.description}
//                         onChange={(e) =>
//                           setEditedQuestion({
//                             ...editedQuestion,
//                             description: e.target.value,
//                           })
//                         }
//                       />
//                     </Form.Group>
//                     <Button
//                       variant="success"
//                       onClick={handleUpdateQuestion}
//                       className="me-2"
//                     >
//                       Save
//                     </Button>
//                     <Button
//                       variant="secondary"
//                       onClick={() => setEditQuestionId(null)}
//                     >
//                       Cancel
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Card.Subtitle className="mb-2 text-muted">
//                       {question.chapter}
//                     </Card.Subtitle>
//                     <Card.Text className="question-description">
//                       {question.description}
//                     </Card.Text>
//                     <Button
//                       variant="primary"
//                       onClick={() => handleEditQuestion(question)}
//                       className="me-2"
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="danger"
//                       onClick={() => handleDeleteQuestion(question.id)}
//                     >
//                       Delete
//                     </Button>
//                   </>
//                 )}
//               </Accordion.Body>
//             </Accordion.Item>
//           </Card>
//         ))}
//       </Accordion>
//     </div>
//   );
// }

// export default Home;

// src/components/Home.jsx
import React, { useState, useEffect } from "react";
import { firestore } from "../firebase"; // Correct import of firestore
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore"; // Import Firestore functions
import { Accordion, Card, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import "./Home.css"; // Import custom CSS for additional styles

function Home() {
  const [questions, setQuestions] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [editQuestionId, setEditQuestionId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({
    title: "",
    chapter: "",
    description: "",
  });
  const [activeChapter, setActiveChapter] = useState(null); // State to track the active chapter

  // Fetch all questions from Firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      const questionsQuery = query(
        collection(firestore, "questions"),
        orderBy("createdAt", "desc")
      );
      const questionsSnapshot = await getDocs(questionsQuery);

      const questionsData = questionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setQuestions(questionsData); // Set the questions state with fetched data

      // Group questions by chapters
      const groupedChapters = questionsData.reduce((acc, question) => {
        if (!acc[question.chapter]) {
          acc[question.chapter] = [];
        }
        acc[question.chapter].push(question);
        return acc;
      }, {});

      setChapters(Object.entries(groupedChapters)); // Set grouped chapters
    };

    fetchQuestions();
  }, []);

  // Handle editing a question
  const handleEditQuestion = (question) => {
    setEditQuestionId(question.id);
    setEditedQuestion({
      title: question.title,
      chapter: question.chapter,
      description: question.description,
    });
  };

  const handleUpdateQuestion = async () => {
    const questionRef = doc(firestore, "questions", editQuestionId);
    await updateDoc(questionRef, {
      title: editedQuestion.title,
      chapter: editedQuestion.chapter,
      description: editedQuestion.description,
      updatedAt: Timestamp.now(), // Update timestamp
    });

    // Reset the state
    setEditQuestionId(null);
    setEditedQuestion({ title: "", chapter: "", description: "" });

    // Fetch updated questions
    const questionsQuery = query(
      collection(firestore, "questions"),
      orderBy("createdAt", "desc")
    );
    const questionsSnapshot = await getDocs(questionsQuery);
    const questionsData = questionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setQuestions(questionsData);
  };

  // Handle deleting a question
  const handleDeleteQuestion = async (id) => {
    const questionRef = doc(firestore, "questions", id);
    await deleteDoc(questionRef);

    // Fetch updated questions
    const questionsQuery = query(
      collection(firestore, "questions"),
      orderBy("createdAt", "desc")
    );
    const questionsSnapshot = await getDocs(questionsQuery);
    const questionsData = questionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setQuestions(questionsData);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 title-heading">
        Explore Questions by Chapter
      </h2>

      {/* Chapter List */}
      <Accordion className="mb-4">
        {chapters.map(([chapterName, chapterQuestions], index) => (
          <Card key={index} className="mb-3 chapter-card">
            <Accordion.Item eventKey={chapterName}>
              <Accordion.Header
                onClick={() =>
                  setActiveChapter(
                    activeChapter === chapterName ? null : chapterName
                  )
                }
              >
                {chapterName}
              </Accordion.Header>
              <Accordion.Body>
                {activeChapter === chapterName && (
                  <Accordion>
                    {chapterQuestions.map((question) => (
                      <Card key={question.id} className="mb-2 question-card">
                        <Accordion.Item eventKey={question.id}>
                          <Accordion.Header>{question.title}</Accordion.Header>
                          <Accordion.Body>
                            {editQuestionId === question.id ? (
                              <>
                                <Form.Group
                                  controlId={`editQuestionTitle-${question.id}`}
                                >
                                  <Form.Control
                                    type="text"
                                    value={editedQuestion.title}
                                    onChange={(e) =>
                                      setEditedQuestion({
                                        ...editedQuestion,
                                        title: e.target.value,
                                      })
                                    }
                                  />
                                </Form.Group>
                                <Form.Group
                                  controlId={`editChapterName-${question.id}`}
                                >
                                  <Form.Control
                                    type="text"
                                    value={editedQuestion.chapter}
                                    onChange={(e) =>
                                      setEditedQuestion({
                                        ...editedQuestion,
                                        chapter: e.target.value,
                                      })
                                    }
                                  />
                                </Form.Group>
                                <Form.Group
                                  controlId={`editDescription-${question.id}`}
                                >
                                  <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={editedQuestion.description}
                                    onChange={(e) =>
                                      setEditedQuestion({
                                        ...editedQuestion,
                                        description: e.target.value,
                                      })
                                    }
                                  />
                                </Form.Group>
                                <Button
                                  variant="success"
                                  onClick={handleUpdateQuestion}
                                  className="me-2"
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="secondary"
                                  onClick={() => setEditQuestionId(null)}
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <Card.Subtitle className="mb-2 text-muted">
                                  {question.chapter}
                                </Card.Subtitle>
                                <Card.Text className="question-description">
                                  {question.description}
                                </Card.Text>
                                <Button
                                  variant="primary"
                                  onClick={() => handleEditQuestion(question)}
                                  className="me-2"
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    handleDeleteQuestion(question.id)
                                  }
                                >
                                  Delete
                                </Button>
                              </>
                            )}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Card>
                    ))}
                  </Accordion>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Card>
        ))}
      </Accordion>
    </div>
  );
}

export default Home;

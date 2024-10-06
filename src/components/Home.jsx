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
import { Accordion, Card, Button, Form, Modal } from "react-bootstrap"; // Removed Toast, ToastContainer from react-bootstrap
import { ToastContainer, toast } from "react-toastify"; // Added react-toastify imports
import "react-toastify/dist/ReactToastify.css"; // Added react-toastify CSS
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
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete modal visibility
  const [questionToDelete, setQuestionToDelete] = useState(null); // State to track the question to be deleted

  // Fetch all questions from Firestore
  useEffect(() => {
    fetchQuestions();
  }, []);

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
    await fetchQuestions();

    // Show success toast
    toast.success("Question updated successfully!", {
      position: "top-center",
      autoClose: 3000, // Automatically close after 3 seconds
    });
  };

  // Handle showing delete modal
  const handleDeleteModal = (question) => {
    setQuestionToDelete(question); // Set the question to delete
    setShowDeleteModal(true); // Show the confirmation modal
  };

  // Confirm deletion of the question
  const confirmDeleteQuestion = async () => {
    if (questionToDelete) {
      const questionRef = doc(firestore, "questions", questionToDelete.id);
      await deleteDoc(questionRef);

      // Update the local state by removing the deleted question
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q.id !== questionToDelete.id)
      );

      // Regenerate the chapter list after deleting the question
      setChapters((prevChapters) => {
        const updatedChapters = prevChapters
          .map(([chapterName, chapterQuestions]) => {
            return [
              chapterName,
              chapterQuestions.filter((q) => q.id !== questionToDelete.id),
            ];
          })
          .filter(([_, chapterQuestions]) => chapterQuestions.length > 0); // Remove chapters with no questions
        return updatedChapters;
      });

      // Show success toast
      toast.success("Question deleted successfully!", {
        position: "top-center",
        autoClose: 3000, // Automatically close after 3 seconds
      });
    }

    setShowDeleteModal(false); // Hide the modal after deletion
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
                                  onClick={() => handleDeleteModal(question)}
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

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the question titled "
          {questionToDelete?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteQuestion}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
}

export default Home;

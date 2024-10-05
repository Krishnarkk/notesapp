import React, { useState } from "react";
import { firestore } from "../firebase";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore"; // Correct import of Firestore methods

function PostQuestion() {
  const [title, setTitle] = useState("");
  const [chapter, setChapter] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Function to handle question submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add a new document to the 'questions' collection
      await addDoc(collection(firestore, "questions"), {
        title,
        chapter,
        description,
        createdAt: Timestamp.now(), // Use Firestore's server timestamp for accurate time
      });
      navigate("/home"); // Navigate to home after successful submission
    } catch (error) {
      alert("Error posting question: " + error.message); // Show error if something goes wrong
    }
  };

  return (
    <div className="container mt-5">
      <h2>Post a Question</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formQuestionTitle">
          <Form.Label>Question Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formChapterName">
          <Form.Label>Chapter Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter chapter name"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-3 btn btn-md-4 w-100 " variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default PostQuestion;

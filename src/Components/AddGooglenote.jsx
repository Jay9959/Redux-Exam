import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";  
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addGoogleNote, GoogledeleteNote } from "../GoogleServices/Actions/Googlenote.actions";
import generateUniqueId from "generate-unique-id";

const AddGoogleNote = () => {
    const { notes } = useSelector((state) => state.GoogleReducer);
    const dispatch = useDispatch();

    const initialState = {
        id: "",
        title: "",
        description: "",
        date: "",
        priority: "",
    };

    const [noteInput, setNoteInput] = useState(initialState);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    const handelChanged = (e) => {
        const { name, value } = e.target;
        setNoteInput({
            ...noteInput,
            [name]: value,
        });
        setValidationErrors({
            ...validationErrors,
            [name]: "",
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!noteInput.title.trim()) errors.title = "Title is required.";
        if (!noteInput.description.trim()) errors.description = "Description is required.";
        if (!noteInput.date) errors.date = "Date is required.";
        if (!noteInput.priority) errors.priority = "Priority is required.";
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (isEditing) {
            dispatch({
                type: "EDIT_GOOGLE_NOTE",
                payload: noteInput,
            });
            setIsEditing(false);
        } else {
            const id = generateUniqueId({
                length: 2,
                useLetters: false,
            });
            dispatch(addGoogleNote({ ...noteInput, id }));
        }
        setNoteInput(initialState);
    };

    const handelEdit = (id) => {
        const GooglenoteToEdit = notes.find((note) => note.id === id);
        setNoteInput(GooglenoteToEdit);
        setIsEditing(true);
    };

    const handelDelete = (id) => {
        dispatch(GoogledeleteNote(id));
    };

    const filteredNotes = notes
        .filter((note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((note) =>
            priorityFilter ? note.priority === priorityFilter : true
        );

    return (
        <Container>
            <Row className="mt-3">
                <Col sm="6">
                    <input
                        type="text"
                        placeholder="Search title"
                        className="form-control"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Col>
                <Col sm="6">
                    <Form.Select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                        <option value="">Filter by Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </Form.Select>
                </Col>
            </Row>
            <Col>
                <Form onSubmit={handelSubmit} className="text-center mt-5">
                    <Form.Group as={Row} className="mb-3">
                        <Col sm="12">
                            <input
                                type="text"
                                placeholder="Enter By Title"
                                name="title"
                                value={noteInput.title}
                                onChange={handelChanged}
                            />
                            {validationErrors.title && (
                                <p className="text-danger">{validationErrors.title}</p>
                            )}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm="12">
                            <input
                                type="text"
                                placeholder="Enter By Description"
                                name="description"
                                value={noteInput.description}
                                onChange={handelChanged}
                            />
                            {validationErrors.description && (
                                <p className="text-danger">{validationErrors.description}</p>
                            )}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 date">
                        <Col sm="12">
                            <input
                                type="date"
                                placeholder="Date"
                                name="date"
                                value={noteInput.date}
                                onChange={handelChanged}
                            />
                            {validationErrors.date && (
                                <p className="text-danger">{validationErrors.date}</p>
                            )}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 priority">
                        <Col sm="12">
                            <Form.Select
                                name="priority"
                                value={noteInput.priority}
                                onChange={handelChanged}
                            >
                                <option>Priority..</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </Form.Select>
                            {validationErrors.priority && (
                                <p className="text-danger">{validationErrors.priority}</p>
                            )}
                        </Col>
                        <Col sm="12">
                            <button type="submit" className="plusicon">
                                {isEditing ? <FaEdit /> : <FaPlus />}
                            </button>
                        </Col>
                    </Form.Group>
                </Form>
                <Row>
                    <Container className="d-flex flex-wrap mt-2 addgoole">
                        {filteredNotes.length > 0 ? (
                            filteredNotes.map((note) => (
                                <Card className="text-center mt-5 me-2 " style={{width:"49%"}} key={note.id}>
                                    <Card.Body>
                                        <Card.Text className="fw-bolder my-2">
                                            Id: {note.id}
                                        </Card.Text>
                                        <Card.Text className="fw-bolder my-2">
                                            Title: {note.title}
                                        </Card.Text>
                                        <Card.Text className="fw-bolder my-2">
                                            Description: {note.description}
                                        </Card.Text>
                                        <Card.Text className="fw-bolder my-2">
                                            Date: {note.date}
                                        </Card.Text>
                                        <Card.Text className="fw-bolder ">
                                            Priority: {note.priority}
                                        </Card.Text>
                                        <div className="mt-4 ms-3">
                                            <Button
                                                onClick={() => handelEdit(note.id)}
                                                className="me-4 edit bg-warning border-0"
                                            >
                                                <FaEdit className="editbtn" />
                                            </Button>
                                            <Button
                                                onClick={() => handelDelete(note.id)}
                                                className="delete bg-danger border-0"
                                            >
                                                <FaTrash className="deletebtn" />
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center">
                                Add a notes
                            </p>
                        )}
                    </Container>
                </Row>
            </Col>
        </Container>
    );
}

export default AddGoogleNote;

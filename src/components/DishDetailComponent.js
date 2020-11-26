import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Button, Label, ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Modal, Row, Col, ModalHeader } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleSubmit(values) {
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button type="submit" color="primary" onClick={this.toggle}>
                    <i className="fa fa-pencil"></i> Submit Comment
                </Button>
                <Modal isOpen={this.state.isOpen} className="commentForm" toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={{size: 12}}>
                                    <Control.select model=".rating" id="rating"
                                        name="rating"
                                        className="form-control"
                                        defaultValue={1}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 3 characters',
                                        maxLength: 'Must be less than 15 characters'
                                    }}
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

function RenderComments({comments, addComment, dishId}) {
    const coms = comments.map((comment) => {
        const date = new Date(comment.date)
        const commentDate =
            date.toLocaleString('en-us', {'month': 'short'}) + " " +
            date.toLocaleString('en-us', {'day': '2-digit'}) + ", " +
            date.toLocaleString('en-us', {'year': 'numeric'})
        return (
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p> -- {comment.author}, {commentDate}</p>
            </li>
        )
    })
    if (comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    { coms }
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )
    } else {
        return (<div></div>)
    }
}

const Dish = (props) => {
    const dish = props.dish
        if (dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/home">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to="/menu">Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {props.dish.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={dish}/>
                        <RenderComments comments={props.comments}
                         addComment={props.addComment}
                         dishId={props.dish.id}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            );
        }
}


export default Dish;

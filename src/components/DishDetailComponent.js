import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';


class Dish extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderComments(comments) {
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
                </div>
            )
        } else {
            return (<div></div>)
        }
    }

    renderDish(dish) {
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

    render() {
        const dish = this.props.dish
        if (dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        {this.renderDish(dish)}
                        {this.renderComments(dish.comments)}
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default Dish;

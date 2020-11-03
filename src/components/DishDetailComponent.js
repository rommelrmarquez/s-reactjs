import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';


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

function RenderComments({comments}) {
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

const Dish = (props) => {
    const dish = props.dish
        if (dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <RenderDish dish={dish}/>
                        <RenderComments comments={dish.comments}/>
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

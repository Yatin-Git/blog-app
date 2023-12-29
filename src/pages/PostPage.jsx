import { Link, useParams } from "react-router-dom";
import Base from "../components/Base";
import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { loadPost } from "../services/post-service";
import { toast } from "react-toastify";

const PostPage = () => {
    const { postId } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        // load post of postId 
        loadPost(postId).then(data => {
            console.log(data);
            setPost(data)

        }).catch(error => {
            console.log(error)
            toast.error("Error in loading post")
        })

    }, [])

    const printDate = (numbers) => {

        return new Date(numbers).toLocaleDateString()
    }

  return (
    <Base>
    <Container className="mt-4">

    <Link to="/">Home</Link>
    <Row>

                    <Col md={{
                        size: 12
                    }}>

                       <Card className="mt-3">
                        {
                            (post) && (
                        <CardBody>
                            <CardText>
                            Posted By <b>{post.user.name}</b> on <b>{printDate(post.addedDate)} </b>
                            </CardText>
                            <CardText>
                                            <span className="text-muted">{post.category.categoryTitle}</span>
                                        </CardText>
                                        <CardText className="mt-3">
                                            <h1>{post.title}</h1>
                                        </CardText>    
                            
                        </CardBody>
                            )
}
                        </Card>     

                    </Col>
                </Row>

    </Container>
    </Base>
  );
};

export default PostPage;

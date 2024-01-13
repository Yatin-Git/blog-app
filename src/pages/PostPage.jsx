import { Link, useParams } from "react-router-dom";
import Base from "../components/Base";
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { createComment, loadPost } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { isLoggedIn } from "../auth";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({
    content: ''
})
  useEffect(() => {
    // load post of postId
    loadPost(postId)
      .then((data) => {
        //console.log(data);
        setPost(data);
      })
      .catch((error) => {
       
        toast.error("Error in loading post");
      });
  }, [postId]);

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleDateString();
  };

  const submitPost=()=>{

    if(!isLoggedIn()){
            toast.error("Need to login first !!")
            return
    }

    if(comment.content.trim()===''){
      toast.error("Blank comment not allowed")
        return
    }
    createComment(comment,post.postId)
    .then(data=>{
        
        toast.success("comment added successfully")
        setPost({
            ...post,
            comments:[...post.comments,data.data]
        })
        setComment({
            content:''
        })
    }).catch(error=>{
        console.log(error)
    })
}
  return (
    <Base>
      <Container className="mt-4">
        <Link to="/">Home</Link> / {post && <Link to=""> {post.title} </Link>}
        <Row>
          <Col
            md={{
              size: 12,
            }}
          >
            <Card className="mt-3 ps-2 border-0 shadow-sm">
              {post && (
                <CardBody>
                  <CardText>
                    Posted By <b>{post.user.name}</b> on{" "}
                    <b>{printDate(post.addedDate)} </b>
                  </CardText>
                  <CardText>
                    <span className="text-muted">
                      {post.category.categoryTitle}
                    </span>
                  </CardText>
                  <div
                    className="divder"
                    style={{
                      width: "50%",
                      height: "2px",
                      background: "#e2e2e2",
                    }}
                  ></div>

                  <CardText className="mt-3">
                    <h1>{post.title}</h1>
                  </CardText>
                  <div
                    className="image-container mt-3 shadow "
                    style={{ maxWidth: "50%" }}
                  >
                    <img
                      className="img-fluid"
                      src={BASE_URL + "/post/image/" + post.imageName}
                      alt="postimage"
                    />
                  </div>
                  <CardText
                    className="mt-5"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col
            md={{
              size: 9,
              offset: 1,
            }}
          >
            <h3>Comments ( {post ? post.comments.length : 0} )</h3>
            {post &&
              post.comments.map((c, index) => (
                <Card className="mt-4 border-0" key={index}>
                  <CardBody>
                    <CardText>{c.content}</CardText>
                  </CardBody>
                </Card>
              ))}
            <Card className="mt-4 border-0">
              <CardBody>
                <Input
                  type="textarea"
                  placeholder="Enter comment here"
                  value={comment.content}
                  onChange={(event) =>
                    setComment({ content: event.target.value })
                  }
                />

                <Button onClick={submitPost} className="mt-2" color="primary">
                  Submit
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;

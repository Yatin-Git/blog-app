import { Link, useParams } from "react-router-dom";
import Base from "../components/Base";
import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { loadPost } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // load post of postId
    loadPost(postId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading post");
      });
  }, []);

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleDateString();
  };

  return (
    <Base>
      <Container className="mt-4">
        <Link to="/">Home</Link> / {post && (<Link to="" >  {post.title} </Link>)}
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
                    <span>{post.title}</span>
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
      </Container>
    </Base>
  );
};

export default PostPage;

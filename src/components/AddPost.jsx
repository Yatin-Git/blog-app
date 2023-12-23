import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import {createPost as doCreatePost} from '../services/post-service'
import { getCurrentUserDetail } from "../auth";

const AddPost = () => {
  const [categories, setCategories] = useState([]);

  const editor = useRef(null);
  //const [content, setContent] = useState("");
  // const config = {
  //     placeholder:"Start Typing"
  // }
  //current user
  const [user, setUser] = useState(undefined)

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  useEffect(() => {
    setUser(getCurrentUserDetail())
    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fieldChanged = (event) => {
    // console.log(event)
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  const contentFieldChanaged = (data) => {
    setPost({ ...post, 'content': data });
  };
  //create post function
  const createPost = (event) => {

    event.preventDefault();

    // console.log(post)
    if (post.title.trim() === '') {
        toast.error("Post  Title is required !!")
        return;
    }

    if (post.content.trim() === '') {
        toast.error("Post Content is required !!")
        return
    }

    if (post.categoryId === '') {
        toast.error("Select one category !!")
        return;
    }


    //submit the form on server
    //we need user id also while submitting
    post['userId'] = user.id
    doCreatePost(post).then(data => {


        // uploadPostImage(image,data.postId).then(data=>{
        //     toast.success("Image Uploaded !!")
        // }).catch(error=>{
        //     toast.error("Error in uploading image")
        //     console.log(error)
        // })



        toast.success("Post Created !!")
        // console.log(post)
        setPost({
            title: '',
            content: '',
            categoryId: ''
        })
    }).catch((error) => {
        toast.error("Post not created due to some error !!")
        //console.log(error)
    })

}
  return (
    <div className="wrapper">
      <Card className="shadow-sm border-0 mt-2">
        <CardBody>
          {/* {JSON.stringify(post)} */}
          <h3> What's going in your mind ?</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title"> Post title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                className="rounded-0"
                name="title"
                onChange={fieldChanged}
              ></Input>
            </div>
            <div className="my-3">
              <Label for="content"> Post Content</Label>
              {/* <Input
                type="textarea"
                id="content"
                placeholder="Enter here"
                className="rounded-0"
                style={{height:'300px'}}
              ></Input> */}
              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={(newContent) => contentFieldChanaged(newContent)}
              />
            </div>
            <div className="my-3">
              <Label for="category"> Post Category</Label>
              <Input
                type="select"
                id="category"
                placeholder="Enter here"
                className="rounded-0"
                name="categoryId"
                onChange={fieldChanged}
                defaultValue={0}
              >
                <option disabled value={0} >--Select category--</option>
                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>

            <Container className="text-center">
              <Button type="submit" color="primary">Create Post</Button>
              <Button color="danger" className="ms-2">
                Reset Content
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;

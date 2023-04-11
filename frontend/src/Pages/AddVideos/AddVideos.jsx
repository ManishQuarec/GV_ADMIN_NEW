import React, { useEffect, useState, useRef } from 'react';
import { Card, CardBody, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";


function AddVideos() {

  const [resData, setResData] = useState([]);
  const Catego = useRef({});
  const [files, setFiles] = useState();
  const [Videofiles, setVideoFiles] = useState();
  const NewsTittle = useRef("");
  const News = useRef("");

  const values = async() => {
    let formData = new FormData();

    await formData.append("files", files);
    await formData.append("filed", Videofiles);
   

    await formData.append("Category", Catego.current.value);
    
    await formData.append("NewsSubTittle", News.current.value);
    await formData.append("NewsTittle", NewsTittle.current.value);
    console.log(Catego.current.value);
    console.log(NewsTittle.current.value);
    console.log(News.current.value);

    axios.post(process.env.REACT_APP_API_BASE_URL + "/AddVideoData",formData)

  }


  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/GetCategory")
      .then((response) => {
        setResData(response.data);
      });


  }, []);

  return (
    <>
      <Card
        style={{
          width: "69rem",
          height: "46rem",
          marginLeft: "5rem",
          marginTop: "3rem",
          marginBottom: "2rem",
        }}
      >
        <CardBody>
          
          <FormGroup>
            <Label
              for="exampleSelect"
              style={{ fontWeight: "500", marginLeft: "0.5%" }}
            >
              Select News Category
            </Label>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              bsSize="lg"
              style={{ width: "30%" }}
              innerRef={Catego}

            >
              {resData.map((item, index) => {
                return <option key={index} value={item.Category.EngCategory}>{item.Category.GujCategory} </option>;
              })}

              {/* <option>ભારત</option>
            <option>રાજકારણ</option>
            <option>રમત-જગત</option>
            <option>વ્યાપાર</option> */}
            </Input>
            <br />
            <Label
              for="exampleFile"
              style={{ fontWeight: "500", marginLeft: "0.5%" }}
            >
              Select Video
            </Label>
            <Input
              id="exampleFile"
              name="file"
              type="file"
              style={{ width: "30%" }}
              accept="video/mpeg, video/x-ms-wmv, video/avi, video/mp4, "
              onChange={(e) => {
                setFiles(e.target.files[0]);
              }}
            />

            <br />

            <Label
              for="exampleFile"
              style={{ fontWeight: "500", marginLeft: "0.5%" }}
            >
              Select Video Poster
            </Label>
            <Input
              id="exampleFile"
              name="file"
              type="file"
              style={{ width: "30%" }}
              accept="video/mp4"
              onChange={(e) => {
                setVideoFiles(e.target.files[0]);
              }}
            />

            <Label
              for="exampleEmail"
              style={{ fontWeight: "500", marginLeft: "0.5%" }}
            >
              Video Tittle
            </Label>

            <Input
              id="exampleEmail"
              name="text"
              // placeholder="with a placeholder"
              type="text"
              style={{ width: "60%" }}
              innerRef={NewsTittle}
            />
            <br />

            <Label
              for="exampleText"
              style={{ fontWeight: "500", marginLeft: "0.5%" }}
            >
              Video SubTittle
            </Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              style={{ width: "60%" }}
              innerRef={News}
            />
            <br />
            <Button
              color="primary"
              tag="input"
              type="submit"
              value="Submit"
              style={{ fontWeight: "500", marginLeft: "0.5%" }}
              onClick={values}
            />
          </FormGroup>
        </CardBody>
      </Card>
    </>
  )
}

export default AddVideos

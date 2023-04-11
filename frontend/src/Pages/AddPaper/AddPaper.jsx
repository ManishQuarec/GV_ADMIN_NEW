import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardBody,
  Table,
  CardTitle,
  CardText,
  Button,
  Col,
} from "reactstrap";

import AddNewsPaper from "./AddNewsPaper";
import DeleteNewsPaper from "./DeleteNewsPaper";
import axios from "axios";
import fileDownload from 'js-file-download'

function AddPaper() {
  const [newsData, setNewsData] = useState([]);
  const [addBreakingnewsModal, setBreakingnewsModal] = useState(false);
  const [deleteBreakingnewsModal, setDeleteBreakingnewsModal] = useState(false);

  const download = (e) => {
    console.log(e);
    const data={url: e}
    console.log(data);
    axios({
      url:process.env.REACT_APP_API_BASE_URL+"/downloads",
      // url:e,
      method:"POST",
      responseType:"blob",
      data
    
    }).then((res)=>{
      console.log(res);
      fileDownload(res.data, "download.pdf")
    })
   }
  console.log(newsData);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_BASE_URL + "/newsPaper").then((response) => {
      setNewsData(response.data.response);
    });

    return () => {};
  }, [addBreakingnewsModal, deleteBreakingnewsModal]);
  const handleShowDeleteModal = () => {
    setDeleteBreakingnewsModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteBreakingnewsModal(false);
  };

  const handleShowNewsModal = () => {
    setBreakingnewsModal(true);
  };

  const handleCloseNewsModal = () => {
    setBreakingnewsModal(false);
  };

  return (
    <>
      {" "}
      <Col lg={12}>
        <Card>
          <CardTitle
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span
              style={{
                padding: "20px 0px 10px 20px",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              News Paper
            </span>
            <Button
              type="submit"
              name="btn"
              onClick={handleShowNewsModal}
              style={{
                margin: "20px 0px 10px 20px",
                backgroundColor: "Green",
              }}
            >
              Add News Paper
            </Button>
            {AddNewsPaper(addBreakingnewsModal, handleCloseNewsModal)}
            <Button
              // color="info"
              type="submit"
              name="btn"
              color="danger"
              onClick={handleShowDeleteModal}
              style={{
                margin: "20px 20px 10px 20px",
                backgroundColor: "Red yellow",
              }}
            >
              Delete New's Paper
            </Button>
            {DeleteNewsPaper(deleteBreakingnewsModal, handleCloseDeleteModal)}
          </CardTitle>
          <CardBody>
            <Table hover>
              <thead>
                <tr className="text-center">
                  {/* <th>Sr No.</th> */}
                  <th>Date</th>
                  <th> News Paper</th>
                  
                </tr>
              </thead>
              <tbody className="text-center">
          
                {newsData.map((newsItem, index) => (
                <tr style={{ width: "60rem" }}>
                  <th scope="row">{newsItem.NewsPaperDate}</th>
                  <td>
                  <button onClick={(e)=>{download(newsItem.Path)}}>Download </button>
                  
                  </td>
                 
                 
                </tr>
                 ))}  
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default AddPaper;

import React, { useState, useEffect } from "react";
import {
  Modal,
  Alert,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Form,
  Input,
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function AddNewsPaper(addBreakingnewsModal, handleCloseNewsModal) {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [files, setFiles] = useState();



  const dataValue = () => {
    const errorPopup = async (value) => {
      // console.log(value);
      setAlertMessage(value);
      setAlert(true);
      await setTimeout(() => {
        setAlert(false);
      }, 3000);
    };
    console.log(files);
    if (!files) {
      let data = "Select News Paper";
      errorPopup(data);
    }

    if (!files.name.match(/\.(pdf)$/)) {
      let data = "Select News Paper in pdf format";
      errorPopup(data);
    } else {
      let formData = new FormData();
      formData.append("files", files);
      let formattedDate = `${startDate.getDate()}-${
        startDate.getMonth() + 1
      }-${startDate.getFullYear()}`;
      console.log(formattedDate);

      formData.append("Date", formattedDate);
      formData.append("year", `${startDate.getFullYear()}`);
      formData.append("month", `${startDate.getMonth() + 1}`);

      axios
        .post(
          process.env.REACT_APP_API_BASE_URL + "/AddingNewsPaper",
          formData,
          {
            headers: {
              "Content-Type": "application/pdf",
            },
          }
        )
        .then(async (response) => {
          if (response.data.message == "Successfully") {
            setSuccessMessage(response.data.message);
            setSuccess(true);
            await setTimeout(() => {
              setSuccess(false);
              setFiles("");
              handleCloseNewsModal();
            }, 2500);
          }
        })
        .catch(async (error) => {
          console.log(error);
          console.log(error.response.data.message);
          setFiles("");

          errorPopup(error.response.data.message || error.message);
        });
    }
  };

  return (
    <React.Fragment>
      <Modal isOpen={addBreakingnewsModal} centered={true}>
        <Alert
          color="success"
          style={{ width: "60%", marginLeft: "20%" }}
          isOpen={success}
        >
          {successMessage + " " + "Paper Submited"}
        </Alert>
        <Alert
          color="danger"
          style={{ width: "60%", marginLeft: "20%" }}
          isOpen={alert}
        >
          {alertMessage}
        </Alert>
        <ModalHeader>Add New's Paper</ModalHeader>

        <ModalBody>
          <div>
            <Form>
              <FormGroup>
                {/* <br /> */}

                <Label style={{ fontWeight: "500" }}>
                  Select New's Paper Date
                </Label>

                <DatePicker
                  selected={startDate}
                  onChange={(Date) => setStartDate(Date)}
                  // minDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                  shouldHighlightWeekends
                />
                <br />
                <br />

                <Label for="exampleFile" style={{ fontWeight: "500" }}>
                  Select New's Paper{" "}
                  <a style={{ color: "#dc3545" }}>( only PDF)</a>
                </Label>
                <Input
                  id="exampleFile"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    setFiles(e.target.files[0]);
                  }}
                />

                {/* <Label>Breaking News</Label>
                <Input
                  // name="text"
                  type="textarea"
                  bsSize="lg"
                  innerRef={bnews}
                  // value={bnews}
                  className="mb-3"
                  placeholder="News"
                  style={{ width: "50rem", height: "30rem" }}
                /> */}
              </FormGroup>
              <ModalFooter style={{ float: "left", border: "none" }}>
                <Button type="button" name="btn" onClick={dataValue}>
                  {/* //    onClick={dataValue} */}
                  Create
                </Button>

                {/* type="submit"  */}

                <Button
                  type="button"
                  name="btn"
                  color="danger"
                  onClick={handleCloseNewsModal}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
            {/* )} */}
            {/* </Formik> */}
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default AddNewsPaper;

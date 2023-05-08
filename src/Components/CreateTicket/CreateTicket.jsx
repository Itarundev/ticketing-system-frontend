import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./CreateTicket.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { Container } from 'react-bootstrap';

const TicketForm = () => {
  const [supportType, setSupportType] = useState('');
  const [supportRelatedTo, setSupportRelatedTo] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [facingIssueOn, setFacingIssueOn] = useState('');
  const [images, setImages] = useState([]);
  const [token, setToken] = useState('');
  const [support_types, setSupport_Types] = useState([]);
  const [supportSubType, setSupportSubType] = useState({});
  const [facingIssues, seFacingIssues] = useState([]);



  useEffect(() => {
    setToken(localStorage.getItem("token"))
    axios.get(`http://localhost:8004/api/subcategories`)
      .then((res) => {

        setSupportSubType(res.data)
      })
  }, [])
  useEffect(() => {
    axios.get(`http://localhost:8004/api/facing-issues`)
      .then((res) => {
        seFacingIssues(res.data.issues)
      })
    axios.get('http://localhost:8004/api/get-category')
      .then((res) => {
        setSupport_Types(res.data)
      })

  }, [])
  const handleSupportTypeChange = (e) => {
    setSupportType(e.target.value);
    setSupportRelatedTo('');
  };

  const handleIssueTypeChange = (e) => {
    setFacingIssueOn(e.target.value)
  };



  const formData = new FormData();
  formData.append('support_type', supportType);
  formData.append('support_relatedto', supportRelatedTo);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('facing_issue_on', facingIssueOn);
  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("http://localhost:8004/api/new-ticket", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            // Access response message
            const message = data.message;
            toast.success(message);
          });
        } else {
          return response.json().then((data) => {
            // Access error message
            const message = data.message;
            toast.error(message);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };


  const supportRelatedToOptions = supportSubType

  const supportRelatedToRadioOptions = supportType ? supportRelatedToOptions[supportType] : null;

  return (
    <div className='dashboard_grid' >
      <div>
        <Sidebar />
      </div>
      <div>
        <Navbar />
        <Container>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Support Type</label>
              <div className="radio-group">
                {support_types.map(type => (
                  <label key={type}>
                    <input
                      type="radio"
                      name="supportType"
                      value={type}
                      checked={supportType === type}
                      onChange={handleSupportTypeChange}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>


            {supportRelatedToRadioOptions && (
              <div className="radio-group">
                <label htmlFor="supportRelatedTo">Support Related To</label>
                {supportRelatedToRadioOptions.map((option, index) => (
                  <div key={index}>
                    <input type="radio" id={`supportRelatedTo-${index}`} name="supportRelatedTo" value={option} checked={supportRelatedTo === option} onChange={(e) => setSupportRelatedTo(e.target.value)} />
                    <label htmlFor={`supportRelatedTo-${index}`}>{option}</label>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div>
              <label>Facing Issue On</label>
              <div>
                {facingIssues.map(type => (
                  <label key={type}>
                    <input
                      type="radio"
                      name="facingIssueOn"
                      value={type}
                      checked={facingIssueOn === type}
                      onChange={handleIssueTypeChange}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="images">Images</label>
              <input type="file" multiple id="images" name="images" onChange={handleImageChange} />
            </div>

            <button type="submit">Submit</button>
            <ToastContainer />
          </form>
        </Container>
      </div>
    </div>

  );
};

export default TicketForm;
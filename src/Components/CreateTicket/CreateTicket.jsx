import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./CreateTicket.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TicketForm = () => {
  const [supportType, setSupportType] = useState('');
  const [supportRelatedTo, setSupportRelatedTo] = useState(''); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [facingIssueOn, setFacingIssueOn] = useState('');
  const [priority, setPriority] = useState('');
  const [images, setImages] = useState([]);
  const [support_types, setSupport_Types] = useState([]);
  const [supportSubType, setSupportSubType] = useState({});
  const [facingIssues, seFacingIssues] = useState([]);
  const [allProjects, setAllProjects] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const navigate = useNavigate();
  const[selectedProject,setSelectedProject]=useState("")
  const[selectedUser,setSelectedUser]=useState("")
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem("token")


  useEffect(() => {

    axios.get(`${process.env.REACT_APP_BASE_URL}/api/subcategories`)
      .then((res) => {

        setSupportSubType(res.data)
      })
  }, [])

  const getAllProjects = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-all-projects`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setAllProjects(res.data.projects)
      })
  }

  const getAllUsers = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-all-employees`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setAllUsers(res.data.companies)
      })
  }
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/facing-issues`)
      .then((res) => {
        seFacingIssues(res.data.issues)
      })
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-category`)
      .then((res) => {
        setSupport_Types(res.data)
      })
      if(user.is_admin)
      {
        getAllProjects();
        getAllUsers();
      }
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
  formData.append('support_related_to', supportRelatedTo);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('facing_issue_on', facingIssueOn);
  formData.append('priority', priority);
  formData.append('end_date', endDate);
  formData.append('assigned_to', selectedUser);
  const handleChange = (event) => {
    setSelectedProject(event.target.value)
  };

  const handleSelectUserChange = (event) => {
    setSelectedUser(event.target.value)
  };

  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }
  if (!user.is_admin) {
    formData.append('project_name', user.project)
  }
  else{
    formData.append('project_name', selectedProject)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

  fetch(`${process.env.REACT_APP_BASE_URL}/api/new-ticket`, {
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
          setTimeout(()=>{
            navigate("/")
                      },1000)
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
        <div className='title_txt'>
        <h1>Add New Ticket</h1>
          </div>
          <div className='frmedit white_card'>
          <form onSubmit={handleSubmit}>
        
        <div className='left_ct'>
        {user.is_admin && allProjects.length > 0 && (
              <div className='slct'>
                <label htmlFor="title">Project</label>
                <select onChange={handleChange} defaultValue="" required>
                  <option value="" disabled>Select a project</option>
                  {allProjects.map((project, index) => (
                    <option key={index} value={project}>{project}</option>
                  ))}
                </select>
              </div>
            )}

            
<div>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>


            <div className="form-group">
                      <label>Priority:</label>
                      <select className="" name="priority" value={priority} onChange={(e) => setPriority(e.target.value)} required>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>

            <div className='graybx fcngbx'>
              <label>Facing Issue On</label>
              <div className='facing_radio'>
                {facingIssues.map(type => (
                  <label key={type}>
                    <input
                      type="radio"
                      name="facingIssueOn"
                      value={type}
                      checked={facingIssueOn === type}
                      onChange={handleIssueTypeChange}
                      required
                    />
                   <span> {type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="images">Images</label>
              <input type="file" multiple id="images" name="images" onChange={handleImageChange} />
            </div>

            <button type="submit">Submit</button>
        </div>

        <div className='right_ct'>
        {user.is_admin && allUsers.length > 0 && (
              <div className='slct'>
                <label htmlFor="title">Developer</label>
                <select onChange={handleSelectUserChange} defaultValue="">
                  <option value="" disabled>Select a User</option>
                  {allUsers.map((companies, index) => (
                    <option key={index} value={companies.brand_name}>{companies.brand_name}</option>
                  ))}
                </select>
              </div>
            )}

         
        <div className='graybx fcngbx mtb10'>
              <label>Support Type</label>
              <div className="facing_radio">
                {support_types.map(type => (
                  <label key={type}>
                    <input
                      type="radio"
                      name="supportType"
                      value={type}
                      checked={supportType === type}
                      onChange={handleSupportTypeChange}
                      required
                    />
                   <span> {type}</span>
                  </label>
                ))}
              </div>
            </div>

         


            {supportRelatedToRadioOptions && (
              <div className='graybx fcngbx mt10'>
                <label htmlFor="supportRelatedTo">Support Related To</label>
                <div className='facing_radio1'>
                {supportRelatedToRadioOptions.map((option, index) => (                 
                  <div key={index} className='flex_ord'>
                    <input type="radio" id={`supportRelatedTo-${index}`} name="supportRelatedTo" value={option} checked={supportRelatedTo === option} onChange={(e) => setSupportRelatedTo(e.target.value)} required/>
                    <label htmlFor={`supportRelatedTo-${index}`}>{option}</label>
                  </div>
                ))}
              </div></div>
            )}


<div className='mt10'>
              <label htmlFor="endDate">End Date</label>
              <input id="endDate" name="endDate" type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>

        </div>


        
            <ToastContainer />
          </form>
          </div>
        </Container>
      </div>
    </div>

  );
};

export default TicketForm;
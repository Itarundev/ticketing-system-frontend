import React, { useEffect, useState } from 'react';
import "./Ticket.css"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// /update-ticket
const Ticket = () => {

  const encodedData = window.location.search.split('data=')[1];
  const decodedData = decodeURIComponent(encodedData);
  const ticket = JSON.parse(decodedData);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    support_type: ticket.support_type,
    support_related_to: ticket.support_related_to,
    facing_issue_on: ticket.facing_issue_on,
    priority:ticket.priority,
    end_date: ticket.end_date
  });

  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState('')
  const [allComments, setAllComments] = useState([])
  const [loading, setLoading] = useState(true);

  const formData = new FormData();
  formData.append('comment', comment);
  formData.append('ticket_id', ticket.id);
  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }

  const getAllComments = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-ticket-history/${ticket.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setAllComments(response.data.ticketHistory)
        setLoading(false);
      }
      )
      .catch((error) => console.log(error));

  }

  useEffect(() => {
    if (token && ticket.id) {
      getAllComments()
    }
  }, [token])
  const handleComment = async () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/create-ticket-history`, {
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

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    axios.patch(`${process.env.REACT_APP_BASE_URL}/api/update-ticket/${ticket.id}`, {
      title: formState.title,
      description: formState.description,
      status: formState.status,
      support_type: formState.support_type,
      support_related_to: formState.support_related_to,
      facing_issue_on: formState.facing_issue_on,
      priority:formState.priority
    },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if (response.statusText === 'OK') {

          // Access response message
          const message = response.data.message;
          toast.success(message);
          setTimeout(() => {
            navigate("/")
          }, 1000)
        } else {
          // Access error message
          const message = response.data.message;
          toast.error(message);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };


  const is_admin = user.is_admin;

  return (
    <div className='dashboard_grid'>
      <div>
        <Sidebar />
      </div>
      <div>
        <Navbar />
        <Container>
        <div className='title_txt'>
        <h1 className="ticket-title">{ticket.title}</h1>
          </div>
          <div className="ticket">
            <div className='left_div'>
             
              <form onSubmit={handleSubmit}>
                <div className='ticket_edit_up'>

                  <div className='ticket_edit_down'>
                    <div className="form-group">
                      <label>Status:</label>
                      <select className="" name="status" value={formState.status} onChange={handleChange} disabled={!is_admin}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Priority:</label>
                      <select className="" name="priority" value={formState.priority} onChange={handleChange} disabled={!is_admin}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Support Type:</label>
                      <input className="" type="text" name="support_type" value={formState.support_type} onChange={handleChange} disabled />
                    </div>
                    <div className="form-group">
                      <label>Support Related To:</label>
                      <input className="" type="text" name="support_related_to" value={formState.support_related_to} onChange={handleChange} disabled />
                    </div>
                    <div className="form-group">
                      <label>Facing Issue On:</label>
                      <input className="" type="text" name="facing_issue_on" value={formState.facing_issue_on} onChange={handleChange} disabled />

                    </div>
                  </div>


                  <div className="form-group">
                    <label>Description:</label>
                    <textarea className="" name="description" value={formState.description} onChange={handleChange} disabled={!is_admin} />
                  </div>

                  <div className='text_upt'>
                  {ticket.image && ticket.image.length > 0 && (
                    <div className="ticket-image" style={{ overflowX: ticket.image.length > 3 ? 'auto' : 'visible' }}>
                      {ticket.image.map((img, index) => (
                        <img src={`${process.env.REACT_APP_BASE_URL}/${img.url}`} key={index} alt={`Image ${index}`} />
                      ))}
                    </div>
                  )}

                  <div className='cretedat_update'>
                    <p className="ticket-created-at">Created At: {new Date(ticket.created_at).toLocaleString()}</p>
                    <p className="ticket-updated-at">Updated At: {new Date(ticket.updated_at).toLocaleString()}</p>
                    <p className="ticket-end-at">DeadLine: {ticket.end_date?new Date(ticket.end_date??null).toLocaleString():null}</p>
                  </div>


                  
                  <div className='updatebtnwrapper'>
                    {is_admin ? (
                      <button onClick={handleSubmit} className="updateButton">Update</button>
                    ) : (
                      <h3>You do not have permission to edit this ticket.</h3>
                    )}

                    <p className="ticket-created-by">Created By: {ticket.createdBy}</p>

                  </div>



                
                </div>



                </div>
                
              </form>


            </div>

            <div className='right_div'>
              <h2 className='comments'>Comments</h2>
              <div className='allcomments_div'>

                {loading ? (
                  <p>Loading...</p> // Render loading state when data is being fetched
                ) : (
                  allComments.length > 0 ? (
                    allComments.map((ticket) => (
                      <div key={ticket.id}>
                        <p>{ticket.comment}</p>
                        {ticket.image && ticket.image.length > 0 && (
                          <div className="ticket-image" style={{ overflowX: ticket.image.length > 3 ? 'auto' : 'visible' }}>
                            {ticket.image.map((img, index) => (
                              <img src={`${process.env.REACT_APP_BASE_URL}/${img.url}`} key={index} alt={`Image ${index}`} height={50} width={50} />
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No comments available.</p>
                  )
                )}
              </div>
              <div>

                <div className="form-group ">
                  <label>Comment:</label>
                  <textarea className="txtarea" name="commentinput" onChange={handleCommentChange} autoFocus />
                </div>
                <label htmlFor="images">Images</label>
                <input type="file" className='txtarea' multiple id="images" name="images" onChange={handleImageChange} />
              </div>
             
              <button className='updateButton mt10' onClick={() => { handleComment() }}>Submit</button>
            </div>

            <ToastContainer />
          </div>
        </Container>
      </div>

    </div>


  );
};

export default Ticket;

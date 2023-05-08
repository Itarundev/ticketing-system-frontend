import React, { useEffect, useState } from 'react';
import "./Ticket.css"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { Container } from 'react-bootstrap';

// /update-ticket
const Ticket = () => {

  const encodedData = window.location.search.split('data=')[1];
  const decodedData = decodeURIComponent(encodedData);
  const ticket = JSON.parse(decodedData);

  const [formState, setFormState] = useState({
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    support_type: ticket.support_type,
    support_relatedto: ticket.support_relatedto,
    facing_issue_on: ticket.facing_issue_on,
  });

  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
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
    axios.get(`http://localhost:8004/api/get-ticket-history/${ticket.id}`, {
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
    fetch("http://localhost:8004/api/create-ticket-history", {
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

  const handleSubmit = async () => {
    axios.patch(`http://localhost:8004/api/update-ticket/${ticket.id}`, {
      title: formState.title,
      description: formState.description,
      status: formState.status,
      support_type: formState.support_type,
      support_relatedto: formState.support_relatedto,
      facing_issue_on: formState.facing_issue_on
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


  useEffect(() => {
    setToken(localStorage.getItem("token"))
    setUser(JSON.parse(localStorage.getItem("user")))
  }, []);

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };


  const isAdmin = user.isAdmin;

  return (
    <div className='dashboard_grid'>
      <div>
        <Sidebar />
      </div>
      <div>
        <Navbar />
        <Container>
          <div className="ticket">
            <div className='left_div'>
              <h3 className="ticket-title">{ticket.title}</h3>
              <form onSubmit={handleSubmit}>
                <div className='ticket_edit_up'>
            
                <div className='ticket_edit_down'>
                <div className="form-group">
                  <label>Status:</label>
                  <select className="form-control" name="status" value={formState.status} onChange={handleChange} disabled={!isAdmin}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Support Type:</label>
                  <input className="form-control" type="text" name="support_type" value={formState.support_type} onChange={handleChange} disabled/>
                </div>
                <div className="form-group">
                  <label>Support Related To:</label>
                  <input className="form-control" type="text" name="support_relatedto" value={formState.support_relatedto} onChange={handleChange} disabled />
                </div>
                <div className="form-group">
                  <label>Facing Issue On:</label>
                  <input className="form-control" type="text" name="facing_issue_on" value={formState.facing_issue_on} onChange={handleChange} disabled/>
              
                </div>
                </div>
                
                
                <div className="form-group">
                  <label>Description:</label>
                  <textarea className="form-control" name="description" value={formState.description} onChange={handleChange} disabled={!isAdmin} />
                </div>
                </div>
                <div className='ticketDetails'>
              <div className='cretedat_update'>
              <p className="ticket-created-at">Created At: {new Date(ticket.created_at).toLocaleString()}</p>
              <p className="ticket-updated-at">Updated At: {new Date(ticket.updated_at).toLocaleString()}</p>
              </div>
              <div className='updatebtnwrapper'>
              {isAdmin ? (
                <button onClick={handleSubmit} className="updateButton">Update</button>
              ) : (
                <h3>You do not have permission to edit this ticket.</h3>
              )}

              <p className="ticket-created-by">Created By: {ticket.createdBy}</p>

              </div>
              
             
            
                  {ticket.image && ticket.image.length > 0 && (
                <div className="ticket-image" style={{ overflowX: ticket.image.length > 3 ? 'auto' : 'visible' }}>
                  {ticket.image.map((img, index) => (
                    <img src={`http://localhost:8004/${img.url}`} key={index} alt={`Image ${index}`} />
                  ))}
                </div>
              )}
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
                        {/* <br /> */}
                        {ticket.image && ticket.image.length > 0 && (
                          <div className="ticket-image" style={{ overflowX: ticket.image.length > 3 ? 'auto' : 'visible' }}>
                            {ticket.image.map((img, index) => (
                              <img src={`http://localhost:8004/${img.url}`} key={index} alt={`Image ${index}`} height={50} width={50} />
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

                <div className="form-group">
                  <label>Comment:</label>
                  <textarea className="form-control" name="commentinput" onChange={handleCommentChange} autoFocus />
                </div>
                <label htmlFor="images">Images</label>
                <input type="file" multiple id="images" name="images" onChange={handleImageChange} />
              </div>
              <br />
              <button onClick={() => { handleComment() }}>Submit</button>
            </div>

            <ToastContainer />
          </div>
        </Container>
      </div>

    </div>


  );
};

export default Ticket;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketStats = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    
    const token=localStorage.getItem("token")
  
    
  
    const getTicketStats = () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/stats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) =>
        {
            console.log("response: " ,response);
            setData(response.data.ticketStats)
        })
        .catch((error) => console.log(error));
    }
  
    useEffect(() => {
        getTicketStats()
    }, [])
  
    return (
  
  
      <div className='dashboard_grid'>
        <div>
          <Sidebar />
        </div>
        <div>
          <Navbar />
         
          <Container>
         
          <div className='responsive-table'>
             
             { data && JSON.stringify(data)}
            </div>
          </Container>
  
          <ToastContainer />
        </div>
  
      </div>
    );
  };
  
  export default TicketStats;
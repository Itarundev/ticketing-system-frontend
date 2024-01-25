import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";

const TicketStats = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const getTicketStats = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response: ", response);
        setData(response.data.ticketStats);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTicketStats();
  }, []);

  return (
    <div className="dashboard_grid">
      <div>
        <Sidebar />
      </div>
      <div>
        <Navbar />

        <Container>
          <div className="responsive-table">
            {data && (
             <Grid container spacing={3}>
             {data.map((project) => (
               <Grid key={project.project_name} item xs={12} sm={6} md={4} lg={3}>
                 <Card elevation={3} sx={{ height: '100%' }}>
                   <CardContent>
                     <Typography variant="h6" gutterBottom>
                       {project.project_name}
                     </Typography>
                     <Typography color="textSecondary">
                       Total Tickets: {project.total_tickets}
                     </Typography>
                     <Typography color="textSecondary">
                       Open Tickets: {project.open_tickets}
                     </Typography>
                     <Typography color="textSecondary">
                       Closed Tickets: {project.closed_tickets}
                     </Typography>
                   </CardContent>
                 </Card>
               </Grid>
             ))}
           </Grid>
            )}
          </div>
        </Container>

        <ToastContainer />
      </div>
    </div>
  );
};

export default TicketStats;

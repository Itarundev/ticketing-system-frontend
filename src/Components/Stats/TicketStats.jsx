// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../Sidebar/Sidebar";
// import Navbar from "../Navbar/Navbar";
// import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
// import { ToastContainer } from "react-toastify";

// const TicketStats = () => {
//   const [data, setData] = useState(null);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   const getTicketStats = () => {
//     axios
//       .get(`${process.env.REACT_APP_BASE_URL}/api/stats`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log("response: ", response);
//         setData(response.data.ticketStats);
//       })
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     getTicketStats();
//   }, []);

//   return (
//     <div className="dashboard_grid">
//       <div>
//         <Sidebar />
//       </div>
//       <div>
//         <Navbar />

//         <Container>
//           <div className="responsive-table">
//             {data && (
//               <Grid container spacing={3}>
//                 {data.map((project) => (
//                   <Grid
//                     key={project.project_name}
//                     item
//                     xs={12}
//                     sm={6}
//                     md={4}
//                     lg={3}
//                   >
//                     <Card
//                       elevation={3}
//                       sx={{ height: "100%", border: "1px solid #e0e0e0" }}
//                     >
//                       <CardContent>
//                         <Typography variant="h6" gutterBottom fontWeight="bold">
//                           {project.project_name}
//                         </Typography>
//                         <Typography variant="button" display="block" gutterBottom>
//                           Total Tickets: {project.total_tickets}
//                         </Typography>
//                         <Typography variant="button" display="block" gutterBottom>
//                           Open Tickets: {project.open_tickets}
//                         </Typography>
//                         <Typography variant="button" display="block" gutterBottom>
//                           Closed Tickets: {project.closed_tickets}
//                         </Typography>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             )}
//           </div>
//         </Container>

//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default TicketStats;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Card, CardContent, Container, Grid, Typography, Select, MenuItem } from "@mui/material";
import { ToastContainer } from "react-toastify";

const TicketStats = () => {
  const [data, setData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
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

        if (response.data.ticketStats.length > 0) {
          setSelectedProject(response.data.ticketStats[0].project_name);
        }
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
        <div className='title_txt'>
        <h1>Ticket Stats</h1>
          </div>
          <div className='frmedit white_card'>
            <div className="select_tc">
          <Select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            {data && data.map((project) => (
              <MenuItem key={project.project_name} value={project.project_name}>
                {project.project_name}
              </MenuItem>
            ))}
          </Select></div>

          <div className="tic_box">
            {data && (
              <Grid container spacing={3}>
                {data.map((project) => (
                  <Grid
                    key={project.project_name}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    style={{ display: selectedProject === project.project_name ? 'block' : 'none' }}
                  >
                    <Card
                      elevation={3}
                      sx={{ height: "100%", border: "1px solid #e0e0e0" }}
                    >
                      <CardContent >
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                          {project.project_name}
                        </Typography>
                        <div className="boxcrd">
                        <Typography variant="button" display="block" gutterBottom>
                          <h2>{project.total_tickets}</h2>
                          Total Tickets 
                        </Typography>
                        <Typography variant="button" display="block" gutterBottom>
                          <h2>{project.open_tickets}</h2>
                          Open Tickets
                        </Typography>
                        <Typography variant="button" display="block" gutterBottom>
                          <h2>{project.closed_tickets}</h2>
                          Closed Tickets
                        </Typography></div>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </div></div>
        </Container>

        <ToastContainer />
      </div>
    </div>
  );
};

export default TicketStats;


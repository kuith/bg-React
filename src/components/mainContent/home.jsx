import { Box } from "@mui/material";
const Home = () => {
  return (
      /*       <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
    > */
     
          <img
              className="img-portada"
              src={`${import.meta.env.BASE_URL}images/portada01.jpg`}
              alt="Portada"
          />
    
      /*         </Box> */
  );

};

export default Home;

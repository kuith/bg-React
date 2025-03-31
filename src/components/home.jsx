// filepath: [home.jsx](http://_vscodecontentref_/2)
import { Box } from "@mui/material";

const Home = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL || "/images/";
    const src = `${baseUrl}portada01.jpg`;
    return <img className="img-portada" src={src} alt="Portada" />;
};

export default Home;

import './App.css'
import Container from "@mui/material/Container";
import Header from './components/header/header';
import MainContent from './components/mainContent/mainContent';   
import Footer from './components/footer/footer';    

function App() {

    return (
        <>
            <Container maxWidth="xl">
                <Header />
                <MainContent />
                <Footer />
            </Container>
        </>
    );

}

export default App

import React, { useState } from "react";
import {
  Stack,
  Link,
  Toolbar,
  Typography,
  Container,
  AppBar,
  Button,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const pages = [
  { name: "Jugadores", id: "players" },
  { name: "Autores", id: "authors" },
  { name: "Juegos", id: "games" },
  { name: "Partidas", id: "matches" },
  { name: "Login", id: "login" },
];

const NavList = ({ ...props }) => {
    return (
      <Stack
        overflow="auto"
        direction={{ xs: "column", sm: "row" }}
        gap={3}
        ml={{ xs: 3, sm: 0 }}
        mt={{ xs: 3, sm: 0 }}
        width={{ xs: "150px", sm: "initial" }}
        {...props}
      >
        {pages.map(page => (
          <Link
            key={page.id}
            sx={{
              color: { xs: "primary", sm: "white" },
            }}
          >
            {page.name}
          </Link>
        ))}
      </Stack>
    );
  };

  const Nav = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = newOpen => () => {
      setOpen(newOpen);
    };
    return (
      <>
        <Button
          variant="text"
          onClick={toggleDrawer(true)}
          sx={{ color: "white", display: { xs: "flex", sm: "none" } }}
        >
          <MenuIcon />
        </Button>
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          anchor="right"
          sx={{
            display: { xs: "inherit", sm: "none" },
          }}
        >
          <NavList />
        </Drawer>
        <NavList
          sx={{
            display: { xs: "none", sm: "inherit" },
          }}
        />
      </>
    );
  };

  const Header = () => {
    return (
      <AppBar>
        <Container>
          <Toolbar>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography variant="h6">Juegos de Mesa</Typography>
              <Nav />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    );
  };
export default Header;
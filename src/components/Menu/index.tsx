import { Outlet } from "react-router-dom";
import {
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Layout,
  Sidebar,
  StyledNavLink,
  CriarRegistro,
  SideNavLinksPublicar,
} from "./styles";
import Logo from "../../assets/loginForm/Logo.svg";
import { ClipboardText, SignOut } from "phosphor-react";

export function Menu() {
  return (
    <Layout>
      <CssBaseline />
      <Sidebar>
        <Typography variant="h6">
          <img src={Logo} alt="Logo" />
        </Typography>

        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <StyledNavLink to="/criar">
                  <CriarRegistro>
                    <SideNavLinksPublicar>
                      <ListItemText primary="Publicar" />
                    </SideNavLinksPublicar>
                  </CriarRegistro>
                </StyledNavLink>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ClipboardText size={24} weight="bold" color="white" />
                </ListItemIcon>
                <StyledNavLink to="/feed">
                  <ListItemText primary="Feed" />
                </StyledNavLink>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SignOut size={24} weight="bold" color="white" />
                </ListItemIcon>
                <StyledNavLink to="/">
                  <ListItemText primary="Logout" />
                </StyledNavLink>
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Sidebar>
      <Box flex="1" padding="20px">
        <Outlet />
      </Box>
    </Layout>
  );
}

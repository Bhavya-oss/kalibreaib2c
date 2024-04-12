"use client";

import { KALIBRE_TITLE, PROFILE_LOGO } from "@/constants/MediaConstants";
import { MyContext } from "@/context/ContextProvider";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useCallback, useContext, useState } from "react";
import ProtectedRoute from "../auth/Protected";
import { Logout } from "@mui/icons-material";
import { signOut } from "supertokens-web-js/recipe/passwordless";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

function NavBar() {
  const { globalState, dispatch } = useContext(MyContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDraw, setMobileDraw] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  // console.log("is-Authenticated =======", globalState.isAuthenticated);

  const pathName = usePathname();
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileDraw((prevState) => !prevState);
  };

  const logoutProfile = () => {
    signOut();
    dispatch({ type: "auth", payload: false });
    handleClose();
  };

  const login = useCallback(() => {
    if (pathName === "/companies" || pathName === "/waitlist") {
      router.push("/waitlist");
    } else {
      router.push("/join");
    }
  }, [pathName]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Stack
        direction="column"
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        <Box sx={{ width: "130px", padding: "1rem" }}>
          <img
            src={KALIBRE_TITLE}
            style={{
              maxWidth: "100%",
            }}
            alt="kalibre logo"
          />
        </Box>

        {globalState?.isAuthenticated ? (
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Avatar
              variant="solid"
              sx={{ width: "40px", height: "40px" }}
              src={PROFILE_LOGO}
              alt="profile logo"
            />
            <Button onClick={logoutProfile}>Logout</Button>
          </Stack>
        ) : (
          <>
            <Button variant="contained" onClick={login}>
              Login/SignUp
            </Button>
          </>
        )}

        {pathName != "/companies" && (
          <Link href="/companies" style={{ textDecoration: "none" }}>
            <Typography color="#000" variant="h6">
              For Companies
            </Typography>
          </Link>
        )}
      </Stack>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "hsla(0,0%,100%,.05)",
            backdropFilter: "blur(6px)",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Box
              sx={{
                flexGrow: 1,
                marginLeft: {
                  xs: "none",
                  sm: "none",
                  md: "none",
                  lg: "none",
                  xl: "5rem",
                },
              }}
            >
              <Link href="/">
                <Box
                  sx={{
                    width: {
                      xs: "150px",
                      sm: "160px",
                      md: "180px",
                      lg: "200px",
                      xl: "220px",
                    },
                    padding: "1rem 0",
                  }}
                >
                  <img
                    src={KALIBRE_TITLE}
                    style={{
                      maxWidth: "100%",
                    }}
                    alt="kalibre logo"

                  />
                </Box>
              </Link>
            </Box>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              <Stack
                direction="row"
                spacing={5}
                justifyContent="center"
                alignItems="center"
                sx={{
                  marginRight: {
                    xs: "none",
                    sm: "none",
                    md: "none",
                    lg: "none",
                    xl: "5rem",
                  },
                }}
              >
                {pathName != "/companies" && (
                  <Link href="/companies" style={{ textDecoration: "none" }}>
                    <Typography color="#000" variant="h6">
                      For Companies
                    </Typography>
                  </Link>
                )}

                {globalState?.isAuthenticated ? (
                  <>
                    <IconButton
                      aria-label="user-avatar"
                      size="large"
                      aria-controls={isMenuOpen ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={isMenuOpen ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <Avatar
                        variant="solid"
                        sx={{ width: "50px", height: "50px" }}
                        src={PROFILE_LOGO}
                        alt="profile logo"

                      />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={isMenuOpen}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={logoutProfile}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button variant="contained" onClick={login}>
                    Login/SignUp
                  </Button>
                )}
              </Stack>
            </Box>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="#000"
                aria-label="open drawer"
                onClick={() => {
                  setMobileDraw(true);
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <nav>
          <Drawer
            anchor="right"
            variant="temporary"
            open={mobileDraw}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 240,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </>
  );
}

export default ProtectedRoute(NavBar, false);

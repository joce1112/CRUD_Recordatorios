import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Tooltip, Box, IconButton, Button } from '@mui/material';
import { supabase } from "../../config/supabaseClient";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Navbar = () => {    
    const { i18n, t } = useTranslation();
    const changeLaguage = (language) => {
      i18n.changeLanguage(language);
    };
    return (
        
        <div>
            
            <Box sx={{ flexGrow: 1 }}>
                {/* <AppBar position="static"  color='primary'> */}
                <AppBar position="fixed" color='primary'>

                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            {/* <MenuIcon /> */}

                        </IconButton>
                        <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/">
                        <p>{t("HOME")}</p>
                         </Link>
                        </Typography>

                        <Button color="inherit" onClick={() => supabase.auth.signOut()}>
                        <p>{t("Exit")}</p>
                    </Button>
                
                                <Button color="inherit" >
                                <Link to="/Recordatorios">
                                <p>{t("Recordatories")}</p>
                                </Link>                                                                
                                </Button>
                                
                            <Button color="inherit" >
                                <Link to="/Perfiles">
                                <p>{t("Profile")}</p>
                                </Link>
                                </Button>

                        
                        

                        <Tooltip title="Open settings">
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt="J" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>

                    </Toolbar>

                </AppBar>
            </Box>
           </div>
    );
}

export default Navbar
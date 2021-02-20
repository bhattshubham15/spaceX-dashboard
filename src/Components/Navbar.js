import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logo from '../Assets/Logo.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(5),
    },
    title: {
        flexGrow: 1,
    },
}));
class Navbar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" >
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            <img src={Logo} alt="spacex_logo" />
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
export default withStyles(useStyles)(Navbar);

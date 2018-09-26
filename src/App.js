import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux'
import { setTasks } from './reducers/actions'

//import React from 'react';
import 'typeface-roboto'

import CssBaseline from '@material-ui/core/CssBaseline';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';


import PropTypes from 'prop-types';
import classNames from 'classnames';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';

import Avatar from '@material-ui/core/Avatar';


import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';


import MenuIcon from '@material-ui/icons/Menu';
import HowToReg from '@material-ui/icons/HowToReg';
import AddIcon from '@material-ui/icons/Add';
//import LightbulbOn from '@material-ui/icons/LightbulbOn';

import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  /*heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },

  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },*/
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },

  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
    paddingTop: theme.spacing.unit * 3
  },
  cardOk: {
    background: green[900]
  },
  bgYellow:{
    background: yellow[800]
  }

});

//const cards = [[1,0], [2,0], [3,0], [4,0], [5,0], [6,1], [7,0], [8,0], [9,0], [10,0], [11,0], [12,0]];

const theme = createMuiTheme({
  palette: {
    type: 'dark',

    primary: {main:'#002FBB'},
    secondary: {main:'#FFE401'},
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  
  },
});

class App extends Component {

  constructor(props){
    super(props)


    console.log(props)

    this.state = {
      //cards: [],
      open: false
    }

    this.card = {
      title: "",
      content: ""
    }
  }

  addCard = () => {
    let cards = this.props.cards
    cards.push({
      title: this.card.title,
      content: this.card.content,
      time: +Date.now(),
      done: false
    })
    this.props.setTasks(cards)
  }

  delCard = (time) => {
    console.log(time)
    let cards = this.props.cards
    for(let i=cards.length-1;i>=0;i--){
      console.log(cards[i].time===time)
      if(cards[i].time===time){
        cards.splice(i,1)
        break
      }
    }
    console.log(cards)
    this.props.setTasks(cards)
    this.forceUpdate()
  }

  toggleCard = (time) => {
    //console.log(time)
    let cards = this.props.cards
    for(let i=cards.length-1;i>=0;i--){
      if(cards[i].time===time){
        cards[i].done = !cards[i].done
        break
      }
    }
    this.props.setTasks(cards)
    this.forceUpdate()
  }

  openDialog = () => {

    this.setState({open:true})
  }

  handleClose = (ev) => {
    const action = ev.currentTarget.dataset.action
    if(action==="add"){this.addCard()}
    this.setState({ open: false });
  };

  handleChange = (ev, el) => {
    const value = ev.target.value
    this.card[el] = value
  };
  

  render() {

    const {classes} = this.props

    const cards = this.props.cards.sort((el1, el2) => {return el2.time-el1.time})

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
          <AppBar position="static" color="primary">
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu">
                <HowToReg />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                David's todo list
              </Typography>

              <Button variant="fab" mini color="secondary" aria-label="Add" onClick={this.openDialog}>
                <AddIcon />
              </Button>
            </Toolbar>
          </AppBar>
          <main>
            <div className={classNames(classes.layout, classes.cardGrid)}>
              {/* End hero unit */}
              <Grid container spacing={40}>
                {cards.map(card => (
                  <Grid item key={card.time} sm={6} md={4} lg={3}>
                    <Card className={card.done?classes.cardOk:""}>
                      <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                          {card.title}
                        </Typography>
                        <Typography>
                          {card.content}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="secondary" onClick={() => {this.toggleCard(card.time)}}>
                          {!card.done?"Done":"Undone"}
                        </Button>
                        <Button size="small" color="secondary" onClick={() => {this.delCard(card.time)}}>
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </main>
          {/* Footer */}
          <footer className={classes.footer}>
            <Typography variant="title" align="center" gutterBottom>
              Footer
            </Typography>
            <Typography variant="subheading" align="center" color="textSecondary" component="p">
              Something here to give the footer a purpose!
            </Typography>
          </footer>
          {/* End footer */}

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add task</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                color="secondary"
                onChange={(ev) => {this.handleChange(ev, "title")}}
              />
              <TextField
                margin="dense"
                id="title"
                label="Content"
                type="text"
                fullWidth
                color="secondary"
                onChange={(ev) => {this.handleChange(ev, "content")}}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} data-action="cancel" color="secondary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} data-action="add" color="secondary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    cards: state.session.tasks || []
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setTasks: (tasks) => {
      dispatch(setTasks(tasks))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( withStyles(styles)(App) )

//export default withStyles(styles)(App);

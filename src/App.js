import React from 'react'
import './App.css'

import { withStyles } from '@material-ui/core/styles'
import Snackbar from "@material-ui/core/Snackbar"

import { ConnectedRouter } from 'react-router-redux'

import history from './wrapper/myHistory'
import Routes from './component/Routes'


const styles = theme => ({
  scrollable: {
    height: "100%",
    width: "100%",
    overflowY: "scroll",
    overflowX: "hidden;",
    //overflow: "scroll",
    WebkitOverflowScrolling: "touch",
    position: "fixed",
  },
  snackbar: {},
})

class App extends React.Component
{
  constructor (props) {
    super(props)
    this.state = {
    }
  }


  render () {
    const { classes } = this.props
    const { errorOpen, errorMessage, setMainError } = this.props
    console.log(errorMessage)
    return (
      <ConnectedRouter history={history} >
        <div className={classes.scrollable} >
          <Routes />
          <Snackbar
              className={classes.snackbar}
              open={errorOpen}
              message={errorMessage}
              autoHideDuration={8000}
              onClose={ () => setMainError({ errorOpen: false, errorMessage: "hogehoge" }) }
          />
        </div>
      </ConnectedRouter>
    )
  }
}

export default withStyles(styles)(App)

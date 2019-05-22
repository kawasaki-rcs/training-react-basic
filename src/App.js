import React from 'react'
import './App.css'

import { withStyles } from '@material-ui/core/styles'

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
  }
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
    return (
      <ConnectedRouter history={history} >
        <div className={classes.scrollable} >
          <Routes />
        </div>
      </ConnectedRouter>
    )
  }
}

export default withStyles(styles)(App)

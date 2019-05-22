import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"

const styles = theme => ({
    root: {},
    gridContainer: {
        height: "100%",
    },
    gridItem: {},
    buttonBase: {
        width: "100%",
        height: "100%",
        fontSize: "1.5em",
    },
    attendance: {},
    logout: {},
})

class Top extends React.Component
{
    constructor (props) {
        super(props)
        this.state = {

        }
    }

    handleLogout = e => {
        localStorage.clear()
        window.location.reload()
        e.preventDefault()
    }

    render () {
        const { classes } = this.props

        const gwrap = component => <Grid item xs={6} className={classes.gridItem} >{component}</Grid>
        const bc = c => classNames(classes.buttonBase, classes[c])

        return (
            <Grid container
                className={classes.gridContainer}
                //direction="column"
                justify="center"
                alignItems="stretch"
                //justify="center" alignItems="stretch"
                >
                {gwrap(
                <Button
                    variant="outlined"
                    className={bc('attendance')}
                >出席</Button>
                )}
                {gwrap(
                <Button
                    variant="outlined"
                    className={bc('attendance')}
                >帰宅</Button>
                )}
                {gwrap(
                <Button
                    variant="outlined"
                    className={bc('attendance')}
                >離席</Button>
                )}
                {gwrap(
                <Button
                    variant="outlined"
                    className={bc('attendance')}
                >当番</Button>
                )}
                {gwrap(
                <Button
                    variant="outlined"
                    className={bc('attendance')}
                >その他</Button>
                )}
                {gwrap(
                <Button
                    variant="outlined"
                    className={bc('logout')}
                    onClick={this.handleLogout}
                >ログアウト</Button>
                )}
            </Grid>
        )
    }
}

export default withStyles(styles)(Top)

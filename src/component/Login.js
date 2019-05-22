import React from 'react'

import { withStyles } from "@material-ui/core/styles"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
    root: { },
    gridContainer: {
        height: "100%",
    },
    gridItem: {
        padding: 4,
    },
})

class Login extends React.Component
{
    // src/component/Routes 参照
    static isPrivate = false

    constructor (props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
    }


    componentWillReceiveProps(nextProps) {
        if ( localStorage.hasOwnProperty("token") ) this.props.reqPush('/top')
    }

    handleChange = type => e => this.setState({ [type]: e.target.value, }) 

    handleSubmit = e => {
        const { username, password } = this.state

        let usernameDN = `${username}@${process.env.REACT_APP_DN_BASE}`
        
        this.props.reqLogin({ username: usernameDN, password })
        e.preventDefault()
    }

    render () {
        const { classes } = this.props
        const { username, password } = this.state

        const gwrap = component => <Grid item className={classes.gridItem} >{component}</Grid>

        return (
            <Grid container
                className={classes.gridContainer}
                direction="column"
                justify="center"
                alignItems="center"
             >
                { gwrap(
                    <TextField
                        variant="outlined"
                        value={username}
                        label="ユーザ名"
                        onChange={this.handleChange('username')}
                        />
                )}
                { gwrap(
                    <TextField
                        variant="outlined"
                        value={password}
                        label="パスワード"
                        type="password"
                        onChange={this.handleChange('password')}
                        />
                ) }
                { gwrap(
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                    >ログイン</Button>
                ) }
            </Grid>
        )
    }

}

export default withStyles(styles)(Login)


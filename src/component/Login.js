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
        this.props.reqLogin({ username, password })
        e.preventDefault()
    }

    render () {
        const { classes, isReqLogin } = this.props
        const { username, password } = this.state

        //const gwrap = component => <Grid item className={classes.gridItem} >{component}</Grid>

        return (
            <Grid container
                className={classes.gridContainer}
                direction="column"
                justify="center"
                alignItems="center"
             >
                <Grid item className={classes.gridItem} >
                    <TextField
                        variant="outlined"
                        value={username}
                        label="ユーザ名"
                        onChange={this.handleChange('username')}
                        />
                </Grid>

                <Grid item className={classes.gridItem} >
                    <TextField
                        variant="outlined"
                        value={password}
                        label="パスワード"
                        type="password"
                        onChange={this.handleChange('password')}
                        />
                </Grid>

                <Grid item className={classes.gridItem} >
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={ username==="" || password==="" || isReqLogin }
                        onClick={this.handleSubmit}
                    >ログイン</Button>
                </Grid>
            </Grid>
        )
    }

}

export default withStyles(styles)(Login)


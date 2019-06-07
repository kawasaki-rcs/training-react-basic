import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import blue from "@material-ui/core/colors/blue"
import indigo from "@material-ui/core/colors/indigo"
import green from "@material-ui/core/colors/green"
import lime from "@material-ui/core/colors/lime"
import amber from "@material-ui/core/colors/amber"
import orange from "@material-ui/core/colors/orange"
import red from "@material-ui/core/colors/red"
import grey from "@material-ui/core/colors/grey"
import blueGrey from "@material-ui/core/colors/blueGrey"

import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"


import DialogTitle from '../wrapper/DialogTitle'



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
        color: "white",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    attend: {
        backgroundColor: blue[400],
        //backgroundImage: "url('/img/top/calender.svg')",
    },
    home: { backgroundColor: green[400] },
    leave: { backgroundColor: orange[800] },
    out: { backgroundColor: red[400] },
    other: { backgroundColor: grey[600] },
    onduty: { backgroundColor: indigo[400] },
    logout: { backgroundColor: blueGrey[400] },
    margin: { margin: theme.spacing.unit },
    dialogRootPaper: {},
    commentField: {}, 
    backTimeField: { width: "6em", },
})

const formatTime = t => {
    //if ( t.match(/^[0-9]{2}$/g) ) return `${t}:`
    if ( t.match(/^[0-9]{4}$/g) ) return `${t.slice(0, 2)}:${t.slice(2)}`
    return t
}

const statusList = [
    { label: "出席", type: "attend", listed: true },
    { label: "帰宅", type: "home", listed: true },
    { label: "離席", type: "leave", listed: true },
    { label: "外出", type: "out", listed: false },
    { label: "出張", type: "trip", listed: false },
    { label: "会議", type: "meating", listed: false },
    { label: "直帰", type: "noreturn", listed: false },
]

const getLabel = type => {
    let target = statusList.find( s => s.type === type )
    return target ? target.label : ""
}

const defaultState = {
    openDetail: false,
    status: "",
    comment: "",
    back_time: "",
}

class Top extends React.Component
{
    constructor (props) {
        super(props)
        this.state = defaultState
    }

    handleAttend = status => e => {
        const user_id = 83
        this.props.reqAttend({ user_id, status, comment: "", back_time: "" })
        this.setState({ ...defaultState, status, openDetail: true })
        e.preventDefault()
    }

    handleEdit = type => e => this.setState({ [type]: e.target.value })

    handleSubmit = e => {
        const { status, comment, back_time } = this.state
        const user_id = this.props.username
        this.props.reqAttend({ user_id, status, comment, back_time })
        this.handleClose()
    }

    handleLogout = e => {
        localStorage.clear()
        window.location.reload()
        e.preventDefault()
    }


    handleClose = () => this.setState(defaultState)

    render () {
        const { classes } = this.props
        const { openDetail, status, comment, back_time } = this.state

        const gwrap = component => <Grid item xs={6} className={classes.gridItem} >{component}</Grid>
        const bc = c => classNames(classes.buttonBase, classes[c])

        return ([
            <Grid container
                className={classes.gridContainer}
                //direction="column"
                justify="center"
                alignItems="stretch"
                //justify="center" alignItems="stretch"
                >
                { statusList.map( s => ( !s.listed ? null :
                    <Grid item xs={6} className={classes.gridItem} >
                        <Button
                        variant="outlined"
                        className={classNames(classes.buttonBase, classes[s.type])}
                        onClick={this.handleAttend(s.type)}
                    >{s.label}</Button>
                    </Grid>
                )) }
                <Grid item xs={6} className={classes.gridItem} >
                    <Button
                        variant="outlined"
                        className={classNames(classes.buttonBase, classes.onduty)}
                    >当番</Button>
                </Grid>
                <Grid item xs={6} className={classes.gridItem} >
                    <Button
                        variant="outlined"
                        className={classNames(classes.buttonBase, classes.other)}
                        onClick={() => this.setState({  })}
                    >その他</Button>
                </Grid>
                <Grid item xs={6} className={classes.gridItem} >
                    <Button
                        variant="outlined"
                        className={classNames(classes.buttonBase, classes.logout)}
                        onClick={this.handleLogout}
                    >ログアウト</Button>
                </Grid>
            </Grid>,
            <Dialog
                open={openDetail} 
                onClose={this.handleClose}
                classes={{ paper: classes.margin }}
                fullWidth={true}
                maxWidth="md"
                > 
                <DialogTitle onClose={this.handleClose} >{ getLabel(status) }</DialogTitle>
                <DialogContent>
                    <Grid container >
                        <Grid item xs="12" >詳細な情報を入力できます。</Grid>
                        <Grid item >
                            <TextField
                                variant="outlined"
                                className={classNames(classes.margin, classes.commentField)}
                                label="予定／場所"
                                value={comment}
                                onChange={this.handleEdit('comment')}
                            />
                        </Grid>
                        <Grid item >
                            <TextField
                                variant="outlined"
                                className={classNames(classes.margin, classes.backTimeField)}
                                //type={ back_time.length > 4 ? "number" : "text" }
                                type="tel"
                                label="帰社時刻"
                                value={formatTime(back_time)}
                                onChange={this.handleEdit('back_time')}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                        >送信</Button>
                    <Button
                        variant="outlined"
                        onClick={this.handleClose}
                        >入力しない</Button>
                </DialogActions>

            </Dialog>
        ]
        )
    }
}

export default withStyles(styles)(Top)

import React from 'react'
import { withStyles } from "@material-ui/core/styles"
import format from 'date-fns/format'

import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"

import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"

const styles = theme => ({
    reloadButton: {
        margin: theme.spacing.unit* 2,
    },
})

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: undefined,
            info: undefined,
            version: format(new Date(document.lastModified), "yyyy/MM/dd-HH:mm"),
            cacheCleared: false,
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        this.setState({ error, info })
        /*
        for ( let v in nowState ) {
            console.log(nowState[v], nowState instanceof List )
        }
        */
    }
    
    handleClrCache = (e) => {
        localStorage.clear()
        //this.setState({ anchorEl: null })
        this.setState({ cacheCleared: true })
        e.preventDefault()
    }

    handleReload = e => {
        window.location.reload()
        e.preventDefault()
    }



    render() {
        const { classes } = this.props
        const { version, cacheCleared } = this.state
        //console.log(isReqErrorReport, isReportComplete)

        if (this.state.hasError) {
        // You can render any custom fallback UI
            return (
                <Dialog 
                    open={true} 
                    fullWidth={true}
                    maxWidth="sm"
                >
                    <DialogTitle>不明なエラーが発生しました。</DialogTitle>
                    <DialogContent>
                        <Button
                            className={classes.reloadButton}
                            size="large"
                            variant="outlined"
                            onClick={this.handleReload}
                            color="default"
                            >再読込み</Button>
                        <Typography variant="body1">再読込みで改善されない場合、キャッシュを削除して下さい。</Typography>
                        <Divider />
                        <Typography variant="body2">（Version: {version}）</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            onClick={this.handleClrCache}
                            disabled={cacheCleared}
                            color="secondary"
                            >キャッシュ削除</Button>

                    </DialogActions>
                </Dialog>
            )
        }

        return this.props.children; 
    }
}

export default withStyles(styles)(ErrorBoundary)
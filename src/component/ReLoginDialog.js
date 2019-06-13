import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import Login from '../container/Login';

class ReLoginDialog extends React.Component {

  render() {
    return (
      <div>
        <Dialog
          title={'ログイン有効期限が切れました。'}
          open={this.props.open}
          onClose={this.handleClose}
        >
            <Login dialog={true} />
        </Dialog>
      </div>
    )
  }
}

export default ReLoginDialog;
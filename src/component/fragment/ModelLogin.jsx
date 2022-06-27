import React from "react";
import ReactDOM from "react-dom";

const ModelLogin = ({ isShowing, hide }) => {
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal__box">
              <div className="modal__box__header">
                <button
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form>
                <div class="row-flex">
                  <label className="col-flex-sm-4" htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="col-flex-sm-8"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="row-flex">
                  <label htmlFor="password" className="col-flex-sm-4">Password</label>
                  <input
                    type="password"
                    className="col-flex-sm-8"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div class="form-group form-check">
                  <input
                    type="checkbox"
                    id="checkbox"
                  />
                  <label class="form-check-label" for="checkbox">
                    Check me out
                  </label>
                </div>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default ModelLogin;

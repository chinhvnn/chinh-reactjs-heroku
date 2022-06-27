import React from "react";
import ReactDOM from "react-dom";

const ModelReg = ({ isShowingReg, hideReg }) => {
  console.log("123");
  return isShowingReg
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
                  onClick={hideReg}
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
           
                <button type="submit" class="btn btn-primary">
                  REGISTER
                </button>
              </form>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default ModelReg;

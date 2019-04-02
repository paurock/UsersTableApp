import PropTypes from "prop-types";
import "../stylesheets/modal.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Portal from "../components/portal";
import { AddUserForm } from "../components/addUserForm";

export const Modal = ({
  title = "Add New User",
  isOpen = true,
  onCancel = f => f,
  onSubmit = f => f,
  getInputText = f => f,
  showSaveBtn
}) => (
  <>
    {" "}
    {isOpen && (
      <Portal>
        <div className="modal-overlay" />
        <div id="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {title}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => onCancel()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddUserForm
                  getInputText={input => getInputText(input)}
                  onSubmit={() => onSubmit()}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onCancel()}
                >
                  Close
                </button>
                {showSaveBtn ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onSubmit()}
                  >
                    Save changes
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Portal>
    )}{" "}
  </>
);
Modal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  getInputText: PropTypes.func
};

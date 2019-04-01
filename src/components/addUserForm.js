import PropTypes from "prop-types";

export const AddUserForm = ({ onSubmit = f => f, getInputText = f => f }) => (
  <form onSubmit={() => onSubmit()}>
    <label>
      <input
        name="first"
        className="form-control mr-2 mt-2"
        onChange={input => getInputText(input)}
        placeholder="Enter User Name"
      />
    </label>
    <br />
    <label>
      <input
        name="last"
        className="form-control mr-2 mt-2"
        onChange={input => getInputText(input)}
        placeholder="Enter User Last Name"
      />
    </label>
    <br />
    <label>
      <input
        name="nat"
        className="form-control mr-2 mt-2"
        onChange={input => getInputText(input)}
        placeholder="Enter User Group"
      />
    </label>
  </form>
);

AddUserForm.propTypes = {
  getInputText: PropTypes.func,
  onSubmit: PropTypes.func
};

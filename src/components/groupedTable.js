import { v4 } from "uuid";
import PropTypes from "prop-types";

export const TableBodyGroup = ({ groupData = [] }) => (
  <tbody>
    {groupData.map((arr, i) => (
      <TableTrGroup arr={arr} key={v4()} />
    ))}
  </tbody>
);
TableBodyGroup.propTypes = {
  groupData: PropTypes.array
};

const TableTrGroup = ({ arr = [] }) =>
  arr.map((person, i) => (
    <tr key={v4()}>
      <td key={v4()}>{person.name.first}</td>
      <td key={v4()}>{person.name.last}</td>
      <td key={v4()}>{person.nat}</td>
    </tr>
  ));

TableTrGroup.propTypes = {
  groupData: PropTypes.array
};

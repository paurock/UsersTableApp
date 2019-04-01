import { v4 } from "uuid";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { TableBodyGroup } from "../components/groupedTable";

export const Table = ({
  data,
  groupData,
  showGroupedTable,
  sortBy = f => f,
  sortByGroup = f => f
}) => (
  <div className="table-container">
    <table className="table">
      <TableHead
        showGroupedTable={showGroupedTable}
        sortBy={(key1, key2) => sortBy(key1, key2)}
        sortByGroup={key1 => sortByGroup(key1)}
      />
      {showGroupedTable ? (
        <TableBody data={data} />
      ) : (
        <TableBodyGroup groupData={groupData} data={data} />
      )}
    </table>
  </div>
);
Table.propTypes = {
  data: PropTypes.array,
  groupData: PropTypes.array,
  showGroupedTable: PropTypes.bool,
  sortBy: PropTypes.func,
  sortByGroup: PropTypes.func
};

const TableHead = ({
  showGroupedTable,
  sortBy = f => f,
  sortByGroup = f => f
}) => (
  <thead>
    <tr>
      <th scope="col">
        <button
          type="button"
          className="btn btn-light"
          onClick={() => sortBy("name", "first")}
        >
          Name
        </button>
      </th>
      <th scope="col">
        <button
          type="button"
          className="btn btn-light"
          onClick={() => sortBy("name", "last")}
        >
          Last Name
        </button>
      </th>
      <th scope="col">
        <button
          type="button"
          className="btn btn-dark mt-2"
          onClick={() => sortByGroup("nat")}
        >
          {//Flag that shows Groupped Table Component
          showGroupedTable ? "Grouping Inactive" : "Grouping Active!"}
        </button>
      </th>
    </tr>
  </thead>
);
TableHead.propTypes = {
  showGroupedTable: PropTypes.bool,
  sortBy: PropTypes.func,
  sortByGroup: PropTypes.func
};

const TableBody = ({ data = [] }) => (
  <tbody>
    {data.map((person, i) => {
      const { first, last } = person.name;
      return (
        <tr key={v4()}>
          <td key={v4()}>{first}</td>
          <td key={v4()}>{last}</td>
          <td key={v4()}>{person.nat}</td>
        </tr>
      );
    })}
  </tbody>
);

TableBody.propTypes = {
  data: PropTypes.array
};

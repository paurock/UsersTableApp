import { Component } from "react";
import fetch from "isomorphic-fetch";
import { Table } from "./components/table";
import { Modal } from "./components/modal";

export class PeopleList extends Component {
  componentWillMount() {
    this.setState({
      loading: true,
      compare: true
    });
    fetch("https://randomuser.me/api/?results=300")
      .then(response => response.json())
      .then(obj => obj.results)
      .then(data =>
        this.setState({
          loaded: true,
          loading: false,
          groups: ["FR", "US", "CA", "DE", "RU", ""],
          data,
          groupData: [],
          showGroupedTable: true,
          isOpen: false,
          newUserTemp: {},
          showSaveBtn: false
        })
      );
  }

  sortByGroup = key => {
    const { data, groups, showGroupedTable } = this.state;
    const collectProperGroups = i => data.filter(it => it[key] === groups[i]);
    const createGroupArrays = () =>
      Array.from({ length: 5 }, (v, i) => collectProperGroups(i));
    this.setState({
      groupData: createGroupArrays(),
      showGroupedTable: !showGroupedTable
    });
  };
  //Sort Fn fires when press Grouping button
  sortBy = (key1, key2) => {
    const { data, compare } = this.state;
    const compareFn = (a, b) =>
      compare ? a.localeCompare(b) : b.localeCompare(a);
    const sortFn = () =>
      [...data].sort((a, b) => compareFn(a[key1][key2], b[key1][key2]));
    this.setState({
      data: sortFn(),
      compare: !compare
    });
  };
  //Add Users Modal Section

  getInputText = input => {
    const target = input.target;
    target.value === "" || target.value.match(/^[A-Za-z]+$/) === null
      ? this.setState({ showSaveBtn: false })
      : this.setState({
          showSaveBtn: true,
          newUserTemp: {
            ...this.state.newUserTemp,
            [target.name]: target.value
          }
        });
  };
  //Fires when press Save button in Modal Window
  onSubmit = () => {
    const { data, newUserTemp } = this.state;

    this.setState({
      data: [
        ...data,
        {
          name: {
            first: newUserTemp["first"],
            last: newUserTemp["last"]
          },
          nat: newUserTemp["nat"]
        }
      ],
      isOpen: false,
      newUserTemp: {},
      showSaveBtn: false
    });
  };
  //Fires when press Add New User button
  showModal = () => {
    this.setState({
      isOpen: true
    });
  };
  //Fires when press Close button in Modal Window
  onCancel = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    const {
      data,
      loading,
      groupData,
      showGroupedTable,
      isOpen,
      modalContent,
      showSaveBtn,
      loaded
    } = this.state;
    //console.log(this.state);
    return loading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <button
          type="button"
          className="btn btn-light mt-2"
          onClick={() => this.showModal()}
        >
          Add New User
        </button>

        <Modal
          isOpen={isOpen}
          modalContent={modalContent}
          onCancel={() => this.onCancel()}
          getInputText={input => this.getInputText(input)}
          onSubmit={() => this.onSubmit()}
          showSaveBtn={showSaveBtn}
        />
        <Table
          data={data}
          groupData={groupData}
          showGroupedTable={showGroupedTable}
          sortBy={(key1, key2) => this.sortBy(key1, key2)}
          sortByGroup={key1 => this.sortByGroup(key1)}
        />
      </div>
    );
  }
}

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import fetch from "isomorphic-fetch";
import { Table } from "./components/table";
import { Modal } from "./components/modal";
import { render } from "react-dom";

export const PeopleListH = (
  sortByGroup = f => f,
  sortBy = f => f,
  getInputText = f => f,
  onSubmit = f => f,
  showModal = f => f,
  onCancel = f => f
) => {
  const [state, setState] = useState({
    loading: true,
    compare: true
  });

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=300")
      .then(response => response.json())
      .then(obj => obj.results)
      .then(data => {
        setState({
          ...state,
          loaded: true,
          loading: false,
          groups: ["FR", "US", "CA", "DE", "RU", ""],
          data,
          groupData: [],
          showGroupedTable: true,
          isOpen: false,
          newUserTemp: {},
          showSaveBtn: false
        });
      });
  }, []);
  sortByGroup = key => {
    const { data, groups, showGroupedTable } = state;
    const collectProperGroups = i => data.filter(it => it[key] === groups[i]);
    const createGroupArrays = () =>
      Array.from({ length: 5 }, (v, i) => collectProperGroups(i));
    setState({
      ...state,
      groupData: createGroupArrays(),
      showGroupedTable: !showGroupedTable
    });
  };
  //Sort Fn fires when press Grouping button
  sortBy = (key1, key2) => {
    const { data, compare } = state;
    const compareFn = (a, b) =>
      compare ? a.localeCompare(b) : b.localeCompare(a);
    const sortFn = () =>
      [...data].sort((a, b) => compareFn(a[key1][key2], b[key1][key2]));
    setState({
      ...state,
      data: sortFn(),
      compare: !compare
    });
  };
  //Add Users Modal Section

  getInputText = input => {
    const target = input.target;
    target.value === "" || target.value.match(/^[A-Za-z]+$/) === null
      ? setState({ ...state, showSaveBtn: false })
      : setState({
          ...state,
          showSaveBtn: true,
          newUserTemp: {
            ...state.newUserTemp,
            [target.name]: target.value
          }
        });
  };
  //Fires when press Save button in Modal Window
  onSubmit = () => {
    const { data, newUserTemp } = state;

    setState({
      ...state,
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
    setState({
      ...state,
      isOpen: true
    });
  };
  //Fires when press Close button in Modal Window
  onCancel = () => {
    setState({
      ...state,
      isOpen: !state.isOpen
    });
  };
  const {
    data,
    loading,
    groupData,
    showGroupedTable,
    isOpen,
    modalContent,
    showSaveBtn
  } = state;
  console.log(state);
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <button
        type="button"
        className="btn btn-light mt-2"
        onClick={() => showModal()}
      >
        Add New User
      </button>

      <Modal
        isOpen={isOpen}
        modalContent={modalContent}
        onCancel={() => onCancel()}
        getInputText={input => getInputText(input)}
        onSubmit={() => onSubmit()}
        showSaveBtn={showSaveBtn}
      />
      <Table
        data={data}
        groupData={groupData}
        showGroupedTable={showGroupedTable}
        sortBy={(key1, key2) => sortBy(key1, key2)}
        sortByGroup={key1 => sortByGroup(key1)}
      />
    </div>
  );
};

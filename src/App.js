import React, { Component } from "react";
import ListItems from "./Components/ListItems";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Drawer, DatePicker } from "antd";
import Search from "react-search";
import "./App.css";

library.add(faTrash);
library.add(faEdit);

const dateFormat = "DD-MM-YYYY";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      placement: "right",
      items: [],
      time: "",
      find: "",
      newitems: [],
      currentItem: {
        time: "",
        text: "",
        key: "",
      },
    };
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "" && this.state.time !== "") {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          time: "",
          text: "",
          key: "",
        },
      });
    }
  }
  handleInput(e) {
    if (this.state.time !== "") {
      this.setState({
        currentItem: {
          time: this.state.time,
          text: e.target.value,
          key: Date.now(),
        },
      });
    }
  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter((item) => item.key !== key);
    console.log(filteredItems);
    this.setState({
      items: filteredItems,
    });
  }

  editItem(key) {
    const filterItems = this.state.items.filter((item) => item.key === key);
    console.log(filterItems);
    this.setState({
      newitems: filterItems,
    });
    this.showDrawer();
  }

  setUpdate(text, key) {
    console.log("items:" + this.state.items);
    const items = this.state.newitems;
    items.map((item) => {
      if (item.key === key) {
        console.log(item.key + "    " + key);
        item.text = text;
      }
    });
    this.setState({
      newitems: items,
    });
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = (e) => {
    this.setState({
      placement: e.target.value,
    });
  };

  dateChange = (date, dateString) => {
    console.log(date, dateString);
    this.setState({
      time: dateString,
    });
  };

  searchData = (e) => {
    this.setState({ find: e.target.value });
  };

  render() {
    const { find } = this.state;
    const trimData = this.state.items.filter((element) => {
      console.log(element.text.toLowerCase().indexOf(find.toLowerCase()));
      return element.text.toLowerCase().indexOf(find.toLowerCase());
    });

    if (this.state.find === "") {
      return (
        <div className="App">
          <header>
            <div className="datepicker">
              <DatePicker
                size="large"
                format={dateFormat}
                onChange={this.dateChange}
              />
              &nbsp;&nbsp;
              <input
                type="text"
                placeholder="search"
                value={this.state.find}
                onChange={this.searchData}
              ></input>
            </div>
            <form id="to-do-form" onSubmit={this.addItem}>
              <input
                type="text"
                placeholder="Enter task"
                value={this.state.currentItem.text}
                onChange={this.handleInput}
              ></input>
              <button type="submit">Add</button>
            </form>
            <p>{this.state.items.text}</p>

            <ListItems
              items={this.state.items}
              deleteItem={this.deleteItem}
              setUpdate={this.setUpdate}
              editItem={this.editItem}
            />
          </header>

          <Drawer
            title="Edit Your Task"
            placement={this.state.placement}
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
            key={this.state.placement}
            width={400}
          >
            {this.state.newitems.map((item) => {
              return (
                <div>
                  {/* <DatePicker
                  size="large"
                  format={dateFormat}
                  value={item.time}
                /> */}
                  <textarea
                    className="textarea-field"
                    value={item.text}
                    onChange={(e) => {
                      this.setUpdate(e.target.value, item.key);
                    }}
                  />
                </div>
              );
            })}
            ;
          </Drawer>
        </div>
      );
    } else {
      return trimData.map((item) => {
        return (
          <div>
            if ({item.text} === find)
            {console.log(find)}
          </div>
        );
      });
    }
  }
}

export default App;

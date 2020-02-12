import React, { Component } from "react";
import axios from "axios";

import DisplayImages from "../display images/DisplayImages";

import "./search.style.css";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      textSearch: "",
      amount: "",
      apiUrl: "https://pixabay.com/api",
      apiKey: "15235822-a9aeef889ffa1c882ee9d40f1",
      images: []
    };
  }

  onChange = e => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.textSearch}&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
      }
    });
  };

  onChangeAmount = (e, index, value) =>
    this.setState({ amount: e.target.value });

  render() {
    return (
      <div>
        <form>
          <input
            className="input"
            type="text"
            name="textSearch"
            value={this.state.textSearch}
            onChange={this.onChange}
            placeholder="Search Images"
          />
          <label htmlFor="images">Select:</label>
          <select value={this.state.amount} onChange={this.onChangeAmount}>
            <option value="">Your Number Of Images</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </form>
        {this.state.images.length > 0 ? (
          <DisplayImages images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;

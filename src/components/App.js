import React from "react";
import SearchBar from "./SearchBar";
import places from "../apis/places";
import "../components/App.css";

class App extends React.Component {
  state = { hotels: [], food: [], interest: [], isLoading: false };

  filterData = (arr) => arr.map((item) => item.name);

  onSearchSubmit = async (type) => {
    this.setState({ isLoading: true });
    try {
      const response = await places.get(
        `http://localhost:3001/api/google/places`,
        {
          params: { type },
          headers: {
            Authorization: "AIzaSyAgyAAPxiaxnD23FRxnI03LYR7TKavLk1Q",
          },
        }
      );
      this.setState({
        hotels: this.filterData(response.data.hotels.results),
        food: this.filterData(response.data.food.results),
        interest: this.filterData(response.data.interest.results),
      });
    } catch (e) {
      alert("Something broke");
    } finally {
      this.setState({ isLoading: false });
    }
  };
  render() {
    return (
      <div
        className="ui container"
        style={{ marginTop: "10px", background: "white" }}
      >
        <SearchBar onSubmit={this.onSearchSubmit} />
        {this.state.isLoading ? (
          <p>Loading....</p>
        ) : (
          <>
            <h1>Hotels</h1>
            <pre style={{ background: "white" }}>
              {JSON.stringify(this.state.hotels, null, 2)}
            </pre>
            <h1>Food</h1>
            <pre style={{ background: "white" }}>
              {JSON.stringify(this.state.food, null, 2)}
            </pre>
            <h1>Points of Interest</h1>
            <pre style={{ background: "white" }}>
              {JSON.stringify(this.state.interest, null, 2)}
            </pre>
          </>
        )}
      </div>
    );
  }
}

export default App;

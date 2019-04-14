import React, { Component } from 'react';
import Table from './Table/Table';
import BarChart from './BarChart/BarChart';
import classes from './App.module.scss';
import SelectMenu from './BarChart/SelectMenu/SelectMenu';

const listItems = {
  fruits: {},
  gender: {},
  color: {}
};

class App extends Component {
  state = {
    data: [],
    initialData: [],
    genderSelection: 'select',
    colorSelection: 'select',
    fruitSelection: 'select'
  };

  componentDidMount = () => {
    const data = require('./data.json');
    this.setState({ data, initialData: data });

    data.forEach(el => {
      if (!listItems.fruits[el.favoriteFruit]) {
        listItems.fruits[el.favoriteFruit] = { male: 0, female: 0, total: 0 };
      }
      listItems.fruits[el.favoriteFruit][`${el.gender}`]++;
      listItems.fruits[el.favoriteFruit]['total']++;

      if (!listItems.color[el.favoriteColor]) {
        listItems.color[el.favoriteColor] = { male: 0, female: 0, total: 0 };
      }
      listItems.color[el.favoriteColor][`${el.gender}`]++;
      listItems.color[el.favoriteColor]['total']++;

      if (!listItems.gender[el.gender]) {
        listItems.gender[el.gender] = 0;
      }
      listItems.gender[el.gender]++;
    });
  };

  menuHandler = async (event, type) => {
    if (type === 'gender') {
      this.setState({ genderSelection: event.target.value });
    }

    if (type === 'color') {
      this.setState({ colorSelection: event.target.value });
    }

    if (type === 'fruit') {
      this.setState({ fruitSelection: event.target.value });
    }
  };

  applyHandler = () => {
    this.setState({ data: null });
    if (
      this.state.genderSelection !== 'select' &&
      this.state.colorSelection !== 'select' &&
      this.state.fruitSelection !== 'select'
    ) {
      this.setState({
        data: this.state.initialData.filter(el => {
          return (
            el.gender === this.state.genderSelection &&
            el.favoriteColor === this.state.colorSelection &&
            el.favoriteFruit === this.state.fruitSelection
          );
        })
      });
    }

    if (
      this.state.genderSelection !== 'select' &&
      this.state.colorSelection !== 'select' &&
      this.state.fruitSelection === 'select'
    ) {
      this.setState({
        data: this.state.initialData.filter(el => {
          return (
            el.gender === this.state.genderSelection &&
            el.favoriteColor === this.state.colorSelection
          );
        })
      });
    }

    if (
      this.state.genderSelection !== 'select' &&
      this.state.colorSelection === 'select' &&
      this.state.fruitSelection !== 'select'
    ) {
      this.setState({
        data: this.state.initialData.filter(el => {
          return (
            el.gender === this.state.genderSelection &&
            el.favoriteFruit === this.state.fruitSelection
          );
        })
      });
    }

    if (
      this.state.genderSelection === 'select' &&
      this.state.colorSelection !== 'select' &&
      this.state.fruitSelection !== 'select'
    ) {
      this.setState({
        data: this.state.initialData.filter(el => {
          return (
            el.favoriteColor === this.state.colorSelection &&
            el.favoriteFruit === this.state.fruitSelection
          );
        })
      });
    }

    if (
      this.state.genderSelection !== 'select' &&
      this.state.colorSelection === 'select' &&
      this.state.fruitSelection === 'select'
    ) {
      this.setState({
        data: this.state.initialData.filter(
          el => el.gender === this.state.genderSelection
        )
      });
    }

    if (
      this.state.genderSelection === 'select' &&
      this.state.colorSelection === 'select' &&
      this.state.fruitSelection !== 'select'
    ) {
      this.setState({
        data: this.state.initialData.filter(
          el => el.favoriteFruit === this.state.fruitSelection
        )
      });
    }
    if (
      this.state.genderSelection === 'select' &&
      this.state.colorSelection !== 'select' &&
      this.state.fruitSelection === 'select'
    ) {
      this.setState({
        data: this.state.initialData.filter(
          el => el.favoriteColor === this.state.colorSelection
        )
      });
    }

    if (
      this.state.genderSelection === 'select' &&
      this.state.colorSelection === 'select' &&
      this.state.fruitSelection === 'select'
    ) {
      this.setState({
        data: this.state.initialData
      });
    }
  };

  render() {
    return (
      <div className={classes.App}>
        <div>
          <SelectMenu
            changed={event => this.menuHandler(event, 'gender')}
            labels={Object.keys(listItems.gender)}
            category='Gender'
            filter={this.state.filterGender}
          />
          <SelectMenu
            changed={event => this.menuHandler(event, 'color')}
            labels={Object.keys(listItems.color)}
            category='Color'
            filter={this.state.filterColor}
          />
          <SelectMenu
            changed={event => this.menuHandler(event, 'fruit')}
            labels={Object.keys(listItems.fruits)}
            category='Fruit'
            filter={this.state.filterFruit}
          />
          <button
            style={{ marginTop: '50px', marginBottom: '20px' }}
            onClick={this.applyHandler}
          >
            Apply
          </button>
        </div>
        <div>
          <Table data={this.state.data} />
          <BarChart data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;

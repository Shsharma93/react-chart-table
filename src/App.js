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
      await this.setState({ genderSelection: event.target.value });
      this.applyHandler();
    }

    if (type === 'color') {
      await this.setState({ colorSelection: event.target.value });
      this.applyHandler();
    }

    if (type === 'fruit') {
      await this.setState({ fruitSelection: event.target.value });
      this.applyHandler();
    }
  };

  filterGenderData = (data, genderInState) => {
    if (genderInState === 'select') return data;
    return data.filter(el => el.gender === genderInState);
  };

  filterColorData = (data, colorInState) => {
    if (colorInState === 'select') return data;
    return data.filter(el => el.favoriteColor === colorInState);
  };
  filterFruitData = (data, fruitInState) => {
    if (fruitInState === 'select') return data;
    return data.filter(el => el.favoriteFruit === fruitInState);
  };

  applyHandler = () => {
    const genderData = this.filterGenderData(
      this.state.initialData,
      this.state.genderSelection
    );
    const colorData = this.filterColorData(
      genderData,
      this.state.colorSelection
    );
    const fruitData = this.filterFruitData(
      colorData,
      this.state.fruitSelection
    );
    this.setState({ data: fruitData });
  };

  render() {
    return (
      <div className={classes.App}>
        <div style={{ marginTop: '50px', marginBottom: '20px' }}>
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

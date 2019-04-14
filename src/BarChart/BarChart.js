import React, { Component } from 'react';
import { Bar } from 'react-chartjs-3';
import classes from './BarChart.module.scss';
import RadioButton from './RadioButton/RadioButton';
import { options } from '../graphOptions';

let listItems = {
  fruits: {},
  gender: {},
  color: {}
};

class BarChart extends Component {
  state = {
    colorChecked: false,
    fruitChecked: true,
    labels: null,
    males: null,
    females: null,
    total: null,
    data: {
      labels: [],
      datasets: [
        {
          label: '',
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          data: []
        }
      ]
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevProps.gender === this.props.gender &&
      prevProps.color === this.props.color &&
      prevProps.fruits === this.props.fruits
    )
      return;

    await this.colorCheckedHandler();
  };

  componentDidMount = async () => {
    this.colorCheckedHandler();
  };

  colorCheckedHandler = async () => {
    this.state.colorChecked
      ? await this.chartHandler('color')
      : await this.chartHandler('fruit');
  };

  clearListItemsHandler = () => {
    listItems = {
      fruits: {},
      gender: {},
      color: {}
    };
  };

  assignGraphValueHandler = async type => {
    let labels, colorChecked, fruitChecked;
    if (type === 'color') {
      labels = Object.keys(listItems.color);
      colorChecked = true;
      fruitChecked = false;
      options.title.text = 'Colors - Gender Chart';
    } else if (type === 'fruits') {
      labels = Object.keys(listItems.fruits);
      colorChecked = false;
      fruitChecked = true;
      options.title.text = 'Fruits - Gender Chart';
    }
    await this.setState({
      colorChecked,
      fruitChecked,
      labels,
      males: listItems.gender.map(el => {
        return el.male;
      }),
      females: listItems.gender.map(el => {
        return el.female;
      }),
      total: listItems.gender.map(el => {
        return el.total;
      })
    });
  };

  chartHandler = async type => {
    if (type === 'fruit' && this.props.data !== null) {
      this.clearListItemsHandler();
      await this.setState({ male: 0, female: 0, total: 0, labels: null });
      this.props.data.forEach(el => {
        if (!listItems.fruits[el.favoriteFruit]) {
          listItems.fruits[el.favoriteFruit] = { male: 0, female: 0, total: 0 };
        }
        listItems.fruits[el.favoriteFruit][`${el.gender}`]++;
        listItems.fruits[el.favoriteFruit]['total']++;
      });

      listItems.gender = Object.keys(listItems.fruits).map(el => {
        return listItems.fruits[el];
      });

      await this.assignGraphValueHandler('fruits');
    }

    if (type === 'color' && this.props.data !== null) {
      this.clearListItemsHandler();
      await this.setState({ male: 0, female: 0, total: 0, labels: null });
      this.props.data.forEach(el => {
        if (!listItems.color[el.favoriteColor]) {
          listItems.color[el.favoriteColor] = { male: 0, female: 0, total: 0 };
        }
        listItems.color[el.favoriteColor][`${el.gender}`]++;
        listItems.color[el.favoriteColor]['total']++;
      });

      listItems.gender = Object.keys(listItems.color).map(el => {
        return listItems.color[el];
      });

      await this.assignGraphValueHandler('color');
    }
    this.showChart();
  };

  showChart = () => {
    const input = {
      labels: this.state.labels,
      datasets: [
        {
          label: 'Male',
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          data: this.state.males,
          hoverBorderWidth: 2,
          hoverBorderColor: 'black'
        },
        {
          label: 'Female',
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          data: this.state.females,
          hoverBorderWidth: 2,
          hoverBorderColor: 'black'
        }
      ]
    };
    this.setState({ data: input });
  };

  render() {
    return (
      <div style={{ marginTop: '100px', marginBottom: '30px' }}>
        <div>
          <h4 style={{ display: 'inline', marginRight: '40px' }}>
            Chart Options :{' '}
          </h4>
          <RadioButton
            type={'Fruit Chart'}
            checked={this.state.fruitChecked}
            click={event => this.chartHandler('fruit')}
          />
          <RadioButton
            type={'Color Chart'}
            checked={this.state.colorChecked}
            click={event => this.chartHandler('color')}
          />
        </div>

        <Bar
          width={50}
          height={20}
          className={classes.barChart}
          data={this.state.data}
          options={options}
        />
      </div>
    );
  }
}

export default BarChart;

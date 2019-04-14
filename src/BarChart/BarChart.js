import React, { Component } from 'react';
import { Bar } from 'react-chartjs-3';
import classes from './BarChart.module.scss';
import RadioButton from './Button/RadioButton';

let listItems = {
  fruits: {},
  gender: {},
  color: {}
};

class BarChart extends Component {
  state = {
    colorChecked: true,
    fruitChecked: false,
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
    },
    options: {
      legend: {
        position: 'bottom'
      },
      layout: {
        padding: {
          left: 100,
          right: 100,
          top: 70,
          bottom: 0
        }
      },
      animation: {
        duration: 2000
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  };

  componentDidMount = async () => {
    await this.chartHandler('color');
  };

  chartHandler = async type => {
    if (type === 'fruit' && this.props.data !== null) {
      listItems = {
        fruits: {},
        gender: {},
        color: {}
      };
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

      await this.setState({
        colorChecked: false,
        fruitChecked: true,
        labels: Object.keys(listItems.fruits),
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
    }

    if (type === 'color' && this.props.data !== null) {
      listItems = {
        fruits: {},
        gender: {},
        color: {}
      };
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

      await this.setState({
        colorChecked: true,
        fruitChecked: false,
        labels: Object.keys(listItems.color),
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
    }
    this.test();
  };

  test = () => {
    const input = {
      labels: this.state.labels,
      datasets: [
        {
          label: 'Male',
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          data: this.state.males
        },
        {
          label: 'Female',
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          data: this.state.females
        }
      ]
    };
    this.setState({ data: input });
  };

  render() {
    return (
      <div style={{ marginTop: '50px', marginBottom: '100px' }}>
        <div>
          <RadioButton
            type={'Color Chart'}
            checked={this.state.colorChecked}
            click={event => this.chartHandler('color')}
          />
          <RadioButton
            type={'Fruit Chart'}
            checked={this.state.fruitChecked}
            click={event => this.chartHandler('fruit')}
          />
        </div>

        <Bar
          width={50}
          height={20}
          className={classes.barChart}
          data={this.state.data}
          options={this.state.options}
        />
      </div>
    );
  }
}

export default BarChart;

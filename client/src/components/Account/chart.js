import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class EmployeesChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBar: {
        labels: this.props.date,
        datasets: [
          {
            label: "Account balance",
            data: this.props.balance,
            fill: false, // Don't fill area under the line
            borderColor: "#8c2b39" // Line color
          }
        ]
      },

      ChartOptions: {
        responsive: true,
        fill: false,
        maintainAspectRatio: false
      }
    };
  }

  render() {
    return (
      <MDBContainer
        style={{
          height: "400px"
        }}
      >
        <Line data={this.state.dataBar} options={this.state.ChartOptions} />
      </MDBContainer>
    );
  }
}

export default EmployeesChart;

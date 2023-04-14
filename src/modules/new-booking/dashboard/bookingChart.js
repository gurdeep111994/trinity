import React, { Component } from 'react';
import { Chart } from 'react-chartjs-2';

// const dummyData = [20, 45, 36, 25,];
const scales = {
	xAxes: [
		{
			gridLines: {
				drawOnChartArea: false,
				offsetGridLines: false // remove xAxes gridLines only
			},
			barPercentage: 1.0, // Adjust width of bars in graph.
			categoryPercentage: 0.95 // Adjust gap between bars in graph.
		}
	],
	yAxes: [
		{
			display: false, // remove yAxes gridLines and labels
			ticks: {
				beginAtZero: true
			}
		}
	]
};
const labels = ['Jan', 'Fev', 'Mar', 'Avr'];

var my_graph;
export default class BookingGraph extends Component {
	constructor(props) {
		super(props);
		this.state = { is_data: false };
	}

	componentDidUpdate() {
		console.log('Check Props', this.props);
		let prps = this.props;
		let data = [20, 45, 36, 25];

		// if (prps.plotData && prps.plotData.activities) {
		//     data = CurrentYearData(prps.plotData.activities, prps.graphYear);
		//     if(data.length == 0){
		//         data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		//     }

		//     if (data.length > 0 && !this.state.is_data) {
		//         this.setState({ is_data: true })
		//     } else if (data.length === 0 && this.state.is_data) {
		//         this.setState({ is_data: false })
		//     }

		var chartData = {
			labels: labels,
			datasets: [
				{
					label: 'Votre activité',
					backgroundColor: 'rgba(239,228,211,1)',
					data: data
				}
			]
		};

		var options = {
			legend: {
				display: false
			},
			tooltips: {
				enabled: false
			},
			showDatapoints: true,
			maintainAspectRatio: false,
			hover: {
				animationDuration: 1
			},
			scales: scales,
			animation: {
				duration: 1,
				onComplete: function() {
					var chartInstance = this.chart,
						ctx = chartInstance.ctx;
					ctx.font = Chart.helpers.fontString(
						Chart.defaults.global.defaultFontSize,
						Chart.defaults.global.defaultFontStyle,
						Chart.defaults.global.defaultFontFamily
					);
					ctx.textAlign = 'center';
					ctx.textBaseline = 'bottom';

					this.data.datasets.forEach(function(dataset, i) {
						var meta = chartInstance.controller.getDatasetMeta(i);
						meta.data.forEach(function(bar, index) {
							var data = dataset.data[index] + '€';
							ctx.beginPath();
							ctx.font = 'bold 11px Arial';
							ctx.fillStyle = 'rgba(0,0,0, 1)';
							ctx.fillText(data, bar._view.x, bar._yScale.bottom - 20);

							ctx.beginPath();
							ctx.fillStyle = 'rgba(213,202,138, 1)';
							ctx.arc(bar._view.x, bar._yScale.bottom, 5, 0, 2 * Math.PI);

							ctx.fill();
						});
					});
				}
			}
		};

		// if(this.state.is_data){
		//     if(my_graph){
		//         my_graph.destroy();
		//     }
		var ctx = document.getElementById('barChart');
		my_graph = new Chart(ctx, {
			type: 'bar',
			data: chartData,
			options: options
		});

		// }

		// }
	}

	render() {
		return (
			<div>
				<canvas id="barChart" width={100} height={400}></canvas>
			</div>
		);
	}
}

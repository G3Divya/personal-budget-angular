import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'chartjs-chart',
  template: '<canvas id="myChart" width="400" height="400"></canvas>',
})
export class ChartjsChartComponent implements AfterViewInit {
  public dataSource = {
    datasets: [
      {
        data: [30, 350, 90],
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19'],
      },
    ],
    labels: ['Eat out', 'Rent', 'Groceries'],
  };

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      for (let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
    });
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource,
    });
  }
}
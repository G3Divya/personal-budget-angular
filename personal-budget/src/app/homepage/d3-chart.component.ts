import { Component, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests

@Component({
  selector: 'd3-chart',
  template: '<figure id="pie"></figure>',
})
export class D3ChartComponent implements AfterViewInit {
  // D3.js code here
  private data: any[] = [
    { Stars: 5, Framework: 'Eat out' },
    { Stars: 4, Framework: 'Rent' },
    { Stars: 3, Framework: 'Groceries' },
  ];

  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;

  private createSvg(): void {
    this.svg = d3
      .select('figure#pie')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.data.map((d: any) => d.Stars.toString()))
      .range(['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19']);
  }

  private drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.Stars));

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (d: any, i: any) => this.colors(i))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    const labelLocation = d3.arc().innerRadius(100).outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text((d: any) => d.data.Framework)
      .attr('transform', (d: any) => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('font-size', 15);
  }

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    // Assuming you want to fetch data from the server and update this.data
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      // Assuming your API response is an array of budget items
      this.data = res;
      this.createSvg();
      this.createColors();
      this.drawChart();
    });
  }
}
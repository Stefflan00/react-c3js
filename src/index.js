import React from 'react';
import { findDOMNode } from 'react-dom';
import c3 from 'c3';

class C3Chart extends React.Component {
  static get displayName() {
    return 'C3Chart';
  }

  static get propTypes() {
    return {
      data: React.PropTypes.object.isRequired,
      title: React.PropTypes.object,
      size: React.PropTypes.object,
      padding: React.PropTypes.object,
      color: React.PropTypes.object,
      interaction: React.PropTypes.object,
      transition: React.PropTypes.object,
      oninit: React.PropTypes.func,
      onrendered: React.PropTypes.func,
      onmouseover: React.PropTypes.func,
      onmouseout: React.PropTypes.func,
      onresize: React.PropTypes.func,
      onresized: React.PropTypes.func,
      axis: React.PropTypes.object,
      grid: React.PropTypes.object,
      regions: React.PropTypes.array,
      legend: React.PropTypes.object,
      tooltip: React.PropTypes.object,
      subchart: React.PropTypes.object,
      zoom: React.PropTypes.object,
      point: React.PropTypes.object,
      line: React.PropTypes.object,
      area: React.PropTypes.object,
      bar: React.PropTypes.object,
      pie: React.PropTypes.object,
      donut: React.PropTypes.object,
      gauge: React.PropTypes.object,
      className: React.PropTypes.string,
      style: React.PropTypes.object,
      focusId : React.PropTypes.string,
    };
  }

  componentDidMount() {
    this.updateChart(this.props);
    if (this.props.focusId) {
      this.focus(this.props.focusId)
    }
  }

  componentWillReceiveProps(newProps) {
    this.updateChart(newProps);
  }

  componentWillUnmount() {
    this.destroyChart();
  }

  generateChart(mountNode, config) {
    const newConfig = Object.assign({ bindto: mountNode }, config);
    return c3.generate(newConfig);
  }

  loadNewData(data) {
    this.chart.load(data);
  }

  focus(id) {
    this.chart.focus(id)
  }

  updateChart(config) {
    if (!this.chart) {
      this.chart = this.generateChart(findDOMNode(this), config);
    }
    this.loadNewData(config.data);
  }

  destroyChart() {
    try {
      this.chart = this.chart.destroy();
    } catch (err) {
      throw new Error('Internal C3 error', err);
    }
  }

  render() {
    const className = this.props.className
      ? ` ${this.props.className}`
      : '';
    const style = this.props.style
      ? this.props.style
      : {};
    return <div className={className} style={style} />;
  }
}

export default C3Chart;

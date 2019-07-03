import React, { Component } from 'react';
import apdexHappy from './apdex_happy.svg';
import apdexSmail from './apdex_smail.svg';
import apdexNormal from './apdex_normal.svg';
import apdexSad from './apdex_sad.svg';
import './index.css';
import ReactEcharts from 'echarts-for-react';

class ApdexPage extends Component {
    render() {
        const { apdexArr, chartHeight } = this.props;
        return (
            <div className='apdexPage'>
                <p className='appTitle' style={{ marginLeft: '6px', paddingTop: 0 }}>Apdex指数</p>
                <div className='apdexEcharts'>{/* avgValue */}
                    <div className='pie_box'>
                        <div style={{ width: '70px', height: '70px' }}>
                            <ReactEcharts
                                option={{
                                    tooltip: {
                                        formatter: (res) => {
                                            return `<div style="height:36px;border-radius:5px;background:#fff;box-shadow:0 0 10px 5px #aaa;font-size: 12px;padding: 6px 20px;box-sizing:border-box;color:#000">
                                                <p>${res.name} ${res.value}</p>
                                            </div>`
                                        }
                                    },
                                    series: [
                                        {
                                            type: 'pie',
                                            radius: ['60%', '80%'],
                                            avoidLabelOverlap: false,
                                            startAngle: 225,
                                            color: [apdexArr.avgValue > 0.98 && apdexArr.avgValue <= 1 ? '#2AB06F' : apdexArr.avgValue > 0.89 && apdexArr.avgValue <= 0.98?'#6BCB8B':apdexArr.avgValue > 0.7 && apdexArr.avgValue <= 0.89?'#FFE11C':'#EF651F', 'transparent'],
                                            hoverAnimation: false,
                                            legendHoverLink: false,
                                            label: {
                                                normal: {
                                                    show: false,
                                                    position: 'center'
                                                },
                                                emphasis: {
                                                    show: true,
                                                    textStyle: {
                                                        fontSize: '30',
                                                        fontWeight: 'bold'
                                                    }
                                                }
                                            },
                                            labelLine: {
                                                normal: {
                                                    show: false
                                                }
                                            },
                                            data: [{
                                                value: 70
                                            }, {
                                                value: 25
                                            }]
                                        },
                                        {
                                            type: 'pie',
                                            radius: ['60%', '80%'],
                                            avoidLabelOverlap: false,
                                            startAngle: 317,
                                            color: ['#d3d3d3', 'transparent'],
                                            hoverAnimation: false,
                                            legendHoverLink: false,
                                            clockwise: false,
                                            z: 10,
                                            labelLine: {
                                                normal: {
                                                    show: false
                                                }
                                            },
                                            data: [{
                                                value: parseFloat((100 - apdexArr.avgValue * 100) * 317 / 360).toFixed(2),
                                                // value: 50,
                                                name: '剩余：'
                                            }, {
                                                // value: 50,
                                                value: 100 - parseFloat((100 - apdexArr.avgValue * 100) * 317 / 360).toFixed(2),
                                                name: '占比：'
                                            }]
                                        }
                                    ]
                                }} />
                        </div>
                        <div className='pie_value'>
                            <h2>{apdexArr.avgValue}</h2>
                            <p>{apdexArr.avgValue > 0.98 && apdexArr.avgValue <= 1 ? '非常优秀' : apdexArr.avgValue > 0.89 && apdexArr.avgValue <= 0.98?'优秀':apdexArr.avgValue > 0.7 && apdexArr.avgValue <= 0.89?'一般':'差'}</p>
                        </div>
                    </div>
                    <div className='emotions'>
                        <div style={{ width: '70px', height: '70px' }}>
                            <ReactEcharts
                                option={{
                                    tooltip: {
                                        formatter: (res) => {
                                            return `<div style="height:36px;border-radius:5px;background:#fff;box-shadow:0 0 10px 5px #aaa;font-size: 12px;padding: 6px 20px;box-sizing:border-box;color:#000">
                                                <p>${res.name}: ${res.value}</p>
                                            </div>`
                                        }
                                    },
                                    series: [{
                                        type: 'pie',
                                        hoverAnimation: false,
                                        radius: ['60%', '80%'],
                                        color: ['#2AB06F', '#6BCB8B', '#FFE11C', '#EF651F'],
                                        label: {
                                            normal: {
                                                position: 'inner',
                                                show: false,
                                                textStyle: {
                                                    color: '#fff',
                                                    fontSize: 12
                                                }
                                            }
                                        },
                                        labelLine: {
                                            normal: {
                                                show: false
                                            }
                                        },
                                        data: [{
                                            value: apdexArr.perfect,
                                            name: '优秀'
                                        }, {
                                            value: apdexArr.good,
                                            name: '良好'
                                        }, {
                                            value: apdexArr.normal,
                                            name: '一般'
                                        }, {
                                            value: apdexArr.poor,
                                            name: '较差'
                                        }]
                                    }]
                                }} />
                        </div>
                        <div style={{ marginTop: '-20px' }}>
                            <div className='expre_box'>
                                <span>{apdexArr.perfect}%</span>
                                <img src={apdexHappy} className='expression' alt='??' />
                            </div>
                            <div className='expre_box'>
                                <span>{apdexArr.good}%</span>
                                <img src={apdexSmail} className='expression' alt='??' />
                            </div>
                            <div className='expre_box'>
                                <span>{apdexArr.normal}%</span>
                                <img src={apdexNormal} className='expression' alt='??' />
                            </div>
                            <div className='expre_box'>
                                <span>{apdexArr.poor}%</span>
                                <img src={apdexSad} className='expression' alt='??' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='apdexCharts'>
                    <div style={{ height: chartHeight ? chartHeight : '160px' }}>
                        <ReactEcharts
                            option={{
                                tooltip: {
                                    trigger: 'axis',
                                    formatter: (params) => {
                                        return `<div style="height:80px;border-radius:5px;background:#fff;box-shadow:0 0 10px 5px #aaa;font-size: 12px;padding: 6px 20px;box-sizing:border-box;color:#000">
                                                <p>${params[0].axisValueLabel}</p>
                                                <p>${params[0].seriesName} ${params[0].data}</p>
                                            </div>`
                                    },
                                },
                                legend: {
                                    x: '42%',
                                    bottom: '0',
                                    textStyle: {
                                        color: '#fff',
                                    },
                                    data: ['Apdex指数']
                                },
                                grid: {
                                    top: 40,
                                    left: 50,
                                    right: 20
                                },
                                xAxis: [{
                                    type: 'category',
                                    boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                            width: 0
                                        },
                                    },
                                    splitLine: {     //网格线
                                        show: false
                                    },
                                    axisLabel: {
                                        fontSize: 10
                                    },
                                    axisTick: {
                                        show: false
                                    },
                                    data: apdexArr.time
                                }],
                                yAxis: [{
                                    type: "value",
                                    name: "单位" + apdexArr.unit,
                                    max: 1,
                                    nameTextStyle: {
                                        color: "transparent"
                                    },
                                    splitLine: {
                                        show: false
                                    },
                                    axisLine: {
                                        show: false,
                                        lineStyle: {
                                            color: '#transparent'
                                        }
                                    },
                                    axisTick: {
                                        show: false
                                    },
                                    splitArea: {
                                        show: false
                                    },
                                }],
                                series: [{
                                    name: 'Apdex指数',
                                    type: 'line',
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 5,
                                    showSymbol: false,
                                    lineStyle: {
                                        normal: {
                                            width: 1
                                        }
                                    },
                                    areaStyle: {
                                        normal: {
                                            color: 'rgb(51,65,126)',
                                            shadowBlur: 10
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: {
                                                type: 'linear',
                                                x: 0,
                                                y: 0,
                                                x2: 0,
                                                y2: 1,
                                                colorStops: [{
                                                    offset: 0, color: '#3854CB' // 0% 处的颜色
                                                }, {
                                                    offset: 1, color: 'rgba(56,84,203, .37)' // 100% 处的颜色
                                                }]
                                            },
                                            borderWidth: 12
                                        }
                                    },
                                    data: apdexArr.value
                                }
                                ]
                            }} />
                    </div>
                    <ul className='colorBlock'>
                        <li><span style={{fontSize: '12px'}}>1.0</span></li>
                        <li><span style={{fontSize: '12px'}}>0.98</span></li>
                        <li><span style={{fontSize: '12px'}}>0.89</span></li>
                        <li><span style={{fontSize: '12px'}}>0.7</span></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default ApdexPage;
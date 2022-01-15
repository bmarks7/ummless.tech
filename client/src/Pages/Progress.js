import React, { Component } from 'react'
import Graph from '../components/Graphs';
import Table from '../components/Table.tsx'
import '../Styles/Progress.scss'

export default class Progress extends Component {
    render() {
        return (
            <div className='progressPage'>
                <div className="progressPage__progress">
                    <p className='progressPage__progressHeader'>Track Your Progress</p>
                    <div className="progressPage__progressCharts">
                        <Graph/>
                    </div>
                </div>

                <div className="progressPage__pastSpeeches">
                    <p className="progressPage__pastSpeechesHeader">Past Speeches</p>
                    <div className="progressPage__pastSpeechesTable">
                        <Table />
                    </div>
                </div>
            </div>
        )
    }
}

import React, { useState } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

export default function Table() {

  // const pastSpeeches = [
  //   {SpeechId: 'id', link: 'link', createdAt: 'today', userId: 'randomUser', score: 80, averageWPM: 40, averageSentiment: 0.4, NumFillerWords: 4}, 
  //   {SpeechId: 'id2', link: 'link2', createdAt: 'yesterday', userId: 'randomUser2', score: 75, averageWPM: 50, averageSentiment: 0.2, NumFillerWords: 5}
  // ]

  // const columns = [
  //   {headerName: 'SpeechId', field: 'SpeechId'},
  //   {headerName: 'Link', field: 'link'},
  //   {headerName: 'Created At', field: 'createdAt'},
  //   {headerName: 'User ID', field: 'userId'},
  //   {headerName: 'Score', field: 'score'},
  //   {headerName: 'Average WPM', field: 'averageWPM'},
  //   {headerName: 'Average Sentiment', field: 'averageSentiment'},
  //   {headerName: 'Number of Filler Words', field: 'NumFillerWords'}
  // ]

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const rowSelected = () => {
    const selectedRows = gridApi.getSelectedRows();
    console.log(selectedRows[0])
    // document.querySelector('#selectedRows').innerHTML =
    //   selectedRows.length === 1 ? selectedRows[0].athlete : '';
  };

  const TableColumnDefs = [
    {headerName: 'SpeechId', field: 'SpeechId'},
    {headerName: 'Link', field: 'link'},
    {headerName: 'Created At', field: 'createdAt'},
    {headerName: 'User ID', field: 'userId'},
    {headerName: 'Score', field: 'score'},
    {headerName: 'Average WPM', field: 'averageWPM'},
    {headerName: 'Average Sentiment', field: 'averageSentiment'},
    {headerName: 'Number of Filler Words', field: 'NumFillerWords'}
  ]

  const TableRowData = [
    {SpeechId: 'id', link: 'link', createdAt: 'today', userId: 'randomUser', score: 80, averageWPM: 40, averageSentiment: 0.4, NumFillerWords: 4}, 
    {SpeechId: 'id2', link: 'link2', createdAt: 'yesterday', userId: 'randomUser2', score: 75, averageWPM: 50, averageSentiment: 0.2, NumFillerWords: 5}
  ]

  return (
    <div className='ag-theme-balham' style={{width: 800, height: 600}}>
      <AgGridReact 
        columnDefs={TableColumnDefs}
        rowData={TableRowData}
        onSelectionChanged={rowSelected}
        onGridReady={onGridReady}
        rowSelection='single'
      />
    </div>
  )
}



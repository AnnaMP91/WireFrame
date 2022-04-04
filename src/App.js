import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from './components/PageLayout.jsx';
import DemandView from './components/DemandView.jsx';
import Login from './components/Login.jsx';
import POReview from './components/POReview.jsx';
import ActionReview from './components/actions/ActionReview.jsx';

const dummyData = [
  { pid: 123456, code: 1234, pub: 'Penguin', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 465879, code: 1234, pub: 'Random House', skuType: '01', title: 'Stardust', ordered: 1000, demand: 7000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 970483, code: 1234, pub: 'Simon and Shuster', skuType: '01', title: 'Dune', ordered: 3000, demand: 6000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 679525, code: 1234, pub: 'Harper Collins', skuType: '01', title: 'A Knife of Dreams', ordered: 6000, demand: 9000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 243556, code: 1234, pub: 'Penguin', skuType: '01', title: 'Storm Light', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 465879, code: 1234, pub: 'Penguin', skuType: '01', title: 'Way of the Shadows', ordered: 4000, demand: 4000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 756342, code: 1234, pub: 'Random House', skuType: '01', title: 'Gone Girl', ordered: 9000, demand: 9000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 352375, code: 1234, pub: 'Penguin', skuType: '01', title: 'Clifford', ordered: 500, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 960463, code: 1234, pub: 'Harper Collins', skuType: '01', title: 'Harry Potter and the Chamber of Secrets', ordered: 2000, demand: 3000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 960463, code: 1234, pub: 'Harper Collins', skuType: '01', title: 'Harry Potter and the Chamber of Secrets', ordered: 2000, demand: 2000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 123456, code: 1234, pub: 'Penguin', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 1000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 465879, code: 1234, pub: 'Random House', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 300, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 970483, code: 1234, pub: 'Simon and Shuster', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 679525, code: 1234, pub: 'Harper Collins', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 243556, code: 1234, pub: 'Penguin', skuType: '01', title: 'Storm Light', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 465879, code: 1234, pub: 'Penguin', skuType: '01', title: 'Way of the Shadows', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 756342, code: 1234, pub: 'Random House', skuType: '01', title: 'Gone Girl', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 352375, code: 1234, pub: 'Penguin', skuType: '01', title: 'Clifford', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 960463, code: 1234, pub: 'Harper Collins', skuType: '01', title: 'Harry Potter and the Chamber of Secrets', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 }
];


export default function App() {

  const [demandViewRows, setDemandViewRows] = useState(dummyData);
  const [actionViewRows, setActionViewRows] = useState([]);

  //  d( ´ ▽ ` )b

  const handlePushToActions = (indexes) => {
    setDemandViewRows((prevState) => {
      let keys = Object.keys(indexes);
      for (let i = 0; i < keys.length; i++) {
        prevState.splice(keys[i], 1)
      }
      return prevState;
    })
  }

  return (

    <Routes>
      <Route path='/' element={<Login />} />
      <Route element={<PageLayout />} >
        <Route path='/demandview'
          element={<DemandView
            rows={demandViewRows}
            setRows={setDemandViewRows}
            setActionRows={setActionViewRows}
            actionViewRows={actionViewRows}
            handlePushToActions={handlePushToActions}
          />} />
        {/* <Route path='/poreview' element={<POReview />} /> */}
        <Route path='/actionreview' element={<ActionReview
          rows={actionViewRows}
          setRows={setActionViewRows} />} />
      </Route>
    </Routes>


  );
}



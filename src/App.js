import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from './components/PageLayout.jsx';
import DemandView from './components/DemandView.jsx';
import Login from './components/Login.jsx';
import POReview from './components/POReview.jsx';
import ActionReview from './components/ActionReview.jsx';

const dummyData = [
  { pid: 123456, code: 1234, pub: 'Penguin', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 465879, code: 1234, pub: 'Random House', skuType: '01', title: 'Stardust', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 970483, code: 1234, pub: 'Simon and Shuster', skuType: '01', title: 'Dune', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 679525, code: 1234, pub: 'Harper Collins', skuType: '01', title: 'A Knife of Dreams', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  { pid: 243556, code: 1234, pub: 'Penguin', skuType: '01', title: 'Storm Light', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 }
  // { pid: 465879, code: 1234, pub: 'Penguin', skuType: '01', title: 'Way of the Shadows', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  // { pid: 756342, code: 1234, pub: 'Random House', skuType: '01', title: 'Gone Girl', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  // { pid: 352375, code: 1234, pub: 'Penguin', skuType: '01', title: 'Clifford', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  // { pid: 960463, code: 1234, pub: 'Harper Collins', skuType: '01', title: 'Harry Potter and the Chamber of Secrets', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  // { pid: 960463, code: 1234, pub: 'Harper Collins', skuType: '01', title: 'Harry Potter and the Chamber of Secrets', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  // { pid: 123456, code: 1234, pub: 'Penguin', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  // { pid: 465879, code: 1234, pub: 'Random House', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  // { pid: 970483, code: 1234, pub: 'Simon and Shuster', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  // { pid: 679525, code: 1234, pub: 'Harper Collins', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  // { pid: 243556, code: 1234, pub: 'Penguin', skuType: '01', title: 'Storm Light', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  // { pid: 465879, code: 1234, pub: 'Penguin', skuType: '01', title: 'Way of the Shadows', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  // { pid: 756342, code: 1234, pub: 'Random House', skuType: '01', title: 'Gone Girl', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  // { pid: 352375, code: 1234, pub: 'Penguin', skuType: '01', title: 'Clifford', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 },
  // { pid: 960463, code: 1234, pub: 'Harper Collins', skuType: '01', title: 'Harry Potter and the Chamber of Secrets', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, subclass: 333, buyerNum: 216, poNum: 546738 }
];


export default function App() {

  const [demandViewRows, setDemandViewRows] = useState(dummyData);
  const [actionViewRows, setActionViewRows] = useState([]);

  return (

    <Routes>
      <Route path='/' element={<Login />} />
      <Route element={<PageLayout />} >
        <Route path='/demandview' element={<DemandView
          rows={demandViewRows}
          setRows={setDemandViewRows}
          setActionRows={setActionViewRows}
          actionViewRows={actionViewRows} />} />
        <Route path='/poreview' element={<POReview />} />
        <Route path='/actionreview' element={<ActionReview rows={actionViewRows} setRows={setActionViewRows} />} />
      </Route>
    </Routes>


  );
}



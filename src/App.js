import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from './components/PageLayout.jsx';
import DemandView from './components/DemandView.jsx';
import Login from './components/Login.jsx';
import ActionReview from './components/actions/ActionReview.jsx';



const dummyData = [
  { pid: 123456, sku: 2345678, code: 'ABC', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 3000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '' },
  { pid: 465879, sku: 1345678, code: 'BCA', skuType: '01', title: 'Stardust', ordered: 3000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 970483, sku: 3345678, code: 'VRT', skuType: '01', title: 'Dune', ordered: 5000, demand: 9000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: ('48hrs') },
  { pid: 679525, sku: 5345678, code: 'BCT', skuType: '01', title: 'A Knife of Dreams', ordered: 6000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 243556, sku: 6345678, code: 'GHF', skuType: '01', title: 'Storm Light', ordered: 4000, demand: 7000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 465879, sku: 4345678, code: 'DEF', skuType: '01', title: 'Way of the Shadows', ordered: 2000, demand: 4000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 756342, sku: 9345678, code: 'GHI', skuType: '01', title: 'Gone Girl', ordered: 100, demand: 5000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 352375, sku: 2345678, code: 'JKL', skuType: '01', title: 'Clifford', ordered: 2000, demand: 2000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 960463, sku: 2345678, code: 'MNO', skuType: '01', title: 'Harry Potter and the Chamber of Secrets', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 960463, sku: 2345678, code: 'PQR', skuType: '01', title: 'Harry Potter and the Chamber of Secrets', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 123456, sku: 2345678, code: 'STU', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 200, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 465879, sku: 2345678, code: 'VWX', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 970483, sku: 2345678, code: 'YZA', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 679525, sku: 2345678, code: 'BCD', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 243556, sku: 2345678, code: 'EFG', skuType: '01', title: 'Storm Light', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 465879, sku: 2345678, code: 'HIJ', skuType: '01', title: 'Way of the Shadows', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 756342, sku: 2345678, code: 'KLM', skuType: '01', title: 'Gone Girl', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 352375, sku: 2345678, code: 'NOP', skuType: '01', title: 'Clifford', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 960463, sku: 2345678, code: 'QRS', skuType: '01', title: 'Harry Potter and the Chamber of Secrets', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' }
];


export default function App() {

  const [demandViewRows, setDemandViewRows] = useState(dummyData);
  const [actionViewRows, setActionViewRows] = useState([]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [expiration, setExpiration] = useState(0);


  // Date.prototype.addHours = function (h) {
  //   this.setHours(this.getHours() + h);
  //   return this;
  // }
  // // Set the date we're counting down to
  // var countDownDate = new Date().addHours(48);

  // // Update the count down every 1 second
  // let x = setInterval(function () {

  //   // Get today's date and time
  //   var now = new Date().getTime();

  //   // Find the distance between now and the count down date
  //   var distance = countDownDate - now;

  //   // Time calculations for days, hours, minutes and seconds

  //   setHours(Math.floor((distance % (1000 * 60 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  //   setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));


  //   // Output the result in an element with id="demo"
  //   let expirationDate = hours + 'h ' + minutes + 'm ';
  //   //console.log('expiration date: ', expirationDate);

  //   // If the count down is over, write some text
  //   if (distance < 0) {
  //     clearInterval(x);
  //     console.log('EXPIRED');
  //   }
  // }, 60000);




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



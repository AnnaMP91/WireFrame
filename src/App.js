import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from './components/PageLayout.jsx';
import DemandView from './components/DemandView.jsx';
import Login from './components/Login.jsx';
import POReview from './components/POReview.jsx';
import ActionReview from './components/actions/ActionReview.jsx';


let now = new Date().getTime();
let expiration; 
console.log('now: ', now);
//let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

const dummyData = [
  { pid: 123456, sku: 2345678, code: 'ABC', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs' },
  { pid: 465879, sku: 2345678, code: 'BCA', skuType: '01', title: 'Stardust', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 970483, sku: 2345678, code: 'VRT', skuType: '01', title: 'Dune', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 679525, sku: 2345678, code: 'BCT', skuType: '01', title: 'A Knife of Dreams', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 243556, sku: 2345678, code: 'GHF', skuType: '01', title: 'Storm Light', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 465879, sku: 2345678, code: 'DEF', skuType: '01', title: 'Way of the Shadows', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 756342, sku: 2345678, code: 'GHI', skuType: '01', title: 'Gone Girl', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 352375, sku: 2345678, code: 'JKL', skuType: '01', title: 'Clifford', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 960463, sku: 2345678, code: 'MNO', skuType: '01', title: 'Harry Potter and the Chamber of Secrets', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 960463, sku: 2345678, code: 'PQR', skuType: '01', title: 'Harry Potter and the Chamber of Secrets', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 123456, sku: 2345678, code: 'STU', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 465879, sku: 2345678, code: 'VWX', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 970483, sku: 2345678, code: 'YZA', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 679525, sku: 2345678, code: 'BCD', skuType: '01', title: 'Run Rose Run', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 243556, sku: 2345678, code: 'EFG', skuType: '01', title: 'Storm Light', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 465879, sku: 2345678, code: 'HIJ', skuType: '01', title: 'Way of the Shadows', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 756342, sku: 2345678, code: 'KLM', skuType: '01', title: 'Gone Girl', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 352375, sku: 2345678, code: 'NOP', skuType: '01', title: 'Clifford', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  },
  { pid: 960463, sku: 2345678, code: 'QRS', skuType: '01', title: 'Harry Potter and the Chamber of Secrets', ordered: 2000, demand: 8000, department: 4, subDepartment: 123, class: 234, buyerNum: 216, poNum: 546738, expiration: '48hrs'  }
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



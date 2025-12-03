import { useEffect, useRef, useState } from 'react' //外部node modules
import axios from 'axios'
import reactLogo from './assets/react.svg'  //內部src
import viteLogo from '/vite.svg'
import './App.css'
import { Modal } from 'bootstrap'
import TradingViewWidget from './TradingViewWidget'
import TradingViewWidget1 from './TradingViewWidget1'
import GetStock from './GetStockYahoo'
import YahooKline from './YahooKline'

function App() {
  const [count, setCount] = useState(0)
  const modalRef = useRef(null)
  const customModal = useRef(null)

  useEffect(() => {
    (async () => {
      try{
      const res = await axios.get('https://randomuser.me/api/');
      console.log(res.data);
      }catch(err){console.error(err)}

    })();
  }, [])

  useEffect(() => {
    console.log(modalRef.current);
    customModal.current = new Modal(modalRef.current);
    // customModal.current.show();
  }, []
  )

  const openModal = () => {
    customModal.current.show()
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React ALOHA</h1>
      <div className="card">
        <button className='btn btn-primary' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <div className="d-flex gap-2">
          <div className="box">box1</div>
          <div className="box">box2</div>
          <div className="box">box3</div>
        </div>

<button type="button" onClick={openModal} className="btn btn-primary">
  Launch demo modal
</button>

<div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
      </div>
        <div style={{ height: '600px', marginTop: '24px' }}>
          <TradingViewWidget />
          <TradingViewWidget1 />
        </div> 
        {/* <GetStock/> */}
      {/* <h1>Yahoo K 線 Demo</h1>
      <YahooKline /> */}
    </>
  )
}

export default App

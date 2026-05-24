import React from 'react';
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const breakingNews = [
    "ด่วน: ภูเขาไฟปะทุในอินโดนีเซีย ประกาศเตือนภัยสึนามิ",
    "หุ้นเทคโนโลยีไทยพุ่งรับกระแส AI บูม",
    "พบสัญญาณชีพใต้ซากปรักหักพังหลังแผ่นดินไหวในตะวันออกกลาง",
    "ราคาทองคำทำสถิติสูงสุดใหม่ทะลุ 42,000 บาท",
    "ผู้นำ G7 เตรียมประชุมนัดพิเศษถกปัญหาโลกร้อน"
  ];

  return (
    <div className="app-container">
      <div className="ambient-background"></div>
      <Header />
      <NewsTicker newsItems={breakingNews} />
      <Dashboard />
      <footer className="app-footer">
        <p>ข้อมูลจำลองเพื่อการนำเสนอเท่านั้น (Simulated Data for Demonstration)</p>
      </footer>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import './Dashboard.css';

const Dashboard = () => {
  // Simulated state to trigger re-renders to fake real-time updates
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicker(t => t + 1);
    }, 15000); // Trigger update every 15s to simulate news arriving
    return () => clearInterval(interval);
  }, []);

  // Static mocked data, but randomizing times to feel alive
  const getRandomTime = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <main className="dashboard">
      <div className="dashboard-columns">
        
        {/* Left Column: Thailand News */}
        <section className="news-column th-column">
          <div className="column-header">
            <div className="flag-icon">🇹🇭</div>
            <h2 className="column-title">สถานการณ์ในประเทศไทย</h2>
          </div>
          
          <div className="news-feed">
            <NewsCard 
              title="ธนาคารแห่งประเทศไทยเตรียมปรับอัตราดอกเบี้ยนโยบายสู้เงินเฟ้อ"
              category="เศรษฐกิจ"
              timeAgo={getRandomTime(1, 5)}
              trendLevel="high"
              color="cyan"
              summary="คณะกรรมการนโยบายการเงิน (กนง.) มีมติเตรียมแถลงการณ์ปรับอัตราดอกเบี้ยในไตรมาสหน้า เพื่อชะลอการพุ่งขึ้นของอัตราเงินเฟ้อในประเทศ"
            />
            <NewsCard 
              title="ดัชนีคุณภาพอากาศเชียงใหม่พุ่งแตะระดับสีแดงตอนเช้านี้"
              category="สิ่งแวดล้อม"
              timeAgo={getRandomTime(10, 30)}
              trendLevel="high"
              color="orange"
              summary="ฝุ่น PM 2.5 ในภาคเหนือยังคงวิกฤต กระทบต่อสุขภาพของประชาชนและบดบังทัศนวิสัย"
            />
            <NewsCard 
              title="ก้าวไกลเสนอ พ.ร.บ. สุราก้าวหน้า เข้าสู่สภาอีกครั้ง"
              category="การเมือง"
              timeAgo={getRandomTime(30, 59)}
              color="purple"
            />
            <NewsCard 
              title="เปิดตัวรถยนต์ไฟฟ้า (EV) รุ่นใหม่ ยอดจองทะลุเป้าในงาน Motor Show"
              category="เทคโนโลยี"
              timeAgo={getRandomTime(60, 120)}
              color="green"
              summary="ตลาดยานยนต์ไฟฟ้าในไทยเติบโตอย่างก้าวกระโดด ล่าสุดยอดจองรถ EV พุ่งสูงกว่าปีก่อนถึง 200%"
            />
          </div>
        </section>

        {/* Right Column: Global News */}
        <section className="news-column global-column">
          <div className="column-header">
            <div className="flag-icon">🌐</div>
            <h2 className="column-title">สถานการณ์ต่างประเทศ</h2>
          </div>
          
          <div className="news-feed">
            <NewsCard 
              title="ธนาคารกลางสหรัฐฯ (FED) ประกาศคงอัตราดอกเบี้ย"
              category="เศรษฐกิจ"
              timeAgo={getRandomTime(2, 6)}
              trendLevel="high"
              color="cyan"
              summary="FED มีมติเอกฉันท์ให้คงอัตราดอกเบี้ยนโยบาย ส่งผลให้ตลาดหุ้นดาวโจนส์ดีดตัวขึ้นเล็กน้อย"
            />
            <NewsCard 
              title="อุณหภูมิโลกทำลายสถิติสูงสุดเป็นประวัติการณ์ในรอบ 100 ปี"
              category="สิ่งแวดล้อม"
              timeAgo={getRandomTime(15, 45)}
              trendLevel="high"
              color="orange"
              summary="นักวิทยาศาสตร์เตือน ปรากฏการณ์เอลนีโญรุนแรงขึ้น ส่งผลให้ทั่วโลกเผชิญคลื่นความร้อน"
            />
            <NewsCard 
              title="ความขัดแย้งในตะวันออกกลาง: การเจรจาหยุดยิงรอบใหม่เริ่มขึ้นแล้ว"
              category="การเมือง"
              timeAgo={getRandomTime(40, 70)}
              color="purple"
            />
            <NewsCard 
              title="บริษัท AI ยักษ์ใหญ่เตรียมเปิดตัวโมเดลภาษาขนาดใหญ่รุ่นล่าสุด"
              category="เทคโนโลยี"
              timeAgo={getRandomTime(80, 150)}
              color="green"
              summary="โมเดลใหม่คาดว่าจะมีความสามารถในการเขียนโค้ดและวิเคราะห์ตรรกะได้เทียบเท่ามนุษย์"
            />
          </div>
        </section>

      </div>
    </main>
  );
};

export default Dashboard;

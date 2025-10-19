import React, { useEffect, useState } from 'react';
import { calculateDDay, formatDate, getDayOfWeek } from '../utils/helpers';
import '../styles/DateTime.css';

const DateTime: React.FC = () => {
  const weddingDate = '2026-01-25';
  const weddingDateTime = new Date('2026-01-25T14:30:00');
  const [dDay, setDDay] = useState<number>(0);

  useEffect(() => {
    const updateDDay = () => {
      setDDay(calculateDDay(weddingDate));
    };
    
    updateDDay();
    const interval = setInterval(updateDDay, 1000 * 60 * 60); // 1시간마다 업데이트
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="datetime-section section">
      <h2 className="section-title">Wedding Day</h2>
      
      <div className="datetime-content">
        <div className="dday-counter">
          <p className="dday-label">결혼식까지</p>
          <div className="dday-number">
            {dDay > 0 ? (
              <>D-{dDay}</>
            ) : dDay === 0 ? (
              <>D-Day</>
            ) : (
              <>D+{Math.abs(dDay)}</>
            )}
          </div>
          <p className="dday-sublabel">days to go</p>
        </div>
        
        <div className="divider"></div>
        
        <div className="datetime-info">
          <div className="datetime-item">
            <div className="datetime-icon">📅</div>
            <p className="datetime-date">
              {formatDate(weddingDateTime, 'YYYY년 MM월 DD일')}
            </p>
            <p className="datetime-day">{getDayOfWeek(weddingDateTime)}</p>
          </div>
          
          <div className="datetime-item">
            <div className="datetime-icon">🕐</div>
            <p className="datetime-time">오후 2시 30분</p>
            <p className="datetime-sublabel">14:30</p>
          </div>
        </div>
        
        <div className="calendar-mark">
          <div className="calendar-icon">
            <div className="calendar-header">JAN</div>
            <div className="calendar-date">25</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DateTime;


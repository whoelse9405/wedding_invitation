import React, { useEffect, useState } from 'react';
import '../styles/DateTime.css';

const DateTime: React.FC = () => {
  const weddingDateTime = new Date('2026-01-25T14:30:00');
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = weddingDateTime.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  // 캘린더 생성
  const generateCalendar = () => {
    const year = 2026;
    const month = 0; // January
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const calendar = [];
    let day = 1;
    
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push(null);
        } else if (day > daysInMonth) {
          week.push(null);
        } else {
          week.push(day);
          day++;
        }
      }
      calendar.push(week);
      if (day > daysInMonth) break;
    }
    
    return calendar;
  };

  const calendar = generateCalendar();
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <section className="datetime-section section">
      <h2 className="section-title">Wedding Day</h2>
      
      <div className="datetime-content">
        {/* 캘린더 */}
        <div className="calendar-container">
          <div className="calendar-month">2026. 01</div>
          <div className="calendar">
            <div className="calendar-weekdays">
              {weekDays.map((day, index) => (
                <div key={day} className={`weekday ${index === 0 || index === 6 ? 'weekend' : ''}`}>
                  {day}
                </div>
              ))}
            </div>
            <div className="calendar-days">
              {calendar.map((week, weekIndex) => (
                <div key={weekIndex} className="calendar-week">
                  {week.map((day, dayIndex) => (
                    <div 
                      key={dayIndex} 
                      className={`calendar-day ${day === 25 ? 'wedding-day' : ''} ${day === null ? 'empty' : ''}`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="wedding-date-info">
            <p className="wedding-date-text">2026년 1월 25일 토요일 오후 2시 30분</p>
          </div>
        </div>

        <div className="divider"></div>

        {/* 플립 카운트다운 */}
        <div className="flip-countdown">
          <p className="countdown-label">결혼식까지</p>
          <div className="flip-container">
            <div className="flip-unit">
              <div className="flip-card">
                <span className="flip-number">{formatNumber(timeLeft.days)}</span>
              </div>
              <div className="flip-label">DAYS</div>
            </div>
            <div className="flip-separator">:</div>
            <div className="flip-unit">
              <div className="flip-card">
                <span className="flip-number">{formatNumber(timeLeft.hours)}</span>
              </div>
              <div className="flip-label">HOURS</div>
            </div>
            <div className="flip-separator">:</div>
            <div className="flip-unit">
              <div className="flip-card">
                <span className="flip-number">{formatNumber(timeLeft.minutes)}</span>
              </div>
              <div className="flip-label">MINUTES</div>
            </div>
            <div className="flip-separator">:</div>
            <div className="flip-unit">
              <div className="flip-card">
                <span className="flip-number">{formatNumber(timeLeft.seconds)}</span>
              </div>
              <div className="flip-label">SECONDS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DateTime;


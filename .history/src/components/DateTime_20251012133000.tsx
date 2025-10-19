import React, { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/DateTime.css';

const DateTime: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const weddingDateTime = new Date('2025-12-06T12:00:00');
  
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
    return num.toString();
  };

  // 캘린더 생성
  const generateCalendar = () => {
    const year = 2025;
    const month = 11; // December (0-based)
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
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <section ref={elementRef} className={`datetime-section ${isVisible ? 'animate' : ''}`}>
      <div className="datetime-content">
        {/* 날짜 정보 */}
        <div className="date-info">
          <p className="date-main">2025년 12월 6일 토요일 | 오후 12시</p>
          <p className="date-detail">Saturday, December 6, 2025 | PM 12:00</p>
        </div>

        {/* 캘린더 */}
        <div className="calendar-container">
          <div className="calendar-weekdays">
            {weekDays.map((day, index) => (
              <div 
                key={day} 
                className={`calendar-weekday ${index === 0 ? 'sunday' : ''} ${index === 6 ? 'saturday' : ''}`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-body">
            {calendar.map((week, weekIndex) => (
              <React.Fragment key={weekIndex}>
                {week.map((day, dayIndex) => {
                  const isWeddingDay = day === 6;
                  const isSunday = dayIndex === 0;
                  const isSaturday = dayIndex === 6;
                  
                  return (
                    <div 
                      key={`${weekIndex}-${dayIndex}`}
                      className={`calendar-day ${isWeddingDay ? 'wedding-day' : ''} ${isSunday ? 'sunday' : ''} ${isSaturday ? 'saturday' : ''} ${day === null ? 'empty' : ''}`}
                    >
                      {day}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 디데이 카운터 */}
        <div className="dday-counter">
          <div className="countdown">
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.days}</span>
              <span className="countdown-label">DAYS</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.hours}</span>
              <span className="countdown-label">HOURS</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.minutes}</span>
              <span className="countdown-label">MINUTES</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.seconds}</span>
              <span className="countdown-label">SECONDS</span>
            </div>
          </div>
        </div>

        {/* 하단 메시지 */}
        <div className="datetime-footer">
          <p>준호 ❤️ 수연 결혼식이 <strong>{timeLeft.days}일</strong> 남았습니다</p>
        </div>
      </div>
    </section>
  );
};

export default DateTime;


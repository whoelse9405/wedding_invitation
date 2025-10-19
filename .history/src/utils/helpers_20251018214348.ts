/**
 * D-Day 계산
 * @param targetDate 목표 날짜 (YYYY-MM-DD 형식)
 * @returns D-Day 숫자
 */
export const calculateDDay = (targetDate: string): number => {
  const target = new Date(targetDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * 클립보드에 텍스트 복사
 * @param text 복사할 텍스트
 * @returns Promise<boolean> 성공 여부
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    }
  } catch (error) {
    console.error('클립보드 복사 실패:', error);
    return false;
  }
};

/**
 * 카카오톡 공유하기
 * @param title 제목
 * @param description 설명
 * @param imageUrl 이미지 URL
 * @param link 공유할 URL
 */
export const shareKakao = (
  title: string,
  description: string,
  imageUrl: string,
  link: string
): void => {
  if (typeof window !== 'undefined' && (window as any).Kakao) {
    const kakao = (window as any).Kakao;
    
    if (!kakao.isInitialized()) {
      // Kakao JavaScript Key를 여기에 입력하세요
      kakao.init('bec50c733a82838b1925e8800a64f447');
      console.warn('Kakao SDK를 초기화해주세요.');
      return;
    }
    
    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: link,
            webUrl: link,
          },
        },
      ],
    });
  } else {
    console.error('Kakao SDK가 로드되지 않았습니다.');
  }
};

/**
 * 전화 걸기
 * @param phoneNumber 전화번호
 */
export const callPhone = (phoneNumber: string): void => {
  window.location.href = `tel:${phoneNumber}`;
};

/**
 * 문자 보내기
 * @param phoneNumber 전화번호
 */
export const sendSMS = (phoneNumber: string): void => {
  window.location.href = `sms:${phoneNumber}`;
};

/**
 * 네이버 지도 길찾기
 * @param placeName 장소명
 * @param lat 위도
 * @param lng 경도
 */
export const openNaverMap = (placeName: string, _lat: number, _lng: number): void => {
  const url = `https://map.naver.com/v5/search/${encodeURIComponent(placeName)}`;
  window.open(url, '_blank');
};

/**
 * 카카오맵 길찾기
 * @param placeName 장소명
 * @param lat 위도
 * @param lng 경도
 */
export const openKakaoMap = (placeName: string, _lat: number, _lng: number): void => {
  const url = `https://map.kakao.com/link/search/${encodeURIComponent(placeName)}`;
  window.open(url, '_blank');
};

/**
 * 티맵 길찾기
 * @param placeName 장소명
 */
export const openTmap = (placeName: string): void => {
  const url = `tmap://search?name=${encodeURIComponent(placeName)}`;
  window.location.href = url;
};

/**
 * 날짜 포맷팅
 * @param date Date 객체
 * @param format 포맷 형식
 * @returns 포맷된 날짜 문자열
 */
export const formatDate = (date: Date, format: string = 'YYYY.MM.DD'): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes);
};

/**
 * 요일 가져오기
 * @param date Date 객체
 * @returns 요일 문자열
 */
export const getDayOfWeek = (date: Date): string => {
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  return days[date.getDay()];
};


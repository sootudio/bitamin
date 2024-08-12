import axiosInstance from './axiosInstance.ts';

const BASE_URL = 'https://i11b105.p.ssafy.io/api';

// 완료된 미션 불러오기
export const fetchMissionsByDate = async (completeDate: string) => {
  try {
    const response = await axiosInstance.get('/missions/completed', {
      params: { date: completeDate }
    });

    if (response.data.success) {
      console.log(response.data.message);
      return response.data.data;
    } else {
      return console.log(null)
    }
  } catch (error) {
    throw error;
  }
};


// 월간 미션 및 문구 조회
export const fetchMonthMissionAndPhrase = async (date: string) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/missions/month`, {
      params: { date },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching month mission and phrase:', error);
    throw error;
  }
};

// 미션 제출하기
export const submitMission = async (missionData: FormData) => {
  try {
    const response = await axiosInstance.post(
        '/missions',
        missionData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting mission:', error);
    throw error;
  }
};

// 오늘의 미션 조회
export const fetchTodayMission = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/missions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todays mission:', error);
    throw error;
  }
};

// 미션 교체하기
export const substituteMission = async (missionId: number) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/missions/substitute`, {
      params: { missionId }
    });
    return response.data;
  } catch (error) {
    console.error('Error substituting mission:', error);
    throw error;
  }
};

// 오늘의 문구 가져오기
export const fetchAllPhrases = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/missions/phrases`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all phrases:', error);
    throw error;
  }
};

// 경험치
export const getExperience = async () => {
  try {
    const response = await axiosInstance.get('/missions/plant');
    return response.data;
  } catch (error) {
    console.error('Error fetching experience:', error);
    throw error;
  }
};
import DefaultUserImage from '../assets/profilePic.svg';
import konsole from '../controls/Konsole';
import { $CommonServiceFn } from '../network/Services';
import { $Service_Url } from '../network/UrlPath';

export const fetchUserData = (setUsername, setUserImage, navigate) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return navigate('/login');
  }

  const urlWithToken = `${$Service_Url.userInfo}?token=${token}`;

  $CommonServiceFn.InvokeCommonApi('GET', urlWithToken, null, (data, error) => {
    if (data) {
      setUsername(`${data.firstName} ${data.lastName}`);
      setUserImage(data.image || DefaultUserImage);
    } else {
      konsole.error('Failed to fetch user data');
    }
  });
};

import { DEVELOPMENT, PRODUCTION } from "./constants";

export const backendApi = process.env.REACT_APP_BACKEND_API_URL;
export const githubPersonalToken = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;

export const getEnvironment = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      return DEVELOPMENT;
    } else {
      return PRODUCTION;
    }
  };

export const truncateText = (text, maxLen=100) => {
  if(!text) return
  if (text.length > maxLen) {
    return text.slice(0, maxLen) + '...';
  }
  return text;
  };
  
export const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const timeDiffInSeconds = Math.floor((now - date) / 1000);
  
    if (timeDiffInSeconds < 60) {
      return `${timeDiffInSeconds} seconds ago`;
    } else if (timeDiffInSeconds < 3600) {
      const minutes = Math.floor(timeDiffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (timeDiffInSeconds < 86400) {
      const hours = Math.floor(timeDiffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }
};
  
export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getInitials = (name, maxLen = 2) => {
  if (!name) {
    return "";
  }

  const initials = name
    .split(" ")
    .filter((item) => item && item.length > 0)
    .map((item) => item[0])
    .join("")
    .toUpperCase();

  return initials.slice(0, maxLen);
};

export const roundDownToNearestHalfOrWhole = (number) => {
  const wholePart = Math.floor(number);
  const decimalPart = number - wholePart;
  if (decimalPart <= 0.25) {
    // Round down to the nearest whole number
    return wholePart;
  } else if (decimalPart <= 0.75) {
    // Round down to the nearest multiple of 0.5
    return wholePart + 0.5;
  } else {
    // Round down to the next whole number
    return wholePart + 1;
  }
}

export const getRandomItemsFromArray = (array, numItems) => {
  if (numItems >= array.length) {
    return array; // Return the entire array if numItems is greater or equal to the array length
  }

  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.slice(0, numItems);
}

export const isMobileBrowser = () => {
  // const userAgent = navigator.userAgent;
  // const mobileKeywords = ['Mobile', 'iPhone', 'Android', 'Windows Phone'];
  // return mobileKeywords.some(keyword => userAgent.includes(keyword));
  return true
}
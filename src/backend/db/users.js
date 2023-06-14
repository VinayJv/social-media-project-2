import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    userImage: "https://i0.wp.com/www.followchain.org/wp-content/uploads/2021/09/best-discord-profile-pictures-18.png?w=250&ssl=1https://i0.wp.com/www.followchain.org/wp-content/uploads/2021/09/best-discord-profile-pictures-18.png?w=250&ssl=1",
    firstName: "Vinay",
    lastName: "Jatav",
    isVerified: false,
    username: "adarshbalika",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    userImage: "https://pbs.twimg.com/profile_images/1607330686624759809/nLa3_h_v_400x400.jpg",
    firstName: "Gaming",
    lastName: "News",
    isVerified: false,
    username: "GamingCovering",
    password: "gamingcovering123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    userImage: "https://pbs.twimg.com/profile_images/1210648820541018113/j4qqEa6F_400x400.png",
    firstName: "Science",
    lastName: "News",
    isVerified: true,
    username: "ScienceNews",
    password: "sciencenews123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    userImage: "https://pbs.twimg.com/profile_images/647873771492245504/JZS7DCyq_400x400.jpg",
    firstName: "Julio",
    lastName: "Maiz",
    isVerified: false,
    username: "maiz_julio",
    password: "maiz_julio123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    userImage: "https://pbs.twimg.com/profile_images/1273228688457261056/_4CEPNXN_400x400.jpg",
    firstName: "IGN",
    lastName: "India",
    isVerified: true,
    username: "IGN_IN",
    password: "ignin123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];

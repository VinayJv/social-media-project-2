import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "Star cluster NGC6193 & NGC 6188 emission nebula in Ara constellation. 🌟🌟",
    media: "https://pbs.twimg.com/media/FybIzdjWAAAq4l0?format=jpg&name=900x900",
    likes: {
      likeCount: 36,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [{commentBy: "pranjalexplores", comment: "Beautiful Scene <3"},{commentBy: "pranjalexplores", comment: "I Love Space !!"}],
    username: "maiz_julio",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    isBookmarked: false,
  },
  {
    _id: uuid(),
    content:
      "A dying star can emit a jet surrounded by asymmetrical bubbles of material. The motion of this material through spacetime could also emit gravitational waves, researchers suggest.",
    media: "https://www.sciencenews.org/wp-content/uploads/2023/06/060623_LG_cosmic-cocoon_feat-1030x580.jpg",
    likes: {
      likeCount: 15,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "ScienceNews",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    isBookmarked: false,
  },
  {
    _id: uuid(),
    content:
      "The Last of Us was featured on the cover of issue #227. Before it was an HBO TV show, or a remake on PlayStation 5, or a remaster on PlayStation 4, Joel and Ellie's story began on PlayStation 3 ten years ago today. GI scored it a 9.5.",
    media: "https://pbs.twimg.com/media/FymFgZBWIAY1bwk?format=jpg&name=medium",
    likes: {
      likeCount: 99,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "IGN_IN",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    isBookmarked: false,
  },
  {
    _id: uuid(),
    content:
      "HAPPY BIRTHDAY LIVING THINGS!! THANK YOU FOR GIVING ME POWERLESS.",
    media: "https://pbs.twimg.com/media/Fzj5cjNWAAI_5nS?format=jpg&name=large",
    likes: {
      likeCount: 29,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [{commentBy: "pranjalexplores", comment: "LP FOREVER !!!!"}],
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    isBookmarked: false,
  },
  {
    _id: uuid(),
    content:
      "Cyclone Biparjoy perfecting its twister moves!🌀",
    media: "https://pbs.twimg.com/media/Fypb0mfXwAETjos?format=jpg&name=medium",
    likes: {
      likeCount: 20,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "pranjalexplores",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    isBookmarked: false,
  },
  {
    _id: uuid(),
    content:
      "",
    media: "https://pbs.twimg.com/media/Fyl9RmKXoAENPLC?format=png&name=900x900",
    likes: {
      likeCount: 20,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "WholesomeMeme",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    isBookmarked: false,
  },
  {
    _id: uuid(),
    content:
      "Netflix has revealed the first full trailer for The Witcher Season 3, which is coming to Netflix beginning on June 29.",
    media: "https://sm.ign.com/t/ign_in/news/t/the-witche/the-witcher-season-3-gets-a-full-trailer-ahead-of-this-month_q9ph.1280.jpg",
    likes: {
      likeCount: 124,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "ScienceNews",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    isBookmarked: false,
  },
  {
    _id: uuid(),
    content:
      "M31 Andromeda galaxy. 🔭",
    media: "https://pbs.twimg.com/media/Fzm0wbvXoAMba4f?format=jpg&name=medium",
    likes: {
      likeCount: 45,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [{commentBy: "ScienceNews", comment: "Beautiful"},{commentBy: "pranjalexplores", comment: "Can't Unsee This"}],
    username: "maiz_julio",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    isBookmarked: false,
  },
  {
    _id: uuid(),
    content:
      "Around 100 artists left the film before it was finished.",
    media: "https://sm.ign.com/t/ign_in/news/s/spider-man/spider-man-across-the-spider-verse-several-animators-claim-t_dkh7.1280.jpg",
    likes: {
      likeCount: 4,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "IGN_IN",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    isBookmarked: false,
  },
  {
    _id: uuid(),
    content:
      "Resident Evil 4 Remake Breaks the Franchise Record for Most Concurrent Players on Steam.",
    media: "https://sm.ign.com/t/ign_in/screenshot/default/ss-0554b945aafc847d55f780f7968de00aafa968a3_et6q.1280.jpg",
    likes: {
      likeCount: 77,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "GamingCovering",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    isBookmarked: false,
  },
  {
    _id: uuid(),
    content:
      "",
    media: "https://pbs.twimg.com/media/FcM1jZ6WAAAT_7l?format=jpg",
    likes: {
      likeCount: 23,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "WholesomeMeme",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    isBookmarked: false,
  },
];

import fox from "../app/assets/static-stories/fox.svg";
import luna from "../app/assets/static-stories/luna.svg";
import lilrobot from "../app/assets/static-stories/lilrobot.svg";
import lilpirate from "../app/assets/static-stories/lilpirate.svg";
import dragon from "../app/assets/static-stories/dragob.svg";
import sashacat from "../app/assets/static-stories/sasha-and-cat.png.svg";
import ali from "../app/assets/static-stories/ali.svg";

interface Type {
  title: {
    en: string;
    he: string;
  };
  description: {
    en: string;
    he: string;
  };
  image?: string;
}

export const staticStories: Type[] = [
  {
    title: {
      en: "The Curious Fox and the Hidden Forest",
      he: "השועל הסקרן והיער הנסתר",
    },
    description: {
      en: "A young fox stumbles upon a secret forest filled with magical creatures and ancient secrets.",
      he: "שועל צעיר מגלה יער נסתר מלא ביצורים קסומים וסודות עתיקים.",
    },
    image: fox,
  },
  {
    title: {
      en: "Luna and the Moonlight Adventure",
      he: "לונה והרפתקת אור הירח",
    },
    description: {
      en: "Luna, a brave little girl, discovers a hidden portal that only opens under the moonlight, leading to a world of wonder.",
      he: "לונה, ילדה אמיצה, מגלה שער נסתר שנפתח רק באור הירח, המוביל לעולם של פלאים.",
    },
    image: luna,
  },
  {
    title: {
      en: "The Little Robot’s Big Dream",
      he: "החלום הגדול של הרובוט הקטן",
    },
    description: {
      en: "A small robot with a kind heart dreams of becoming a hero in a land of humans and machines.",
      he: "רובוט קטן עם לב טוב חולם להפוך לגיבור בארץ של בני אדם ומכונות.",
    },
    image: lilrobot,
  },
  {
    title: {
      en: "The Pirate’s Lost Treasure Map",
      he: "מפת האוצר האבודה של הפיראט",
    },
    description: {
      en: "Join Max and his parrot Polly as they embark on a thrilling quest to find a pirate's long-lost treasure.",
      he: "הצטרפו למקס והתוכי שלו, פולי, למסע מרתק למצוא את האוצר האבוד של הפיראט.",
    },
    image: lilpirate,
  },
  {
    title: {
      en: "The Rainbow Dragon’s Secret",
      he: "הסוד של דרקון הקשת",
    },
    description: {
      en: "In a colorful kingdom, a young boy befriends a rare rainbow dragon with a mysterious secret.",
      he: "בממלכה צבעונית, ילד צעיר מתיידד עם דרקון קשת נדיר בעל סוד מסתורי.",
    },
    image: dragon,
  },
  {
    title: {
      en: "Sasha and the Talking Fox",
      he: "סשה והשועל המדבר",
    },
    description: {
      en: "Sasha meets a magical talking fox who takes her on a journey through enchanted lands.",
      he: "סשה פוגשת שועל קסום שמדבר ולוקח אותה למסע בארץ הקסם.",
    },
    image: sashacat,
  },
  {
    title: {
      en: "The Time-Traveling Treehouse",
      he: "בית העץ שנוסע בזמן",
    },
    description: {
      en: "A group of friends discovers their treehouse can travel through time, leading to exciting adventures.",
      he: "קבוצת חברים מגלה שבית העץ שלהם יכול לנסוע בזמן, מה שמוביל להרפתקאות מרתקות.",
    },
    image: ali,
  },
];

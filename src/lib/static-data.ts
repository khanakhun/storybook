import fox from "../app/assets/static-stories/fox.svg";
import luna from "../app/assets/static-stories/luna.svg";
import lilrobot from "../app/assets/static-stories/lilrobot.svg";
import lilpirate from "../app/assets/static-stories/pirate-lost-treasure.webp";
import dragon from "../app/assets/static-stories/dragob.svg";
import sashacat from "../app/assets/static-stories/sasha-and-cat.png.svg";
import ali from "../app/assets/static-stories/ali.svg";
import magicalPaintImg from "../app/assets/static-stories/magical-paint.webp";
import alistar from "../app/assets/static-stories/alistar.webp";
import lilpeng from "../app/assets/static-stories/lilpeng.webp";
import seclab from "../app/assets/static-stories/secret-library.webp";
import key from "../app/assets/static-stories/golden-key.webp";
import friendmonster from "../app/assets/static-stories/gentle-monster.webp";
import ella from "../app/assets/static-stories/Ella.webp";
import cloudcatcher from "../app/assets/static-stories/the-cloud-catchers-adventure.webp";

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
  {
    title: {
      en: "The Magical Paintbrush",
      he: "המברשת הקסומה",
    },
    description: {
      en: "Emma finds a paintbrush that brings her drawings to life, but not everything goes as planned.",
      he: "אמה מוצאת מברשת ציור שמחיה את הציורים שלה, אבל לא הכול הולך כמתוכנן.",
    },
    image: magicalPaintImg,
  },
  {
    title: {
      en: "Ali and the Kingdom of Stars",
      he: "עלי וממלכת הכוכבים",
    },
    description: {
      en: "Ali is whisked away to a kingdom among the stars, where he must help the Star King save the night sky.",
      he: "עלי נלקח לממלכה בין הכוכבים, שם עליו לעזור למלך הכוכבים להציל את שמי הלילה.",
    },
    image: alistar,
  },
  {
    title: {
      en: "The Brave Little Penguin",
      he: "הפינגווין הקטן והאמיץ",
    },
    description: {
      en: "Follow Pippin, a tiny penguin, as he faces challenges to save his icy home.",
      he: "עקבו אחרי פיפין, פינגווין קטן ואמיץ, כשהוא מתמודד עם אתגרים להצלת ביתו הקרחוני.",
    },
    image: lilpeng,
  },
  {
    title: {
      en: "The Secret Library Beneath the School",
      he: "הספרייה הסודית מתחת לבית הספר",
    },
    description: {
      en: "A group of curious kids discovers a hidden library under their school, filled with magical books.",
      he: "קבוצת ילדים סקרנים מגלה ספרייה נסתרת מתחת לבית הספר, מלאה בספרים קסומים.",
    },
    image: seclab,
  },
  {
    title: {
      en: "The Golden Key and the Hidden Door",
      he: "המפתח הזהוב והדלת הנסתרת",
    },
    description: {
      en: "A mysterious golden key leads Lily to an extraordinary door with surprises behind it.",
      he: "מפתח זהוב מסתורי מוביל את לילי לדלת יוצאת דופן עם הפתעות מאחוריה.",
    },
    image: key,
  },
  {
    title: {
      en: "The Friendly Monster from Monster Mountain",
      he: "המפלצת הידידותית מהר המפלצות",
    },
    description: {
      en: "Timmy befriends a gentle monster who needs help to protect his mountain from danger.",
      he: "טים מתחבר למפלצת עדינה שזקוקה לעזרה כדי להגן על ההר שלה מפני סכנה.",
    },
    image: friendmonster,
  },
  {
    title: {
      en: "Ella and the Whispering Woods",
      he: "אלה והיער הלוחש",
    },
    description: {
      en: "Ella enters a magical forest where trees whisper secrets and guide her on an unexpected adventure.",
      he: "אלה נכנסת ליער קסום שבו העצים לוחשים סודות ומנחים אותה בהרפתקה בלתי צפויה.",
    },
    image: ella,
  },
  {
    title: {
      en: "The Cloud Catcher’s Adventure",
      he: "הרפתקת לוכד העננים",
    },
    description: {
      en: "A boy named Theo dreams of catching clouds and discovers a fantastical world above the sky.",
      he: "תיאו, ילד שחולם לתפוס עננים, מגלה עולם פנטסטי מעל השמיים.",
    },
    image: cloudcatcher,
  },
];

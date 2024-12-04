import fox from "../app/assets/static-stories/fox.svg";
import luna from "../app/assets/static-stories/luna.svg";
import lilrobot from "../app/assets/static-stories/lilrobot.svg";
import lilpirate from "../app/assets/static-stories/lilpirate.svg";
import dragon from "../app/assets/static-stories/dragob.svg";
import sashacat from "../app/assets/static-stories/sasha-and-cat.png.svg";
import ali from "../app/assets/static-stories/ali.svg";

interface Type {
  title: string;
  description: string;
  image?: string;
}

export const staticStories: Type[] = [
  {
    title: "The Curious Fox and the Hidden Forest",
    description: "A young fox stumbles upon a secret forest filled with magical creatures and ancient secrets.",
    image: fox,
  },
  {
    title: "Luna and the Moonlight Adventure",
    description: "Luna, a brave little girl, discovers a hidden portal that only opens under the moonlight, leading to a world of wonder.",
    image: luna,
  },
  {
    title: "The Little Robot’s Big Dream",
    description: "A small robot with a kind heart dreams of becoming a hero in a land of humans and machines.",
    image: lilrobot,
  },
  {
    title: "The Pirate’s Lost Treasure Map",
    description: "Join Max and his parrot Polly as they embark on a thrilling quest to find a pirate's long-lost treasure.",
    image: lilpirate,
  },
  {
    title: "The Rainbow Dragon’s Secret",
    description: "In a colorful kingdom, a young boy befriends a rare rainbow dragon with a mysterious secret.",
    image: dragon,
  },
  {
    title: "Sasha and the Talking fox",
    description: "Sasha meets a magical talking fox who takes her on a journey through enchanted lands.",
    image: sashacat,
  },
  {
    title: "The Time-Traveling Treehouse",
    description: "A group of friends discovers their treehouse can travel through time, leading to exciting adventures.",
    image: ali,
  },
  {
    title: "The Magical Paintbrush",
    description: "Emma finds a paintbrush that brings her drawings to life, but not everything goes as planned.",
    image: fox,
  },
  {
    title: "Ali and the Kingdom of Stars",
    description: "Ali is whisked away to a kingdom among the stars, where he must help the Star King save the night sky.",
    image: fox,
  },
  {
    title: "The Brave Little Penguin",
    description: "Follow Pippin, a tiny penguin, as he faces challenges to save his icy home.",
    image: fox,
  },
  {
    title: "The Secret Library Beneath the School",
    description: "A group of curious kids discovers a hidden library under their school, filled with magical books.",
    image: fox,
  },
  {
    title: "The Golden Key and the Hidden Door",
    description: "A mysterious golden key leads Lily to an extraordinary door with surprises behind it.",
    image: fox,
  },
  {
    title: "The Friendly Monster from Monster Mountain",
    description: "Timmy befriends a gentle monster who needs help to protect his mountain from danger.",
    image: fox,
  },
  {
    title: "Ella and the Whispering Woods",
    description: "Ella enters a magical forest where trees whisper secrets and guide her on an unexpected adventure.",
    image: fox,
  },
  {
    title: "The Cloud foxcher’s Adventure",
    description: "A boy named Theo dreams of foxching clouds and discovers a fantastical world above the sky.",
    image: fox,
  },
];

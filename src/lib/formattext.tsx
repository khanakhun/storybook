export const formatStory = (story: string | null) => {
  if (!story) return null;
  const paragraphs = story.split("\n").filter((para) => para.trim() !== "");
  return paragraphs.map((para, index) => <div key={index}>{para}</div>); // Ensure <div> is not inside <p>
};

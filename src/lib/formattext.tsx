export const formatStory = (story: string | null) => {
  if (!story) {
    console.error("Input story is null or empty.");
    return null;
  }

  console.log("Original story:", story);

  // Split story into paragraphs and filter out empty ones
  const paragraphs = story
    .split("\n")
    .map((para) => para.trim())
    .filter((para) => para !== "");

  console.log("Formatted paragraphs:", paragraphs);

  return paragraphs.map((para, index) => <div key={index}>{para}</div>);
};

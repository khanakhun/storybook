type StoryResponse = {
  message: string;
};

interface FormattedStory {
  title: string;
  content: string;
  moral: string;
}

export const formatStory = (apiResponse: StoryResponse): FormattedStory => {
  const { message } = apiResponse;

  // Split the message into title, story content, and moral
  const titleMatch = message.match(/^\*\*Title: (.+?)\*\*/);
  const moralMatch = message.match(/\*\*Moral: (.+?)\*\*/);

  // Extract content between the title and moral
  const content = message
    .replace(/^\*\*Title: .+?\*\*/, "") // Remove title
    .replace(/\*\*Moral: .+?\*\*/, "") // Remove moral
    .trim();

  const title = titleMatch ? titleMatch[1] : "Untitled Story";
  const moral = moralMatch ? moralMatch[1] : "";

  return { title, content, moral };
};

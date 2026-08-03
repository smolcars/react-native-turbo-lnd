export function extractMethodComments(content: string): Record<string, string> {
  const lines = content.split("\n");
  const comments: Record<string, string> = {};
  let currentComment: string[] = [];
  let isInComment = false;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("/*")) {
      isInComment = true;
      currentComment = [];
    } else if (trimmedLine.endsWith("*/")) {
      isInComment = false;
      let nextLineIndex = index + 1;
      while (
        nextLineIndex < lines.length &&
        lines[nextLineIndex]!.trim() === ""
      ) {
        nextLineIndex += 1;
      }

      const nextLine = lines[nextLineIndex]?.trim() ?? "";
      if (nextLine.startsWith("rpc ")) {
        const methodName = nextLine.split(/\s+/)[1];
        if (methodName) {
          comments[methodName] = currentComment.join("\n");
        }
      }
    } else if (isInComment) {
      // Remove a leading "*" if present, but keep the space after it.
      const commentLine = trimmedLine.startsWith("*")
        ? " " + trimmedLine.slice(1)
        : trimmedLine;
      currentComment.push(commentLine);
    }
  });

  return comments;
}

export default function getStringFirstParagraph(text: string) {
  // verify if string is separated by \n and if not then it's a single paragraph
  if (text.split("\n").length === 1) {
    return text;
  }
  // get the first paragraph
  const firstParagraph = text.split("\n")[0];
  // verify if first paragraph is empty
  if (firstParagraph === "") {
    return text.split("\n")[1];
  }
  return firstParagraph;
}

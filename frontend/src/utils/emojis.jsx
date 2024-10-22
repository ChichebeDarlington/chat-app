let funcEmojis = ["💩", "👺", "👽", "🤡", "👾", "😽", "👻"];

export const getRandomEmojis = () => {
  return funcEmojis[Math.floor(Math.random() * funcEmojis.length)];
};

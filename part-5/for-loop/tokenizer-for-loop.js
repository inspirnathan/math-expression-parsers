const tokenizer = (input) => {
  const tokens = [];
  let buffer = '';

  const flushBuffer = () => {
    if (buffer.length > 0) {
      tokens.push(buffer);
      buffer = '';
    }
  };

  for (let i = 0; i < input.length; i++) {
    const character = input[i];

    if (character === ' ') {
      flushBuffer();

      continue;
    }

    if (!isNaN(parseFloat(character))) {
      buffer += character;

      if (i === input.length - 1) {
        flushBuffer();
      }

      continue;
    }

    if (character === '+') {
      flushBuffer();

      tokens.push(character);
      continue;
    }

    if (i === input.length - 1) {
      flushBuffer();
    }
  }

  return tokens;
};

module.exports = {
  tokenizer,
};

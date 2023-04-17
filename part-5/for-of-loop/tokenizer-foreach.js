const tokenizer = (baseInput) => {
  const input = baseInput + 'ε';
  const tokens = [];
  let buffer = '';

  const flushBuffer = () => {
    if (buffer.length > 0) {
      tokens.push(buffer);
      buffer = '';
    }
  };

  for (const character of input) {
    if (character === ' ') {
      flushBuffer();
      continue;
    }

    if (!isNaN(parseFloat(character))) {
      buffer += character;
      continue;
    }

    if (character === '+') {
      flushBuffer();
      tokens.push(character);
      continue;
    }

    if (character === 'ε') {
      flushBuffer();
    }
  }
  return tokens;
};

module.exports = {
  tokenizer,
};

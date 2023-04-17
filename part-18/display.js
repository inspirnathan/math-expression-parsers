let data = ''

process.stdin.on('data', (chunk) => {
  data += chunk
})

process.stdin.on('end', () => {
  console.log(`The average is: ${data} 🎉🎉🎉`)
})

const { Cite } = require('citation-js')

async function generate (ids) {
  return (await Cite.async(ids.split('\n'))).format('bibtex', { format: 'text' })
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form')
  const bibtex = document.getElementById('bibtex')

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = new FormData(event.target)
    generate(data.get('ids'))
      .then(output => {
        bibtex.textContent = output
      })
      .catch(error => {
        bibtex.textContent = error.message
      })
  })
})

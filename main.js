const { Cite, util, version } = require('citation-js')

util.setUserAgent(null)

async function generate (ids) {
  return (await Cite.async(ids.trim().split('\n'))).format('bibtex', { format: 'text' })
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

  document.getElementById('copy').addEventListener('click', () => {
    navigator.clipboard.writeText(bibtex.value)
  })

  document.getElementById('version').textContent = ', version v' + version
})

const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

//AIzaSyA9UiojJsEjjc5J0l8ZsBH6anw5EpWDRGU

const perguntarAI = async (question, game, apiKey) => {
const model = "gemini-2.0-flash"
const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
const pergunta = `Você é um especialista em ${game}. Responda a pergunta: ${question}`

const contents = [{
   parts: [{
       text: pergunta
    }]
  }]

  //Chamada para a API Gemini
  const response = await fetch(geminiURL, {
   method: 'POST',
   headers: {
       'Content-Type': 'application/json'
   },
   body: JSON.stringify({
      contents
   })
 })

 const data = await response.json()
 console.log({data})
 return 
}

const enviarFormulario = async (event) => {
    event.preventDefault()
    const apiKey = apiKeyInput.value
    const game = gameSelect.value
    const question = questionInput.value

    if (apiKey == '' || game == '' || question == '') {
        alert('Por favor, preencha todos os campos')
        return
    }

    askButton.disabled = true
    askButton.textContent = 'Perguntando...'
    askButton.classList.add('loading')

    try {
      await perguntarAI(question, game, apiKey)
    } catch (error) {
      console.error('Erro: ', error)
    } finally {

      askButton.disabled = false
      askButton.textContent = 'Perguntar'
      askButton.classList.remove('loading')
   }


}
form.addEventListener('submit', enviarFormulario)
const main = document.querySelector('main')

/** @param {Record<string, string>} data */
export function appendMessage(data) {
  const msgEl = document.createElement('div')
  msgEl.classList.add('message')
  // <div class="message"></div>

  const msgDate = document.createElement('div');
  msgDate.classList.add('date')
  msgDate.textContent = data.date
  msgEl.append(msgDate)
 
  const pseudoSpan = document.createElement('span')
  pseudoSpan.classList.add('pseudo')
  pseudoSpan.textContent = data.pseudo
  // <span>Hugo</span>
  msgEl.append(pseudoSpan)

  const bodyP = document.createElement('p')
  bodyP.classList.add('textmsg')
  bodyP.textContent = data.body
  // <p>Hello world</p>
  msgEl.append(bodyP)

  const messageOwner = document.querySelector('#pseudo')?.value
  messageOwner.p
  msgEl.classList.add(data.pseudo === messageOwner ? 'owner' : 'receved')

  main?.appendChild(msgEl)
  main?.scrollTo(0, main.scrollHeight)
}

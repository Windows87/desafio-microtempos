const MICROTEMPOS_INICIAIS = 18.969
const ATUALIZACAO_EM_MS = 10
const NUMERO_DE_MS_EM_UM_MINUTO = 6 * Math.pow(10, 4)

let msPassados = 0
let minutosPassados = 0

const calcularMicrotempos = (minutos) => {
  if(!minutos) return MICROTEMPOS_INICIAIS
  return MICROTEMPOS_INICIAIS + (minutos + 2)/3 + minutos - Math.pow(minutos, 2)
}

const derivadaDaFuncao = (minutos) => {
  return -2*minutos + 1.3333333333333
}

const definirIntervalDeVariacaoDeMicrotempos = () => {
  const interval = setInterval(() => {
    const msPassadosEmMinutos = msPassados / NUMERO_DE_MS_EM_UM_MINUTO
    let microtempos = calcularMicrotempos(msPassadosEmMinutos)


    if(microtempos <= 0) {
      microtempos = 0
      excluirBotaoDeEnvio()
      clearInterval(interval)
    }

    atualizarSpanDeMicrotempos(microtempos)
    msPassados += ATUALIZACAO_EM_MS
  }, ATUALIZACAO_EM_MS)
}

const definirIntervalDeMinutos = () => {
  setInterval(() => {
    minutosPassados += 1
    atualizarSpanDeMinutos(minutosPassados)
  }, NUMERO_DE_MS_EM_UM_MINUTO)
}

const atualizarSpanDeMicrotempos = (microtempos) => {
  const spanDeMicrotempos = document.querySelector('#microtempos')
  spanDeMicrotempos.innerText = microtempos.toFixed(3)
}

const atualizarSpanDeMinutos = (minutos) => {
  const spanDeMinutos = document.querySelector('#minutos')
  spanDeMinutos.innerText = minutos
}

const excluirBotaoDeEnvio = () => {
  const botao = document.querySelector('button')
  botao.remove()
}

const definirOnClickDoBotao = () => {
  const botao = document.querySelector('button')
  botao.addEventListener('click', onClickBotao)
}

const truncarNumero = (num, digits) => {
  const numS = num.toString(),
      decPos = numS.indexOf('.'),
      substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
      trimmedResult = numS.substr(0, substrLength),
      finalResult = isNaN(trimmedResult) ? 0 : trimmedResult

  return parseFloat(finalResult)
}

const onClickBotao = () => {
  const resposta = truncarNumero(Number(window.prompt('Resposta, por favor.')), 2)
  const respostaCorreta = truncarNumero(derivadaDaFuncao(minutosPassados), 2)

  if(resposta === respostaCorreta) {
    alert('Parabéns!')
    excluirBotaoDeEnvio()
  } else {
    alert('Mandou muito mal!')
    excluirBotaoDeEnvio()
  }
}

const main = () => {
  definirIntervalDeVariacaoDeMicrotempos()
  definirIntervalDeMinutos()
  definirOnClickDoBotao()
}

main()
const questions = [
	{
		question: "Що означає слово Паляниця?",
		answers: [
			"Якась зброя",
		    "Клубніка",
		    "Такого слова не існує",
		    "Вид українського хлібу"],
		correct: 4,
	},
	{
		question: "Руський воєний корабль...",
		answers: [
			"Зробив отріцательноє всплитіє(anyway)",
			"Іди нах*й",
			"Іржава плавуча бляшанка(anyway)",
			"Пропонує скласти зброю😂",
		],
		correct: 2,
	},
	{
		question: "Ой у лузі...",
		answers: [
			"червона калина",
			"пасутся кози",
			"гарная дівчина",
			"калінка-малінка",
		],
		correct: 1,
	},
	{
		question: "Як завершиться війна в Україні?",
		answers: [
			"Повною перемогою України",
			"Усі відповіді вірні",
		 	"Розвалом російської федерації",
		    "путін сяде на бляшанку"],
		correct: 2,
	},
];

const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

let score = 0;
let questionIndex = 0;

clearPage()
showQuestion()
submitBtn.onclick = checkAnswer

function clearPage(){
	headerContainer.innerHTML = ''
	listContainer.innerHTML = ''
}

function showQuestion(){
	console.log('showQuestion')

	const headerTemplate = `<h2 class="title">%title%</h2>`
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])

	headerContainer.innerHTML = title

	let answerNumber = 1
	for (answerText of questions[questionIndex]['answers']){
		const questionTemplate = 
		`<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
	</li>`

	const answerHTML = questionTemplate
								.replace('%answer%', answerText)
								.replace('%number%', answerNumber)
	listContainer.innerHTML += answerHTML
	answerNumber++
	}

}

function checkAnswer(){

	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

	if(!checkedRadio){
		console.log('OK')
		submitBtn.blur()
		return
	}

	const userAnswer = parseInt(checkedRadio.value)

	questions[questionIndex]['correct']

	if (userAnswer === questions[questionIndex]['correct']){
		score++
	}

	if(questionIndex !== questions.length - 1){
		questionIndex++
		clearPage()
		showQuestion()
		return
	} else {
		clearPage()
		showResults()
	}
}

function showResults (){
	const resultTemplate = 
	`<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>`
	console.log('888999', questions.lenght)
	console.log('88899911111', score)
	console.log('888999222222', (score * 100)/questions.length)


	let title, message;
	if(score === questions.length) {
		title = 'Слава Україні!'
		message = 'Так тримати, разом до перемоги.'
	} else if ((score * 100)/questions.length >= 50) {
		title = 'Бачу, що не москаль.'
		message = 'Але знання підтягни.'
	} else {
		title = 'СБУ'
		message = 'Диверсант!'
	}

	 let result = `${score} из ${questions.length}`

	const finalMessage = resultTemplate
							.replace('%title%', title)
							.replace('%message%', message)
							.replace('%result%', result)

	headerContainer.innerHTML = finalMessage

	submitBtn.blur()
	submitBtn.innerText = 'Почати с початку'
	submitBtn.onclick = () => history.go()
}


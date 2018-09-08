class Calculate { //全局管理的类
	constructor() {
		this.values = ['0', '0']
		this.valueIndex = 0
		this.operator = ''
		this.dis = document.querySelector('#display')
	}
	clear() {
		this.values = ['0', '0']
		this.valueIndex = 0
		this.operator = ''
	}
}
let cal = new Calculate()

//为所有数字按钮添加点击事件
const numbers = [...document.querySelectorAll('.number')]
for (let item of numbers) {
	let func //声明点击函数
	if (item.id == 'dot') {
		func = () => {
			if (cal.values[cal.valueIndex].indexOf('.') === -1) {
				cal.dis.value = cal.values[cal.valueIndex] += '.'
			}
		}
	} else {
		func = () => {
			if (cal.values[cal.valueIndex] === '0') {
				cal.dis.value = cal.values[cal.valueIndex] = item.innerHTML
			} else {
				cal.dis.value = cal.values[cal.valueIndex] += item.innerHTML
			}
		}
	}
	item.addEventListener('click', func) //添加事件
}

//为所有操作符添加点击事件
const operators = [...document.querySelectorAll('.operator')]
for (let item of operators) {
	let equ = () => {
		try {
			switch (cal.operator) {
			case '+':
				cal.dis.value = cal.values[0] = (parseFloat(cal.values[0]) +
            parseFloat(cal.values[1])).toString()
				break
			case '-':
				cal.dis.value = cal.values[0] = (parseFloat(cal.values[0]) -
            parseFloat(cal.values[1])).toString()
				break
			case '×':
				cal.dis.value = cal.values[0] = (parseFloat(cal.values[0]) *
            parseFloat(cal.values[1])).toString()
				break
			case '÷':
				cal.dis.value = cal.values[0] = (parseFloat(cal.values[0]) /
            parseFloat(cal.values[1])).toString()
				break
			}
			if (cal.dis.value.length > 10) { //为显示display添加事件
				cal.dis.value = parseFloat(cal.dis.value).toPrecision(4).toString()
			}
			cal.clear()
		} catch (error) {
			cal.dis.value = 'Error'
		}
	}
	if (item.id === 'equ') {
		item.addEventListener('click', equ)
	} else {
		item.addEventListener('click', () => {
			equ()
			cal.values = [cal.dis.value, '0']
			cal.valueIndex = 1
			cal.operator = item.innerHTML
		})
	}
}

//为按钮AC添加事件
document.querySelector('#ac').addEventListener('click', () => {
	cal.dis.value = '0'
	cal.clear()
})

//为按钮+/-添加事件
document.querySelector('#pORn').addEventListener('click', () => {
	if (cal.dis.value !== '0') {
		if (cal.dis.value[0] !== '-') {
			cal.dis.value = '-' + cal.dis.value
		} else {
			cal.dis.value = cal.dis.value.substring(1, cal.dis.value.length)
		}
		cal.values[cal.valueIndex] = cal.dis.value
	}
})

//为按钮%添加事件
document.querySelector('#per').addEventListener('click', () => {
	cal.dis.value = (parseFloat(cal.dis.value) / 100).toString()
})

//处理键盘输入
document.addEventListener('keydown', (event) => {
	let number = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
		'eight', 'nine'
	]
	let keynum = window.event ? event.keyCode : event.which
	let keychar = String.fromCharCode(keynum)
	if ((keychar >= '0' && keychar <= '9')) { //处理数字
		document.querySelector('#' + number[parseInt(keychar)]).click()
	} else if (keynum >= 96 && keynum <= 105) { //处理小键盘数字
		document.querySelector('#' + number[keynum - 96]).click()
	} else { //处理运算符
		switch (keynum) {
		case 110: //.
		case 190: //.>
			document.querySelector('#dot').click()
			break
		case 107: //+
			document.querySelector('#plus').click()
			break
		case 187: //+=
			if (event.shiftKey) {
				document.querySelector('#plus').click()
			}
			break
		case 109: //-
			document.querySelector('#minus').click()
			break
		case 189: //-_
			if (event.shiftKey) {
				document.querySelector('#minus').click()
			}
			break
		case 106: //*
			document.querySelector('#multiply').click()
			break
		case 56: //*8
			if (event.shiftKey) {
				document.querySelector('#multiply').click()
			}
			break
		case 111: // /
			document.querySelector('#div').click()
			break
		case 56: // /?
			if (event.shiftKey) {
				document.querySelector('#div').click()
			}
			break
		case 69: // E for Enter
			document.querySelector('#equ').click()
			break
		case 65: // A for AC
			document.querySelector('#ac').click()
			break
		case 80: // P for percent
			document.querySelector('#per').click()
			break
		case 78: // N for +/-
			document.querySelector('#pORn').click()
			break
		}
	}
})

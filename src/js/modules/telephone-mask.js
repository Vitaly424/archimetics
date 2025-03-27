import IMask from 'imask'

export const telephoneMask = () => {
	function telephoneMask(selector) {
		const startTelephone = document.querySelector(selector)

		if (!startTelephone) return

		const maskOptions = { mask: '+{7} (000) 000-00-00' }
		new IMask(startTelephone, maskOptions)
	}

	telephoneMask('.js-form-contacts .js-telephone')
}

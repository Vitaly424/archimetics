import Accordion from 'accordion-js'

export const servicesAccordion = () => {
	const accordionOne = document.querySelector('.js-accordion-services-one')
	const accordionTwo = document.querySelector('.js-accordion-services-two')

	if (!accordionOne || !accordionOne) return

	const accordionOneElement = new Accordion(accordionOne, {
		beforeOpen: () => {
			document
				.querySelectorAll('.js-accordion-services-two .ac')
				.forEach((item, idx) => {
					if (item.classList.contains('is-active')) {
						accordionTwoElement.close(idx)
					}
				})
		},
	})

	const accordionTwoElement = new Accordion(accordionTwo, {
		beforeOpen: () => {
			document
				.querySelectorAll('.js-accordion-services-one .ac')
				.forEach((item, idx) => {
					if (item.classList.contains('is-active')) {
						accordionOneElement.close(idx)
					}
				})
		},
	})
}

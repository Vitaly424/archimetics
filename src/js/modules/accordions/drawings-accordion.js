import Accordion from 'accordion-js'

export const drawingsAccordion = () => {
	const drawingsAccordion = document.querySelector(
		'.js-card-portfolio-drawings'
	)

	if (!drawingsAccordion) return

	const accordion = new Accordion(drawingsAccordion)

	accordion.open(0)
}

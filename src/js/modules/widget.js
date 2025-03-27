export const widget = () => {
	const DOMString = {
		btnOpenWidget: '.js-widget-trigger',
		btnCloseWidget: '.js-widget-close',
		widgetContent: '.js-widget-content',
	}

	const btnOpenWidget = document.querySelector(DOMString.btnOpenWidget)
	const btnCloseWidget = document.querySelector(DOMString.btnCloseWidget)
	const widgetContent = document.querySelector(DOMString.widgetContent)

	btnOpenWidget.addEventListener('click', () => {
		widgetContent.classList.add('widget__content--active')
	})

	btnCloseWidget.addEventListener('click', () => {
		widgetContent.classList.remove('widget__content--active')
	})
}

// -------------------------------------------------
// Draw circle from center

/**
 * 
 * @param {UINT8 0Array} frequencyArray 
 * @param {canvas context} ctx 
 * @param {object} params
 * 
 */

function render(frequencyArray, ctx, params) {
	const { 
		centerX, centerY, 
		height=500, 
		width=500,
		bgColor= 'rgba(255, 255, 155, 0.21)'} = params
	ctx.fillStyle = bgColor
	ctx.fillRect(0, 0, width, height)
	ctx.fill()

	const bars = frequencyArray.length 
	const colorStep = 360 / bars
	const pi2 = Math.PI * 2

	// Draw circles centered in canvas
	frequencyArray.forEach((f, i) => {
		// scale f to 0 - 300
		const radius = f / 255 * 300
		// Begin a new path
		ctx.beginPath()
		// Draw a circle of radius
		ctx.arc(centerX, centerY, radius, 0, pi2)
		// set stroke color
		ctx.strokeStyle = `hsla(${colorStep * i}, 100%, 50%, 0.1)`
		// stroke path
		ctx.stroke()
	})
}

export default render
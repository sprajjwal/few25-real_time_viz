
// Notes 
// https://www.kkhaydarov.com/audio-visualizer/
// https://medium.com/@duraraxbaccano/computer-art-visualize-your-music-in-javascript-with-your-browser-part-2-fa1a3b73fdc6


// Import a renderer 
import circleRenderer from './radialRayMonoRenderer.js'
import circleGridRenderer from './renderCircleGrid.js'
import circleCenterRenderer from './renderCircleCenter.js'
import verticalBarsRenderer from './verticalBarRenderer.js'
import verticalBarsMonoRenderer from './verticalBarsMonoRenderer.js'
import radialRayRenderer from './radialRayRenderer.js'


// --------------------------------------------------------
// Canvas

// Get reference to the canvas context for use by the 
// renderers below
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
console.log(getComputedStyle(canvas).getPropertyValue('height'))

// ----------------------------------------------------------
// Buttons 
const playButton = document.getElementById('button-play')
const pauseButton = document.getElementById('button-pause')

playButton.addEventListener('click', (e) => {
	startAudio()
})

pauseButton.addEventListener('click', (e) => {
	audio.pause()
})


// --------------------------------------------------------
// Audio setup

// Defime some variables 
let analyser
let frequencyArray
let audio

// Starts playing the audio
function startAudio() {
	// make a new Audio Object
	audio = new Audio()
	// Get a context 
	const audioContext = new (window.AudioContext || window.webkitAudioContext)()
	
	// Define a source sound file 
	// You can replace this with your own file
	audio.src = 'bird-whistling-a.wav'
	// audio.src = 'log-sine-sweep.wav'

	// Make a new analyser
	analyser = audioContext.createAnalyser()
	// Connect the analyser and the audio
	const source = audioContext.createMediaElementSource(audio)
	source.connect(analyser)
	analyser.connect(audioContext.destination)

	// Get an array of audio data from the analyser
	frequencyArray = new Uint8Array(analyser.frequencyBinCount)
	// console.log(frequencyArray.length)
	
	// Start playing the audio
	audio.play()

	requestAnimationFrame(render)
}

// This function renders the audio to the canvas using a renderer
function render() {

	const centerX = 500 / 2 
	const centerY = 500 /2  
	const radius = 500 / 5
	analyser.getByteFrequencyData(frequencyArray)
	
	const params = {
		centerX, centerY,
		height: 500,
		width: 500,
		bgColor: 'rgba(255, 255, 255, 0.21)'
	} // updated arguments through params
	// Use one of the renderers below 
	// radialRayRenderer(frequencyArray, ctx, centerX, centerY, radius)
	// verticalBarsMonoRenderer(frequencyArray, ctx, 12, 500, 500)
	// verticalBarsRenderer(frequencyArray, ctx, 500, 500)
	circleCenterRenderer(frequencyArray, ctx, params)
	// circleGridRenderer(frequencyArray, ctx, 500, 500)
	// circleRenderer(frequencyArray, ctx, centerX, centerY, radius)

	// Set up the next animation frame
	requestAnimationFrame(render)
}


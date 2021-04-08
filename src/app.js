const { json } = require('express')
const express = require('express')
require("dotenv").config()
const app = express()
const port = process.env.PORT
const fetch = require('node-fetch')
const url = 'https://api.sendinblue.com/v3/smtp/email'
app.use(express.urlencoded({extended:false}))

app.post('/contactus', (request, response) => {
	var data = request.body
	var options = {
		method: 'POST',
		headers: {Accept: 'application/json', 'Content-Type': 'application/json', 'api-key': process.env.SIP_KEY},
		body: JSON.stringify({
			sender: {
				name: 'Contact Form',
				email: 'contactform@hecopywriting.com'
			},
			to: [{
				name: 'Hanna',
				email: 'hanna@hecopywriting.com'
			}],
			subject: 'New Inquiry from hecopywriting.com',
			htmlContent: '<html><head></head><body><p>Hello,</p><p>Name: ' + data.name + '</p>' + '<p>Email: ' + data.email + '</p><p>Message: ' + data.message + '</p></body></html>',
			textContent: 'Hello, \r\n' + 'Name: ' + data.name + '\r\nEmail: ' + data.email + '\r\nMessage: ' + data.message
		})
	}
	fetch(url, options)
		.then(res => res.json())
		.then(json => {
			console.log(json)
			let responseBody = '<!doctype html>'
				+ '<html lang="en">' 
				+ '<head>' 
				+ '<meta charset="utf-8">' 
				+ '<meta http-equiv="X-UA-Compatible" content="IE=edge">' 
				+ '<meta name="viewport" content="width=device-width, initial-scale=1">' 
				+ '<meta name="description" content="Hanna, Elizabeth, copywriter, Mohawk, Valley">' 
				+ '<meta name="keywords" content="copy, writing, copywriter, Mohawk, Valley, blog, posting, small, business, leads, participation">' 
				+ '<title>Hanna Elizabeth Copywriting</title>' 
				+ '<link rel="stylesheet" href="/css/index.css" defer>' 
				+ '</head>'
				+ '<body>'
				+ '<article class="hero is-fullheight">'
				+ '<div class="hero-body">'
				+ '<section class="container has-text-centered">'
				+ '<h1 class="header has-text-primary">Hanna Elizabeth</h1>'
				+ '<hr class="hr-black">'
				+ '<br/>'
			if (json.messageId) {		
				responseBody += '<p class="is-size-2"><b>Thank You for your Inquiry!</b></p>'
			} else {
				responseBody += '<p class="is-size-2"><b>There was an error submitting your Inquiry. Please try again soon!</b></p>'
			}
			responseBody += '<p class="is-size-3"><b>I will be in contact soon. <a href="https://hecopywriting.com">Home</a></b></p>'
				+ '</div>'
				+ '</section>'
				+ '</article>'
				+ '</body>'
				+ '<footer class="has-text-centered has-background-primary">'
				+ '<p class="is-size-6 has-text-white">Built using <a class="has-text-white" href="https://bulma.io"><u>Bulma</u></a>!</p>'
				+ '</footer>'
				+ '</html>'
				response.send(responseBody)
		})
		.catch(err => console.error('error:' + err))	
})

app.listen(port, () => {
	console.log(`hecopywriting contact us app listening at ${port}`)
})
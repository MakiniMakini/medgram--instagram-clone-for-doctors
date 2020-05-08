// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()
const superagent = require("superagent")

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {
	res.render('index', null)
})
//username router
router.get('/:username', (req, res) => {
	  const username = req.params.username
	  const instagramAPI =  "https://www.instagram.com/"+username+"/?__a=1"

	  superagent.get(instagramAPI)
	  .query(null)
	  .set("Accept", "application/json")
	  .end((err, response) => {
		  if(err){
			  res.json({
				  confirmation: "fail", 
				  message: err.message
			  })
			  return 
		  }
		  res.render("index", response.body)
	  })
})

/*  This route render json data */
router.get('/json', (req, res) => {
	res.json({
		confirmation: 'success',
		app: process.env.TURBO_APP_ID,
		data: 'this is a sample json route.'
	})
})

/*  This route sends text back as plain text. */
router.get('/send', (req, res) => {
	res.send('This is the Send Route')
})

/*  This route redirects requests to Turbo360. */
router.get('/redirect', (req, res) => {
	res.redirect('https://www.turbo360.co/landing')
})


module.exports = router

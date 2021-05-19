const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const keys = require('./config/keys')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json()) 

app.use(setUser)
app.use('/api/auth/login', login)
app.use('/api/auth/user', getUser)

const USER = {id: '1', login: 'user', password: '123456', name: 'Александра Лютая', link: 'https://img4.goodfon.ru/wallpaper/nbig/5/42/alex-fetter-mara-model-blondinka-krasavitsa-portret-prichesk.jpg'}

async function login(req, res) {
  const login = req.body.login
  const password = req.body.password

  user = USER 
  if (!user) {
      return res.status(400).json({message: 'no such user'})
  }
  if (user.password != password) {
      return res.status(403).json({message: 'wrong password'})
  }
  const token = jwt.sign({userId: user.id}, keys.secret, {expiresIn: 3600})
  res.status(200).json({token: 'Bearer ' + token, name: user.name, link: user.link})
} 

function getUser(req, res) {
  if (req.user) {
    res.status(200).json(req.user)
  }
  else {
    res.status(403).json({error: 'noauth'})
  }
}

async function setUser(req, res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        await jwt.verify(token, keys.secret, async (err, sxs) => {
            if (err) return res.status(403).json({error: err})
            pUser = USER
            console.log(pUser)
            req.user = pUser
        })
    }
    else {
        console.log('no-auth')
    }
    next()
}

module.exports = app
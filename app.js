/*
 * @Author: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @Date: 2023-03-12 14:05:01
 * @LastEditors: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @LastEditTime: 2023-03-14 08:34:27
 * @FilePath: /blog/app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express=require('express')
const bodyParser=require('body-parser')
const ejs=require('ejs')
const lo=require('lodash')

const homeStart="A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs."
const contactContent="Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point."
const aboutContent='This is because paragraphs show a reader where the subdivisions of an essay begin and end.'
const app=express()

app.set('view engine','ejs')
// View engines allow us to render web pages using template files.
// These templates are filled with actual data and served to the client. 
// There are multiple view engines, the most popular of which is Embedded Javascript (EJS).

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

let posts=[]

app.get('/',function (req,res) {
  res.render('home',{homeStart:homeStart,posts:posts})
  console.log(posts)
})

app.get('/about',function(req,res){
  res.render('about',{aboutContent:aboutContent})
})

app.get('/contact',function(req,res){
  res.render('contact',{contactContent:contactContent})
})

app.get('/compose',function(req,res){
  
  res.render('compose')
})

app.post('/compose',function(req,res){
  const post={
    title:req.body.compose_title,
    content:req.body.compose_content
  }
  posts.push(post)
  res.redirect('/')
})


app.get('/posts/:postName',function(req,res){
  const requestedTitle=lo.lowerCase(req.params.postName)
  posts.forEach(function(post){
    const storedTile=post.title
    if(requestedTitle===lo.lowerCase(storedTile)) {
      res.render('post',{
        title:post.title,
        content:post.content
      })
    }else{
      console.log('not match')
    }  
  })
})
app.listen(3002,function(){
  console.log('server is running on port 3002')
})
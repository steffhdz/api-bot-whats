const express = require('express')
const router=express.Router()
const Friend=require('../models/friend')

//obtener todos
router.get('/', async(req,res)=>{
    try{
        const friends= await Friend.find()
        res.json(friends)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


//obtener uno 
router.get('/:id', getFriend,(req,res)=>{
    res.json(res.friend)
})

//crear 
router.post('/',async(req,res)=>{
    const friend = new Friend({
        name:req.body.name,
        phone:req.body.phone,
        birthday:req.body.birthday
    })
    try{
        const newFriend= await friend.save()
        res.status(201).json(newFriend)
    } catch(err){
        res.status(400).json({message:err.message})
    }
})

//actualizar 
router.patch('/:id', getFriend, async (req,res)=>{
    if (req.body.name !=null){
        res.book.name=req.body.name
    }
    if (req.body.phone !=null){
        res.book.phone=req.body.phone
    }
    try{
        const name=await res.friend.save()
    }catch (err){
        res.status(400).json({message: err.message})
    }
})

//borrar
router.delete('/:id',getFriend,async (req,res)=>{
    try{
        await res.friend.remove()
        res.json({message: 'Delated'})

    }catch (err){
        res.status(500).json({message: err.message})
    }

})

async function getFriend(req,res,next){
    let friend
    try{
        friend= await Friend.findById(req.params.id)
        if(friend==null){
            return res.status(404).json({message: 'Cannot find friend'})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.friend = friend
    next()
}
//cumpleaños



module.exports=router 
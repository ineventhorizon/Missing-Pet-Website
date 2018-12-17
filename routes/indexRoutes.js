const express=require('express');
const router=express.Router();

let data=[
    {
        postImg:"https://i.hizliresim.com/16kdr1.jpg",
        postTitle: "Kayıp 1",
        postType: "Kayıp İlanı",
        userCity: "Eskişehir",
        userPhone: "555 432 4242",
        postNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec nam aliquam sem et tortor consequat id."
    },
    {
        postImg:"https://i.hizliresim.com/v6L4RO.jpg",
        postTitle: "Kayıp 2",
        postType: "Kayıp İlanı",
        userCity: "İstanbul",
        userPhone: "535 138 1242",
        postNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec nam aliquam sem et tortor consequat id."
    },
    {
        postImg:"https://i.hizliresim.com/nQgr21.jpg",
        postTitle: "Sahiplendirme",
        postType: "Sahiplendirme İlanı",
        userCity: "Ankara",
        userPhone: "545 162 6221",
        postNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec nam aliquam sem et tortor consequat id."
    }
]


router.get("/",(req,res)=>{
    res.render('home',{data:data});
})

router.get("/ilanlar",(req,res)=>{
    res.render('home',{data:data});
})

router.get("/ilanver",(req,res)=>{
    res.render('ilanver');
})

router.get("/veterinerler",(req,res)=>{
    res.render('veterinerler');
})



module.exports=router;
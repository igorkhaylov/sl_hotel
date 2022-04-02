

    //                      modalGuests


const aviable = document.querySelector('#aviable'),
    guests = document.querySelector('#guests'),
    checkIN = document.querySelector('#check-in'),
    checkOUT = document.querySelector('#check-out'),
    checkIN2 = document.querySelector('.check-in-2'),
    checkOUT2 = document.querySelector('.check-out-2'),
    modalBtn2 = document.querySelector('.modal-guests-btn'),
    modalBtnTest = document.querySelector('.qwer')
    

   



    function modal(parent,abc) {
        const modalGuests = document.querySelector(parent) ,
    adults = modalGuests.querySelector('.adults'),
    children = modalGuests.querySelector('.children'),
    deluxe = modalGuests.querySelector('.deluxe-input'),
    econom = modalGuests.querySelector('.econom-input')

        let modalBtn = modalGuests.querySelector('.av-rooms')
        document.addEventListener('click',function (e){
        if(!e.target.closest('.modal-guests') && !e.target.closest('#guests') &&!e.target.closest('.input_ic-guests') && abc ){
            modalGuests.classList.remove('modal-guests_active')
        }
    } )
    if(abc){
        modalBtn = modalBtnTest
        guests.addEventListener('focus',function(e){
           modalGuests.classList.add('modal-guests_active')
        })
            }
        modalBtn.addEventListener('click',function(e){
            e.preventDefault()
            guests.value = ''
            if(deluxe.checked){
                guests.value = 'Deluxe'
            }else if(econom.checked){
                guests.value = 'Econom'
            }
            guests.value += ' ' + adults.value
            guests.value += ' ' + children.value
        })
        modalGuests.addEventListener('click', function(e){
            if(e.target.closest('.plus')){
                e.target.previousElementSibling.value ++
            }else if(e.target.closest('.minus' )){
                if( (e.target.nextElementSibling.value > 0)){
                    e.target.nextElementSibling.value --
                }
            }
        })
        function modalBtnValidate(btn,input1,input2) {
            btn.addEventListener('click', function(e){
                if(input1.value && input2.value){

                    setTimeout((event)=>{aviable.click()}, 1000)

                    const blockID = modalBtn.getAttribute('href')
                    document.querySelector(''+blockID).scrollIntoView({behavior:'smooth'})
                    input1.classList.remove('err_date')
                    input2.classList.remove('err_date')
                }else{
                   input1.classList.add('err_date')
                   // input1.placeholder = 'Ведите дату'
                   input2.classList.add('err_date')
                   // input2.placeholder = 'Ведите дату'
                }
            })


        }
        modalBtnValidate(modalBtn2,checkIN,checkOUT)
        modalBtnValidate(modalBtn,checkIN2,checkOUT2)
        modalBtn.addEventListener('click',function(e){
            if(checkIN2.value && checkOUT2.value ){
                modalReserv.classList.remove('modal-guests_active')
            }
        })
    }



modal('.modal-guests',true)
modal('.modal-guests-2',false)


const  booking = document.querySelector('.booking-button'),
    modalReserv = document.querySelector('.modal-reservation'),
    closeReserv = document.querySelector('.close_reservation'),
    selectRoom = document.querySelector('.select-rooms')

    closeReserv.addEventListener('click',function(e){
        modalReserv.classList.remove('modal-guests_active')
    })
    booking.addEventListener('click',function(e){
        modalReserv.classList.add('modal-guests_active')

   
       if(checkIN.value){
        checkIN2.value = checkIN.value  
       } 
   
       
       if(checkOUT.value){
           checkOUT2.value = checkOUT.value
          
       } 
        

    })

  const change =   document.querySelector('.change-rooms'),
        section =   document.querySelectorAll('.room-section'),
        sliderItem = document.querySelectorAll('.slider-item')
       


        let  av = false

        change.addEventListener('click', function(e){
            const dataset = e.target.dataset.f
            if(dataset){

                av = false
                if(dataset === 'av'){
                        sliderItem.forEach(el=>{
                            if(el.classList.contains('av')){
                                av = true
                            }   
                        })
                        if(!av ) {  
                                document.querySelector(''+aviable.getAttribute('href')).scrollIntoView({behavior:'smooth',block:'center'})
                        }
                }
                sliderItem.forEach(el =>{
                    el.style.display = 'none'
                   
                    setTimeout(() => {
                        if(el.classList.contains(dataset)){
                            el.style.display = 'block'
                        }   
                    }, 20);
                })
            }
            


        })

        const burgerBtn =document.querySelector('.burger-btn'),
            header = document.querySelector('header')
        burgerBtn.addEventListener('click',function(e){
            header.classList.toggle('try')


        })


        const inputs = document.querySelector('.inputs'),
        modalGuests2 = document.querySelector('.modal-guests')
        inputs.addEventListener('click' , function(e){
            if(e.target.classList.contains('input_ic')){
                e.target.previousElementSibling.focus()
            }else if(e.target.classList.contains('input_ic-guests')){
                modalGuests2.classList.add('modal-guests_active')

            }

        })

        const currentRooms = document.querySelector('.current-rooms'),
            sections = document.querySelector('.room-sections'),
            currentText = document.querySelector('.current-text'),
            mobileClose = document.querySelector('.close_header')

            currentRooms.addEventListener('click' , function(e){
                sections.classList.add('sections_active') 
            })

            document.addEventListener('click' , function(e){
                if(e.target.closest('.room-section')){
                    currentText.innerText = e.target.innerText
                    sections.classList.remove('sections_active')
                }else if(!e.target.closest('.room-section') && !e.target.closest('.current-rooms') ){
                    sections.classList.remove('sections_active')
                }
               
            })
            mobileClose.addEventListener('click', (e) =>{
                header.classList.remove('try')
            })
   


        
//                      slider

const slidersFront = $('.slider-front'),
    slidersBack = $('.slider-back'),
    slidersClose = $('.close'),
    langItems = $('.lang_item'),
    lang = $('.lang'),
    slidersInfo = $('.slider-item-info')

    for (let i = 0; i < slidersFront.length; i++) {
        const sliderFront = slidersFront[i],
            sliderClose = slidersClose[i],
            sliderBack = slidersBack[i],
            sliderInfo = slidersInfo[i]
            

        sliderClose.addEventListener('click',function (e) {
            sliderBack.classList.add('slider-item_active')
            sliderFront.classList.remove('slider-item_active')
            
        })    

        sliderInfo.addEventListener('click', function(e){
            sliderFront.classList.add('slider-item_active')
            sliderBack.classList.remove('slider-item_active')

        })
        const roomNumber = sliderInfo.querySelector('.comfort').innerText
        sliderBack.querySelector('.booking-button-slider').addEventListener('click',function(e){
            if(! this.closest('._disabled')){
                e.preventDefault()
                modalBtn.innerText = roomNumber
                modalBtn.disabled = true
                modalReserv.classList.add('modal-guests_active')
                modalBtn.classList.add('_selected')
                document.querySelector(''+aviable.getAttribute('href')).scrollIntoView({behavior:'smooth',block:'end'})
            }
           
        })
        
    }
    

let modalBtn = document.querySelector('.av-rooms')
lang[0].addEventListener('click', function (e) {
    this.classList.toggle('lang-activ')
    if( this.closest('.lang-activ')){
        e.preventDefault()


        
    }
     
     
})

document.querySelector('#check-in').readOnly = true
document.querySelector('#check-out').readOnly = true
document.querySelector('.check-in-2').readOnly = true
document.querySelector('.check-out-2').readOnly = true
document.querySelector('#guests').readOnly = true


let side =  'top left'

if(window.innerWidth < 800){
    side = 'bottom left'
}
const calendars =  document.querySelectorAll('.calendar')
calendars.forEach((el,index) =>{
    new AirDatepicker(el,{
        position: side ,
        autoClose: true,
    })
    el.addEventListener('blur',function(e){
        let m = index
        setTimeout((s=0)=>{
            
            if( this.value  && calendars[++m] && !calendars[m].closest('#check-in')  ) {
                calendars[m].focus()
                m = m - 3
                
            }
        },0)
    })
    
})

// console.log(document.querySelectorAll('input'))





new Swiper('.slider',{
    slidesPerView: 3 ,
    spaceBetween: 30,
    
    navigation:{
        nextEl: '.next-btn',
        prevEl: '.prev-btn'
    },
   
    breakpoints:{
        320:{
            slidesPerView: 1 ,
          
        },
        800:{
            slidesPerView: 2 ,
            spaceBetween: 20,
        },
        1200:{
            slidesPerView: 3 ,
        },
    }

}
)
new Swiper('.slider-2',{
    slidesPerView: 3 ,
    spaceBetween: 30,
    
    navigation:{
        nextEl: '.buttons>.right',
        prevEl: '.buttons>.left'
    },
   
    breakpoints:{
        320:{
            slidesPerView: 1 ,
          
        },
        800:{
            slidesPerView: 2 ,
            spaceBetween: 20,
        },
        1200:{
            slidesPerView: 3 ,
        },
    }

}
)


function pagination(front){

    const sliderImages = [front.querySelector(".pic1").src, front.querySelector(".pic2").src, front.querySelector(".pic3").src],
        paginationItem = front.querySelectorAll('.pagination-item'),
        sliderImg = front.querySelector('.slider-item_img')
    let  img = 0
    
    paginationItem.forEach((el,index)=>{
        if(!sliderImages[index]){
            el.style.display = 'none'
        }
    })

    front.addEventListener('click', function(e){
    
        if(! e.target.closest('.slider-item-info')){
       
            paginationItem.forEach((el , index) => {
                if(e.target === el){
                    img = index
                } 
            })
            if(e.target.closest('.slider-item_img') && img < sliderImages.length  ){
                img ++   
            }
            if(img === sliderImages.length ){ 
                img = 0
            } 
            if(!sliderImages[img]){
                img = 0
            }
            sliderImg.classList.add('first')
        setTimeout(() => {
            sliderImg.classList.remove('first')
            sliderImg.src = sliderImages[img]
        }, 300);
        paginationItem.forEach((el , index) => {
            if(index  === img) {
                el.classList.add('pagination-item_active')
            } else el.classList.remove('pagination-item_active')
        })
     }  
    })
}





document.querySelectorAll('.slider-front').forEach(e =>{

    pagination(e ,"img/img-1.png","img/img-2.png", "img/img-3.png" )
})
const q = document.querySelector('.slider')
const scrol = document.querySelectorAll('.scroll')
function scroll(el,locale){
    el.addEventListener('click', function(e){
        e.preventDefault()
        const blockID = el.getAttribute('href')
        document.querySelector(''+blockID).scrollIntoView({behavior:'smooth',block:locale})
    
})
}
document.querySelectorAll('.scroll-top').forEach(el=>{
    scroll(el,'start')
})
scrol.forEach(el=>{
    scroll(el,'center')

})



const attractions = document.querySelector('.attractions'),
    attractionImg = attractions.querySelector('.attraction-img'),
    attractionImg2 = attractions.querySelector('.attraction-img-2'),
    paginationItems = attractions.querySelectorAll('.circle'),
    attractionInfo = attractions.querySelector('.attraction-info'),
    leftButton  = attractions.querySelector('.left'),
    rightButton  = attractions.querySelector('.right'),
    attractionTitle  = attractions.querySelector('.attraction-info-title'),
    attractionText  = attractions.querySelector('.attraction-info-text'),
    street  = attractions.querySelector('.street'),
    space  = attractions.querySelector('.space')

    



function attractionsPagination(content){
    let img = 0
    let c = img
    
    attractions.addEventListener('click', function(e){
        if(e.target.closest('.circle' ) || e.target.closest('.attraction-button' )  ){

        
      
       

            paginationItems.forEach((el , index) =>{
                if(e.target === el){
                    img = index

                    
                } 
            })
            if(e.target.closest('.right') && img < content.length  ){
                img ++   
            }else if(e.target.closest('.left')  ){

                if(img !== 0){
                    img --
                }else{
                    img = content.length - 1
                }

            }
            if(img === content.length ){ 
                img = 0
            } 
            if(!content[img]){
                img = 0
            }
            if( c > img ){
                attractionImg2.classList.toggle('first')
            
            }else if(c < img){
                attractionImg2.classList.toggle('first-2')
              
            }
            c = img
            
        attractionImg.src = content[img].img
        attractionImg2.src = content[img].img
        attractionTitle.innerText = content[img].title
        attractionText.innerText  = content[img].text
        street.innerText          = content[img].street
        space.innerText           = content[img].space
            
            setTimeout(() => {
                attractionImg2.classList.remove('first-2')
                
                attractionImg2.classList.remove('first')
               

        }, 500);
        paginationItems.forEach((el , index) =>{
            if(index  === img){
                el.parentNode.classList.add('_active')
                attractionInfo.style.top = el.parentNode.offsetTop - ( attractionInfo.offsetHeight / 2 -10 ) + 'px'
               
                
                
            }else el.parentNode.classList.remove('_active')
        })
    }
    })
}

const viewRooms = $('.view-rooms'),
    all = $('.all-label')

    viewRooms[0].addEventListener("click",function(e){
    console.log(all)
    all[0].click()
})

// const content =[
//     {
//       'img':  'img/attraction-1.webp',
//       'title' : 'Place-1',
//       'text' : ' Lorem ipsum dolor sit amet consectetur adipisicing elit.  adipisicing   adipisicing   adipisicing  adipisicing  Quod quasi, nam veritatis a adipisci voluptatum deleniti officiis cum voluptas! Rem!',
//       'street' : 'Street - Oksaroy 1',
//       'space' : 'Walk 45 min',
//
//   },
//     {
//       'img':  'img/attraction-2.webp',
//       'title' : 'Place-2',
//       'text' : ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quasi, nam veritatis a adipisci voluptatum deleniti officiis cum voluptas! Rem!',
//       'street' : 'Street - Oksaroy 1',
//       'space' : 'Walk 45 min',
//
//   },
//     {
//       'img':  'img/attraction-3.webp',
//       'title' : 'Place-3',
//       'text' : ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quasi, nam veritatis a adipisci voluptatum deleniti officiis cum voluptas! Rem!',
//       'street' : 'Street - Oksaroy 1',
//       'space' : 'Walk 45 min',
//
//   },
//     {
//       'img':  'img/attraction-4.webp',
//       'title' : 'Place-4',
//       'text' : ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quasi, nam veritatis a adipisci voluptatum deleniti officiis cum voluptas! Rem!',
//       'street' : 'Street - Oksaroy 1',
//       'space' : 'Walk 45 min',
//
//   },
//    {
//       'img':  'img/attraction-5.webp',
//       'title' : 'Place-5',
//       'text' : ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quasi, nam veritatis a adipisci voluptatum deleniti officiis cum voluptas! Rem!',
//       'street' : 'Street - Oksaroy 1',
//       'space' : 'Walk 45 min',
//
//   }]
attractionsPagination(content)
//
//

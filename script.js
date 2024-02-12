let songPaths=['./audio/Channa_Mereya_Arijit.mp3','./audio/manava_lage.mp3','./audio/Agar_Tum_Sath_Ho.mp3','./audio/z_atMyWorst.mp3','./audio/citySlum.mp3','./audio/Bandey_yare_Bandeya.mp3','./audio/BROWN_MUNDE_-_AP_DHILLON__GURINDER_GILL__SHINDA_KAHLON__GMINXR(128k).mp3','./audio/tera_yaar_hoo_mai.mp3','./audio/Dhaga_Dhaga_Song_Video_-_Daagdi_Chaawl__Marathi_Song__Ankush_Chaudhari,_Pooja_Sawant(128k).mp3','./audio/DIVINE_-_Kaam_25__Sacred_Games_(Prod._by_Phenom)(128k).mp3','./audio/Hawayein_Full_Song__Arijit_Singh__Pritam__Irshad_Kamil(128k).mp3','./audio/Iktara_Full_Video_-_Wake_Up_SidRanbir_Kapoor,Konkona_Sen_SharmaKavita_SethAmit_Trivedi(128k).mp3','./audio/tera_yaar_hoo_mai.mp3','./audio/Jagnyala_Pankh_Futle_Song_-_Movie_Baban__Marathi_Songs_2018__Harsshit_Abhiraj__Bhaurao_Karhade(128k).mp3','./audio/Jogi_-_Lyrical_Shaadi_Mein_Zaroor_Aana_Rajkummar_Rao,Kriti_KArko_ft_Yasser_Desai,Aakanksha_Sharma(128k).mp3','./audio/Kabira_Full_Song_Yeh_Jawaani_Hai_Deewani__Pritam__Ranbir_Kapoor,_Deepika_Padukone(128k).mp3'];
setSongList();
const bar=document.getElementById('i_bar');

const playPause=document.getElementById('playPause');
let currAudio=new Audio('./audio/audio.mp3');
const progressBar=document.getElementById('prog_bar');
let currIdx=-1;
const btn_next=document.getElementById('btn_next');
const btn_previous=document.getElementById('btn_previous');

const div_song=document.querySelectorAll('.d_song');
// console.log(div_song)







// ****************** Functions **************************

function setSongList()
{
    let songCont=document.getElementById('cont_songs');
    let str='';
    for(let i=0;i<songPaths.length;i++)
    {
       let temp= songPaths[i].substring(8);
       
      

       str+=`<div class="d_song">
       <div>
           <h3 id="sn" >${i+1}</h3>
           <h3 id="name">${temp}</h3>
       </div>
    </div>`;

    }

    songCont.innerHTML=str;
}

function playSong(idx){

      if(idx==songPaths.length) idx=1;
    currAudio.pause();
    currAudio=null;
    currAudio=new Audio(songPaths[idx]);
    changeSongName(idx);
    progressBar.value=0;
    // currAudio.play();
    playPause.click();
    currIdx=idx;
    currAudio.addEventListener('timeupdate',()=>{
        let progress=Math.floor((currAudio.currentTime/currAudio.duration)*100);
        progressBar.value=progress;
        updateSongTime();
        if(progress==100)
        {
            playSong(idx+1)
        }
   });

}
// ****************** Event Listener ***********************


div_song.forEach(element => {
    element.addEventListener('click',(e)=>{
    let clickEle=e.target.closest('.d_song');
    let idx=parseInt(clickEle.querySelector('#sn').innerText);
    let pp=document.getElementById('playPause');
    if(pp.classList.contains('fa-pause'))
    {
       
        pp.classList.remove('fa-pause');
        pp.classList.add('fa-play');
        currAudio.pause();
         document.getElementById('gif').style.setProperty('display','none');
    }
      
        playSong(idx-1);
    })
});


btn_next.addEventListener('click',()=>{
    progressBar.value=0;
    if(currIdx==songPaths.length-1) currIdx=-1;

    
  {
    let pp=document.getElementById('playPause');
    if(pp.classList.contains('fa-play'))
   {
    pp.classList.remove('fa-play');
    pp.classList.add('fa-pause');
     document.getElementById('gif').style.setProperty('display','block');
   }
  }



    currAudio.pause();
    currAudio=null;
    currAudio=new Audio(songPaths[++currIdx]);
    changeSongName(currIdx);
    currAudio.play();

    currAudio.addEventListener('timeupdate',()=>{
        let progress=Math.floor((currAudio.currentTime/currAudio.duration)*100);
        progressBar.value=progress;
        updateSongTime();
        if(progress==100)
        {
            playSong(idx+1)
        }
   });
});

btn_previous.addEventListener('click',()=>{
    progressBar.value=0;
    if(currIdx==0) currIdx=songPaths.length;
    if(currIdx==-1) currIdx=songPaths.length;


    {
        let pp=document.getElementById('playPause');
        if(pp.classList.contains('fa-play'))
       {
        pp.classList.remove('fa-play');
        pp.classList.add('fa-pause');
         document.getElementById('gif').style.setProperty('display','block');
       }
      }


    currAudio.pause();
    currAudio=null;
    currAudio=new Audio(songPaths[--currIdx]);
    changeSongName(currIdx);
    currAudio.play();

    currAudio.addEventListener('timeupdate',()=>{
        let progress=Math.floor((currAudio.currentTime/currAudio.duration)*100);
        progressBar.value=progress;
        updateSongTime();
        if(progress==100)
        {
            playSong(idx+1)
        }
   });
})

progressBar.addEventListener('input',()=>{

    let t=(parseInt(currAudio.duration)*parseInt(progressBar.value))/100;
      
      currAudio.currentTime=t;
    
 
})

currAudio.addEventListener('timeupdate',()=>{
     let progress=Math.floor((currAudio.currentTime/currAudio.duration)*100);
   
     progressBar.value=progress;


    updateSongTime();

     
     if(progress==100)
     {
         playSong(idx+1)
     }
})

function changeSongName(idx)
{
    console.log(songPaths[idx])
    document.getElementById('songName').innerText=songPaths[idx].slice(8);
}

function updateSongTime(){
    



    {
        let cm=parseInt(currAudio.currentTime/60);
        let cs=parseInt(currAudio.currentTime%60);
        let ct=``;
         if(cm<10)
         {
             ct+='0'+cm;
            }else ct+=cm;
            
            ct+=':';
            
            if(cs<10)
            {
                ct+='0'+cs
            }else ct+=cs;
            document.getElementById('currTime').innerText=ct;
    }
            
        {

            let cm=parseInt(currAudio.duration/60);
        let cs=parseInt(currAudio.duration%60);
        let ct=``;
         if(cm<10)
         {
             ct+='0'+cm;
            }else ct+=cm;
            
            ct+=':';
            
            if(cs<10)
            {
                ct+='0'+cs
            }else ct+=cs;
            document.getElementById('duration').innerText=ct;
        }



    
}

playPause.addEventListener('click',(e)=>{
    let pp=e.srcElement;
    // document.getElementById(prog_bar).value=0;
   
   
   if(pp.classList.contains('fa-play'))
   {
    pp.classList.remove('fa-play');
    pp.classList.add('fa-pause');
    currAudio.play();
     document.getElementById('gif').style.setProperty('display','block');
   }else{
    pp.classList.remove('fa-pause');
    pp.classList.add('fa-play');
    currAudio.pause();
     document.getElementById('gif').style.setProperty('display','none');
   }
});


bar.addEventListener('click',()=>{
        let cont=document.getElementById("cont_songs");
        let display=window.getComputedStyle(cont).getPropertyValue('display');
        let cont_control=document.getElementById('cont_display');
        let img=document.getElementById('m_img');
        console.log(display)
        if(display=='block' || display=='flex')
        {
            console.log('flex')
            cont.style.setProperty('display','none');
            cont_control.style.setProperty('width','100%');
            img.style.setProperty('width','50%');
        }
        else if(display=='none'){
           console.log('none')
            cont.style.setProperty('display','block');
            cont_control.style.setProperty('width','75%');
            img.style.setProperty('width','80%');
        }

        // alert('click')
      
})



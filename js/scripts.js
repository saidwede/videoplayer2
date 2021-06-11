var slider = document.getElementById('video-progress');
const myVid = document.getElementById('video-player');
const playButton = document.getElementById('play-button');
const playIcon = document.getElementById('play-icon');
stopUpdatting = false;

slider.addEventListener('mousemove', () =>{
    stopUpdatting = true;
});
slider.addEventListener('mouseout', () =>{
    stopUpdatting = false;
})
noUiSlider.create(slider, {
    start: 0,
    connect: [true,false],
    range: {
        'min': 0,
        'max': 100
    },
    format: wNumb({
        decimals: 5
    })
});

myVid.addEventListener('click', toggleVideo);
myVid.addEventListener('progress', updateProgress);
myVid.onended = function() {
    playIcon.classList.remove('fa-play');
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-redo-alt');
};
var myIntervalle = setInterval(updateProgress, 1000);

playButton.addEventListener('click', toggleVideo);
slider.noUiSlider.on('end', function (values, handle) {
    myVid.currentTime = myVid.duration*(values[handle]/100);
    //stopUpdatting = false;
});
slider.noUiSlider.on('start', function (values, handle) {
    //stopUpdatting = true;
    //console.log('Start!');
});
slider.noUiSlider.on('slide', function (values, handle) {
    myVid.currentTime = myVid.duration*(values[handle]/100);
});
slider.noUiSlider.on('change', function (values, handle) {
});

function toggleVideo() {
    if (myVid.paused) {
      myVid.play();
      playIcon.classList.remove('fa-play');
      playIcon.classList.remove('fa-redo-alt');
      playIcon.classList.add('fa-pause');
    } else {
      myVid.pause();
      playIcon.classList.remove('fa-pause');
      playIcon.classList.remove('fa-redo-alt');
      playIcon.classList.add('fa-play');
    };
}
function updateProgress(){
    if(!stopUpdatting){
        var loadedPercentage = myVid.currentTime / myVid.duration;
        //console.log(loadedPercentage*100)
        slider.noUiSlider.set(loadedPercentage*100);
    } 
}
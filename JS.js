let URL;
        const urlMale = "https://teachablemachine.withgoogle.com/models/y6rFybpdT/";
        const urlFemale = "https://teachablemachine.withgoogle.com/models/WhUPgENPE/";
let model, labelContainer, maxPredictions;

async function init() {
    if (document.getElementById('gender').checked) {
        URL = urlMale;
    } else {
        URL = urlFemale;
    }
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById('label-container');
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement('div'));
    }
}

async function predict() {
    var image = document.getElementById('face-image');
    const prediction = await model.predict(image, false);
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    console.log(prediction[0].className);
    var resultTitle, resultExplain, resultCeleb;
    switch (prediction[0].className) {
        case 'iphone':
            resultTitle = '깔끔한 것을 좋아하는 아이폰상';
            resultExplain =
                '인터페이스, 디자인 모두 깔끔한 아이폰을 사랑하는 당신!<br>최적화가 잘되서 부드러움이 남다른 아이폰을 좋아하고 계시진 않나요? 안좋아하고 있다면 혹시 아직 입덕부정기? <br>한번 입덕 해보는것도 좋을지도~ <br>지금 주변도 깔끔하진 않나요?';
            break;
        case 'galaxy':
            resultTitle = '편함이 최고인 갤럭시상';
            resultExplain =
                '갤럭시의 특유의 편안함과 삼성페이를 사랑하는 당신! <br>호완성이 높고 삼성페이가 되서 지갑을 잘 안가지고 다닐만큼 편한 갤럭시를 좋아하고 계시진 않나요? <br>안좋아하고 있다면 혹시 아직 입덕 부정기? <br>한번 입덕 해보는것도 좋을지도~ 평소에 편안한 것을 1순위로 찾고 계시진 않나요?';
            break;
        default:
            resultTitle = '알수없음';
            resultExplain = '';
    }
    var title =
        "<div class='" + prediction[0].className + "-phone-title'>" + resultTitle + '</div>';
    var explain = "<div class='phone-explain pt-2'>" + resultExplain + '</div>';
    $('.result-message').html(title + explain);
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();
            $('#loading').show();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);
        init().then(function () {
            predict();
            $('#loading').hide();
        });
    } else {
        removeUpload();
    }
}

function gaReload() {
    window.location.reload();
}
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTION = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var getRandomComments = function(commentsNum, strokeNum) {
  var randomComments = [];
  for (var i = 0; i < commentsNum; i++) {
    if (strokeNum > 1) {
      randomComments[i] = getRandIndex(COMMENTS) + ' ' + getRandIndex(COMMENTS);
    } else {
      randomComments[i] = getRandIndex(COMMENTS);
    }
  }
  return randomComments;
}

var getRandIndex = function(arr) {
  var randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

var getRandInteger = function(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
};

var pictures = [];

for (var i = 0; i < 25; i++) {
  pictures[i] = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandInteger(15, 200),
    comments: getRandomComments(getRandInteger(1, 6), getRandInteger(1, 2)),
    description: getRandIndex(DESCRIPTION)
  }
};

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesItem = document.querySelector('.pictures');

var renderPicture = function(picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPicture(pictures[i]));
};
picturesItem.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

bigPicture.querySelector('.big-picture__img').src = pictures[0].url;
bigPicture.querySelector('.likes-count').textContent = pictures[0].likes;
bigPicture.querySelector('.comments-count').textContent = pictures[0].comments.length;

var socialComment = bigPicture.querySelector('.social__comment');
var socialComments = bigPicture.querySelector('.social__comments');

var renderComments = function(comment) {
  var commentElement = socialComment.cloneNode(true);

  commentElement.querySelector('.social__picture').src = "img/avatar-" + getRandInteger(1, 6) + ".svg";
  commentElement.querySelector('.social__text').textContent = comment;

  return commentElement;
};

for (var i = 0; i < pictures[0].comments.length; i++) {
  fragment.appendChild(renderComments(pictures[0].comments[i]));
};
socialComments.replaceChild(fragment, socialComment);

bigPicture.querySelector('.social__caption').textContent = pictures[0].description;

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

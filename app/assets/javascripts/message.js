$(function(){


  function buildHTML(message){
    image = ( message.image ) ? `<img src=${message.image} >` : "";
          var html =
           `<div class="message" data-message-id=${message.id}>
              <div class="upper-message">
                <div class="upper-message__user-name">
                  ${message.user_name}
                </div>
                <div class="upper-message__date">
                  ${message.date}
                </div>
              </div>
              <div class="lower-message">
                <p class="lower-message__content">
                  ${message.content}
                </p>
              </div>
              ${image}
            </div>`
          return html;
      }


  $('#new_message').on('submit', function(e){
   e.preventDefault();
   var formData = new FormData(this);
   var url = $(this).attr('action');
   $.ajax({
     url: url,
     type: "POST",
     data: formData,
     dataType: 'json',
     processData: false,
     contentType: false
   })
   .done(function(message){
    var html = buildHTML(message); 
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    $('form')[0].reset();
   })
   .fail(function(){
    alert('error');
   })
   return false;
  })
});

$(function(){

  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();    //フォームの値を取得して変数に代入する
    $.ajax({
      type: "GET",    //HTTPメソッド
      url: '/users',       //users_controllerの、indexアクションにリクエストの送信先を設定する
      dataType: 'json',
      data: { keyword: input },   //テキストフィールドに入力された文字を設定する
    })
  })
});
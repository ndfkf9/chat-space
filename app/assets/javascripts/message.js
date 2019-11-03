$(function(){


  function buildHTML(message){
    image = ( message.image.url ) ? `<img src=${message.image.url} >` : "";
          var html =
           `<div class="message" data-message-id=${message.id}>
              <div class="upper-message">
                <div class="upper-message__user-name">
                  ${message.user_name}
                </div>
                <div class="upper-message__date">
                  ${message.created_at}
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

});


$(function() {
  function addUser(user) {

    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="chat-group-user__remove " data-user-id="${id}" data-user-name="${name}">
      <a class="chat-group-user__btn chat-group-user__btn--remove">削除</a>
      </div>
      </div>
    </div>`;
    $(".js-add-user").append(html);
  }
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();    //フォームの値を取得して変数に代入する
    $.ajax({
      type: "GET",    //HTTPメソッド
      url: "/users",       //users_controllerの、indexアクションにリクエストの送信先を設定する
      data: { keyword: input },   //テキストフィールドに入力された文字を設定する
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();  //emptyメソッドで一度検索結果を空にする

        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  $(document).on("click", ".user-search-add", function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });
  $(document).on("click", ".chat-group-user__remove", function() {
    $(this)
      .parent()
      .remove();
  });
});






var reloadMessages = function() {
  if (window.location.href.match(/\/groups\/\d+\/messages/)){   //今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行
  var url = 'api/messages#index'      
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  var last_message_id =  $('.message:last').data('message-id');
  $.ajax({
    //ルーティングで設定した通りのURLを指定
    url: url,
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })
  .done(function(messages) {       // フォームに入力されたデータを引数として取得
    //追加するHTMLの入れ物を作る
    var insertHTML = '';
    //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
    messages.forEach(function(message){
      insertHTML = buildHTML(message);
    //メッセージが入ったHTMLを取得
    $('.messages').append(insertHTML);
    //メッセージを追加
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  })
  })
  .fail(function() {
    console.log('error');
  });
}
};
  setInterval(reloadMessages, 5000);
});
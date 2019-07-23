$(document).on("turbolinks:load",(function(){

  function buildHTML(users){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${users.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${users.id}" data-user-name="${users.name}">追加</div>
                </div>`;

    return html;
  }

  function buildHTML_user(userId,userName){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`

    return html;
  }
  

  $("#user-search-field").on("keyup",function(e){
    e.preventDefault();
    var input = $.trim($(this).val());

    $.ajax({ 
      url: '/users', 
      type: 'GET', 
      data: ('keyword=' + input),
      processData: false, 
      contentType: false, 
      dataType: 'json' 
    })
    
    .done(function(users){
      $('#user-search-result').empty();

      if (users.length !== 0){
        users.forEach(function(user){
          var html = buildHTML(user);
          $("#user-search-result").append(html);
          console.log("OK");
        })
    }
  })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  })

  $("#user-search-result").on("click",".user-search-add",function(){
    var userId = $(this).data("user-id");
    var userName = $(this).data("user-name");


    var html = buildHTML_user(userId,userName);
    $("#chat-group-users").append(html);

    $(".user-search-add").parent(this).remove();
    
  })

  

  $("#chat-group-users").on("click",".user-search-remove",function(){

    $(".user-search-remove").parent(this).remove();
  })

}))
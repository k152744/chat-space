$(document).on('turbolinks:load', function() {

  function buildHTML(message){
    var image_url = (message.image_url)? `<img class="message__image" src="${message.image_url}">`:""
    var html = `<div class="message" data-id=${message.id}>
                  <div class="message__info">
                    <p class="message__info__user">
                      ${message.user_name}
                    </p>
                    <p class="message__info__data">
                      ${message.time}
                    </p>
                  </div>
                  <div class="message__text">
                    <p class="message__content">
                      ${message.text}
                    </p>
                    ${image_url}
                  </div>
                </div>`;

    return html;
  }

  function scroll(){
    $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
  }

  $("#new_message").on("submit",function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    
    $.ajax({
      url:url,
      type:"POST",
      data:formData,
      dataType:"json",
      processData:false,
      contentType:false
    })
    .done(function(message_contents){
      var html = buildHTML(message_contents);
      $(".messages").append(html);
      $('.submit-box').prop('disabled', false);
      $('form')[0].reset();
      scroll();
    })
    .fail(function(){
      alert("error");
      $('.submit-box').prop('disabled', false);
    })
  });

  function reloadMessages(){
      var message_id = $(".message:last").data('id');
      console.log(message_id)
      $.ajax({
        url:"api/messages",
        type: "GET",
        data: {id: message_id},
        dataType:"json"
      })
      .done(function(message_contents){
        var html = "";
        $.each(message_contents,function(i, message_content){
          console.log(message_content)
          html += buildHTML(message_content);
          $(".messages").append(html);
          scroll();
        })
      })
      .fail(function(){
        alert("自動更新に失敗しました");
      })
    }
  if(location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 10000);
  }

});
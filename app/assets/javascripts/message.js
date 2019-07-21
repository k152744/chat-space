$(function(){

  function buildHTML(message){
    var html = `<div class="message">
                  <div class="message__info">
                    <p class="message__info__user">
                      ${message.user_name}
                    </p>
                    <p class="message__info__data">
                      ${message.time}
                    </p>
                  </div>
                    <p class="message__content">
                      ${message.text}
                    </p>
                </div>`;

    return html;
  }
  function scroll(){
    $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
  }

  //$('.messages')[0].scrollHeight

  $("#new_message").on("submit",function(e) {
 
    e.preventDefault();
    console.log("OK");

    var formData = new FormData(this);
    var url = $(this).attr("action");
    console.log("OK");
    $.ajax({
      url:url,
      type:"POST",
      data:formData,
      dataType:"json",
      processData:false,
      contentType:false
    })
    //↓ 非同期通信成功時に上で定義した関数を実行
    
    .done(function(data){
      var html = buildHTML(data);
      $(".messages").append(html);
      $("#message_text").val("");
      $('.submit-box').prop('disabled', false);
      scroll();
    })
    .fail(function(){
      alert("error");
      $('.submit-box').prop('disabled', false);
    })
  })
})
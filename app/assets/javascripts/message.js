$(function(){

  function buildHTML(message){
    var html = `<div class="message data-id = ${message.id}">
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

  $(function(){
    setInterval(reloadMessages, 10000);
    
  });

  function reloadMessages(){
    var message_id = $(".message:last").data('id'); 

    $.ajax({
      url: location.href,
      type: "GET",
      data: {
        message: {id: message_id}
      },
      dataType:"json"

    })

    .done(function(message_contents){
      console.log('success');

      $.each(message_contents,function(i, message_contents){

        var html = buildHTML(message_contents);
        $(".messages").append(html);
      })
     
      scroll();
    })
    .fail(function(){
      console.log('error');

    })
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
      $("#message_text").val("");
      scroll();
      $(".text-message")[0].reset();
      
    })
    .fail(function(){
      alert("error");
      $('.submit-box').prop('disabled', false);
    })
  })
})
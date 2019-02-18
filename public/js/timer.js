$("#timer").submit(function(e){
      e.preventDefault();
      $(".loading").show().html("Loading...");
      const url = 'http://localhost:1000/'
      var task =  $('#task').val();
      var time =  $('input[name=time]:checked').val();
      if(task.length > 2 && task.length < 120 ){
            var values = { task:task, time:time};
            values = JSON.stringify(values);
            $.ajax({  
            url: url,  
            type: 'POST',  
            dataType: 'json', 
            data:values,
            contentType: 'application/json; charset=utf-8',
            timeout:30000,  
            success: function (data, textStatus, xhr) {  
                  console.log(data);                
                  $("#timer").hide();
                  $("#tasktitle").html(data.task);
                  $(".tasktimer").show();
                  var sec = 59;
                  var min = data.time - 1;
                  $("#min").html(`${min>9?min:'0'+min}`);
                  $("#sec").html(`00`);
                  setInterval(() =>{
                        if(sec !== 0 || min !== 0){
                              if(sec !== 0){
                                    sec = sec -1;
                                    $("#sec").html(`${sec>9?sec:'0'+sec}`); 
                              }else{
                                    sec = 59;
                                    $("#sec").html(`${sec>9?sec:'0'+sec}`);
                                    if(min !== 0){
                                          min = min - 1;
                                          $("#min").html(`${min>9?min:'0'+min}`);
                                    }else{
                                          min = 0;
                                          sec = 0;
                                          $("#min").html(`00`); 
                                          $("#sec").html(`00`);
                                    }
                              }
                        }else{
                              $("#timeout").html("Task timeout"); 
                              playBeep();
                              setTimeout(() => {
                                    playBeep();                              
                              },5000);
                        }
                  },1000);
            },
            error: function (xhr, textStatus, errorThrown) {
                  console.log(errorThrown);
                  $(".loading").show().html("error when connecting or returning data"); 
                  if(textStatus==="timeout") {
                        $(".message").show().addClass("red").html("Whooch, the server is taking to long time to respond!");
                  } else {
                        $(".message").show().addClass("red").html("Whoooch, Error occured. Try again later");
                  } 
            }  
      });
      }else{
            alert('Task must be 2 to 120 characters');
      }
})

playBeep =() =>{      
      var audio = new Audio("../public/audio/beep.mp3");
      audio.play();
}
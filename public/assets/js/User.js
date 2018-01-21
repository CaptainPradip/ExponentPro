
     $(function(){         
        $('.carousel').carousel({fullWidth: true,
          loop: true,
          autoplay: true});
        // Next slide
        
        autoplay()   
        function autoplay() {
        $('.carousel').carousel('next');
        
        setTimeout(autoplay,4500);
        }})